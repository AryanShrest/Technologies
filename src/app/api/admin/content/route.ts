import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

import { requireAdminApi } from '@/lib/admin'

const IMAGE_TYPES = new Set(['image/avif', 'image/jpeg', 'image/png', 'image/webp'])
const MAX_IMAGE_BYTES = 5 * 1024 * 1024

function text(form: FormData, name: string, max: number) {
  const value = form.get(name)
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function entityTable(entity: string) {
  if (entity === 'hero') return 'hero_slides'
  if (entity === 'partner') return 'partners'
  return null
}

function isCrossSite(request: Request) {
  const fetchSite = request.headers.get('sec-fetch-site')
  if (fetchSite === 'cross-site') return true
  const origin = request.headers.get('origin')
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host')
  return Boolean(origin && host && new URL(origin).host !== host)
}

async function hasValidImageSignature(file: File) {
  const bytes = new Uint8Array(await file.slice(0, 16).arrayBuffer())
  if (file.type === 'image/jpeg') return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
  if (file.type === 'image/png') return bytes.slice(0, 8).join(',') === '137,80,78,71,13,10,26,10'
  if (file.type === 'image/webp') {
    return (
      new TextDecoder().decode(bytes.slice(0, 4)) === 'RIFF' &&
      new TextDecoder().decode(bytes.slice(8, 12)) === 'WEBP'
    )
  }
  if (file.type === 'image/avif')
    return new TextDecoder().decode(bytes.slice(4, 12)).includes('ftypavif')
  return false
}

function safeWebsiteUrl(value: string) {
  if (!value) return null
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : null
  } catch {
    return null
  }
}

export async function GET() {
  const admin = await requireAdminApi()
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  const [hero, partners] = await Promise.all([
    admin.service.from('hero_slides').select('*').order('position'),
    admin.service.from('partners').select('*').order('position'),
  ])
  if (hero.error || partners.error) {
    return NextResponse.json({ message: 'Content could not be loaded.' }, { status: 500 })
  }
  return NextResponse.json({ heroSlides: hero.data, partners: partners.data })
}

export async function POST(request: Request) {
  if (isCrossSite(request)) return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  const admin = await requireAdminApi()
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  try {
    const form = await request.formData()
    const entity = text(form, 'entity', 20)
    const table = entityTable(entity)
    const file = form.get('image')
    if (!table || !(file instanceof File) || file.size === 0) {
      return NextResponse.json({ message: 'A valid image is required.' }, { status: 422 })
    }
    if (
      file.size > MAX_IMAGE_BYTES ||
      !IMAGE_TYPES.has(file.type) ||
      !(await hasValidImageSignature(file))
    ) {
      return NextResponse.json(
        { message: 'Use a JPG, PNG, WebP, or AVIF image no larger than 5 MB.' },
        { status: 422 },
      )
    }

    if (entity === 'hero') {
      const { count } = await admin.service
        .from('hero_slides')
        .select('*', { count: 'exact', head: true })
        .eq('active', true)
      if ((count ?? 0) >= 4) {
        return NextResponse.json(
          { message: 'Four hero slides are already active. Disable one before adding another.' },
          { status: 409 },
        )
      }
    }

    const extension =
      file.name
        .split('.')
        .pop()
        ?.toLowerCase()
        .replace(/[^a-z0-9]/g, '') || 'bin'
    const storagePath = `${entity}/${crypto.randomUUID()}.${extension}`
    const upload = await admin.service.storage.from('site-media').upload(storagePath, file, {
      cacheControl: '31536000',
      contentType: file.type,
      upsert: false,
    })
    if (upload.error) throw upload.error
    const imageUrl = admin.service.storage.from('site-media').getPublicUrl(storagePath)
      .data.publicUrl

    const { count } = await admin.service.from(table).select('*', { count: 'exact', head: true })
    let result: { data: unknown; error: { message: string } | null }
    if (entity === 'hero') {
      const title = text(form, 'title', 80)
      const altText = text(form, 'altText', 180)
      if (!title || !altText) {
        await admin.service.storage.from('site-media').remove([storagePath])
        return NextResponse.json(
          { message: 'Title and alternative text are required.' },
          { status: 422 },
        )
      }
      result = await admin.service
        .from('hero_slides')
        .insert({
          active: true,
          alt_text: altText,
          image_url: imageUrl,
          position: count ?? 0,
          storage_path: storagePath,
          subtitle: text(form, 'subtitle', 120),
          title,
        })
        .select()
        .single()
    } else {
      const name = text(form, 'name', 100)
      if (!name) {
        await admin.service.storage.from('site-media').remove([storagePath])
        return NextResponse.json({ message: 'Company name is required.' }, { status: 422 })
      }
      result = await admin.service
        .from('partners')
        .insert({
          active: true,
          logo_url: imageUrl,
          name,
          position: count ?? 0,
          storage_path: storagePath,
          website_url: safeWebsiteUrl(text(form, 'websiteUrl', 300)),
        })
        .select()
        .single()
    }
    if (result.error) {
      await admin.service.storage.from('site-media').remove([storagePath])
      throw result.error
    }
    revalidateTag('home-content')
    return NextResponse.json({ item: result.data }, { status: 201 })
  } catch (error) {
    console.error('Admin upload failed', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json({ message: 'The image could not be saved.' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  if (isCrossSite(request)) return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  const admin = await requireAdminApi()
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  const input = (await request.json().catch(() => null)) as {
    active?: boolean
    entity?: string
    id?: string
    position?: number
  } | null
  const table = entityTable(input?.entity ?? '')
  if (!input?.id || !table)
    return NextResponse.json({ message: 'Invalid request.' }, { status: 400 })

  if (table === 'hero_slides' && input.active === true) {
    const { count } = await admin.service
      .from('hero_slides')
      .select('*', { count: 'exact', head: true })
      .eq('active', true)
      .neq('id', input.id)
    if ((count ?? 0) >= 4) {
      return NextResponse.json({ message: 'Only four hero slides can be active.' }, { status: 409 })
    }
  }

  const updates: { active?: boolean; position?: number; updated_at: string } = {
    updated_at: new Date().toISOString(),
  }
  if (typeof input.active === 'boolean') updates.active = input.active
  if (Number.isInteger(input.position) && (input.position ?? -1) >= 0)
    updates.position = input.position
  const result = await admin.service
    .from(table)
    .update(updates)
    .eq('id', input.id)
    .select()
    .single()
  if (result.error)
    return NextResponse.json({ message: 'Content could not be updated.' }, { status: 500 })
  revalidateTag('home-content')
  return NextResponse.json({ item: result.data })
}

export async function DELETE(request: Request) {
  if (isCrossSite(request)) return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  const admin = await requireAdminApi()
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  const url = new URL(request.url)
  const entity = url.searchParams.get('entity') ?? ''
  const id = url.searchParams.get('id')
  const table = entityTable(entity)
  if (!id || !table) return NextResponse.json({ message: 'Invalid request.' }, { status: 400 })

  const existing = await admin.service.from(table).select('storage_path').eq('id', id).single()
  if (existing.error)
    return NextResponse.json({ message: 'Content was not found.' }, { status: 404 })
  const removed = await admin.service.from(table).delete().eq('id', id)
  if (removed.error)
    return NextResponse.json({ message: 'Content could not be removed.' }, { status: 500 })
  if (existing.data.storage_path) {
    await admin.service.storage.from('site-media').remove([existing.data.storage_path])
  }
  revalidateTag('home-content')
  return NextResponse.json({ ok: true })
}
