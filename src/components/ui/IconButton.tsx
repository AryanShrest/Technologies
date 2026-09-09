import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/utils/format'

type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  'aria-label': string
  children: ReactNode
  size?: 'medium' | 'small'
  variant?: 'dark' | 'light'
}

const sizeClasses = {
  small: 'size-10',
  medium: 'size-11',
}

const variantClasses = {
  dark: 'bg-surface-dark text-white hover:bg-brand',
  light:
    'border border-[var(--color-border)] bg-white text-ink-heading hover:border-brand hover:text-brand',
}

export function IconButton({
  children,
  className,
  size = 'medium',
  type = 'button',
  variant = 'light',
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-md transition-colors duration-[var(--motion-hover)]',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      type={type}
      {...props}
    >
      <span aria-hidden="true">{children}</span>
    </button>
  )
}
