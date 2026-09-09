import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AnimatedCounter } from './AnimatedCounter'
import { Reveal } from './Reveal'

describe('motion fallbacks', () => {
  it('keeps revealed content visible when IntersectionObserver is unavailable', async () => {
    render(<Reveal data-testid="reveal">Always available</Reveal>)

    await waitFor(() =>
      expect(screen.getByTestId('reveal')).toHaveAttribute('data-visible', 'true'),
    )
    expect(screen.getByText('Always available')).toBeVisible()
  })

  it('shows the final counter value when IntersectionObserver is unavailable', async () => {
    render(<AnimatedCounter data-testid="counter" suffix="%" value={99} />)

    await waitFor(() => expect(screen.getByTestId('counter')).toHaveTextContent('99%'))
  })
})
