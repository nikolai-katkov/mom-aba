import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { HomePage } from '../../src/pages/HomePage'

describe('HomePage', () => {
  it('renders the app title and subtitle', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Neuron')
    expect(screen.getByText(/helping parents/iu)).toBeInTheDocument()
  })
})
