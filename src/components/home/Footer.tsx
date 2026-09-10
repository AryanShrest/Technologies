'use client'

import Link from 'next/link'
import type { FormEvent } from 'react'
import { useState } from 'react'

const SERVICES_COL = [
  { label: 'Website Development', href: '/services' },
  { label: 'Mobile App Development', href: '/services' },
  { label: 'Digital Marketing', href: '/services' },
  { label: 'UI / UX & Graphic Design', href: '/services' },
  { label: 'Software Development', href: '/services' },
  { label: 'Cloud & Hosting', href: '/services' },
]

const QUICK_COL = [
  { label: 'Home', href: '/' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'FAQ', href: '/#faq' },
]

const SOCIALS = [
  {
    label: 'Facebook',
    href: '#',
    path: 'M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0022 12z',
  },
  {
    label: 'Instagram',
    href: '#',
    path: 'M12 2.2c3.2 0 3.584.012 4.849.07 1.17.054 1.805.248 2.227.414.56.217.96.477 1.38.896.42.42.68.82.896 1.38.166.422.36 1.057.414 2.227.058 1.265.07 1.648.07 4.849 0 3.2-.012 3.584-.07 4.849-.054 1.17-.248 1.805-.414 2.227a3.72 3.72 0 01-.896 1.38 3.72 3.72 0 01-1.38.896c-.422.166-1.057.36-2.227.414-1.265.058-1.648.07-4.849.07-3.2 0-3.584-.012-4.849-.07-1.17-.054-1.805-.248-2.227-.414a3.72 3.72 0 01-1.38-.896 3.72 3.72 0 01-.896-1.38c-.166-.422-.36-1.057-.414-2.227C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.849c.054-1.17.248-1.805.414-2.227.217-.56.477-.96.896-1.38a3.72 3.72 0 011.38-.896c.422-.166 1.057-.36 2.227-.414C8.416 2.212 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.518.012-4.765.068-1.016.047-1.567.215-1.937.358-.47.182-.807.398-1.17.762-.364.363-.58.7-.762 1.17-.143.37-.31.92-.358 1.937C2.812 8.482 2.8 8.85 2.8 12s.012 3.518.068 4.765c.047 1.016.215 1.567.358 1.937.182.47.398.807.762 1.17.363.364.7.58 1.17.762.37.143.92.31 1.937.358 1.247.056 1.615.068 4.765.068s3.518-.012 4.765-.068c1.016-.047 1.567-.215 1.937-.358a3.06 3.06 0 001.17-.762 3.06 3.06 0 00.762-1.17c.143-.37.31-.92.358-1.937.056-1.247.068-1.615.068-4.765s-.012-3.518-.068-4.765c-.047-1.016-.215-1.567-.358-1.937a3.06 3.06 0 00-.762-1.17 3.06 3.06 0 00-1.17-.762c-.37-.143-.92-.31-1.937-.358C15.518 4.012 15.15 4 12 4zm0 3.07a4.93 4.93 0 110 9.86 4.93 4.93 0 010-9.86zm0 1.8a3.13 3.13 0 100 6.26 3.13 3.13 0 000-6.26zm5.125-2.285a1.155 1.155 0 110 2.31 1.155 1.155 0 010-2.31z',
  },
  {
    label: 'YouTube',
    href: '#',
    path: 'M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.4 31.4 0 000 12a31.4 31.4 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.4 31.4 0 0024 12a31.4 31.4 0 00-.5-5.8zM9.75 15.6v-7.2l6.3 3.6-6.3 3.6z',
  },
  {
    label: 'LinkedIn',
    href: '#',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e: FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3500)
  }

  return (
    <footer className="relative overflow-hidden bg-slate-900 text-white">
      {/* Subtle dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #818cf8 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Indigo glow blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute top-0 right-0 w-[32rem] h-[32rem] rounded-full bg-indigo-600/10 blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 w-[24rem] h-[24rem] rounded-full bg-indigo-500/10 blur-3xl translate-y-1/2 -translate-x-1/4" />

      {/* ── Newsletter banner ── */}
      <div className="relative max-w-7xl mx-auto px-6 pt-16">
        <div className="relative overflow-hidden rounded-2xl bg-indigo-600 shadow-2xl shadow-indigo-900/40">
          <div aria-hidden="true" className="absolute right-0 top-0 w-64 h-64 rounded-full bg-white/10 blur-2xl translate-x-1/4 -translate-y-1/2" />
          <div aria-hidden="true" className="absolute left-0 bottom-0 w-48 h-48 rounded-full bg-indigo-800/40 blur-2xl -translate-x-1/4 translate-y-1/2" />
          <div className="relative grid md:grid-cols-5 gap-6 items-center px-8 md:px-12 py-8 md:py-10">
            <div className="md:col-span-2 flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest text-indigo-200 uppercase mb-1">Newsletter</p>
                <h3 className="text-lg md:text-xl font-extrabold leading-tight">Stay updated with our latest news</h3>
              </div>
            </div>
            <form onSubmit={handleSubscribe} className="md:col-span-3 flex gap-2">
              <div className="relative flex-1">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 rounded-xl shadow transition-colors whitespace-nowrap"
              >
                {subscribed ? '✓ Done!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Main columns ── */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand col */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-sm shadow-lg shadow-indigo-900/40">
                CC
              </div>
              <div>
                <div className="font-extrabold text-white text-xl leading-tight">CoreCraft</div>
                <div className="text-[10px] text-indigo-400 leading-tight tracking-widest uppercase">Technologies</div>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Nepal&apos;s trusted digital growth partner — building websites, software, and mobile apps that help businesses scale with confidence.
            </p>

            <div className="space-y-2.5 text-sm text-slate-400">
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 flex-shrink-0 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>10:00 AM – 6:00 PM, Sat – Fri</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 flex-shrink-0 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>+977 9804567890</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 flex-shrink-0 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>info@corecraftnepal.com</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2 pt-1">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-500 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services col */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-400 mb-5">Services</h4>
            <ul className="space-y-3">
              {SERVICES_COL.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
                  >
                    <span className="w-1 h-1 rounded-full bg-indigo-500 group-hover:bg-indigo-400 flex-shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links col */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-400 mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {QUICK_COL.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
                  >
                    <span className="w-1 h-1 rounded-full bg-indigo-500 group-hover:bg-indigo-400 flex-shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA col */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-400 mb-5">Get Started</h4>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Have a project in mind? Let&apos;s talk and turn your idea into reality.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-lg shadow-indigo-900/30 transition-colors"
            >
              Start a Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row gap-3 items-center justify-between">
          <p className="text-xs text-slate-500">© 2006–2026 CoreCraft Technologies Nepal. All rights reserved.</p>
          <div className="flex items-center gap-5 text-xs text-slate-500">
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
