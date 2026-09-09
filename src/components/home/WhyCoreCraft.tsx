import Link from 'next/link'

const WHY_IMG =
  'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Happy%20diverse%20creative%20team%20brainstorming%20around%20table%20in%20modern%20office%2C%20reviewing%20laptop%20designs%20together%2C%20natural%20light%2C%20business%20people%20collaborating%20photorealistic&image_size=landscape_4_3'

const FEATURES = [
  'Innovative Technology Solutions',
  'Expert Development Team',
  'Proven Track Record',
  'Seamless Client Experiences',
  'Reliable Project Delivery',
  'Long Term Technology Partnerships',
]

export default function WhyCoreCraft() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1940] via-[#112a66] to-[#1e3a8a] text-white py-12">
      {/* Hexagon pattern background */}
      <div className="absolute inset-0 opacity-[0.05]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
              <polygon
                points="24.8,22 37.3,29.2 37.3,43.4 24.8,50.6 12.3,43.4 12.3,29.2"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-3 text-xs font-semibold text-blue-200 tracking-[0.25em] uppercase mb-4">
              <span className="w-10 h-px bg-blue-300/60" />
              WHY CORECRAFT TECHNOLOGIES?
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
              Building Future-Ready Digital
              <br /> Solutions
            </h2>
            <p className="text-blue-100/80 mb-8 leading-relaxed max-w-xl">
              At CoreCraft Technologies, we combine Nepalese innovation with global standards to
              create transformative digital experiences. Our team&apos;s expertise spans product
              design, enterprise technology, and modern engineering — ensuring your vision becomes
              a reliable, market-ready digital product.
            </p>

            <div className="grid sm:grid-cols-2 gap-y-3 gap-x-6 mb-10">
              {FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-3 text-sm">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-400/20 border border-green-300/40 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-blue-50">{f}</span>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-white text-primary-900 font-semibold px-6 py-3.5 rounded-md hover:bg-blue-50 shadow-lg transition-all"
            >
              About Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          {/* Right image panel with sidebar tag */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
              <div className="aspect-[5/4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={WHY_IMG}
                  alt="Why CoreCraft team"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Vertical ribbon */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
              <div className="relative bg-blue-500 text-white py-6 px-3 rounded-xl shadow-xl">
                <div
                  className="text-sm font-bold tracking-[0.3em] whitespace-nowrap [writing-mode:vertical-rl] rotate-180"
                >
                  Your Digital Growth Partner
                </div>
                <div className="mt-2 mx-auto w-2 h-2 rounded-full bg-white/60" />
                <svg className="mx-auto mt-1 w-3 h-3 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="absolute -bottom-6 -right-6 bg-blue-400 w-24 h-24 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
