import BlogSection from '@/components/home/BlogSection'
import ClientsSection from '@/components/home/ClientsSection'
import CommitmentSection from '@/components/home/CommitmentSection'
import Footer from '@/components/home/Footer'
import Hero from '@/components/home/Hero'
import HowWeWork from '@/components/home/HowWeWork'
import PortfolioSection from '@/components/home/PortfolioSection'
import ReadyCta from '@/components/home/ReadyCta'
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
        <HowWeWork />
        <ServicesSection items={catalog.services} />
        <PortfolioSection />
        <TeamSection />
        <WhyCoreCraft />
        <StatsFaqSection />
        <ReadyCta />
        <CommitmentSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  )
}
