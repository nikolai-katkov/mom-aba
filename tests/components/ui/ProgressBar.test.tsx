import { screen } from '@testing-library/react'

import { ProgressBar } from '../../../src/components/ui'
import { byT } from '../../helpers/byT'
import { renderWithProviders } from '../../helpers/renderWithProviders'

describe('ProgressBar', () => {
  it('renders with correct aria attributes', () => {
    renderWithProviders(<ProgressBar completed={3} total={5} />)

    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toHaveAttribute('aria-valuenow', '3')
    expect(progressbar).toHaveAttribute('aria-valuemax', '5')
    expect(progressbar).toHaveAttribute('aria-valuemin', '0')
  })

  it('has data-t attribute for translation key', () => {
    renderWithProviders(<ProgressBar completed={2} total={5} />)
    expect(byT('progressLabel')).toBeInTheDocument()
  })

  it('handles zero total without error', () => {
    renderWithProviders(<ProgressBar completed={0} total={0} />)

    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toHaveAttribute('aria-valuenow', '0')
    expect(progressbar).toHaveAttribute('aria-valuemax', '0')
  })
})
