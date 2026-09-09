import { describe, expect, it } from 'vitest'

import { benefits, faqs, heroSlides, services, siteSettings, statistics } from './site'

function expectUniqueIds(records: ReadonlyArray<{ id: string }>) {
  const ids = records.map((record) => record.id)
  expect(new Set(ids).size).toBe(ids.length)
}

describe('site content invariants', () => {
  it('uses unique stable IDs for repeatable content', () => {
    expectUniqueIds(heroSlides)
    expectUniqueIds(services)
    expectUniqueIds(benefits)
    expectUniqueIds(statistics)
    expectUniqueIds(faqs)
  })

  it('does not expose placeholder navigation destinations', () => {
    for (const item of siteSettings.navigation) {
      expect(item.href).toMatch(/^\//)
      expect(item.href).not.toBe('#')
    }

    for (const social of siteSettings.socialLinks) {
      expect(social.href).toMatch(/^https:\/\//)
      expect(social.href).not.toBe('https://www.facebook.com/')
      expect(social.href).not.toBe('https://www.instagram.com/')
    }
  })

  it('keeps unapproved statistics unresolved and stores approved opening hours', () => {
    expect(siteSettings.openingHours).toBe('10:00 AM–6:00 PM')
    expect(statistics.every((statistic) => statistic.value === null)).toBe(true)
  })

  it('stores one normalized telephone URI', () => {
    expect(siteSettings.contact.phoneHref).toBe('tel:+9779861941981')
    expect(siteSettings.contact.phoneHref).not.toContain(' ')
  })
})
