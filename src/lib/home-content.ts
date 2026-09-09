import { unstable_cache } from 'next/cache'

import { fallbackHomeContent } from '@/content/home-content'
import { hasSupabaseConfig } from '@/lib/supabase/config'
import { createServiceSupabaseClient } from '@/lib/supabase/server'
import type { HeroMedia, ManagedHomeContent, PartnerMedia } from '@/types/home-content'

const loadManagedContent = unstable_cache(
  async (): Promise<ManagedHomeContent> => {
    const client = createServiceSupabaseClient()
    const [heroResult, partnerResult] = await Promise.all([
      client.from('hero_slides').select('*').eq('active', true).order('position').limit(4),
      client.from('partners').select('*').eq('active', true).order('position'),
    ])
    if (heroResult.error || partnerResult.error)
      throw new Error('Managed homepage content failed to load')

    const heroSlides: HeroMedia[] = (heroResult.data ?? []).map((item) => ({
      altText: item.alt_text,
      id: item.id,
      imageUrl: item.image_url,
      position: item.position,
      subtitle: item.subtitle,
      title: item.title,
    }))
    const partners: PartnerMedia[] = (partnerResult.data ?? []).map((item) => ({
      id: item.id,
      logoUrl: item.logo_url,
      name: item.name,
      position: item.position,
      websiteUrl: item.website_url,
    }))
    return {
      heroSlides: heroSlides.length > 0 ? heroSlides : fallbackHomeContent.heroSlides,
      partners: partners.length > 0 ? partners : fallbackHomeContent.partners,
    }
  },
  ['managed-home-content'],
  { revalidate: 300, tags: ['home-content'] },
)

export async function getHomeContent() {
  if (!hasSupabaseConfig() || !process.env.SUPABASE_SERVICE_ROLE_KEY) return fallbackHomeContent
  try {
    return await loadManagedContent()
  } catch (error) {
    console.error(
      'Using fallback homepage content',
      error instanceof Error ? error.message : 'Unknown error',
    )
    return fallbackHomeContent
  }
}
