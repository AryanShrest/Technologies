'use client'

import type { CSSProperties, HTMLAttributes } from 'react'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/utils/format'

import { useReducedMotion } from './useReducedMotion'

export type RevealVariant = 'fade' | 'fade-left' | 'fade-right' | 'fade-up' | 'scale'

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number
  once?: boolean
  threshold?: number
  variant?: RevealVariant
}

export function Reveal({
  children,
  className,
  delay = 0,
  once = true,
  style,
  threshold = 0.18,
  variant = 'fade-up',
  ...props
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [motionReady, setMotionReady] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (reducedMotion || !('IntersectionObserver' in window)) {
      setMotionReady(true)
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
        if (entry.isIntersecting && once) observer.unobserve(element)
      },
      { threshold },
    )

    observer.observe(element)
    setMotionReady(true)

    return () => observer.disconnect()
  }, [once, reducedMotion, threshold])

  const revealStyle = {
    ...style,
    '--reveal-delay': `${Math.max(0, delay)}ms`,
  } as CSSProperties

  return (
    <div
      ref={elementRef}
      className={cn('motion-reveal', className)}
      data-motion-ready={motionReady || undefined}
      data-reveal-variant={variant}
      data-visible={visible || reducedMotion}
      style={revealStyle}
      {...props}
    >
      {children}
    </div>
  )
}
