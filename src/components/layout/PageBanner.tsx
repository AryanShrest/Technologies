import Link from 'next/link'

import { Container } from '@/components/layout/Container'
import { cn } from '@/utils/format'

export type BreadcrumbItem = {
  href?: string
  label: string
}

type PageBannerProps = {
  breadcrumbs?: readonly BreadcrumbItem[]
  className?: string
  description?: string
  eyebrow?: string
  title: string
}

function ChevronIcon() {
  return (
    <svg aria-hidden="true" className="size-3.5" fill="none" viewBox="0 0 16 16">
      <path
        d="m6 3 5 5-5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  )
}

export function PageBanner({
  breadcrumbs = [],
  className,
  description,
  eyebrow,
  title,
}: PageBannerProps) {
  const trail: readonly BreadcrumbItem[] = [
    { href: '/', label: 'Home' },
    ...breadcrumbs,
    { label: title },
  ]

  return (
    <header
      className={cn(
        'relative isolate overflow-hidden bg-gradient-to-br from-[#101d47] via-[#1b3477] to-[#2857c8] py-16 text-white sm:py-20 lg:py-24',
        className,
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="page-banner-grid absolute inset-0 opacity-25" />
        <div className="absolute -right-24 -top-28 size-96 rounded-full border border-white/10" />
        <div className="absolute -bottom-40 right-[18%] size-[28rem] rounded-full border border-blue-200/10" />
        <div className="absolute left-[8%] top-0 h-full w-px rotate-[18deg] bg-gradient-to-b from-transparent via-blue-200/20 to-transparent" />
      </div>

      <Container className="relative">
        {eyebrow && (
          <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-blue-200 sm:text-sm">
            <span aria-hidden="true" className="h-0.5 w-9 bg-brand" />
            {eyebrow}
          </p>
        )}

        <h1 className="max-w-4xl text-[clamp(2.5rem,7vw,4.75rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-white">
          {title}
        </h1>

        {description && (
          <p className="mt-5 max-w-2xl text-base leading-7 text-blue-50/85 sm:text-lg">
            {description}
          </p>
        )}

        <nav aria-label="Breadcrumb" className="mt-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-blue-100/80">
            {trail.map((item, index) => {
              const isCurrent = index === trail.length - 1

              return (
                <li
                  className="flex items-center gap-2"
                  key={`${item.href ?? 'current'}-${item.label}`}
                >
                  {index > 0 && <ChevronIcon />}
                  {isCurrent || !item.href ? (
                    <span
                      aria-current={isCurrent ? 'page' : undefined}
                      className={cn(isCurrent && 'font-semibold text-white')}
                    >
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      className="rounded-sm transition-colors hover:text-white"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>
      </Container>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-5 bg-white [clip-path:polygon(0_100%,100%_25%,100%_100%)] sm:h-8"
      />
    </header>
  )
}
