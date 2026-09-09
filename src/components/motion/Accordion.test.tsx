import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Accordion } from './Accordion'

const items = [
  { id: 'first', question: 'First question', answer: 'First answer' },
  { id: 'second', question: 'Second question', answer: 'Second answer' },
]

describe('Accordion', () => {
  it('connects trigger and panel with accessible state', () => {
    render(<Accordion defaultOpenIds={['first']} items={items} />)

    const firstButton = screen.getByRole('button', { name: 'First question' })
    const firstPanel = screen.getByRole('region', { name: 'First question' })

    expect(firstButton).toHaveAttribute('aria-expanded', 'true')
    expect(firstButton).toHaveAttribute('aria-controls', firstPanel.id)
    expect(firstPanel).toHaveAttribute('aria-hidden', 'false')
  })

  it('keeps only one item open by default', async () => {
    const user = userEvent.setup()
    render(<Accordion defaultOpenIds={['first']} items={items} />)

    await user.click(screen.getByRole('button', { name: 'Second question' }))

    expect(screen.getByRole('button', { name: 'First question' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
    expect(screen.getByRole('button', { name: 'Second question' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })
})
