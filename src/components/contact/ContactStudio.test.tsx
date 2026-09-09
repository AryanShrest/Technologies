import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ContactStudio } from './ContactStudio'

describe('ContactStudio', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('provides direct email and telephone channels', () => {
    render(<ContactStudio />)

    expect(screen.getByRole('link', { name: /Email the team/ })).toHaveAttribute(
      'href',
      'mailto:info@corecraftnepal.com',
    )
    expect(screen.getByRole('link', { name: /Call directly/ })).toHaveAttribute(
      'href',
      'tel:+9779861941981',
    )
  })

  it('accepts a recommended inquiry from a pricing path', () => {
    render(<ContactStudio initialInquiry="Digital growth" />)

    expect(screen.getByRole('combobox', { name: 'What can we help with?' })).toHaveValue(
      'Digital growth',
    )
  })

  it('offers an optional budget range and submits the brief to the server', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }),
    )
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()
    render(<ContactStudio />)

    await user.type(screen.getByRole('textbox', { name: 'Your name' }), 'Mina Rai')
    await user.type(screen.getByRole('textbox', { name: 'Email address' }), 'mina@example.com')
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'What can we help with?' }),
      'Custom software',
    )
    await user.selectOptions(
      screen.getByRole('combobox', { name: /Approximate budget/ }),
      'NPR 300,000–750,000',
    )
    await user.type(
      screen.getByRole('textbox', { name: 'Tell us about the outcome you need' }),
      'We need to replace a manual order workflow with a reliable digital system.',
    )
    await user.click(screen.getByRole('button', { name: 'Send project brief' }))

    expect(await screen.findByRole('status')).toHaveTextContent(
      'your project brief is safely recorded',
    )
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/contact',
      expect.objectContaining({ method: 'POST' }),
    )
  })
})
