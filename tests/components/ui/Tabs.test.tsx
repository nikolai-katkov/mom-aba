import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Tabs } from '../../../src/components/ui'

const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
]

describe('Tabs', () => {
  it('renders all tab options', () => {
    render(<Tabs options={options} value="a" onChange={vi.fn()} />)
    expect(screen.getByRole('tab', { name: 'Alpha' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Beta' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Gamma' })).toBeInTheDocument()
  })

  it('marks the active tab with aria-selected', () => {
    render(<Tabs options={options} value="b" onChange={vi.fn()} />)
    expect(screen.getByRole('tab', { name: 'Beta' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveAttribute('aria-selected', 'false')
  })

  it('calls onChange when a tab is clicked', async () => {
    const onChange = vi.fn()
    render(<Tabs options={options} value="a" onChange={onChange} />)
    await userEvent.click(screen.getByRole('tab', { name: 'Gamma' }))
    expect(onChange).toHaveBeenCalledWith('c')
  })

  it('renders with tablist role', () => {
    render(<Tabs options={options} value="a" onChange={vi.fn()} />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
  })
})
