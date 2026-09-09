import { createHash } from 'node:crypto'
import { NextResponse } from 'next/server'

import { createServiceSupabaseClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'

const MAX_BODY_BYTES = 16_000
const RATE_LIMIT = 5
const RATE_WINDOW_SECONDS = 15 * 60
const RATE_LIMIT_SCRIPT =
  "local count = redis.call('INCR', KEYS[1]); if count == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]); end; return count"
const ALLOWED_INQUIRIES = new Set([
  'New website or redesign',
  'Custom software',
  'Mobile application',
  'Digital growth',
  'Cloud and hosting',
  'Something else',
])
const ALLOWED_BUDGETS = new Set([
  'Not sure yet',
  'Let’s discuss',
  'Under NPR 100,000',
  'NPR 100,000–300,000',
  'NPR 300,000–750,000',
  'NPR 750,000+',
])

type ContactPayload = {
  budget: string
  email: string
  inquiry: string
  message: string
  name: string
  startedAt: number
  website: string
}

type RateEntry = { count: number; resetAt: number }
const localRates = new Map<string, RateEntry>()

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function parsePayload(input: unknown): ContactPayload | null {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null
  const value = input as Record<string, unknown>
  return {
    budget: clean(value.budget, 60),
    email: clean(value.email, 254).toLowerCase(),
    inquiry: clean(value.inquiry, 80),
    message: clean(value.message, 4_000),
    name: clean(value.name, 100),
    startedAt: typeof value.startedAt === 'number' ? value.startedAt : 0,
    website: clean(value.website, 200),
  }
}

function validate(payload: ContactPayload) {
  const errors: Record<string, string> = {}
  if (payload.name.length < 2) errors.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!ALLOWED_INQUIRIES.has(payload.inquiry)) errors.inquiry = 'Choose a valid project type.'
  if (payload.budget && !ALLOWED_BUDGETS.has(payload.budget)) {
    errors.budget = 'Choose a valid budget range.'
  }
  if (payload.message.length < 20) errors.message = 'Please add at least 20 characters.'
  return errors
}

function clientAddress(request: Request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

function rateKey(request: Request) {
  return `contact:${createHash('sha256').update(clientAddress(request)).digest('hex').slice(0, 24)}`
}

async function checkRateLimit(key: string) {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN

  if (redisUrl && redisToken) {
    const response = await fetch(redisUrl, {
      body: JSON.stringify(['EVAL', RATE_LIMIT_SCRIPT, '1', key, String(RATE_WINDOW_SECONDS)]),
      headers: { Authorization: `Bearer ${redisToken}`, 'Content-Type': 'application/json' },
      method: 'POST',
      signal: AbortSignal.timeout(4_000),
    })
    if (!response.ok) throw new Error('Rate-limit service unavailable')
    const result = (await response.json()) as { result?: number }
    return (result.result ?? RATE_LIMIT + 1) <= RATE_LIMIT
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('Distributed rate limiting is not configured')
  }

  const now = Date.now()
  const current = localRates.get(key)
  if (!current || current.resetAt <= now) {
    localRates.set(key, { count: 1, resetAt: now + RATE_WINDOW_SECONDS * 1_000 })
    return true
  }
  current.count += 1
  return current.count <= RATE_LIMIT
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function isCrossSite(request: Request) {
  const fetchSite = request.headers.get('sec-fetch-site')
  if (fetchSite === 'cross-site') return true
  const origin = request.headers.get('origin')
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host')
  return Boolean(origin && host && new URL(origin).host !== host)
}

async function deliver(payload: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL
  if (!apiKey || !from || !to) throw new Error('Contact delivery is not configured')

  const response = await fetch('https://api.resend.com/emails', {
    body: JSON.stringify({
      from,
      html: `<h2>New project inquiry</h2><p><strong>Name:</strong> ${escapeHtml(payload.name)}</p><p><strong>Email:</strong> ${escapeHtml(payload.email)}</p><p><strong>Project:</strong> ${escapeHtml(payload.inquiry)}</p><p><strong>Budget:</strong> ${escapeHtml(payload.budget || 'Not provided')}</p><p><strong>Brief:</strong></p><p>${escapeHtml(payload.message).replaceAll('\n', '<br>')}</p>`,
      reply_to: payload.email,
      subject: `Website inquiry: ${payload.inquiry}`,
      text: `Name: ${payload.name}\nEmail: ${payload.email}\nProject: ${payload.inquiry}\nBudget: ${payload.budget || 'Not provided'}\n\n${payload.message}`,
      to: [to],
    }),
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    method: 'POST',
    signal: AbortSignal.timeout(8_000),
  })
  if (!response.ok) throw new Error(`Contact delivery failed with status ${response.status}`)
}

async function saveInquiry(payload: ContactPayload, request: Request) {
  const service = createServiceSupabaseClient()
  const fingerprint = createHash('sha256')
    .update(
      `${clientAddress(request)}:${process.env.CONTACT_FINGERPRINT_SALT || 'corecraft-contact'}`,
    )
    .digest('hex')
  const result = await service
    .from('contact_inquiries')
    .insert({
      budget: payload.budget || null,
      client_fingerprint: fingerprint,
      email: payload.email,
      inquiry_type: payload.inquiry,
      message: payload.message,
      name: payload.name,
    })
    .select('id')
    .single()
  if (result.error || !result.data) throw new Error('Inquiry could not be stored')
  return { id: result.data.id as string, service }
}

export async function POST(request: Request) {
  if (isCrossSite(request)) {
    return NextResponse.json({ message: 'Request origin was rejected.' }, { status: 403 })
  }

  const declaredLength = Number(request.headers.get('content-length') || 0)
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ message: 'Request is too large.' }, { status: 413 })
  }

  let payload: ContactPayload | null = null
  try {
    const raw = await request.text()
    if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) throw new Error('too large')
    payload = parsePayload(JSON.parse(raw))
  } catch {
    return NextResponse.json({ message: 'Invalid request.' }, { status: 400 })
  }
  if (!payload) return NextResponse.json({ message: 'Invalid request.' }, { status: 400 })

  // Honeypot and minimum-fill-time checks reject common automated submissions quietly.
  const elapsed = Date.now() - payload.startedAt
  if (payload.website || elapsed < 2_500 || elapsed > 24 * 60 * 60 * 1_000) {
    return NextResponse.json({ ok: true })
  }

  const errors = validate(payload)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { errors, message: 'Please check the highlighted fields.' },
      { status: 422 },
    )
  }

  try {
    if (!(await checkRateLimit(rateKey(request)))) {
      return NextResponse.json(
        { message: 'Too many requests. Please try again later.' },
        { headers: { 'Retry-After': String(RATE_WINDOW_SECONDS) }, status: 429 },
      )
    }
    const { id, service } = await saveInquiry(payload, request)
    try {
      await deliver(payload)
      await service
        .from('contact_inquiries')
        .update({
          delivery_error: null,
          delivery_status: 'sent',
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
    } catch (deliveryError) {
      const notConfigured =
        deliveryError instanceof Error && deliveryError.message.includes('not configured')
      await service
        .from('contact_inquiries')
        .update({
          delivery_error:
            deliveryError instanceof Error
              ? deliveryError.message.slice(0, 500)
              : 'Unknown delivery error',
          delivery_status: notConfigured ? 'not_configured' : 'failed',
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
      console.error(
        'Contact notification failed; inquiry was saved',
        deliveryError instanceof Error ? deliveryError.message : 'Unknown error',
      )
    }
    return NextResponse.json({ ok: true, reference: id.slice(0, 8) })
  } catch (error) {
    console.error(
      'Contact submission failed',
      error instanceof Error ? error.message : 'Unknown error',
    )
    return NextResponse.json(
      { message: 'We could not securely save your message. Please email or call us directly.' },
      { status: 503 },
    )
  }
}
