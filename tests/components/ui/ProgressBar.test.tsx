import { render, screen } from '@testing-library/react'

import { ProgressBar } from '../../../src/components/ui'

describe('ProgressBar', () => {
  it('renders with correct aria attributes', () => {
    render(<ProgressBar completed={3} total={5} />)

    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toHaveAttribute('aria-valuenow', '3')
    expect(progressbar).toHaveAttribute('aria-valuemax', '5')
    expect(progressbar).toHaveAttribute('aria-valuemin', '0')
  })

  it('has accessible label', () => {
    render(<ProgressBar completed={2} total={5} />)

    expect(screen.getByLabelText('2 of 5 completed')).toBeInTheDocument()
  })

  it('handles zero total without error', () => {
    render(<ProgressBar completed={0} total={0} />)

    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toHaveAttribute('aria-valuenow', '0')
    expect(progressbar).toHaveAttribute('aria-valuemax', '0')
  })
})
