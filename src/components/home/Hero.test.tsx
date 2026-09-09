import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import Hero from './Hero'

describe('Hero', () => {
  afterEach(() => vi.useRealTimers())

  it('renders the current headline and primary calls to action', () => {
    render(<Hero />)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'We build software that moves your business forward.',
      }),
    ).toBeVisible()
    expect(screen.getByRole('link', { name: 'Get a Free Consultation' })).toHaveAttribute(
      'href',
      '/contact',
    )
    expect(screen.getByRole('link', { name: 'View Our Work' })).toHaveAttribute(
      'href',
      '/#portfolio',
    )
  })

  it('supports direct pagination across all four slides', async () => {
    const user = userEvent.setup()
    render(<Hero />)
    await user.click(screen.getByRole('button', { name: 'Go to slide 4' }))
    expect(screen.getByText('Creative Solutions')).toBeVisible()
    await user.click(screen.getByRole('button', { name: 'Go to slide 1' }))
    expect(screen.getByText('Strategic Planning')).toBeVisible()
  })

  it('autoplays after ten seconds', () => {
    vi.useFakeTimers()
    render(<Hero />)
    act(() => vi.advanceTimersByTime(10000))
    expect(screen.getByText('Our Team at Work')).toBeVisible()
  })
})
