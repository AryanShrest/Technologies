'use client'

import { useEffect, useState } from 'react'

import { useReducedMotion } from '@/components/motion'
import { IconButton } from '@/components/ui'
import { cn } from '@/utils/format'

const VISIBILITY_THRESHOLD = 480

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    let animationFrame = 0

    const updateVisibility = () => {
      window.cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(() => {
        setIsVisible(window.scrollY >= VISIBILITY_THRESHOLD)
      })
    }

    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateVisibility)
      window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <IconButton
      aria-hidden={!isVisible}
      aria-label="Scroll to top"
      className={cn(
        'fixed bottom-5 right-5 z-40 rounded-full border-white/20 bg-brand text-white shadow-lg shadow-blue-950/20 transition-[opacity,transform,background-color] sm:bottom-8 sm:right-8',
        isVisible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0',
      )}
      onClick={() => window.scrollTo({ behavior: reducedMotion ? 'auto' : 'smooth', top: 0 })}
      tabIndex={isVisible ? 0 : -1}
      variant="dark"
    >
      <svg fill="none" viewBox="0 0 24 24" className="size-5">
        <title>Up arrow</title>
        <path
          d="m6 14 6-6 6 6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </IconButton>
  )
}
