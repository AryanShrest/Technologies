import type { ManagedHomeContent } from '@/types/home-content'

export const fallbackHomeContent: ManagedHomeContent = {
  heroSlides: [
    {
      altText: 'Strategic planning meeting',
      id: 'fallback-strategy',
      imageUrl: '/images/images/financial-planing-meeting.webp',
      position: 0,
      subtitle: 'Kathmandu, Nepal',
      title: 'Strategic Planning',
    },
    {
      altText: 'CoreCraft team collaborating at work',
      id: 'fallback-team',
      imageUrl: '/images/images/pexels-photo-6424588.avif',
      position: 1,
      subtitle: 'CoreCraft HQ',
      title: 'Our Team at Work',
    },
    {
      altText: 'Team collaborating around a table',
      id: 'fallback-collaboration',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
      position: 2,
      subtitle: 'Building the future',
      title: 'Collaborative Development',
    },
    {
      altText: 'Creative team developing digital solutions',
      id: 'fallback-creative',
      imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
      position: 3,
      subtitle: 'Design & Innovation',
      title: 'Creative Solutions',
    },
  ],
  partners: [
    {
      id: 'fallback-zyra',
      logoUrl: '/images/clients/Zyra cosmic.png',
      name: 'Zyra Cosmic',
      position: 0,
      websiteUrl: null,
    },
    {
      id: 'fallback-nepali-pasal',
      logoUrl: '/images/clients/nepali pasal.png',
      name: 'Nepali Pasal',
      position: 1,
      websiteUrl: null,
    },
    {
      id: 'fallback-bc',
      logoUrl: '/images/clients/b and c consultancy .png',
      name: 'B&C Consultancy',
      position: 2,
      websiteUrl: null,
    },
    {
      id: 'fallback-cdhr',
      logoUrl: '/images/clients/CDHR Nepal.png',
      name: 'CDHR Nepal',
      position: 3,
      websiteUrl: null,
    },
    {
      id: 'fallback-sanyukta',
      logoUrl: '/images/clients/sanyukta mutu .png',
      name: 'Sanyukta Mutu',
      position: 4,
      websiteUrl: null,
    },
    {
      id: 'fallback-zymo',
      logoUrl: '/images/clients/Zymo wine .png',
      name: 'Zymo Wine',
      position: 5,
      websiteUrl: null,
    },
  ],
}
