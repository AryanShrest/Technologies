import Link from 'next/link'

import { AdminShell } from '@/components/admin/AdminShell'
import { requireAdminPage } from '@/lib/admin'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const user = await requireAdminPage()
  const email = user.email ?? 'Administrator'
  const cards = [
    {
      href: '/admin/homepage',
      label: 'Homepage',
      detail: 'Hero slides and partner logos',
      icon: '▧',
    },
    { href: '/admin/services', label: 'Services', detail: 'Public service catalogue', icon: '◇' },
    {
      href: '/admin/pricing',
      label: 'Pricing',
      detail: 'Engagement plans and features',
      icon: '₨',
    },
    {
      href: '/admin/inquiries',
      label: 'Inquiries',
      detail: 'Leads from the contact form',
      icon: '✉',
    },
  ]
  return (
    <AdminShell email={email} title="Overview">
      <div className="rounded-2xl bg-gradient-to-r from-slate-950 to-blue-950 p-7 text-white shadow-xl sm:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">CoreCraft CMS</p>
        <h2 className="mt-3 text-3xl font-extrabold text-white">Website control centre</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">
          Update public content and manage incoming project inquiries from one secure workspace.
        </p>
      </div>
      <section className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"
            href={card.href}
            key={card.href}
          >
            <span className="grid size-11 place-items-center rounded-xl bg-blue-50 text-xl text-blue-700">
              {card.icon}
            </span>
            <h3 className="mt-5 text-lg font-extrabold text-slate-950 group-hover:text-blue-700">
              {card.label}
            </h3>
            <p className="mt-1 text-sm text-slate-500">{card.detail}</p>
            <span className="mt-5 inline-block text-sm font-bold text-blue-700">
              Open manager →
            </span>
          </Link>
        ))}
      </section>
    </AdminShell>
  )
}
