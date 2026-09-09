import { NextResponse } from 'next/server'

import { requireAdminApi } from '@/lib/admin'

const STATUSES = new Set(['new', 'contacted', 'qualified', 'won', 'closed'])

function isCrossSite(request: Request) {
  const fetchSite = request.headers.get('sec-fetch-site')
  if (fetchSite === 'cross-site') return true
  const origin = request.headers.get('origin')
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host')
  return Boolean(origin && host && new URL(origin).host !== host)
}

export async function GET() {
  const admin = await requireAdminApi()
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const result = await admin.service
    .from('contact_inquiries')
    .select(
      'id,name,email,inquiry_type,budget,message,status,internal_notes,delivery_status,last_contacted_at,created_at,updated_at',
    )
    .order('created_at', { ascending: false })
    .limit(500)
  if (result.error) {
    return NextResponse.json({ message: 'Inquiries could not be loaded.' }, { status: 500 })
  }
  return NextResponse.json({ inquiries: result.data })
}

export async function PATCH(request: Request) {
  if (isCrossSite(request)) return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  const admin = await requireAdminApi()
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const input = (await request.json().catch(() => null)) as {
    id?: string
    internalNotes?: string
    status?: string
  } | null
  if (!input?.id || (input.status !== undefined && !STATUSES.has(input.status))) {
    return NextResponse.json({ message: 'Invalid request.' }, { status: 400 })
  }

  const updates: Record<string, string | null> = { updated_at: new Date().toISOString() }
  if (input.status) {
    updates.status = input.status
    if (input.status === 'contacted') updates.last_contacted_at = new Date().toISOString()
  }
  if (typeof input.internalNotes === 'string') {
    updates.internal_notes = input.internalNotes.trim().slice(0, 4_000)
  }

  const result = await admin.service
    .from('contact_inquiries')
    .update(updates)
    .eq('id', input.id)
    .select(
      'id,name,email,inquiry_type,budget,message,status,internal_notes,delivery_status,last_contacted_at,created_at,updated_at',
    )
    .single()
  if (result.error) {
    return NextResponse.json({ message: 'Inquiry could not be updated.' }, { status: 500 })
  }
  return NextResponse.json({ inquiry: result.data })
}
