import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { AssessmentProvider } from '../../src/hooks'
import { TrainingPage } from '../../src/pages/TrainingPage'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

function renderPage(sectionId = 'mand', criterionId = 'mand-1') {
  return render(
    <MemoryRouter initialEntries={[`/sections/${sectionId}/criteria/${criterionId}/train`]}>
      <AssessmentProvider>
        <Routes>
          <Route
            path="/sections/:sectionId/criteria/:criterionId/train"
            element={<TrainingPage />}
          />
          <Route path="/sections/:sectionId/criteria" element={<div>Criteria List</div>} />
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </AssessmentProvider>
    </MemoryRouter>
  )
}

describe('TrainingPage', () => {
  beforeEach(() => {
    localStorage.clear()
    mockNavigate.mockClear()
  })

  it('renders training steps', () => {
    renderPage()
    expect(screen.getByText(/choose 2 items your child loves/iu)).toBeInTheDocument()
  })

  it('toggles full guide with Read more', async () => {
    renderPage()
    const toggle = screen.getByRole('button', { name: 'Read more' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(toggle)
    expect(screen.getByRole('button', { name: 'Show less' })).toHaveAttribute(
      'aria-expanded',
      'true'
    )
  })

  it('navigates to assessment when Retry is clicked', async () => {
    renderPage()
    await userEvent.click(screen.getByRole('button', { name: 'Retry Assessment' }))
    expect(mockNavigate).toHaveBeenCalledWith('/sections/mand/criteria/mand-1/assess')
  })

  it('navigates to criteria list when Back is clicked', async () => {
    renderPage()
    await userEvent.click(screen.getByRole('button', { name: 'Back to List' }))
    expect(mockNavigate).toHaveBeenCalledWith('/sections/mand/criteria')
  })

  it('redirects for invalid criterion', () => {
    renderPage('mand', 'nonexistent')
    expect(screen.getByText('Criteria List')).toBeInTheDocument()
  })
})
