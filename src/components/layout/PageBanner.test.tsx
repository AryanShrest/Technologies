import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PageBanner } from './PageBanner'

describe('PageBanner', () => {
  it('provides one page heading and a current breadcrumb', () => {
    render(<PageBanner eyebrow="Company" title="About CoreCraft" />)

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('About CoreCraft')

    const breadcrumb = screen.getByRole('navigation', { name: 'Breadcrumb' })
    expect(within(breadcrumb).getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(within(breadcrumb).getByText('About CoreCraft')).toHaveAttribute('aria-current', 'page')
  })

  it('renders linked intermediate breadcrumb levels without linking the current page', () => {
    render(
      <PageBanner
        breadcrumbs={[{ href: '/blog', label: 'Blog' }]}
        description="Article description"
        title="A practical guide"
      />,
    )

    const breadcrumb = screen.getByRole('navigation', { name: 'Breadcrumb' })
    expect(within(breadcrumb).getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog')
    expect(
      within(breadcrumb).queryByRole('link', { name: 'A practical guide' }),
    ).not.toBeInTheDocument()
    expect(screen.getByText('Article description')).toBeVisible()
  })
})
