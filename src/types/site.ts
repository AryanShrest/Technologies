export type NavigationItem = {
  href: string
  label: string
}

export type SocialPlatform = 'facebook' | 'instagram'

export type SocialLink = {
  href: string
  label: string
  platform: SocialPlatform
}

export type SiteContact = {
  address: string
  email: string
  phoneDisplay: string
  phoneHref: string
}

export type SiteSettings = {
  contact: SiteContact
  name: string
  navigation: readonly NavigationItem[]
  openingHours: string | null
  shortName: string
  socialLinks: readonly SocialLink[]
}

export type HeroSlide = {
  body: string
  eyebrow: string
  id: string
  title: string
}

export type Service = {
  description: string
  href: string | null
  id: string
  title: string
}

export type Benefit = {
  id: string
  label: string
}

export type Statistic = {
  id: string
  label: string
  prefix: string
  suffix: string
  value: number | null
}

export type FaqItem = {
  answer: string | null
  id: string
  question: string
}
