import BlogSection from '@/components/home/BlogSection'
import ClientsSection from '@/components/home/ClientsSection'
import Footer from '@/components/home/Footer'
import Hero from '@/components/home/Hero'
import PortfolioSection from '@/components/home/PortfolioSection'
import ServicesSection from '@/components/home/ServicesSection'
import StatsFaqSection from '@/components/home/StatsFaqSection'
import TeamSection from '@/components/home/TeamSection'
import WhyCoreCraft from '@/components/home/WhyCoreCraft'
import { SiteHeader } from '@/components/layout'
import { getCatalog } from '@/lib/catalog'
import { getHomeContent } from '@/lib/home-content'

export default async function Home() {
  const [content, catalog] = await Promise.all([getHomeContent(), getCatalog()])
  return (
    <div className="bg-white">
      <SiteHeader />
      <main id="primary">
        <Hero slides={content.heroSlides} />
        <ClientsSection partners={content.partners} />
        <ServicesSection items={catalog.services} />
        <PortfolioSection />
        <TeamSection />
        <WhyCoreCraft />
        <StatsFaqSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  )
}
