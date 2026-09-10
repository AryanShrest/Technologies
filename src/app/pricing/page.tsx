import type { Metadata } from 'next'

import { PageBanner, SiteHeader } from '@/components/layout'
import { PricingStudio } from '@/components/pricing/PricingStudio'
import Footer from '@/components/home/Footer'
import { getCatalog } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Explore flexible CoreCraft Technologies engagement paths for launches, digital growth, and custom transformation projects.',
}

export default async function PricingPage() {
  const { pricingPlans } = await getCatalog()
  return (
    <div className="bg-white">
      <SiteHeader />
      <main id="primary">
        <PageBanner
          description="Flexible engagements shaped around the outcome, complexity, and expertise your project actually needs."
          eyebrow="Flexible by design"
          title="Pricing without the guesswork"
        />
        <PricingStudio plans={pricingPlans} />
      </main>
      <Footer />
    </div>
  )
}
