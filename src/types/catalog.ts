export type ServiceItem = {
  active?: boolean
  description: string
  id: string
  position: number
  slug: string
  title: string
}

export type PricingGoal = 'grow' | 'launch' | 'transform'

export type PricingPlan = {
  active?: boolean
  description: string
  features: string[]
  goal: PricingGoal
  id: string
  name: string
  position: number
  priceLabel: string
  timeline: string
}
