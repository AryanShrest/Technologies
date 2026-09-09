import { fallbackHomeContent } from '@/content/home-content'
import type { PartnerMedia } from '@/types/home-content'

function MarqueeRow({
  logos,
  direction,
}: { logos: readonly PartnerMedia[]; direction: 'left' | 'right' }) {
  // Duplicate for seamless loop
  const items = [...logos, ...logos, ...logos]
  return (
    <div className="relative flex overflow-hidden">
      <div
        className={`flex gap-10 items-center ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
        style={{ width: 'max-content' }}
      >
        {items.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="flex-shrink-0 flex items-center justify-center h-14 w-36 sm:h-16 sm:w-40 lg:h-20 lg:w-48"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.logoUrl}
              alt={logo.name}
              className="max-h-full max-w-full object-contain opacity-100 hover:opacity-100 transition-opacity duration-300"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ClientsSection({
  partners = fallbackHomeContent.partners,
}: { partners?: PartnerMedia[] }) {
  const midpoint = Math.max(1, Math.ceil(partners.length / 2))
  const firstRow = partners.slice(0, midpoint)
  const secondRow = partners.slice(midpoint)
  return (
    <section
      className="py-10 lg:py-14 overflow-hidden"
      style={{ background: '#ffffff', borderRadius: '2rem 2rem 0 0' }}
    >
      {/* Header */}
      <div className="text-center mb-14 px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-4">
          Our Clients
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Trusted by <span className="text-emerald-500">{partners.length}+</span> Businesses Across
          Nepal &amp; Beyond
        </h2>
        {/* Decorative line */}
        <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-emerald-400 opacity-60" />
      </div>

      {/* Marquee rows — clipped inside the same max-width as the rest of the page */}
      <div className="max-w-7xl mx-auto px-6 overflow-hidden">
        <div className="flex flex-col gap-8">
          <MarqueeRow logos={firstRow} direction="left" />
          {secondRow.length > 0 && <MarqueeRow logos={secondRow} direction="right" />}
        </div>
      </div>
    </section>
  )
}
