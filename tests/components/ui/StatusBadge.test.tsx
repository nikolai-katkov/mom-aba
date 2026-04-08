import { render, screen } from '@testing-library/react'

import { StatusBadge } from '../../../src/components/ui'

describe('StatusBadge', () => {
  it('renders "Not started" for NotStarted status', () => {
    render(<StatusBadge status="NotStarted" />)
    expect(screen.getByText('Not started')).toBeInTheDocument()
  })

  it('renders "In progress" for InProgress status', () => {
    render(<StatusBadge status="InProgress" />)
    expect(screen.getByText('In progress')).toBeInTheDocument()
  })

  it('renders "Completed" with checkmark for Completed status', () => {
    render(<StatusBadge status="Completed" />)
    expect(screen.getByText('Completed')).toBeInTheDocument()
  })
})
