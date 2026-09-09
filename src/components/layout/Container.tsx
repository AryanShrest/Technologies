import type { HTMLAttributes } from 'react'

import { cn } from '@/utils/format'

type ContainerProps = HTMLAttributes<HTMLDivElement>

export function Container({ className, ...props }: ContainerProps) {
  return <div className={cn('site-container', className)} {...props} />
}
