import Link from 'next/link'

const COMMIT_IMG =
  'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Two%20young%20software%20engineers%20man%20and%20woman%20working%20together%20on%20couch%20at%20modern%20startup%20office%20reviewing%20code%20on%20laptop%2C%20casual%20startup%20vibe%2C%20photorealistic%20warm%20tones&image_size=landscape_4_3'
const BG_IMG =
  'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Abstract%20dark%20blue%20team%20silhouette%20tech%20conference%20presentation%20business%20meeting%20audience%2C%20dark%20background%20blue%20lighting%20haze&image_size=landscape_16_9'

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
    desc: 'Professional and high-quality websites that drive conversions and build your brand\'s digital identity.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
    ),
  },
  {
    num: '02',
    title: 'Software Development',
    desc: 'Custom solutions built around your workflows — automating operations, supporting growth, empowering teams.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    ),
  },
  {
    num: '03',
    title: 'Technology Consulting',
    desc: 'Expert technology strategy, roadmapping and audits — align your tech investments for sustainable growth.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
    ),
  },
]

export default function CommitmentSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white py-12">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${BG_IMG})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950" />

      {/* Decorative shapes */}
      <div className="hidden lg:block absolute left-0 top-24 w-40 h-40 rounded-full border-4 border-primary-500/60 -translate-x-1/3" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header + Image */}
        <div className="grid lg:grid-cols-5 gap-14 items-center mb-24">
          {/* Left image */}
          <div className="lg:col-span-2 relative">
            <div className="absolute -inset-4">
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-primary-500 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-primary-500 rounded-br-2xl" />
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
              <div className="aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={COMMIT_IMG}
                  alt="Commitment team"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-3 text-xs font-semibold text-blue-300 tracking-[0.25em] uppercase mb-4">
              <span className="w-10 h-px bg-blue-400/60" />
              OUR COMMITMENT
              <span className="w-10 h-px bg-blue-400/60" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold tracking-tight leading-tight mb-5">
              Delivering Technology Solutions That Drive{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500">
                Business Growth
              </span>
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
              At CoreCraft Technologies, we are passionate about helping businesses succeed
              through technology. Utilizing modern tools, industry best practices, and a proven
              delivery process, our team builds solutions that exceed expectations.
            </p>

            {/* Why choose us dark card */}
            <div className="relative bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 md:p-7 overflow-hidden">
              <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-primary-500/20 blur-2xl" />
              <div className="relative flex flex-col md:flex-row gap-6 md:items-start">
                <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl bg-primary-500/20 border border-primary-400/30 flex items-center justify-center text-primary-300">
                  <svg className="w-9 h-9 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                  <div className="absolute -bottom-2 -right-2 text-xs font-bold text-white/70 bg-white/10 backdrop-blur px-2 py-0.5 rounded-lg border border-white/10">
                    26,341 BUILDINGS FOR NEPAL BUSINESSES
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg md:text-xl font-bold mb-3">Why Businesses Choose Us</h4>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {CHOOSE_POINTS.map((p) => (
                      <div key={p} className="flex items-center gap-2 text-sm text-slate-200">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary-400" />
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Offerings row */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {OFFERINGS.map((o, i) => (
            <div
              key={o.title}
              className={cn(
                'relative bg-white rounded-2xl p-7 text-slate-900 shadow-2xl shadow-black/30',
                i === 1 ? 'md:-mt-10 md:mb-10' : '',
              )}
            >
              <div className="text-[11px] font-bold text-primary-600 tracking-widest mb-4">
                {o.num}
              </div>
              <div className="w-14 h-14 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center mb-5">
                {o.icon}
              </div>
              <h4 className="text-lg font-bold mb-2">{o.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{o.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <div className="relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-20 bg-primary-500/30 blur-2xl rounded-full" />
          <div className="relative bg-gradient-to-r from-primary-600 to-blue-500 rounded-2xl shadow-2xl shadow-primary-900/40 overflow-hidden">
            <div className="absolute right-0 top-0 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
            <div className="relative flex flex-col md:flex-row items-center gap-6 px-7 md:px-10 py-7 md:py-8">
              <div className="flex items-center gap-5 flex-1">
                <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center">
                  <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-extrabold">Let&apos;s Discuss Your Next Project</h4>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 mt-1 text-sm text-blue-100">
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
              </div>
            </div>
            {/* Arrow pointer */}
            <div className="hidden md:block absolute right-16 top-1/2 -translate-y-1/2 translate-x-full">
              <div className="w-0 h-0 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent border-l-[20px] border-l-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function cn(...classes: Array<string | boolean | undefined | null>): string {
  return classes.filter(Boolean).join(' ')
}
