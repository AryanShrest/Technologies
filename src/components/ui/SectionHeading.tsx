import type { ElementType, HTMLAttributes } from 'react'

import { cn } from '@/utils/format'

type SectionHeadingProps = HTMLAttributes<HTMLDivElement> & {
  align?: 'center' | 'left'
  description?: string
  eyebrow?: string
  level?: 'h1' | 'h2' | 'h3'
  title: string
}

export function SectionHeading({
  align = 'left',
  className,
  description,
  eyebrow,
  level = 'h2',
  title,
  ...props
}: SectionHeadingProps) {
  const Heading = level as ElementType

  return (
    <div
      className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}
      {...props}
    >
      {eyebrow && (
        <div
          className={cn(
            'mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand',
            align === 'center' && 'justify-center',
          )}
        >
          <span aria-hidden="true" className="h-px w-10 bg-brand" />
          <span>{eyebrow}</span>
          {align === 'center' && <span aria-hidden="true" className="h-px w-10 bg-brand" />}
        </div>
      )}

      <Heading className="font-heading text-3xl font-bold leading-tight text-ink-heading md:text-4xl lg:text-[2.5rem] lg:leading-[1.25]">
        {title}
      </Heading>

      {description && (
        <p
          className={cn(
            'mt-5 max-w-2xl text-base leading-7 text-ink-body',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
