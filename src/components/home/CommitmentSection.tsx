import { Reveal, StaggerGroup } from '@/components/motion'
import Link from 'next/link'

const COMMIT_IMG =
  'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Two%20young%20software%20engineers%20man%20and%20woman%20working%20together%20on%20couch%20at%20modern%20startup%20office%20reviewing%20code%20on%20laptop%2C%20casual%20startup%20vibe%2C%20photorealistic%20warm%20tones&image_size=landscape_4_3'

const CHOOSE_POINTS = [
  'Expert business solutions',
  'Invested business minds',
  'Quality and innovation',
  'Security and Scalability',
  'Future-ready technology',
  'Strong leadership',
]

const OFFERINGS = [
  {
    num: '01',
    title: 'Business Websites',
    desc: "Professional websites that drive conversions and build your brand's digital identity.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
    ),
  },
  {
    num: '02',
    title: 'Software Development',
    desc: 'Custom solutions built around your workflows — automating operations and supporting growth.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    ),
  },
  {
    num: '03',
    title: 'Technology Consulting',
    desc: 'Expert strategy, roadmapping and audits — align your tech investments for sustainable growth.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
    ),
  },
]

export default function CommitmentSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/40 to-white py-16 lg:py-24">
      {/* Decorative blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 -left-32 size-[36rem] rounded-full bg-indigo-100/60 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-24 size-[28rem] rounded-full bg-indigo-200/40 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ── TOP: eyebrow + heading ── */}
        <Reveal className="text-center mb-16">
          <span className="inline-block bg-indigo-600 text-white text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded mb-5">
            OUR COMMITMENT
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Delivering Technology Solutions That{' '}
            <span className="text-indigo-600">Drive Business Growth</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            We combine modern tools, industry best practices, and a proven delivery process to build
            solutions that exceed expectations.
          </p>
        </Reveal>

        {/* ── MIDDLE: image + why choose us ── */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left image */}
          <Reveal variant="fade-right">
            <div className="relative">
              {/* Corner accents */}
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t-4 border-l-4 border-indigo-500 rounded-tl-2xl" />
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-4 border-r-4 border-indigo-500 rounded-br-2xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-200/60">
                <div className="aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={COMMIT_IMG}
                    alt="CoreCraft team at work"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Overlay badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-xl px-4 py-3 shadow-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">26,000+ Projects Delivered</div>
                    <div className="text-[11px] text-slate-500">Trusted by businesses across Nepal & beyond</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: why choose us */}
          <Reveal variant="fade-left" delay={150}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 mb-3">Why Choose CoreCraft</p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 leading-tight">
              Built for businesses that want to grow with confidence
            </h3>
            <p className="text-slate-500 leading-relaxed mb-8">
              At CoreCraft Technologies, we are passionate about helping businesses succeed through
              technology — from ideation to launch and beyond.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {CHOOSE_POINTS.map((p) => (
                <div key={p} className="flex items-center gap-3 bg-white rounded-xl border border-indigo-100 px-4 py-3 shadow-sm">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-sm font-medium text-slate-700">{p}</span>
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-colors"
            >
              Start a project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </Reveal>
        </div>

        {/* ── BOTTOM: offering cards ── */}
        <StaggerGroup className="grid md:grid-cols-3 gap-6" interval={120}>
          {OFFERINGS.map((o, i) => (
            <div
              key={o.title}
              className={`relative bg-white rounded-2xl p-8 border border-indigo-100 shadow-sm hover:shadow-xl hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300${i === 1 ? ' md:-mt-6 md:mb-6' : ''}`}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-indigo-500 to-indigo-300 rounded-full" />
              <div className="text-[11px] font-black text-indigo-300 tracking-widest mb-4">{o.num}</div>
              <div className="w-14 h-14 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 border border-indigo-100">
                {o.icon}
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">{o.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{o.desc}</p>
            </div>
          ))}
        </StaggerGroup>

        {/* ── CTA bar ── */}
        <Reveal delay={150} className="mt-16">
          <div className="relative bg-indigo-600 rounded-2xl overflow-hidden shadow-2xl shadow-indigo-300/40 px-8 py-8 md:px-12 md:py-10">
            <div aria-hidden="true" className="absolute right-0 top-0 w-64 h-64 rounded-full bg-white/10 blur-3xl -translate-y-1/2 translate-x-1/4" />
            <div aria-hidden="true" className="absolute left-0 bottom-0 w-48 h-48 rounded-full bg-indigo-800/40 blur-2xl translate-y-1/2 -translate-x-1/4" />
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-2">Ready to get started?</p>
                <h4 className="text-2xl md:text-3xl font-extrabold text-white">Let&apos;s Discuss Your Next Project</h4>
                <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3 text-sm text-indigo-200">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    +977 9804567890
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    info@corecraftnepal.com
                  </span>
                </div>
              </div>
              <Link
                href="/contact"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-7 py-4 rounded-xl hover:bg-indigo-50 shadow-xl transition-colors whitespace-nowrap"
              >
                Get a Free Quote
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
