import Link from 'next/link'
import { Reveal, StaggerGroup } from '@/components/motion'

const WHY_IMG =
  'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Happy%20diverse%20creative%20team%20brainstorming%20around%20table%20in%20modern%20office%2C%20reviewing%20laptop%20designs%20together%2C%20natural%20light%2C%20business%20people%20collaborating%20photorealistic&image_size=landscape_4_3'

const FEATURES = [
  { label: 'Innovative Technology Solutions', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { label: 'Expert Development Team', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { label: 'Proven Track Record', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
  { label: 'Seamless Client Experiences', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { label: 'Reliable Project Delivery', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Long Term Technology Partnerships', icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z' },
]

const STATS = [
  { value: '120+', label: 'Projects Delivered' },
  { value: '45+', label: 'Happy Clients' },
  { value: '6+', label: 'Years Experience' },
]

export default function WhyCoreCraft() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/30 to-white py-16 lg:py-24">
      {/* Decorative blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 size-[30rem] rounded-full bg-indigo-100/70 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-24 size-[24rem] rounded-full bg-indigo-200/40 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left content ── */}
          <Reveal variant="fade-right">
            <span className="inline-block bg-indigo-600 text-white text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded mb-6">
              WHY CORECRAFT TECHNOLOGIES?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-5">
              Building Future-Ready{' '}
              <span className="text-indigo-600">Digital Solutions</span>
            </h2>
            <p className="text-slate-500 leading-relaxed mb-8 max-w-lg">
              At CoreCraft Technologies, we combine Nepalese innovation with global standards to
              create transformative digital experiences — ensuring your vision becomes a reliable,
              market-ready digital product.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 mb-8">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-extrabold text-indigo-600">{s.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Feature grid */}
            <StaggerGroup className="grid sm:grid-cols-2 gap-3 mb-10" interval={80}>
              {FEATURES.map((f) => (
                <div key={f.label} className="flex items-center gap-3 bg-white rounded-xl border border-indigo-100 px-4 py-3 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all duration-200">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={f.icon} />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-slate-700">{f.label}</span>
                </div>
              ))}
            </StaggerGroup>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-colors"
            >
              Work With Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </Reveal>

          {/* ── Right image ── */}
          <Reveal variant="fade-left" delay={150}>
            <div className="relative">
              {/* Corner accents */}
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t-4 border-l-4 border-indigo-500 rounded-tl-2xl z-10" />
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-4 border-r-4 border-indigo-500 rounded-br-2xl z-10" />

              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-200/60">
                <div className="aspect-[5/4]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={WHY_IMG}
                    alt="CoreCraft team collaborating"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/30 via-transparent to-transparent" />
                </div>

                {/* Floating badge */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur rounded-xl px-4 py-3 shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Nepal&apos;s Digital Growth Partner</div>
                    <div className="text-[11px] text-slate-500">Trusted by 45+ businesses across Nepal & beyond</div>
                  </div>
                </div>
              </div>

              {/* Indigo decorative square */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-indigo-100 rounded-2xl -z-10" />
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  )
}
