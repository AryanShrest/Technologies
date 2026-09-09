const INNOVATION_IMG =
  'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Two%20professional%20businessmen%20discussing%20project%20in%20meeting%20room%20with%20laptop%2C%20pointing%20at%20documents%2C%20colorful%20sticky%20notes%20on%20glass%20board%20in%20background%2C%20corporate%20office%20setting%2C%20photorealistic&image_size=landscape_4_3'

const HIGHLIGHTS = [
  'Groundbreaking technology approaches to solve unique problems.',
  'Scalable, future-ready solutions built on industry best practices.',
  'Custom, user-centric solutions for sustainable business growth.',
]

export default function InnovationSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-br from-[#f1f5ff] via-white to-white">
      {/* Background blobs */}
      <div className="absolute top-20 left-0 w-80 h-80 bg-primary-600 rounded-br-[100px] -translate-x-1/2 opacity-90" />
      <div className="absolute top-40 left-8 w-20 h-20 bg-primary-500 rounded-full opacity-80" />
      <div className="absolute top-0 right-0 w-80 h-40 bg-primary-600 rounded-bl-[80px] opacity-90" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left image */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-primary-600 rounded-tl-3xl" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-primary-600 rounded-br-3xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary-200/60">
              <div className="aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={INNOVATION_IMG}
                  alt="Innovation meeting"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right content */}
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 leading-snug">
              <span className="text-primary-600">Innovation Drives</span>
              <br /> Development.
            </h3>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Combining research, technology, and creativity to engineer solutions that push
              boundaries and redefine what&apos;s possible.
            </p>

            <div className="bg-primary-600 text-white rounded-2xl p-6 md:p-8 shadow-xl shadow-primary-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-1/3 translate-x-1/3" />
              <div className="absolute bottom-0 right-16 w-20 h-20 rounded-full border-4 border-white/10" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full border-4 border-white/10" />

              <div className="relative space-y-4">
                {HIGHLIGHTS.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-white/15 border border-white/30 flex items-center justify-center">
                      <span className="text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <p className="text-sm md:text-base text-white/95 leading-relaxed">{h}</p>
                  </div>
                ))}
              </div>

              {/* Testimonial users */}
              <div className="relative mt-8 pt-6 border-t border-white/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-primary-600"
                        style={{
                          background: `linear-gradient(135deg, hsl(${200 + i * 25}, 70%, 60%), hsl(${220 + i * 20}, 80%, 45%))`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold">Trusted by 3,500+ entrepreneurs</div>
                    <div className="text-white/70">for reliable technology solutions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
