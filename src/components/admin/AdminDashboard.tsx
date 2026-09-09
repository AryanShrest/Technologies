'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { FormEvent } from 'react'
import { useCallback, useEffect, useState } from 'react'

import { Button } from '@/components/ui'
import { createBrowserSupabaseClient } from '@/lib/supabase/browser'

type RawHero = {
  active: boolean
  alt_text: string
  id: string
  image_url: string
  position: number
  subtitle: string
  title: string
}
type RawPartner = {
  active: boolean
  id: string
  logo_url: string
  name: string
  position: number
  website_url: string | null
}
type Content = { heroSlides: RawHero[]; partners: RawPartner[] }

function MediaCard({
  active,
  entity,
  id,
  image,
  name,
  onChange,
  position,
}: {
  active: boolean
  entity: 'hero' | 'partner'
  id: string
  image: string
  name: string
  onChange: () => void
  position: number
}) {
  const [busy, setBusy] = useState(false)

  async function update(payload: Record<string, unknown>) {
    setBusy(true)
    await fetch('/api/admin/content', {
      body: JSON.stringify({ entity, id, ...payload }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
    })
    setBusy(false)
    onChange()
  }

  async function remove() {
    if (!window.confirm(`Remove ${name}?`)) return
    setBusy(true)
    await fetch(`/api/admin/content?entity=${entity}&id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    })
    setBusy(false)
    onChange()
  }

  return (
    <article className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[7rem_1fr_auto] sm:items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        className="h-20 w-full rounded-xl bg-slate-100 object-contain sm:w-28"
        src={image}
      />
      <div>
        <h3 className="font-bold text-slate-900">{name}</h3>
        <p className="mt-1 text-xs text-slate-500">
          Position {position + 1} · {active ? 'Visible' : 'Hidden'}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 sm:justify-end">
        <button
          className="rounded-lg border px-3 py-2 text-xs font-semibold"
          disabled={busy || position === 0}
          onClick={() => update({ position: position - 1 })}
          type="button"
        >
          Move up
        </button>
        <button
          className="rounded-lg border px-3 py-2 text-xs font-semibold"
          disabled={busy}
          onClick={() => update({ active: !active })}
          type="button"
        >
          {active ? 'Hide' : 'Show'}
        </button>
        <button
          className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700"
          disabled={busy}
          onClick={remove}
          type="button"
        >
          Remove
        </button>
      </div>
    </article>
  )
}

export function AdminDashboard({ email }: { email: string }) {
  const router = useRouter()
  const [content, setContent] = useState<Content>({ heroSlides: [], partners: [] })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const response = await fetch('/api/admin/content', { cache: 'no-store' })
    const result = (await response.json()) as Content & { message?: string }
    if (!response.ok) setError(result.message || 'Content could not be loaded.')
    else {
      setContent(result)
      setError('')
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const response = await fetch('/api/admin/content', { body: new FormData(form), method: 'POST' })
    const result = (await response.json()) as { message?: string }
    if (!response.ok) setError(result.message || 'Upload failed.')
    else {
      form.reset()
      await load()
    }
  }

  async function logout() {
    await createBrowserSupabaseClient().auth.signOut()
    router.replace('/admin/login')
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-slate-100 px-5 py-8" id="primary">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 rounded-2xl bg-slate-950 p-6 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
              CoreCraft CMS
            </p>
            <h1 className="mt-2 text-3xl font-extrabold">Homepage content</h1>
            <p className="mt-2 text-sm text-slate-300">Signed in as {email}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
              href="/admin/inquiries"
            >
              View inquiries
            </Link>
            <Button onClick={logout} variant="secondary">
              Sign out
            </Button>
          </div>
        </header>

        {error && (
          <p className="mt-6 rounded-xl bg-red-50 p-4 text-red-700" role="alert">
            {error}
          </p>
        )}
        {loading && <p className="mt-6 text-sm text-slate-600">Loading managed content…</p>}

        <section className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Hero manager
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950">Four homepage slides</h2>
            <p className="mt-2 text-sm text-slate-600">Only four slides may be visible at once.</p>
            <form className="mt-6 grid gap-3 rounded-2xl bg-slate-50 p-4" onSubmit={upload}>
              <input name="entity" type="hidden" value="hero" />
              <input
                className="rounded-lg border bg-white px-3 py-2"
                name="title"
                placeholder="Slide title"
                required
              />
              <input
                className="rounded-lg border bg-white px-3 py-2"
                name="subtitle"
                placeholder="Subtitle"
              />
              <input
                className="rounded-lg border bg-white px-3 py-2"
                name="altText"
                placeholder="Describe the image"
                required
              />
              <input
                accept="image/jpeg,image/png,image/webp,image/avif"
                name="image"
                required
                type="file"
              />
              <Button type="submit">Add hero slide</Button>
            </form>
            <div className="mt-5 space-y-3">
              {content.heroSlides.map((item) => (
                <MediaCard
                  active={item.active}
                  entity="hero"
                  id={item.id}
                  image={item.image_url}
                  key={item.id}
                  name={item.title}
                  onChange={load}
                  position={item.position}
                />
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              Partner manager
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950">Trusted companies</h2>
            <p className="mt-2 text-sm text-slate-600">
              Add as many partners as the relationship list grows.
            </p>
            <form className="mt-6 grid gap-3 rounded-2xl bg-slate-50 p-4" onSubmit={upload}>
              <input name="entity" type="hidden" value="partner" />
              <input
                className="rounded-lg border bg-white px-3 py-2"
                name="name"
                placeholder="Company name"
                required
              />
              <input
                className="rounded-lg border bg-white px-3 py-2"
                name="websiteUrl"
                placeholder="Website URL (optional)"
                type="url"
              />
              <input
                accept="image/jpeg,image/png,image/webp,image/avif"
                name="image"
                required
                type="file"
              />
              <Button type="submit">Add partner</Button>
            </form>
            <div className="mt-5 space-y-3">
              {content.partners.map((item) => (
                <MediaCard
                  active={item.active}
                  entity="partner"
                  id={item.id}
                  image={item.logo_url}
                  key={item.id}
                  name={item.name}
                  onChange={load}
                  position={item.position}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
