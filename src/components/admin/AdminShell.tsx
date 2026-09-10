'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type { ReactNode } from 'react'

import { createBrowserSupabaseClient } from '@/lib/supabase/browser'

const navigation = [
  { href: '/admin', icon: '⌂', label: 'Overview' },
  { href: '/admin/homepage', icon: '▧', label: 'Homepage' },
  { href: '/admin/services', icon: '◇', label: 'Services' },
  { href: '/admin/pricing', icon: '₨', label: 'Pricing' },
  { href: '/admin/inquiries', icon: '✉', label: 'Inquiries' },
]

export function AdminShell({
  children,
  email,
  title,
}: { children: ReactNode; email: string; title: string }) {
  const pathname = usePathname()
  const router = useRouter()
  async function logout() {
    await createBrowserSupabaseClient().auth.signOut()
    router.replace('/admin/login')
    router.refresh()
  }
  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-700 lg:grid lg:grid-cols-[16rem_1fr]">
      <aside className="border-b border-slate-200 bg-white lg:fixed lg:inset-y-0 lg:w-64 lg:border-b-0 lg:border-r">
        <div className="flex h-20 items-center border-b border-slate-100 px-6">
          <img
            alt="CoreCraft Technologies"
            className="h-11 w-auto object-contain"
            src="/images/corecraft logo/Screenshot 2026-09-08 141243.png"
          />
        </div>
        <nav
          aria-label="Admin navigation"
          className="flex gap-2 overflow-x-auto p-3 lg:block lg:space-y-1 lg:p-4"
        >
          {navigation.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                aria-current={active ? 'page' : undefined}
                className={`flex min-w-fit items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${active ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'}`}
                href={item.href}
                key={item.href}
              >
                <span aria-hidden="true" className="grid size-6 place-items-center">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="hidden border-t border-slate-100 p-4 lg:absolute lg:inset-x-0 lg:bottom-0 lg:block">
          <p className="truncate px-3 text-xs text-slate-500">{email}</p>
          <button
            className="mt-2 w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100"
            onClick={logout}
            type="button"
          >
            Sign out
          </button>
        </div>
      </aside>
      <div className="lg:col-start-2">
        <header className="flex min-h-20 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
          <div>
            <p className="text-xs text-slate-400">
              Admin / <span className="text-slate-600">{title}</span>
            </p>
            <h1 className="mt-1 text-xl font-extrabold text-slate-950">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-emerald-50 font-bold text-emerald-700">
              {email[0]?.toUpperCase() || 'A'}
            </span>
            <span className="hidden text-sm font-semibold text-slate-800 sm:block">
              Administrator
            </span>
          </div>
        </header>
        <main className="p-4 sm:p-8" id="primary">
          {children}
        </main>
      </div>
    </div>
  )
}
