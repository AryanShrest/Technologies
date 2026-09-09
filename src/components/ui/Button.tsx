import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/utils/format'

type ButtonVariant = 'primary' | 'secondary' | 'text'
type ButtonSize = 'small' | 'medium' | 'large'

type SharedButtonProps = {
  children: ReactNode
  className?: string
  endIcon?: ReactNode
  fullWidth?: boolean
  size?: ButtonSize
  startIcon?: ReactNode
  variant?: ButtonVariant
}

type LinkButtonProps = SharedButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className' | 'href'> & {
    href: string
  }

type NativeButtonProps = SharedButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & {
    href?: never
    loading?: boolean
  }

export type ButtonProps = LinkButtonProps | NativeButtonProps

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-white shadow-sm hover:bg-brand-hover active:translate-y-px disabled:bg-slate-300 disabled:text-slate-600',
  secondary:
    'border border-brand bg-white text-brand hover:bg-blue-50 active:translate-y-px disabled:border-slate-300 disabled:text-slate-400',
  text: 'text-brand hover:text-brand-hover hover:bg-blue-50 disabled:text-slate-400',
}

const sizeClasses: Record<ButtonSize, string> = {
  small: 'min-h-10 px-4 py-2 text-sm',
  medium: 'min-h-11 px-5 py-2.5 text-sm',
  large: 'min-h-12 px-6 py-3 text-base',
}

function buttonClasses({
  className,
  fullWidth,
  size = 'medium',
  variant = 'primary',
}: Pick<SharedButtonProps, 'className' | 'fullWidth' | 'size' | 'variant'>) {
  return cn(
    'group/button inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-[color,background-color,border-color,box-shadow,transform] duration-[var(--motion-hover)] ease-[var(--ease-standard)]',
    'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-focus)]',
    'disabled:pointer-events-none disabled:cursor-not-allowed',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    className,
  )
}

function ButtonContent({
  children,
  endIcon,
  loading,
  startIcon,
}: Pick<SharedButtonProps, 'children' | 'endIcon' | 'startIcon'> & { loading?: boolean }) {
  return (
    <>
      {loading ? (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      ) : (
        startIcon && <span aria-hidden="true">{startIcon}</span>
      )}
      <span>{children}</span>
      {!loading && endIcon && (
        <span aria-hidden="true" className="motion-button-icon">
          {endIcon}
        </span>
      )}
    </>
  )
}

export function Button(props: ButtonProps) {
  if ('href' in props && props.href !== undefined) {
    const {
      children,
      className,
      endIcon,
      fullWidth,
      href,
      size,
      startIcon,
      variant,
      ...linkProps
    } = props

    return (
      <Link
        className={buttonClasses({ className, fullWidth, size, variant })}
        href={href}
        {...linkProps}
      >
        <ButtonContent endIcon={endIcon} startIcon={startIcon}>
          {children}
        </ButtonContent>
      </Link>
    )
  }

  const {
    children,
    className,
    disabled,
    endIcon,
    fullWidth,
    loading = false,
    size,
    startIcon,
    type = 'button',
    variant,
    ...buttonProps
  } = props

  return (
    <button
      aria-busy={loading || undefined}
      className={buttonClasses({ className, fullWidth, size, variant })}
      disabled={disabled || loading}
      type={type}
      {...buttonProps}
    >
      <ButtonContent endIcon={endIcon} loading={loading} startIcon={startIcon}>
        {children}
      </ButtonContent>
    </button>
  )
}
