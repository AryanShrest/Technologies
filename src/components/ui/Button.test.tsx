import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button } from './Button'

describe('Button', () => {
  it('renders internal navigation as a link', () => {
    render(<Button href="/contact">Contact Us</Button>)

    expect(screen.getByRole('link', { name: 'Contact Us' })).toHaveAttribute('href', '/contact')
  })

  it('disables a loading native button and exposes busy state', () => {
    render(<Button loading>Send Request</Button>)

    const button = screen.getByRole('button', { name: 'Send Request' })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
  })

  it('keeps decorative icons out of the accessible name', () => {
    render(
      <Button endIcon={<span>decorative arrow</span>} href="/services">
        Services
      </Button>,
    )

    expect(screen.getByRole('link')).toHaveAccessibleName('Services')
    expect(screen.getByText('decorative arrow').parentElement).toHaveClass('motion-button-icon')
  })
})
