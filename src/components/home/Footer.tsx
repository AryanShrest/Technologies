'use client'

import Link from 'next/link'
import type { FormEvent } from 'react'
import { useState } from 'react'

const SERVICES = [
  { label: 'Website Development', href: '/services' },
  { label: 'Mobile App Development', href: '/services' },
  { label: 'Digital Marketing', href: '/services' },
  { label: 'UI / UX & Graphic Design', href: '/services' },
  { label: 'Software Development', href: '/services' },
  { label: 'Cloud & Hosting', href: '/services' },
]

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
]

const SOCIALS = [
  { label: 'Facebook', href: '#', icon: 'M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0022 12z' },
  { label: 'Instagram', href: '#', icon: 'M12 2.2c3.2 0 3.584.012 4.849.07 1.17.054 1.805.248 2.227.414.56.217.96.477 1.38.896.42.42.68.82.896 1.38.166.422.36 1.057.414 2.227.058 1.265.07 1.648.07 4.849 0 3.2-.012 3.584-.07 4.849-.054 1.17-.248 1.805-.414 2.227a3.72 3.72 0 01-.896 1.38 3.72 3.72 0 01-1.38.896c-.422.166-1.057.36-2.227.414-1.265.058-1.648.07-4.849.07-3.2 0-3.584-.012-4.849-.07-1.17-.054-1.805-.248-2.227-.414a3.72 3.72 0 01-1.38-.896 3.72 3.72 0 01-.896-1.38c-.166-.422-.36-1.057-.414-2.227C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.849c.054-1.17.248-1.805.414-2.227.217-.56.477-.96.896-1.38a3.72 3.72 0 011.38-.896c.422-.166 1.057-.36 2.227-.414C8.416 2.212 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.518.012-4.765.068-1.016.047-1.567.215-1.937.358-.47.182-.807.398-1.17.762-.364.363-.58.7-.762 1.17-.143.37-.31.92-.358 1.937C2.812 8.482 2.8 8.85 2.8 12s.012 3.518.068 4.765c.047 1.016.215 1.567.358 1.937.182.47.398.807.762 1.17.363.364.7.58 1.17.762.37.143.92.31 1.937.358 1.247.056 1.615.068 4.765.068s3.518-.012 4.765-.068c1.016-.047 1.567-.215 1.937-.358a3.06 3.06 0 001.17-.762 3.06 3.06 0 00.762-1.17c.143-.37.31-.92.358-1.937.056-1.247.068-1.615.068-4.765s-.012-3.518-.068-4.765c-.047-1.016-.215-1.567-.358-1.937a3.06 3.06 0 00-.762-1.17 3.06 3.06 0 00-1.17-.762c-.37-.143-.92-.31-1.937-.358C15.518 4.012 15.15 4 12 4zm0 3.07a4.93 4.93 0 110 9.86 4.93 4.93 0 010-9.86zm0 1.8a3.13 3.13 0 100 6.26 3.13 3.13 0 000-6.26zm5.125-2.285a1.155 1.155 0 110 2.31 1.155 1.155 0 010-2.31z' },
  { label: 'LinkedIn', href: '#', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { label: 'YouTube', href: '#', icon: 'M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.4 31.4 0 000 12a31.4 31.4 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.4 31.4 0 0024 12a31.4 31.4 0 00-.5-5.8zM9.75 15.6v-7.2l6.3 3.6-6.3 3.6z' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e: FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <footer className="bg-slate-900 text-white">

      {/* ── Newsletter strip ── */}
      <div className="bg-indigo-600">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-1">Stay in the loop</p>
              <h3 className="text-lg font-extrabold text-white">Get our latest updates & insights</h3>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="h-11 flex-1 md:w-64 rounded-xl bg-white/15 border border-white/20 text-white placeholder:text-indigo-200 text-sm px-4 focus:outline-none focus:bg-white/25 transition"
              />
              <button
                type="submit"
                className="h-11 px-5 rounded-xl bg-white text-indigo-700 text-sm font-bold hover:bg-indigo-50 transition whitespace-nowrap"
              >
                {subscribed ? '✓ Done!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-sm">
                CC
              </div>
              <div>
                <div className="font-extrabold text-white text-lg leading-tight">CoreCraft</div>
                <div className="text-[10px] text-indigo-400 tracking-widest uppercase">Technologies</div>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Nepal&apos;s trusted digital growth partner — building websites, apps and software that help businesses scale.
            </p>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 flex-shrink-0 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +977 9804567890
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 flex-shrink-0 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                info@corecraftnepal.com
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 flex-shrink-0 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                10:00 AM – 6:00 PM, Sat – Fri
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-500 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d={s.icon} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-5">Services</h4>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors">
                    <svg className="w-3 h-3 flex-shrink-0 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors">
                    <svg className="w-3 h-3 flex-shrink-0 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-5">Start a Project</h4>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Have an idea? Let&apos;s turn it into a powerful digital product together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-lg shadow-indigo-900/30 transition-colors"
            >
              Get a Free Quote
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2006–2026 CoreCraft Technologies Nepal. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/about" className="hover:text-indigo-400 transition-colors">About</Link>
            <Link href="/services" className="hover:text-indigo-400 transition-colors">Services</Link>
            <Link href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-indigo-400 transition-colors">Terms</Link>
          </div>
        </div>
      </div>

    </footer>
  )
}
