import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

import { requireAdminApi } from '@/lib/admin'

const tables = { pricing: 'pricing_plans', service: 'services' } as const
const goals = new Set(['launch', 'grow', 'transform'])

function isCrossSite(request: Request) {
  if (request.headers.get('sec-fetch-site') === 'cross-site') return true
  const origin = request.headers.get('origin')
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host')
  return Boolean(origin && host && new URL(origin).host !== host)
}

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function GET() {
  const admin = await requireAdminApi()
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  const [services, pricing] = await Promise.all([
    admin.service.from('services').select('*').order('position'),
    admin.service.from('pricing_plans').select('*').order('position'),
  ])
  if (services.error || pricing.error)
    return NextResponse.json(
      { message: 'Services and pricing could not be loaded. Apply the latest Supabase migration.' },
      { status: 500 },
    )
  return NextResponse.json({ pricingPlans: pricing.data, services: services.data })
}

export async function POST(request: Request) {
  if (isCrossSite(request)) return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  const admin = await requireAdminApi()
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  const input = (await request.json().catch(() => null)) as Record<string, unknown> | null
  if (!input) return NextResponse.json({ message: 'Invalid request.' }, { status: 400 })
  const entity = input?.entity === 'service' || input?.entity === 'pricing' ? input.entity : null
  if (!entity) return NextResponse.json({ message: 'Invalid content type.' }, { status: 400 })
  const table = tables[entity]
  const { count } = await admin.service.from(table).select('*', { count: 'exact', head: true })
  let values: Record<string, unknown>
  if (entity === 'service') {
    const title = clean(input.title, 100)
    const description = clean(input.description, 600)
    const slug = clean(input.slug, 120)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    if (title.length < 2 || description.length < 10 || !slug)
      return NextResponse.json(
        { message: 'Title, description, and a valid slug are required.' },
        { status: 422 },
      )
    values = { active: true, description, position: count ?? 0, slug, title }
  } else {
    const name = clean(input.name, 100)
    const description = clean(input.description, 600)
    const timeline = clean(input.timeline, 100)
    const goal = clean(input.goal, 20)
    const features = Array.isArray(input.features)
      ? input.features
          .map((item) => clean(item, 140))
          .filter(Boolean)
          .slice(0, 12)
      : []
    if (
      name.length < 2 ||
      description.length < 10 ||
      !timeline ||
      !goals.has(goal) ||
      features.length === 0
    )
      return NextResponse.json(
        { message: 'Complete all pricing fields and add at least one feature.' },
        { status: 422 },
      )
    values = {
      active: true,
      description,
      features,
      goal,
      name,
      position: count ?? 0,
      price_label: clean(input.priceLabel, 100) || 'Custom proposal',
      timeline,
    }
  }
  const result = await admin.service.from(table).insert(values).select().single()
  if (result.error)
    return NextResponse.json(
      {
        message:
          result.error.code === '23505'
            ? 'That service slug is already in use.'
            : 'Content could not be created.',
      },
      { status: 422 },
    )
  revalidateTag('catalog')
  return NextResponse.json({ item: result.data }, { status: 201 })
}

export async function PATCH(request: Request) {
  if (isCrossSite(request)) return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  const admin = await requireAdminApi()
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  const input = (await request.json().catch(() => null)) as Record<string, unknown> | null
  const entity = input?.entity === 'service' || input?.entity === 'pricing' ? input.entity : null
  const id = clean(input?.id, 80)
  if (!entity || !id) return NextResponse.json({ message: 'Invalid request.' }, { status: 400 })
  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() }
  if (typeof input?.active === 'boolean') updates.active = input.active
  if (Number.isInteger(input?.position) && Number(input?.position) >= 0)
    updates.position = input?.position
  const result = await admin.service
    .from(tables[entity])
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (result.error)
    return NextResponse.json({ message: 'Content could not be updated.' }, { status: 500 })
  revalidateTag('catalog')
  return NextResponse.json({ item: result.data })
}

export async function DELETE(request: Request) {
  if (isCrossSite(request)) return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  const admin = await requireAdminApi()
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  const url = new URL(request.url)
  const entity = url.searchParams.get('entity')
  const id = url.searchParams.get('id')
  if ((entity !== 'service' && entity !== 'pricing') || !id)
    return NextResponse.json({ message: 'Invalid request.' }, { status: 400 })
  const result = await admin.service.from(tables[entity]).delete().eq('id', id)
  if (result.error)
    return NextResponse.json({ message: 'Content could not be removed.' }, { status: 500 })
  revalidateTag('catalog')
  return NextResponse.json({ ok: true })
}
