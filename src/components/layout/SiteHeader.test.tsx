import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { SiteHeader } from './SiteHeader'

const { usePathnameMock } = vi.hoisted(() => ({
  usePathnameMock: vi.fn(() => '/'),
}))

vi.mock('next/navigation', () => ({
  usePathname: usePathnameMock,
}))

describe('SiteHeader', () => {
  beforeEach(() => {
    usePathnameMock.mockReturnValue('/')
    document.body.style.overflow = ''
  })

  it('renders verified contact information and current route', () => {
    render(<SiteHeader />)

    expect(screen.getAllByText('info@corecraftnepal.com').length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: 'Home', current: 'page' })).toBeInTheDocument()
  })

  it('opens and closes the mobile navigation with Escape', async () => {
    const user = userEvent.setup()
    render(<SiteHeader />)

    const trigger = screen.getByRole('button', { name: 'Open navigation menu' })
    await user.click(trigger)

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(document.body).toHaveStyle({ overflow: 'hidden' })
    expect(document.getElementById('mobile-navigation')).toHaveAttribute('aria-hidden', 'false')

    await user.keyboard('{Escape}')

    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'))
    expect(document.body.style.overflow).toBe('')
    expect(trigger).toHaveFocus()
  })
})
