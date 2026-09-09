'use client'

import { useEffect, useRef } from 'react'

const PROJECTS = [
  {
    name: 'Zyra Cosmic',
    url: 'https://zyracosmic.com/',
    tech: 'Next.js, TypeScript, Tailwind CSS, Stripe, Node.js',
    img: '/images/portfolio/zyra-cosmic.png',
  },
  {
    name: 'Nepali Pasal',
    url: 'https://nepalipasal.com.np/',
    tech: 'WooCommerce, PHP, MySQL, HTML5, CSS3, JavaScript',
    img: '/images/portfolio/nepali_pasal.png',
  },
  {
    name: 'Prayer Wheel',
    url: 'https://prayer-wheel.com/',
    tech: 'Shopify, Liquid, HTML5, CSS3, jQuery, Stripe',
    img: '/images/portfolio/Prayers_wheel.png',
  },
  {
    name: 'CDHR Nepal',
    url: 'https://www.cdhrnepal.com/',
    tech: 'WordPress, PHP, MySQL, HTML5, CSS3, JavaScript',
    img: '/images/portfolio/cd_hr_nepal.png',
  },
  {
    name: 'B&C Consultancy',
    url: 'https://bandcconsultancy.com/',
    tech: 'React.js, Express, Node.js, MongoDB, TypeScript',
    img: '/images/portfolio/b and c consultancy.png',
  },
  {
    name: 'Jalpa Swasthya Clinic',
    url: 'https://jalpaswasthyaclinic.com/',
    tech: 'HTML5, CSS3, JavaScript, PHP, MySQL, Bootstrap',
    img: '/images/portfolio/Jalpa Swasthya Clinic.png',
  },
  {
    name: 'Sanyukta Mutu',
    url: 'https://sanyuktamutu.org/',
    tech: 'WordPress, Elementor, PHP, HTML5, CSS3, jQuery',
    img: '/images/portfolio/Sanyukta Mutu.png',
  },
  {
    name: 'Zymo Wine',
    url: 'https://zymowine.com/',
    tech: 'Next.js, Shopify, TypeScript, Tailwind CSS, Prisma',
    img: '/images/portfolio/Zymowine.png',
  },
]

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.portfolio-card')
    if (!cards) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="portfolio" className="py-10 lg:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <span className="inline-block bg-orange-500 text-white text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 mb-5">
            PORTFOLIO
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-8">
            Featured work
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg max-w-4xl">
            At CoreCraft Technologies, we take pride in our exceptional web design projects. Below, we
            showcase a handpicked collection of our recent project deliveries, offering you a glimpse into
            the outstanding work we produce.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-x-16 lg:gap-y-14">
          {PROJECTS.map((project, i) => (
            <a
              key={project.url}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block portfolio-card"
              style={{ transitionDelay: `${(i % 2) * 150}ms` }}
            >
              <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md motion-card">
                <div className="relative w-full h-80 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.img}
                    alt={`${project.name} project preview`}
                    className="w-full h-full object-cover object-top block motion-card-media"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/95 text-slate-900 px-5 py-2.5 rounded-md text-sm font-semibold shadow-lg opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
                      Visit Website
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[var(--color-brand-primary)] transition-colors">
                  {project.name}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
