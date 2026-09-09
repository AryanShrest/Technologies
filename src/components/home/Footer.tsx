'use client'

import Link from 'next/link'
import type { FormEvent } from 'react'
import { useState } from 'react'

const NEWS_COL = [
  'MS Office 365',
  'Drive (Email)',
  'Grammarly Premium',
  'Canva Pro (Nation)',
  'Homepage Edit',
  'Microsoft Full Version',
]

const SERVICES_COL = [
  'About Us',
  'Website Dev',
  'Mobile App',
  'Digital Marketing',
  'Graphic Design',
  'Ecommerce',
]

const QUICK_COL = [
  'Homepage',
  'Packages',
  'Contact',
  'Terms',
  'Privacy Policy',
  'FAQ',
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
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#0a1638] via-[#0a1940] to-[#07102d] text-white">
      {/* Background blobs + pattern */}
      <div className="absolute inset-0 opacity-[0.08]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footerhex" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(1.3)">
              <polygon points="24.8,22 37.3,29.2 37.3,43.4 24.8,50.6 12.3,43.4 12.3,29.2" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footerhex)" />
        </svg>
      </div>
      <div className="absolute top-40 right-20 w-60 h-60 rounded-full bg-primary-500/15 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-60 h-60 rounded-full border-[30px] border-primary-400/10" />

      {/* Newsletter banner */}
      <div className="relative max-w-7xl mx-auto px-6 pt-20">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 via-blue-600 to-primary-700 shadow-2xl shadow-primary-900/40">
          <div className="absolute right-0 top-0 w-60 h-60 rounded-full bg-white/10 blur-2xl translate-x-1/4 -translate-y-1/3" />
          <div className="relative grid md:grid-cols-5 gap-6 items-center px-6 md:px-10 py-7 md:py-9">
            <div className="md:col-span-2 flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <div className="text-xs font-semibold tracking-widest text-blue-100 uppercase mb-0.5">
                  Our Newsletter
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold leading-tight">
                  Subscribe our newsletter now to get latest updates
                </h3>
              </div>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="md:col-span-3 flex w-full items-stretch gap-2 md:gap-3"
            >
              <div className="flex-1 relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-200/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full h-12 pl-11 pr-4 rounded-lg bg-white/95 text-slate-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/60"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white text-sm font-semibold px-5 md:px-6 rounded-lg shadow-md transition-colors whitespace-nowrap"
              >
                Subscribe
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
              {subscribed && (
                <span className="hidden md:flex absolute right-40 md:right-60 top-16 items-center gap-2 text-xs text-green-300">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Subscribed!
                </span>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Main footer links */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur border border-white/15 flex items-center justify-center text-white font-bold">
                CC
              </div>
              <div>
                <div className="font-extrabold text-white text-xl leading-tight">CoreCraft</div>
                <div className="text-[10px] text-blue-300 leading-tight tracking-widest uppercase">
                  Technologies
                </div>
              </div>
            </Link>

            <div className="space-y-2.5 text-sm text-blue-100/90 max-w-sm">
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>10:00 AM - 6:00 PM / Sat - Fri</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>Support: 980-0000000</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>info@corecraftnepal.com</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2.5 pt-1">
              {[
                { label: 'Facebook', path: 'M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0022 12z' },
                { label: 'X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                { label: 'Instagram', path: 'M12 2.2c3.2 0 3.584.012 4.849.07 1.17.054 1.805.248 2.227.414.56.217.96.477 1.38.896.42.42.68.82.896 1.38.166.422.36 1.057.414 2.227.058 1.265.07 1.648.07 4.849 0 3.2-.012 3.584-.07 4.849-.054 1.17-.248 1.805-.414 2.227a3.72 3.72 0 01-.896 1.38 3.72 3.72 0 01-1.38.896c-.422.166-1.057.36-2.227.414-1.265.058-1.648.07-4.849.07-3.2 0-3.584-.012-4.849-.07-1.17-.054-1.805-.248-2.227-.414a3.72 3.72 0 01-1.38-.896 3.72 3.72 0 01-.896-1.38c-.166-.422-.36-1.057-.414-2.227C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.849c.054-1.17.248-1.805.414-2.227.217-.56.477-.96.896-1.38a3.72 3.72 0 011.38-.896c.422-.166 1.057-.36 2.227-.414C8.416 2.212 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.518.012-4.765.068-1.016.047-1.567.215-1.937.358-.47.182-.807.398-1.17.762-.364.363-.58.7-.762 1.17-.143.37-.31.92-.358 1.937C2.812 8.482 2.8 8.85 2.8 12s.012 3.518.068 4.765c.047 1.016.215 1.567.358 1.937.182.47.398.807.762 1.17.363.364.7.58 1.17.762.37.143.92.31 1.937.358 1.247.056 1.615.068 4.765.068s3.518-.012 4.765-.068c1.016-.047 1.567-.215 1.937-.358a3.06 3.06 0 001.17-.762 3.06 3.06 0 00.762-1.17c.143-.37.31-.92.358-1.937.056-1.247.068-1.615.068-4.765s-.012-3.518-.068-4.765c-.047-1.016-.215-1.567-.358-1.937a3.06 3.06 0 00-.762-1.17 3.06 3.06 0 00-1.17-.762c-.37-.143-.92-.31-1.937-.358C15.518 4.012 15.15 4 12 4zm0 3.07a4.93 4.93 0 110 9.86 4.93 4.93 0 010-9.86zm0 1.8a3.13 3.13 0 100 6.26 3.13 3.13 0 000-6.26zm5.125-2.285a1.155 1.155 0 110 2.31 1.155 1.155 0 010-2.31z' },
                { label: 'YouTube', path: 'M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.4 31.4 0 000 12a31.4 31.4 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.4 31.4 0 0024 12a31.4 31.4 0 00-.5-5.8zM9.75 15.6v-7.2l6.3 3.6-6.3 3.6z' },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary-500/80 border border-white/10 hover:border-primary-400 flex items-center justify-center text-white/80 hover:text-white transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* News */}
          <div>
            <h4 className="text-sm font-bold tracking-wider uppercase text-white mb-5">News</h4>
            <ul className="space-y-3 text-sm">
              {NEWS_COL.map((l) => (
                <li key={l}>
                  <Link href="/blog" className="text-blue-100/80 hover:text-white transition-colors">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold tracking-wider uppercase text-white mb-5">Services</h4>
            <ul className="space-y-3 text-sm">
              {SERVICES_COL.map((l) => (
                <li key={l}>
                  <Link href="/services" className="text-blue-100/80 hover:text-white transition-colors">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold tracking-wider uppercase text-white mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {QUICK_COL.map((l) => (
                <li key={l}>
                  <Link href="/" className="text-blue-100/80 hover:text-white transition-colors">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-blue-200/70">
          <div>© Copyright 2006-2026 CoreCraft Nepal. All Rights Reserved.</div>
          <div className="flex items-center gap-5">
            <Link href="/about" className="hover:text-white">About Us</Link>
            <Link href="/services" className="hover:text-white">Services</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
