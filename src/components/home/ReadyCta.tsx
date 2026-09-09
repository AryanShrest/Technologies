import Link from 'next/link'

const CTA_IMG =
  'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Smiling%20professional%20young%20businesswoman%20using%20laptop%20computer%20at%20modern%20office%20desk%2C%20positive%20can-do%20attitude%2C%20corporate%20portrait%2C%20bright%20office%20background%2C%20photorealistic&image_size=portrait_4_3'

export default function ReadyCta() {
  return (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden bg-gradient-to-r from-[#0a1940] via-[#13275f] to-[#0a1940] rounded-3xl shadow-2xl shadow-blue-900/20 text-white">
          {/* Background hexagons + blobs */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="ctahex" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
                  <polygon points="24.8,22 37.3,29.2 37.3,43.4 24.8,50.6 12.3,43.4 12.3,29.2" fill="none" stroke="white" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#ctahex)" />
            </svg>
          </div>
          <div className="absolute -top-24 -right-10 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 w-64 h-64 rounded-full bg-primary-500/20 blur-3xl" />

          {/* Blue vertical tag */}
          <div className="absolute right-8 top-6 hidden md:block h-[calc(100%-3rem)] w-10 bg-primary-500/40 rounded-2xl border border-white/10 flex items-center justify-center">
            <div
              className="[writing-mode:vertical-rl] rotate-180 text-xs font-bold tracking-[0.4em] text-white/90 whitespace-nowrap"
            >
              CALL US
            </div>
          </div>

          <div className="relative grid lg:grid-cols-2 items-stretch gap-8 p-8 md:p-12 lg:p-14">
            {/* Left content + image */}
            <div className="flex gap-6 md:gap-8 items-center">
              <div className="hidden md:flex flex-col items-center justify-center w-28 h-28 rounded-2xl bg-primary-500/20 border border-primary-300/30 text-white flex-shrink-0 relative">
                <svg className="w-12 h-12 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              </div>
              <div className="flex-1 space-y-4 max-w-md">
                <h3 className="text-2xl md:text-3xl font-extrabold leading-tight">
                  Ready to Transform Your Business with Technology?
                </h3>
                <p className="text-blue-100/90 text-sm md:text-base leading-relaxed">
                  CoreCraft Technologies helps turn your ideas into powerful digital solutions that
                  streamline operations, boost revenue and accelerate growth. Schedule a Free
                  Consultation — let&apos;s build something exceptional together.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white text-primary-900 font-semibold px-6 py-3 rounded-md hover:bg-blue-50 shadow-lg transition-all"
                  >
                    Get a Free Consultation
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right image */}
            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary-400/30 via-primary-500/10 to-transparent rounded-3xl" />
              <div className="relative h-full">
                <div className="relative h-[340px] w-[90%] ml-auto rounded-3xl overflow-hidden shadow-2xl shadow-black/30 border-4 border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={CTA_IMG}
                    alt="Let's build"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1940]/40 via-transparent" />
                </div>
                {/* Decorative bars top right */}
                <div className="absolute -top-3 right-8 w-24 h-1 bg-white/30 rounded-full" />
                <div className="absolute -top-7 right-12 w-16 h-1 bg-white/20 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
