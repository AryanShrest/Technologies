import type { HTMLAttributes } from 'react'

import { cn } from '@/utils/format'

type SectionSpacing = 'large' | 'medium' | 'none' | 'small'

type SectionProps = HTMLAttributes<HTMLElement> & {
  spacing?: SectionSpacing
}

const spacingClasses: Record<SectionSpacing, string> = {
  none: '',
  small: 'section-space-sm',
  medium: 'section-space-md',
  large: 'section-space-lg',
}

export function Section({ className, spacing = 'medium', ...props }: SectionProps) {
  return <section className={cn(spacingClasses[spacing], className)} {...props} />
}
