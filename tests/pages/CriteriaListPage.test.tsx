import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { AssessmentProvider } from '../../src/hooks'
import { LanguageProvider } from '../../src/i18n'
import { SECTIONS_BY_LANGUAGE } from '../../src/i18n/translations'
import { CriteriaListPage } from '../../src/pages/CriteriaListPage'
import { byT } from '../helpers/byT'

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
    <MemoryRouter initialEntries={[`/${sectionId}/levels`]}>
      <LanguageProvider initialLanguage="en">
        <AssessmentProvider sections={SECTIONS_BY_LANGUAGE.en}>
          <Routes>
            <Route path="/:sectionId/levels" element={<CriteriaListPage />} />
            <Route path="/" element={<div>Home</div>} />
          </Routes>
        </AssessmentProvider>
      </LanguageProvider>
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
    const statusBadges = document.querySelectorAll('[data-t="statusNotStarted"]')
    expect(statusBadges).toHaveLength(5)
  })

  it('shows progress bar with completion label', () => {
    renderPage()
    expect(byT('completedOfTotal')).toBeInTheDocument()
  })

  it('navigates to assessment when a criterion is clicked', async () => {
    renderPage()
    const allButtons = screen.getAllByRole('button')
    const firstCriterionCard = allButtons[0]
    await userEvent.click(firstCriterionCard)
    expect(mockNavigate).toHaveBeenCalledWith('/mand/levels/mand-1')
  })

  it('redirects to home for invalid section', () => {
    renderPage('nonexistent')
    expect(screen.getByText('Home')).toBeInTheDocument()
  })
})
