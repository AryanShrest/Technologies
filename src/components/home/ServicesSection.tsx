import { Reveal, StaggerGroup } from '@/components/motion'
import Link from 'next/link'

import type { ServiceItem } from '@/types/catalog'

const icons = [
  'M8 9l-4 3 4 3m8-6 4 3-4 3m-3-9-2 12',
  'M4 19V9m5 10V5m5 14v-7m5 7V3',
  'M12 3a9 9 0 1 0 9 9c0-2-2-3-4-3-1 0-2-1-2-2 0-2-1-4-3-4',
  'M9 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm2 15h2',
  'M4 6h16v12H4zM8 10h2m-2 4h5',
  'M6 18a4 4 0 0 1 0-8 6 6 0 0 1 11-2 5 5 0 0 1 1 10Z',
]

export default function ServicesSection({ items }: { items: ServiceItem[] }) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="site-container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">What we do</p>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-950 md:text-4xl">
            Technology services built around your business
          </h2>
          <p className="mt-4 text-slate-500">
            From the first idea to a dependable production system, our team designs, builds, and
            supports digital products that move organizations forward.
          </p>
        </Reveal>
        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3" interval={100}>
          {items.map((service, index) => (
            <article
              className="motion-card group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              id={service.slug}
              key={service.id}
            >
              <div className="flex items-start justify-between">
                <span className="grid size-14 place-items-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                  <svg
                    aria-hidden="true"
                    className="size-7"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path d={icons[index % icons.length]} />
                  </svg>
                </span>
                <span className="text-xs font-bold text-slate-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-extrabold text-slate-950">{service.title}</h3>
              <p className="mt-3 min-h-20 text-sm leading-7 text-slate-500">
                {service.description}
              </p>
              <Link
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700"
                href={`/contact?service=${service.slug}`}
              >
                Discuss this service <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
