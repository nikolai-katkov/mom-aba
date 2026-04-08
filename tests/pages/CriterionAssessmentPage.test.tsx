import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { AssessmentProvider } from '../../src/hooks'
import { CriterionAssessmentPage } from '../../src/pages/CriterionAssessmentPage'

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
    <MemoryRouter initialEntries={[`/sections/${sectionId}/criteria/${criterionId}/assess`]}>
      <AssessmentProvider>
        <Routes>
          <Route
            path="/sections/:sectionId/criteria/:criterionId/assess"
            element={<CriterionAssessmentPage />}
          />
          <Route path="/sections/:sectionId/criteria" element={<div>Criteria List</div>} />
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </AssessmentProvider>
    </MemoryRouter>
  )
}

describe('CriterionAssessmentPage', () => {
  beforeEach(() => {
    localStorage.clear()
    mockNavigate.mockClear()
  })

  it('renders the criterion question', () => {
    renderPage()
    expect(
      screen.getByText('Can the child request at least 2 items using words, gestures, or cards?')
    ).toBeInTheDocument()
  })

  it('renders criterion conditions', () => {
    renderPage()
    expect(
      screen.getByText('Prompts allowed (echoic, imitation, non-physical)')
    ).toBeInTheDocument()
  })

  it('navigates to criteria list when Yes is clicked', async () => {
    renderPage()
    await userEvent.click(screen.getByRole('button', { name: 'Yes' }))
    expect(mockNavigate).toHaveBeenCalledWith('/sections/mand/criteria')
  })

  it('navigates to training when No is clicked', async () => {
    renderPage()
    await userEvent.click(screen.getByRole('button', { name: 'No' }))
    expect(mockNavigate).toHaveBeenCalledWith('/sections/mand/criteria/mand-1/train')
  })

  it('redirects for invalid criterion', () => {
    renderPage('mand', 'nonexistent')
    expect(screen.getByText('Criteria List')).toBeInTheDocument()
  })
})
