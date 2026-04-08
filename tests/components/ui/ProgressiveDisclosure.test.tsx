import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ProgressiveDisclosure } from '../../../src/components/ui'

describe('ProgressiveDisclosure', () => {
  it('hides content by default', () => {
    render(
      <ProgressiveDisclosure>
        <p>Hidden content</p>
      </ProgressiveDisclosure>
    )

    const toggle = screen.getByRole('button', { name: 'Read more' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('reveals content when toggle is clicked', async () => {
    render(
      <ProgressiveDisclosure>
        <p>Hidden content</p>
      </ProgressiveDisclosure>
    )

    await userEvent.click(screen.getByRole('button', { name: 'Read more' }))

    const toggle = screen.getByRole('button', { name: 'Show less' })
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
  })

  it('hides content again when toggled twice', async () => {
    render(
      <ProgressiveDisclosure>
        <p>Hidden content</p>
      </ProgressiveDisclosure>
    )

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Read more' }))
    await user.click(screen.getByRole('button', { name: 'Show less' }))

    expect(screen.getByRole('button', { name: 'Read more' })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  })

  it('uses custom labels', () => {
    render(
      <ProgressiveDisclosure collapsedLabel="More details" expandedLabel="Less details">
        <p>Content</p>
      </ProgressiveDisclosure>
    )

    expect(screen.getByRole('button', { name: 'More details' })).toBeInTheDocument()
  })
})
