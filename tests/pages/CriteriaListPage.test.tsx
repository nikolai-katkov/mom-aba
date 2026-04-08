import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { AssessmentProvider } from '../../src/hooks'
import { CriteriaListPage } from '../../src/pages/CriteriaListPage'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

function renderPage(sectionId = 'mand') {
  return render(
    <MemoryRouter initialEntries={[`/sections/${sectionId}/criteria`]}>
      <AssessmentProvider>
        <Routes>
          <Route path="/sections/:sectionId/criteria" element={<CriteriaListPage />} />
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </AssessmentProvider>
    </MemoryRouter>
  )
}

describe('CriteriaListPage', () => {
  beforeEach(() => {
    localStorage.clear()
    mockNavigate.mockClear()
  })

  it('renders 5 criterion cards', () => {
    renderPage()
    expect(screen.getByText('Uses 2 words or gestures')).toBeInTheDocument()
    expect(screen.getByText('Makes 4 independent requests')).toBeInTheDocument()
    expect(screen.getByText('Generalizes 6 requests')).toBeInTheDocument()
    expect(screen.getByText('Spontaneously makes 5 requests')).toBeInTheDocument()
    expect(screen.getByText('Has 10 independent requests')).toBeInTheDocument()
  })

  it('shows progress bar with 0/5', () => {
    renderPage()
    expect(screen.getByText('0/5 completed')).toBeInTheDocument()
  })

  it('navigates to assessment when a criterion is clicked', async () => {
    renderPage()
    await userEvent.click(screen.getByText('Uses 2 words or gestures'))
    expect(mockNavigate).toHaveBeenCalledWith('/sections/mand/criteria/mand-1/assess')
  })

  it('redirects to home for invalid section', () => {
    renderPage('nonexistent')
    expect(screen.getByText('Home')).toBeInTheDocument()
  })
})
