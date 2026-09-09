import BlogSection from '@/components/home/BlogSection'
import ClientsSection from '@/components/home/ClientsSection'
import CommitmentSection from '@/components/home/CommitmentSection'
import ContactSection from '@/components/home/ContactSection'
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
import { getHomeContent } from '@/lib/home-content'

export default async function Home() {
  const content = await getHomeContent()
  return (
    <div className="bg-white">
      <SiteHeader />
      <main id="primary">
        <Hero slides={content.heroSlides} />
        <ClientsSection partners={content.partners} />
        <HowWeWork />
        <ServicesSection />
        <PortfolioSection />
        <TeamSection />
        <WhyCoreCraft />
        <StatsFaqSection />
        <ReadyCta />
        <CommitmentSection />
        <ContactSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  )
}
