import Link from 'next/link'

const POSTS = [
  {
    date: { day: '03', month: 'Sep' },
    title: 'Microsoft 365 Mondo Full Version (Premium Download)',
    meta: [
      '6/26/2025 6:26:29 PM | Digital Product MS',
      'Updated: 6/29/2025 12:30:43 PM |',
      'Size: 10GB | Version: 2026-04',
    ],
    accent: 'from-blue-500 to-primary-700',
  },
  {
    date: { day: '02', month: 'Sep' },
    title: 'Indiana Jones and the Great Circle Premium Edition Terabox Created Windows Version',
    meta: [
      'T Terabox',
      'S Single | Team | Enterprise | R Rental |',
      'Created Date: 2026-08-06 16:30:42 (UTC+5:45)',
      'Price: NRs. 350 | Approx 4900/-',
    ],
    accent: 'from-indigo-500 to-primary-700',
  },
  {
    date: { day: '02', month: 'Sep' },
    title: 'Office 2024 Installer ISO Build Updated (Extreme)',
    meta: [
      'Bit (T) | 11.22GB (C) | 23:00:18 UTC Build (R)',
      'Updated: 06:36:59 PM',
      '2 (More) | Pricing: $180 | Off: 5%',
    ],
    accent: 'from-sky-500 to-blue-700',
  },
]

export default function BlogSection() {
  return (
    <section className="py-10 lg:py-14 bg-gradient-to-b from-white via-blue-50/40 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 text-xs font-semibold text-primary-600 tracking-[0.25em] uppercase mb-4">
            <span className="w-10 h-px bg-primary-400" />
            OUR LATEST BLOG
            <span className="w-10 h-px bg-primary-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Latest News From The Blog
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {POSTS.map((p, i) => (
            <article
              key={i}
              className="motion-card group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
            >
              {/* Header colored bar */}
              <div className={`relative h-36 bg-gradient-to-br ${p.accent} overflow-hidden`}>
                <div className="absolute inset-0 opacity-30 mix-blend-overlay">
                  <svg className="w-full h-full" viewBox="0 0 400 200" fill="none">
                    <circle cx="340" cy="40" r="80" stroke="white" strokeWidth="1" opacity="0.3" />
                    <circle cx="80" cy="160" r="70" stroke="white" strokeWidth="1" opacity="0.3" />
                    <rect x="120" y="60" width="120" height="80" rx="12" stroke="white" strokeWidth="1" opacity="0.4" transform="rotate(-8 180 100)" />
                  </svg>
                </div>
                {/* Date badge */}
                <div className="absolute top-4 left-4 bg-white text-slate-900 rounded-xl shadow-lg shadow-black/20 px-3.5 py-2 text-center min-w-[52px]">
                  <div className="text-lg font-extrabold leading-none">{p.date.day}</div>
                  <div className="text-[10px] font-bold text-primary-700 tracking-wider uppercase mt-0.5">
                    {p.date.month}
                  </div>
                </div>
                <h3 className="absolute left-4 right-4 bottom-4 text-white font-extrabold text-base md:text-lg leading-snug drop-shadow-lg">
                  {p.title}
                </h3>
              </div>

              <div className="p-5">
                <ul className="space-y-1.5 mb-4 text-[11px] md:text-xs text-gray-500 leading-relaxed">
                  {p.meta.map((m, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 hover:text-primary-800 transition-colors"
                >
                  Read More
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-md shadow-md transition-colors"
          >
            Read Here
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
