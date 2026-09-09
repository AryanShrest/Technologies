import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/utils/format'

type MediaFrameProps = HTMLAttributes<HTMLDivElement> & {
  accent?: 'bottom-right' | 'none' | 'top-left'
  children: ReactNode
  ratio?: '4/3' | '5/4' | '16/10' | '16/9'
}

const ratioClasses = {
  '4/3': 'aspect-[4/3]',
  '5/4': 'aspect-[5/4]',
  '16/10': 'aspect-[16/10]',
  '16/9': 'aspect-video',
}

export function MediaFrame({
  accent = 'none',
  children,
  className,
  ratio = '4/3',
  ...props
}: MediaFrameProps) {
  return (
    <div className={cn('relative', className)} {...props}>
      {accent === 'top-left' && (
        <span
          aria-hidden="true"
          className="absolute -left-4 -top-4 size-20 rounded-tl-2xl border-l-4 border-t-4 border-brand"
        />
      )}
      {accent === 'bottom-right' && (
        <span
          aria-hidden="true"
          className="absolute -bottom-4 -right-4 size-20 rounded-br-2xl border-b-4 border-r-4 border-brand"
        />
      )}
      <div className={cn('relative overflow-hidden rounded-2xl', ratioClasses[ratio])}>
        {children}
      </div>
    </div>
  )
}
