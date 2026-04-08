import userEvent from '@testing-library/user-event'

import { ProgressiveDisclosure } from '../../../src/components/ui'
import { byT } from '../../helpers/byT'
import { renderWithProviders } from '../../helpers/renderWithProviders'

describe('ProgressiveDisclosure', () => {
  it('hides content by default', () => {
    renderWithProviders(
      <ProgressiveDisclosure>
        <p>Hidden content</p>
      </ProgressiveDisclosure>
    )

    const toggle = byT('readMore')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('reveals content when toggle is clicked', async () => {
    renderWithProviders(
      <ProgressiveDisclosure>
        <p>Hidden content</p>
      </ProgressiveDisclosure>
    )

    await userEvent.click(byT('readMore'))

    const toggle = byT('showLess')
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
  })

  it('hides content again when toggled twice', async () => {
    renderWithProviders(
      <ProgressiveDisclosure>
        <p>Hidden content</p>
      </ProgressiveDisclosure>
    )

    const user = userEvent.setup()
    await user.click(byT('readMore'))
    await user.click(byT('showLess'))

    expect(byT('readMore')).toHaveAttribute('aria-expanded', 'false')
  })

  it('uses custom labels when provided', () => {
    renderWithProviders(
      <ProgressiveDisclosure collapsedLabel="More details" expandedLabel="Less details">
        <p>Content</p>
      </ProgressiveDisclosure>
    )

    // data-t still reflects the key, but the text content is custom
    const toggle = byT('readMore')
    expect(toggle).toHaveTextContent('More details')
  })
})
