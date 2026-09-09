import { ScrollToTop } from '@/components/layout'
import type { Metadata } from 'next'
import { Raleway, Rubik } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://corecraftnepal.com'),
  title: {
    default: 'CoreCraft Technologies',
    template: '%s | CoreCraft Technologies',
  },
  description:
    'CoreCraft Technologies builds websites, software, mobile applications, and digital solutions for modern businesses.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <body className={`${rubik.variable} ${raleway.variable}`}>
        <a
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-white px-4 py-3 font-semibold text-ink-heading shadow-xl transition-transform focus:translate-y-0"
          href="#primary"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
        <ScrollToTop />
      </body>
    </html>
  )
}
