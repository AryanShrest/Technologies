'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/ui'
import { createBrowserSupabaseClient } from '@/lib/supabase/browser'

const statuses = ['new', 'contacted', 'qualified', 'won', 'closed'] as const
type Status = (typeof statuses)[number]

type Inquiry = {
  budget: string | null
  created_at: string
  delivery_status: 'failed' | 'not_configured' | 'pending' | 'sent'
  email: string
  id: string
  inquiry_type: string
  internal_notes: string
  last_contacted_at: string | null
  message: string
  name: string
  status: Status
  updated_at: string
}

const statusStyle: Record<Status, string> = {
  closed: 'bg-slate-100 text-slate-600',
  contacted: 'bg-blue-50 text-blue-700',
  new: 'bg-amber-50 text-amber-700',
  qualified: 'bg-violet-50 text-violet-700',
  won: 'bg-emerald-50 text-emerald-700',
}

function dateTime(value: string) {
  return new Intl.DateTimeFormat('en-NP', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export function InquiryInbox({ email }: { email: string }) {
  const router = useRouter()
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | Status>('all')
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [notes, setNotes] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const response = await fetch('/api/admin/inquiries', { cache: 'no-store' })
    const result = (await response.json()) as { inquiries?: Inquiry[]; message?: string }
    if (!response.ok) setError(result.message || 'Inquiries could not be loaded.')
    else {
      const next = result.inquiries || []
      setInquiries(next)
      setSelectedId((current) => current || next[0]?.id || null)
      setError('')
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const selected = inquiries.find((item) => item.id === selectedId) || null
  useEffect(() => setNotes(selected?.internal_notes || ''), [selected])

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return inquiries.filter(
      (item) =>
        (filter === 'all' || item.status === filter) &&
        (!needle ||
          `${item.name} ${item.email} ${item.inquiry_type} ${item.message}`
            .toLowerCase()
            .includes(needle)),
    )
  }, [filter, inquiries, query])

  const newCount = inquiries.filter((item) => item.status === 'new').length

  async function update(payload: { internalNotes?: string; status?: Status }) {
    if (!selected) return
    setSaving(true)
    const response = await fetch('/api/admin/inquiries', {
      body: JSON.stringify({ id: selected.id, ...payload }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
    })
    const result = (await response.json()) as { inquiry?: Inquiry; message?: string }
    if (!response.ok || !result.inquiry) setError(result.message || 'Update failed.')
    else {
      setInquiries((current) =>
        current.map((item) => (item.id === result.inquiry?.id ? result.inquiry : item)),
      )
      setError('')
    }
    setSaving(false)
  }

  async function logout() {
    await createBrowserSupabaseClient().auth.signOut()
    router.replace('/admin/login')
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 sm:py-8" id="primary">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-3xl bg-slate-950 p-6 text-white shadow-xl sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                CoreCraft lead desk
              </p>
              <h1 className="mt-2 text-3xl font-extrabold">Project inquiries</h1>
              <p className="mt-2 text-sm text-slate-300">
                {newCount} new lead{newCount === 1 ? '' : 's'} · Signed in as {email}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                className="rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold"
                href="/admin"
              >
                Homepage CMS
              </Link>
              <Button onClick={logout} variant="secondary">
                Sign out
              </Button>
            </div>
          </div>
        </header>

        {error && (
          <p className="mt-5 rounded-xl bg-red-50 p-4 text-red-700" role="alert">
            {error}
          </p>
        )}

        <section className="mt-6 grid min-h-[38rem] overflow-hidden rounded-3xl bg-white shadow-sm lg:grid-cols-[23rem_1fr]">
          <aside className="border-b border-slate-200 lg:border-b-0 lg:border-r">
            <div className="space-y-3 border-b border-slate-200 p-4">
              <input
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search name, email, project…"
                type="search"
                value={query}
              />
              <select
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
                onChange={(event) => setFilter(event.target.value as 'all' | Status)}
                value={filter}
              >
                <option value="all">All stages ({inquiries.length})</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status[0].toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="max-h-[34rem] overflow-y-auto">
              {loading && <p className="p-5 text-sm text-slate-500">Loading inquiries…</p>}
              {!loading && visible.length === 0 && (
                <p className="p-5 text-sm text-slate-500">No inquiries match this view.</p>
              )}
              {visible.map((item) => (
                <button
                  className={`w-full border-b border-slate-100 p-4 text-left transition hover:bg-slate-50 ${selectedId === item.id ? 'bg-blue-50/70' : ''}`}
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  type="button"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-bold text-slate-950">{item.name}</p>
                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${statusStyle[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-xs font-semibold text-blue-700">
                    {item.inquiry_type}
                  </p>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                    {item.message}
                  </p>
                  <p className="mt-2 text-[11px] text-slate-400">{dateTime(item.created_at)}</p>
                </button>
              ))}
            </div>
          </aside>

          <div className="p-5 sm:p-8">
            {!selected && (
              <div className="grid h-full place-items-center text-sm text-slate-500">
                Select an inquiry to view it.
              </div>
            )}
            {selected && (
              <article>
                <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                      {selected.inquiry_type}
                    </p>
                    <h2 className="mt-2 text-3xl font-extrabold text-slate-950">{selected.name}</h2>
                    <a
                      className="mt-2 inline-block font-semibold text-blue-700 hover:underline"
                      href={`mailto:${selected.email}`}
                    >
                      {selected.email}
                    </a>
                    <p className="mt-2 text-xs text-slate-500">
                      Received {dateTime(selected.created_at)} · Ref #{selected.id.slice(0, 8)}
                    </p>
                  </div>
                  <select
                    aria-label="Lead status"
                    className={`rounded-xl border-0 px-4 py-3 text-sm font-bold capitalize ${statusStyle[selected.status]}`}
                    disabled={saving}
                    onChange={(event) => void update({ status: event.target.value as Status })}
                    value={selected.status}
                  >
                    {statuses.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <dt className="text-xs font-bold uppercase text-slate-400">Budget</dt>
                    <dd className="mt-2 font-semibold text-slate-900">
                      {selected.budget || 'Not provided'}
                    </dd>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <dt className="text-xs font-bold uppercase text-slate-400">
                      Email notification
                    </dt>
                    <dd className="mt-2 font-semibold capitalize text-slate-900">
                      {selected.delivery_status.replace('_', ' ')}
                    </dd>
                  </div>
                </dl>

                <section className="mt-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">
                    Project brief
                  </h3>
                  <p className="mt-3 whitespace-pre-wrap rounded-2xl border border-slate-200 p-5 leading-7 text-slate-700">
                    {selected.message}
                  </p>
                </section>

                <section className="mt-6">
                  <label
                    className="text-sm font-bold uppercase tracking-widest text-slate-500"
                    htmlFor="lead-notes"
                  >
                    Private team notes
                  </label>
                  <textarea
                    className="mt-3 w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-blue-500"
                    id="lead-notes"
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Add follow-up context, call notes, or next steps…"
                    rows={5}
                    value={notes}
                  />
                  <div className="mt-3 flex flex-wrap gap-3">
                    <Button
                      disabled={saving || notes === selected.internal_notes}
                      onClick={() => void update({ internalNotes: notes })}
                    >
                      {saving ? 'Saving…' : 'Save notes'}
                    </Button>
                    <a
                      className="inline-flex items-center rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700"
                      href={`mailto:${selected.email}?subject=${encodeURIComponent(`Your CoreCraft project inquiry #${selected.id.slice(0, 8)}`)}`}
                    >
                      Reply by email
                    </a>
                  </div>
                </section>
              </article>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
