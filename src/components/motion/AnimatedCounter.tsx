'use client'

import type { HTMLAttributes } from 'react'
import { useEffect, useRef, useState } from 'react'

import { useReducedMotion } from './useReducedMotion'

type AnimatedCounterProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  duration?: number
  locale?: string
  prefix?: string
  suffix?: string
  value: number
}

export function AnimatedCounter({
  duration = 1_500,
  locale = 'en-US',
  prefix = '',
  suffix = '',
  value,
  ...props
}: AnimatedCounterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)
  const frameRef = useRef<number | undefined>(undefined)
  const startedRef = useRef(false)
  const reducedMotion = useReducedMotion()
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const finishImmediately = () => {
      startedRef.current = true
      setDisplayValue(value)
    }

    if (reducedMotion || !('IntersectionObserver' in window)) {
      finishImmediately()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return

        startedRef.current = true
        observer.unobserve(element)
        const startTime = performance.now()
        const safeDuration = Math.max(1, duration)

        const updateCounter = (currentTime: number) => {
          const progress = Math.min((currentTime - startTime) / safeDuration, 1)
          const easedProgress = 1 - (1 - progress) ** 3
          setDisplayValue(Math.round(value * easedProgress))

          if (progress < 1) frameRef.current = window.requestAnimationFrame(updateCounter)
        }

        frameRef.current = window.requestAnimationFrame(updateCounter)
      },
      { threshold: 0.35 },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (frameRef.current !== undefined) window.cancelAnimationFrame(frameRef.current)
    }
  }, [duration, reducedMotion, value])

  return (
    <span ref={elementRef} {...props}>
      {prefix}
      {new Intl.NumberFormat(locale).format(displayValue)}
      {suffix}
    </span>
  )
}
