import { afterEach, describe, expect, it, vi } from 'vitest'

import { POST } from './route'

const { fromMock } = vi.hoisted(() => ({
  fromMock: vi.fn(() => ({
    insert: vi.fn(() => ({
      select: vi.fn(() => ({
        single: vi.fn(async () => ({
          data: { id: '12345678-0000-0000-0000-000000000000' },
          error: null,
        })),
      })),
    })),
    update: vi.fn(() => ({ eq: vi.fn(async () => ({ error: null })) })),
  })),
}))

vi.mock('@/lib/supabase/server', () => ({
  createServiceSupabaseClient: () => ({ from: fromMock }),
}))

const validPayload = {
  budget: 'NPR 300,000–750,000',
  email: 'mina@example.com',
  inquiry: 'Custom software',
  message: 'We need a reliable digital ordering workflow for our growing team.',
  name: 'Mina Rai',
  startedAt: Date.now() - 5_000,
  website: '',
}

function request(payload: unknown, headers: Record<string, string> = {}) {
  return new Request('https://corecraftnepal.com/api/contact', {
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json', host: 'corecraftnepal.com', ...headers },
    method: 'POST',
  })
}

describe('POST /api/contact', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it('rejects invalid fields without attempting delivery', async () => {
    const delivery = vi.fn()
    vi.stubGlobal('fetch', delivery)
    const response = await POST(request({ ...validPayload, email: 'invalid', message: 'short' }))

    expect(response.status).toBe(422)
    expect(await response.json()).toMatchObject({
      errors: { email: expect.any(String), message: expect.any(String) },
    })
    expect(delivery).not.toHaveBeenCalled()
  })

  it('quietly accepts honeypot submissions without delivering them', async () => {
    const delivery = vi.fn()
    vi.stubGlobal('fetch', delivery)
    const response = await POST(request({ ...validPayload, website: 'https://spam.example' }))

    expect(response.status).toBe(200)
    expect(delivery).not.toHaveBeenCalled()
  })

  it('rejects cross-site requests', async () => {
    const response = await POST(request(validPayload, { origin: 'https://attacker.example' }))
    expect(response.status).toBe(403)
  })

  it('delivers a validated message through the configured provider', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-key')
    vi.stubEnv('CONTACT_FROM_EMAIL', 'Website <website@corecraftnepal.com>')
    vi.stubEnv('CONTACT_TO_EMAIL', 'info@corecraftnepal.com')
    const delivery = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }))
    vi.stubGlobal('fetch', delivery)

    const response = await POST(request(validPayload, { 'x-forwarded-for': '203.0.113.18' }))

    expect(response.status).toBe(200)
    expect(delivery).toHaveBeenCalledWith(
      'https://api.resend.com/emails',
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('keeps the saved inquiry successful when email notification fails', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-key')
    vi.stubEnv('CONTACT_FROM_EMAIL', 'Website <website@corecraftnepal.com>')
    vi.stubEnv('CONTACT_TO_EMAIL', 'info@corecraftnepal.com')
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 500 })))

    const response = await POST(request(validPayload, { 'x-forwarded-for': '203.0.113.19' }))
    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({
      ok: true,
      reference: '12345678',
    })
  })

  it('rate-limits repeated submissions from the same client', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-key')
    vi.stubEnv('CONTACT_FROM_EMAIL', 'Website <website@corecraftnepal.com>')
    vi.stubEnv('CONTACT_TO_EMAIL', 'info@corecraftnepal.com')
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 200 })))
    const headers = { 'x-forwarded-for': '203.0.113.20' }

    for (let attempt = 0; attempt < 5; attempt += 1) {
      expect((await POST(request(validPayload, headers))).status).toBe(200)
    }
    const blocked = await POST(request(validPayload, headers))

    expect(blocked.status).toBe(429)
    expect(blocked.headers.get('Retry-After')).toBe('900')
  })
})
