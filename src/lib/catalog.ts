import { unstable_cache } from 'next/cache'

import { services as fallbackServices } from '@/content/site'
import { hasSupabaseConfig } from '@/lib/supabase/config'
import { createServiceSupabaseClient } from '@/lib/supabase/server'
import type { PricingPlan, ServiceItem } from '@/types/catalog'

export const fallbackPricingPlans: PricingPlan[] = [
  {
    id: 'launch-sprint',
    name: 'Launch Sprint',
    goal: 'launch',
    timeline: 'Focused delivery',
    priceLabel: 'Custom proposal',
    description: 'For a focused website, campaign, prototype, or first digital product.',
    features: [
      'Discovery workshop',
      'Focused scope and roadmap',
      'Design and development',
      'Launch readiness review',
    ],
    position: 0,
  },
  {
    id: 'growth-partnership',
    name: 'Growth Partnership',
    goal: 'grow',
    timeline: 'Ongoing collaboration',
    priceLabel: 'Custom proposal',
    description: 'For businesses ready to strengthen an existing platform and accelerate growth.',
    features: [
      'Experience and technical audit',
      'Prioritized growth roadmap',
      'Iterative product delivery',
      'Measurement and optimization',
    ],
    position: 1,
  },
  {
    id: 'digital-transformation',
    name: 'Digital Transformation',
    goal: 'transform',
    timeline: 'Phased program',
    priceLabel: 'Custom proposal',
    description: 'For custom software, connected workflows, and complex digital transformation.',
    features: [
      'Stakeholder discovery',
      'Solution architecture',
      'Phased implementation',
      'Enablement and long-term support',
    ],
    position: 2,
  },
]

const fallback: ServiceItem[] = fallbackServices.map((item, position) => ({
  description: item.description,
  id: item.id,
  position,
  slug: item.id,
  title: item.title,
}))

const load = unstable_cache(
  async () => {
    const client = createServiceSupabaseClient()
    const [services, pricing] = await Promise.all([
      client
        .from('services')
        .select('id,title,description,slug,position')
        .eq('active', true)
        .order('position'),
      client
        .from('pricing_plans')
        .select('id,name,description,goal,timeline,price_label,features,position')
        .eq('active', true)
        .order('position'),
    ])
    if (services.error || pricing.error) throw new Error('Catalog content failed to load')
    return {
      services: (services.data ?? []) as ServiceItem[],
      pricingPlans: (pricing.data ?? []).map((item) => ({
        ...item,
        priceLabel: item.price_label,
      })) as PricingPlan[],
    }
  },
  ['managed-catalog'],
  { revalidate: 300, tags: ['catalog'] },
)

export async function getCatalog() {
  return { services: fallback, pricingPlans: fallbackPricingPlans }
}
