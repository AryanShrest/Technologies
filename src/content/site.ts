import type { Benefit, FaqItem, HeroSlide, Service, SiteSettings, Statistic } from '@/types/site'

export const siteSettings: SiteSettings = {
  name: 'CoreCraft Technologies',
  shortName: 'CoreCraft',
  contact: {
    address: 'Kapan, Nepal',
    email: 'info@corecraftnepal.com',
    phoneDisplay: '+977 9861941981',
    phoneHref: 'tel:+9779861941981',
  },
  openingHours: '10:00 AM–6:00 PM',
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/#portfolio' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  socialLinks: [
    {
      platform: 'facebook',
      label: 'CoreCraft Technologies on Facebook',
      href: 'https://www.facebook.com/corecrafttechologies',
    },
    {
      platform: 'instagram',
      label: 'CoreCraft Technologies on Instagram',
      href: 'https://www.instagram.com/corecraftnepal',
    },
  ],
}

export const heroSlides: readonly HeroSlide[] = [
  {
    id: 'digital-growth-partner',
    eyebrow: 'WELCOME TO CORECRAFT TECHNOLOGIES',
    title: 'Your Digital Growth Partner',
    body: 'We design, develop, and deploy cutting-edge digital solutions that empower businesses to innovate, automate, and compete globally.',
  },
  {
    id: 'business-through-technology',
    eyebrow: 'FROM NEPAL TO THE WORLD',
    title: 'Empowering Business Through Technology',
    body: 'CoreCraft Technologies delivers custom websites, business software, mobile applications, and digital transformation services designed to help organizations succeed in the modern world.',
  },
]

export const services: readonly Service[] = [
  {
    id: 'website-development',
    title: 'Website Development',
    description:
      'Creating modern, responsive, and user-friendly websites tailored to business needs.',
    href: null,
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description:
      'Helping businesses grow online through SEO, social media, and digital advertising strategies.',
    href: null,
  },
  {
    id: 'ui-ux-graphic-design',
    title: 'UI/UX & Graphic Design',
    description:
      'Designing attractive, user-focused interfaces and creative visuals for better brand identity.',
    href: null,
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    description:
      'Developing powerful and user-friendly mobile applications for Android and iOS platforms.',
    href: null,
  },
  {
    id: 'software-development',
    title: 'Software Development',
    description:
      'Building secure, scalable, and customized software solutions for efficient business operations.',
    href: null,
  },
  {
    id: 'cloud-hosting-services',
    title: 'Cloud & Hosting Services',
    description:
      'Providing secure hosting, cloud solutions, domain management, and reliable performance.',
    href: null,
  },
]

export const benefits: readonly Benefit[] = [
  { id: 'innovative-solutions', label: 'Innovative Technology Solutions' },
  { id: 'dedicated-team', label: 'Experienced & Dedicated Team' },
  { id: 'client-focused', label: 'Client-Focused Approach' },
  { id: 'secure-systems', label: 'Scalable & Secure Systems' },
  { id: 'reliable-delivery', label: 'Reliable Project Delivery' },
  { id: 'long-term-partnership', label: 'Long-Term Technology Partnership' },
]

export const statistics: readonly Statistic[] = [
  { id: 'client-commitment', label: 'Client Commitment', prefix: '', suffix: '%', value: null },
  { id: 'projects-completed', label: 'Projects Completed', prefix: '', suffix: 'k+', value: null },
  {
    id: 'customers-supported',
    label: 'Customers Supported',
    prefix: '',
    suffix: 'k+',
    value: null,
  },
]

export const faqs: readonly FaqItem[] = [
  {
    id: 'difference',
    question: 'What makes CoreCraft Technologies different?',
    answer: null,
  },
  {
    id: 'services',
    question: 'What Services Do We Offer?',
    answer:
      'We specialize in website development, custom software solutions, mobile applications, cloud services, digital branding, and business automation.',
  },
  { id: 'client-process', question: 'How Do We Work With Clients?', answer: null },
  { id: 'partnership', question: 'Why Partner With CoreCraft?', answer: null },
  { id: 'commitment', question: 'Our Commitment', answer: null },
]
