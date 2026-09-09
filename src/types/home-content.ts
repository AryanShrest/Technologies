export type HeroMedia = {
  altText: string
  id: string
  imageUrl: string
  position: number
  subtitle: string
  title: string
}

export type PartnerMedia = {
  id: string
  logoUrl: string
  name: string
  position: number
  websiteUrl: string | null
}

export type ManagedHomeContent = {
  heroSlides: HeroMedia[]
  partners: PartnerMedia[]
}
