import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ScrollToTop } from './ScrollToTop'

describe('ScrollToTop', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 })
    window.requestAnimationFrame = (callback) => {
      callback(0)
      return 1
    }
    window.cancelAnimationFrame = vi.fn()
    window.scrollTo = vi.fn()
  })

  it('stays outside the tab order near the top and appears after meaningful scrolling', () => {
    render(<ScrollToTop />)
    const button = document.querySelector('button[aria-label="Scroll to top"]')
    expect(button).toHaveAttribute('tabindex', '-1')

    Object.defineProperty(window, 'scrollY', { configurable: true, value: 600 })
    act(() => fireEvent.scroll(window))
    expect(screen.getByRole('button', { name: 'Scroll to top' })).toHaveAttribute('tabindex', '0')
    expect(button).toHaveAttribute('aria-hidden', 'false')
  })

  it('smooth-scrolls to the document start when activated', async () => {
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 600 })
    const user = userEvent.setup()
    render(<ScrollToTop />)

    await user.click(screen.getByRole('button', { name: 'Scroll to top' }))
    expect(window.scrollTo).toHaveBeenCalledWith({ behavior: 'smooth', top: 0 })
  })
})
