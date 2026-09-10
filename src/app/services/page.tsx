import type { Metadata } from 'next'

import Footer from '@/components/home/Footer'
import ServicesSection from '@/components/home/ServicesSection'
import { PageBanner, SiteHeader } from '@/components/layout'
import { getCatalog } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore CoreCraft Technologies services for websites, apps, software, design, marketing, cloud, and hosting.',
}

export default async function ServicesPage() {
  const { services } = await getCatalog()
  return (
    <div className="bg-white">
      <SiteHeader />
      <main id="primary">
        <PageBanner
          eyebrow="End-to-end digital expertise"
          title="Services that turn ambition into working technology"
          description="Practical strategy, thoughtful design, dependable engineering, and support from one collaborative team."
        />
        <ServicesSection items={services} />
        <section className="bg-slate-50 py-16">
          <div className="site-container flex flex-col items-start justify-between gap-6 rounded-3xl bg-[#111f4d] p-8 text-white sm:p-12 lg:flex-row lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                Have a project in mind?
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-white">
                Let’s find the right path forward.
              </h2>
            </div>
            <a className="rounded-xl bg-white px-6 py-3 font-bold text-blue-900" href="/contact">
              Start a conversation
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
