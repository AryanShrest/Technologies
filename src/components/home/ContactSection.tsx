'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'

const CONTACT_IMG =
  'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Professional%20friendly%20customer%20support%20agent%20man%20wearing%20headset%20sitting%20at%20desk%20with%20laptop%20taking%20notes%2C%20modern%20office%20bookshelf%20background%2C%20photorealistic%20corporate%20portrait&image_size=portrait_4_3'

const SUPPORT_IMG =
  'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Professional%20young%20blonde%20businesswoman%20in%20suit%20leaning%20on%20blank%20sign%20board%20pointing%20with%20finger%2C%20isolated%20white%20background%20cutout%2C%20photorealistic%20corporate&image_size=portrait_4_3'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section className="py-10 lg:py-14 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative bg-gradient-to-br from-[#13275f] via-[#1e3a8a] to-[#172554] rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/30 text-white">
          {/* Decorative shapes */}
          <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-blue-400/10 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-primary-400/10 translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-8 right-1/3 w-32 h-32 rounded-full border-4 border-white/5" />
          <div className="absolute bottom-10 left-1/4 w-20 h-20 rounded-full border-4 border-white/5" />

          <div className="relative grid lg:grid-cols-2 items-stretch gap-8 lg:gap-0">
            {/* Left: Intro + image */}
            <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-3 text-xs font-semibold text-blue-200 tracking-[0.25em] uppercase mb-4">
                  <span className="w-10 h-px bg-blue-300/60" />
                  GET IN TOUCH
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-[1.1] mb-5">
                  Let&apos;s Build Something{' '}
                  <span className="relative inline-block">
                    Great
                    <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 160 8" preserveAspectRatio="none">
                      <path d="M2 6 Q 40 0 80 4 T 158 3" stroke="#60a5fa" strokeWidth="3" fill="none" strokeLinecap="round" />
                    </svg>
                  </span>{' '}
                  Together
                </h2>
                <p className="text-blue-100/90 leading-relaxed max-w-md mb-10">
                  At CoreCraft Technologies, we transform ideas into powerful digital solutions —
                  combining excellent software, mobile apps, web services, and IT consulting.
                  Share your project below and let&apos;s make it a reality.
                </p>

                {/* Stat highlights */}
                <div className="flex flex-wrap gap-6 mb-10">
                  {[
                    ['10+', 'Years Experience'],
                    ['26K+', 'Projects Done'],
                    ['99%', 'Happy Clients'],
                  ].map(([n, l]) => (
                    <div key={l}>
                      <div className="text-2xl md:text-3xl font-extrabold">{n}</div>
                      <div className="text-xs text-blue-200 tracking-wide uppercase">{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom photo */}
              <div className="relative -mx-8 md:-mx-12 lg:-mx-14 mt-4">
                <div className="relative rounded-b-3xl overflow-hidden">
                  <div className="aspect-[16/9] lg:aspect-[16/8]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={CONTACT_IMG}
                      alt="Support agent"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13275f] via-[#13275f]/10 to-transparent" />
                  {/* Blue accent bars bottom-left */}
                  <div className="absolute left-0 bottom-0 w-20 h-1.5 bg-primary-500 rounded-tr-2xl" />
                  <div className="absolute left-0 bottom-3 w-14 h-1.5 bg-primary-400/80 rounded-tr-2xl" />
                  <div className="absolute left-0 bottom-6 w-10 h-1.5 bg-primary-300/70 rounded-tr-2xl" />
                </div>
              </div>
            </div>

            {/* Right: Form + support image overlay */}
            <div className="relative p-8 md:p-12 lg:p-14 flex items-center">
              {/* Pointing woman cutout */}
              <div className="hidden lg:block absolute -top-16 -right-6 z-10 w-56 pointer-events-none">
                <div className="aspect-[3/4] drop-shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={SUPPORT_IMG}
                    alt="Pointing"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="relative w-full space-y-4 z-0"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-blue-100 mb-1.5 tracking-wide uppercase">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Full name"
                      className="w-full rounded-lg bg-white/10 backdrop-blur border border-white/15 text-white placeholder:text-white/40 text-sm px-4 py-3 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-300/30 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-blue-100 mb-1.5 tracking-wide uppercase">
                      Email address
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@company.com"
                      className="w-full rounded-lg bg-white/10 backdrop-blur border border-white/15 text-white placeholder:text-white/40 text-sm px-4 py-3 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-300/30 transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-blue-100 mb-1.5 tracking-wide uppercase">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your project..."
                    className="w-full rounded-lg bg-white/10 backdrop-blur border border-white/15 text-white placeholder:text-white/40 text-sm px-4 py-3 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-300/30 transition resize-none"
                  />
                </div>
                <div className="pt-2 flex items-center gap-4">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-white text-primary-900 font-semibold px-7 py-3.5 rounded-md hover:bg-blue-50 shadow-xl shadow-black/20 transition-all"
                  >
                    Send Request
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  </button>
                  {sent && (
                    <span className="inline-flex items-center gap-2 text-sm text-green-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Message sent!
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
