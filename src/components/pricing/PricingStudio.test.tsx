import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { PricingStudio } from './PricingStudio'

describe('PricingStudio', () => {
  it('does not publish unapproved monetary prices', () => {
    render(<PricingStudio />)

    expect(screen.getAllByText('Custom proposal')).toHaveLength(3)
    expect(screen.queryByText(/\$|NPR|NRs\.?/i)).not.toBeInTheDocument()
  })

  it('updates the recommended engagement from the selected goal', async () => {
    const user = userEvent.setup()
    render(<PricingStudio />)

    expect(screen.getByText('Recommended path:').parentElement).toHaveTextContent(
      'Growth Partnership',
    )
    await user.click(screen.getByRole('radio', { name: /Launch something new/ }))
    expect(screen.getByText('Recommended path:').parentElement).toHaveTextContent('Launch Sprint')
  })

  it('reveals the comparison table on request', async () => {
    const user = userEvent.setup()
    render(<PricingStudio />)

    const trigger = screen.getByRole('button', { name: 'Compare engagement paths' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await user.click(trigger)
    expect(
      screen.getByRole('table', { name: 'Comparison of CoreCraft engagement paths' }),
    ).toBeVisible()
    expect(screen.getByRole('button', { name: 'Hide comparison' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })
})
