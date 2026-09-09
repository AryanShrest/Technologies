'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { MouseEventHandler } from 'react'
import { useEffect, useRef, useState } from 'react'

import { siteSettings } from '@/content/site'
import { cn } from '@/utils/format'

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function isActiveRoute(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

function Brand({
  onNavigate,
  tabIndex,
}: {
  onNavigate?: MouseEventHandler<HTMLAnchorElement>
  tabIndex?: number
}) {
  return (
    <Link
      aria-label={`${siteSettings.name} home`}
      className="inline-flex shrink-0 items-center gap-2"
      href="/"
      onClick={onNavigate}
      tabIndex={tabIndex}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/corecraft logo/Screenshot 2026-09-08 141243.png"
        alt="CoreCraft Technologies logo"
        className="h-10 w-auto object-contain"
      />
    </Link>
  )
}

function MailIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path
        d="m3 7 7.8 5.2a2.2 2.2 0 0 0 2.4 0L21 7m-16 12h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
      {open ? (
        <path
          d="m6 6 12 12M18 6 6 18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      )}
    </svg>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobilePanelRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const ENTER_THRESHOLD = 64
    const EXIT_THRESHOLD = 16

    setScrolled(window.scrollY > ENTER_THRESHOLD)

    const onScroll = () => {
      if (rafRef.current !== null) return
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null
        const y = window.scrollY
        setScrolled((current) => {
          if (current) return y > EXIT_THRESHOLD
          return y > ENTER_THRESHOLD
        })
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    const panel = mobilePanelRef.current
    const focusableElements = panel
      ? Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector))
      : []

    document.body.style.overflow = 'hidden'
    focusableElements[0]?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        return
      }

      if (event.key !== 'Tab' || focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      menuButtonRef.current?.focus()
    }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden h-12 overflow-hidden bg-[var(--color-navy)] lg:block">
        <div
          className={cn(
            'flex h-full items-center justify-between gap-8 text-sm text-white transition-[transform,opacity] duration-[var(--motion-hover)] ease-[var(--ease-standard)] will-change-transform',
            scrolled ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100',
          )}
        >
          <div className="site-container flex h-full min-h-12 w-full items-center justify-between gap-8">
            <div className="flex items-center gap-7">
              <a
                className="inline-flex items-center gap-2 text-white/90 transition-colors hover:text-white"
                href={`mailto:${siteSettings.contact.email}`}
              >
                <MailIcon />
                {siteSettings.contact.email}
              </a>
              <span className="inline-flex items-center gap-2 text-white/90">
                <LocationIcon />
                {siteSettings.contact.address}
              </span>
            </div>

            <nav aria-label="Utility navigation">
              <ul className="flex items-center gap-2">
                <li>
                  <Link className="transition-colors hover:text-blue-200" href="/about">
                    About Us
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/50">
                  /
                </li>
                <li>
                  <Link className="transition-colors hover:text-blue-200" href="/services">
                    Service
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/50">
                  /
                </li>
                <li>
                  <Link className="transition-colors hover:text-blue-200" href="/#portfolio">
                    Portfolio
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/50">
                  /
                </li>
                <li>
                  <Link className="transition-colors hover:text-blue-200" href="/blog">
                    News
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'border-b border-transparent bg-white transition-[box-shadow,border-color] duration-[var(--motion-hover)]',
          scrolled && 'border-[var(--color-border)] shadow-lg shadow-slate-950/5',
        )}
      >
        <div className="site-container flex items-center justify-between gap-8 py-3 lg:py-4">
          <Brand />

          <nav aria-label="Primary navigation" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {siteSettings.navigation.map((item) => {
                const active = isActiveRoute(pathname, item.href)

                return (
                  <li key={item.href}>
                    <Link
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'relative block py-3 text-[0.95rem] font-medium text-slate-800 transition-colors hover:text-brand',
                        'after:absolute after:inset-x-0 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand after:transition-transform',
                        active && 'text-brand after:scale-x-100',
                      )}
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              className="hidden min-h-12 items-center justify-center rounded-md bg-brand px-7 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-hover md:inline-flex"
              href="/contact"
            >
              Contact Us
            </Link>
            <button
              ref={menuButtonRef}
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex size-11 items-center justify-center rounded-md text-ink-heading transition-colors hover:bg-blue-50 lg:hidden"
              onClick={() => setMenuOpen((current) => !current)}
              type="button"
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </div>

      <button
        aria-hidden={!menuOpen}
        aria-label="Close navigation menu"
        className={cn(
          'fixed inset-0 z-[60] bg-slate-950/60 opacity-0 backdrop-blur-sm transition-opacity duration-[var(--motion-hover)] lg:hidden',
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none',
        )}
        onClick={() => setMenuOpen(false)}
        tabIndex={menuOpen ? 0 : -1}
        type="button"
      />

      <div
        ref={mobilePanelRef}
        aria-hidden={!menuOpen}
        aria-label="Mobile navigation panel"
        className={cn(
          'fixed inset-y-0 right-0 z-[70] flex w-[min(90vw,24rem)] flex-col bg-white shadow-2xl transition-transform duration-[var(--motion-reveal)] ease-[var(--ease-standard)] lg:hidden',
          menuOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        id="mobile-navigation"
      >
        <div className="flex items-center justify-between border-b border-[var(--color-border)] p-5">
          <Brand onNavigate={() => setMenuOpen(false)} tabIndex={menuOpen ? undefined : -1} />
          <button
            aria-label="Close navigation menu"
            className="inline-flex size-11 items-center justify-center rounded-md text-ink-heading transition-colors hover:bg-blue-50"
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? undefined : -1}
            type="button"
          >
            <MenuIcon open />
          </button>
        </div>

        <nav aria-label="Mobile primary navigation" className="flex-1 overflow-y-auto px-5 py-7">
          <ul className="space-y-1">
            {siteSettings.navigation.map((item) => {
              const active = isActiveRoute(pathname, item.href)

              return (
                <li key={item.href}>
                  <Link
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'block rounded-md px-4 py-3 font-heading text-lg font-semibold text-ink-heading transition-colors hover:bg-blue-50 hover:text-brand',
                      active && 'bg-blue-50 text-brand',
                    )}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    tabIndex={menuOpen ? undefined : -1}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <Link
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-brand px-6 font-semibold text-white transition-colors hover:bg-brand-hover"
            href="/contact"
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? undefined : -1}
          >
            Contact Us
          </Link>
        </nav>

        <div className="space-y-3 border-t border-[var(--color-border)] bg-surface-light p-6 text-sm">
          <a
            className="flex items-center gap-3 text-ink-body transition-colors hover:text-brand"
            href={`mailto:${siteSettings.contact.email}`}
            tabIndex={menuOpen ? undefined : -1}
          >
            <MailIcon />
            {siteSettings.contact.email}
          </a>
          <a
            className="font-semibold text-ink-heading transition-colors hover:text-brand"
            href={siteSettings.contact.phoneHref}
            tabIndex={menuOpen ? undefined : -1}
          >
            {siteSettings.contact.phoneDisplay}
          </a>
          <p className="flex items-center gap-3 text-ink-body">
            <LocationIcon />
            {siteSettings.contact.address}
          </p>
        </div>
      </div>
    </header>
  )
}
