'use client'

import type { FormEvent } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'

type Entity = 'pricing' | 'service'
type Item = {
  active: boolean
  description: string
  id: string
  name?: string
  position: number
  price_label?: string
  slug?: string
  timeline?: string
  title?: string
}

export function CatalogManager({ entity }: { entity: Entity }) {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const title = entity === 'service' ? 'Services' : 'Pricing plans'
  const description =
    entity === 'service'
      ? 'Manage the capabilities shown on the homepage and Services page.'
      : 'Manage the engagement paths shown on the Pricing page.'

  const load = useCallback(async () => {
    setLoading(true)
    const response = await fetch('/api/admin/catalog', { cache: 'no-store' })
    const data = (await response.json()) as {
      message?: string
      pricingPlans?: Item[]
      services?: Item[]
    }
    if (!response.ok) setError(data.message || 'Content could not be loaded.')
    else {
      setItems(entity === 'service' ? data.services || [] : data.pricingPlans || [])
      setError('')
    }
    setLoading(false)
  }, [entity])
  useEffect(() => {
    void load()
  }, [load])

  const visible = useMemo(
    () =>
      items.filter((item) =>
        `${item.title || item.name} ${item.description}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [items, query],
  )

  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form)) as Record<string, string>
    const payload: Record<string, unknown> = { ...values, entity }
    if (entity === 'pricing')
      payload.features = values.features
        .split('\n')
        .map((value) => value.trim())
        .filter(Boolean)
    const response = await fetch('/api/admin/catalog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const result = (await response.json()) as { message?: string }
    if (!response.ok) setError(result.message || 'Content could not be created.')
    else {
      form.reset()
      setError('')
      await load()
    }
    setSaving(false)
  }

  async function update(item: Item, payload: Record<string, unknown>) {
    const response = await fetch('/api/admin/catalog', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entity, id: item.id, ...payload }),
    })
    const result = (await response.json()) as { message?: string }
    if (!response.ok) setError(result.message || 'Update failed.')
    else await load()
  }

  async function remove(item: Item) {
    if (!window.confirm(`Remove ${item.title || item.name}?`)) return
    const response = await fetch(
      `/api/admin/catalog?entity=${entity}&id=${encodeURIComponent(item.id)}`,
      { method: 'DELETE' },
    )
    if (!response.ok) {
      const result = (await response.json()) as { message?: string }
      setError(result.message || 'Remove failed.')
    } else await load()
  }

  return (
    <>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-950">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
        <input
          aria-label={`Search ${title}`}
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 sm:max-w-xs"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search…"
          type="search"
          value={query}
        />
      </div>
      {error && (
        <p
          className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      )}
      <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <form
          className="grid gap-3 border-b border-slate-200 bg-slate-50 p-5 lg:grid-cols-2"
          onSubmit={create}
        >
          {entity === 'service' ? (
            <>
              <input
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
                name="title"
                placeholder="Service title"
                required
              />
              <input
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
                name="slug"
                pattern="[a-z0-9-]+"
                placeholder="service-slug"
                required
              />
              <textarea
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm lg:col-span-2"
                minLength={10}
                name="description"
                placeholder="Service description"
                required
                rows={3}
              />
            </>
          ) : (
            <>
              <input
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
                name="name"
                placeholder="Plan name"
                required
              />
              <select
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
                name="goal"
              >
                <option value="launch">Launch something new</option>
                <option value="grow">Grow what exists</option>
                <option value="transform">Transform operations</option>
              </select>
              <input
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
                name="timeline"
                placeholder="Timeline label"
                required
              />
              <input
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
                defaultValue="Custom proposal"
                name="priceLabel"
                placeholder="Price label"
                required
              />
              <textarea
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
                minLength={10}
                name="description"
                placeholder="Plan description"
                required
                rows={4}
              />
              <textarea
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
                name="features"
                placeholder={'One feature per line\nDiscovery workshop\nDesign and development'}
                required
                rows={4}
              />
            </>
          )}
          <button
            className="w-fit rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-60"
            disabled={saving}
            type="submit"
          >
            + Add {entity === 'service' ? 'service' : 'plan'}
          </button>
        </form>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[42rem] text-left text-sm">
            <thead className="bg-white text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td className="px-6 py-8 text-slate-500" colSpan={4}>
                    Loading content…
                  </td>
                </tr>
              )}
              {!loading && visible.length === 0 && (
                <tr>
                  <td className="px-6 py-8 text-slate-500" colSpan={4}>
                    No content found.
                  </td>
                </tr>
              )}
              {visible.map((item) => (
                <tr className="border-t border-slate-100" key={item.id}>
                  <td className="px-6 py-5 font-bold text-slate-900">
                    {item.title || item.name}
                    <p className="mt-1 text-xs font-normal text-slate-400">
                      {item.slug || item.timeline}
                    </p>
                  </td>
                  <td className="max-w-lg px-6 py-5 text-slate-500">{item.description}</td>
                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${item.active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}
                    >
                      {item.active ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <button
                        className="rounded-lg border px-3 py-2 text-xs font-semibold"
                        onClick={() => void update(item, { active: !item.active })}
                        type="button"
                      >
                        {item.active ? 'Hide' : 'Show'}
                      </button>
                      <button
                        className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700"
                        onClick={() => void remove(item)}
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
