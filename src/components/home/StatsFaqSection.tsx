'use client'

import { useState } from 'react'
import { cn } from '@/utils/format'

const STATS = [
  {
    value: '100%',
    label: 'Client Commitment',
    color: 'from-blue-500 to-primary-700',
    ring: 'ring-blue-400/30',
  },
  {
    value: '26k+',
    label: 'Projects Completed',
    color: 'from-indigo-500 to-primary-600',
    ring: 'ring-indigo-400/30',
  },
  {
    value: '34k+',
    label: 'Customers Support',
    color: 'from-sky-500 to-blue-700',
    ring: 'ring-sky-400/30',
  },
]

const TEAM_IMG =
  'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Diverse%20office%20team%20celebrating%20milestone%2C%20business%20people%20high-five%20modern%20workplace%20joyful%20corporate%20culture%20photorealistic&image_size=square'

const FAQS = [
  {
    q: 'What makes CoreCraft Technologies different?',
    a: 'We combine deep technical expertise with startup-level agility. Every project is led by senior engineers, with clear communication, transparent milestones, and long-term support built into every engagement.',
  },
  {
    q: 'What Services Do We Offer?',
    a: 'We specialize in website development, custom software, mobile apps, UI/UX design, digital marketing, SEO, cloud hosting, and enterprise solutions spanning ideation, design, engineering and support.',
  },
  {
    q: 'How Do We Work With Clients?',
    a: 'Following a proven 4-step process: Discover → Plan → Develop → Deliver. You get weekly updates, direct access to your project team, and full visibility into progress using modern collaboration tools.',
  },
  {
    q: 'Why Partner With CoreCraft?',
    a: 'Over 26,000 projects delivered, 34k+ happy clients, 99.6% client satisfaction, dedicated account managers, competitive pricing, flexible engagement models and a 24/7 support desk.',
  },
  {
    q: 'Our Commitment',
    a: 'We commit to on-time delivery, secure and scalable code, fair pricing, and honest communication. If we don\'t deliver on what we promise, we make it right — period.',
  },
]

export default function StatsFaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(1)

  return (
    <section className="py-10 lg:py-14 bg-gradient-to-b from-white via-blue-50/40 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Stats + Team */}
          <div className="relative">
            {/* Stats badges cluster */}
            <div className="relative h-[480px]">
              {/* Center photo */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 md:w-72 md:h-72 rounded-full overflow-hidden shadow-2xl shadow-blue-200 ring-8 ring-white z-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={TEAM_IMG}
                  alt="CoreCraft team"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 100% - top left */}
              <div className="absolute top-4 left-0 md:left-8 flex items-center gap-3 bg-white rounded-2xl shadow-xl shadow-blue-100 px-5 py-4 z-20">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-primary-700 ring-8 ring-blue-400/20 flex items-center justify-center text-white font-extrabold text-lg shadow-lg">
                  100%
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Client</div>
                  <div className="text-sm font-bold text-slate-900">Commitment</div>
                </div>
              </div>

              {/* 26k+ - bottom right */}
              <div className="absolute bottom-16 right-0 md:right-4 flex items-center gap-3 bg-white rounded-2xl shadow-xl shadow-blue-100 px-5 py-4 z-20">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-primary-600 ring-8 ring-indigo-400/20 flex items-center justify-center text-white font-extrabold text-lg shadow-lg">
                  26k+
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Projects</div>
                  <div className="text-sm font-bold text-slate-900">Completed</div>
                </div>
              </div>

              {/* 34k+ - bottom left */}
              <div className="absolute bottom-2 left-0 md:left-6 flex items-center gap-3 bg-white rounded-2xl shadow-xl shadow-blue-100 px-5 py-4 z-20">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-500 to-blue-700 ring-8 ring-sky-400/20 flex items-center justify-center text-white font-extrabold text-lg shadow-lg">
                  34k+
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Customers</div>
                  <div className="text-sm font-bold text-slate-900">Support</div>
                </div>
              </div>

              {/* Dashed curve connectors (decoration) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500" fill="none">
                <path d="M120 100 Q 220 180 260 240" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 6" />
                <path d="M400 360 Q 320 300 260 240" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 6" />
                <path d="M120 420 Q 180 320 260 240" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="4 6" />
              </svg>
            </div>

            {/* Quick contact card */}
            <div className="mt-6 relative bg-slate-900 text-white rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/20 p-6 md:p-7">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-primary-500/20 blur-3xl -translate-y-1/3 translate-x-1/3" />
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="whyhex" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(1.3)">
                      <polygon points="24.8,22 37.3,29.2 37.3,43.4 24.8,50.6 12.3,43.4 12.3,29.2" fill="none" stroke="white" strokeWidth="0.6" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#whyhex)" />
                </svg>
              </div>

              <div className="relative flex flex-col md:flex-row gap-5 items-start md:items-center">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary-500/20 border border-primary-400/30 flex items-center justify-center">
                  <svg className="w-7 h-7 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold">Let&apos;s Build Something Great</h4>
                  <p className="text-sm text-slate-300 mt-1">
                    GET IN TOUCH WITH OUR EXPERTS
                  </p>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-xs text-slate-300">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      +977 9804567890
                    </span>
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      info@corecraftnepal.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: FAQ */}
          <div>
            <h3 className="text-xs font-semibold text-primary-600 tracking-[0.25em] uppercase mb-3">
              FAQ
            </h3>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {FAQS.map((faq, i) => {
                const open = openIdx === i
                return (
                  <div
                    key={i}
                    className={cn(
                      'rounded-xl border transition-all duration-200 overflow-hidden',
                      open
                        ? 'bg-primary-600 text-white border-primary-600 shadow-xl shadow-primary-200'
                        : 'bg-white text-slate-900 border-gray-200 hover:border-primary-200',
                    )}
                  >
                    <button
                      onClick={() => setOpenIdx(open ? null : i)}
                      className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-semibold text-sm md:text-base"
                    >
                      <span
                        className={cn(
                          'pr-3',
                          !open && 'text-slate-800',
                        )}
                      >
                        {faq.q}
                      </span>
                      <span
                        className={cn(
                          'flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all',
                          open
                            ? 'bg-white/20 text-white'
                            : 'bg-gray-100 text-primary-700',
                        )}
                      >
                        <svg
                          className={cn('w-4 h-4 transition-transform', open && 'rotate-45')}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                      </span>
                    </button>
                    <div
                      className={cn(
                        'grid transition-all duration-300 ease-out',
                        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                      )}
                    >
                      <div className="overflow-hidden">
                        <p
                          className={cn(
                            'px-5 pb-5 text-sm md:text-[15px] leading-relaxed',
                            open ? 'text-white/90' : 'text-gray-500',
                          )}
                        >
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
