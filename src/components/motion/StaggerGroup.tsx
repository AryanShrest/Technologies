'use client'

import type { CSSProperties, HTMLAttributes } from 'react'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/utils/format'

import type { RevealVariant } from './Reveal'
import { useReducedMotion } from './useReducedMotion'

type StaggerGroupProps = HTMLAttributes<HTMLDivElement> & {
  interval?: number
  once?: boolean
  threshold?: number
  variant?: RevealVariant
}

export function StaggerGroup({
  children,
  className,
  interval = 90,
  once = true,
  style,
  threshold = 0.15,
  variant = 'fade-up',
  ...props
}: StaggerGroupProps) {
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

  const staggerStyle = {
    ...style,
    '--stagger-interval': `${Math.max(0, interval)}ms`,
  } as CSSProperties

  return (
    <div
      ref={elementRef}
      className={cn('motion-stagger', className)}
      data-motion-ready={motionReady || undefined}
      data-reveal-variant={variant}
      data-visible={visible || reducedMotion}
      style={staggerStyle}
      {...props}
    >
      {children}
    </div>
  )
}
