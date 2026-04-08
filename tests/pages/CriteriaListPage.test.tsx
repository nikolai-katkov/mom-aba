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
    <MemoryRouter initialEntries={[`/sections/${sectionId}/criteria`]}>
      <LanguageProvider initialLanguage="en">
        <AssessmentProvider sections={SECTIONS_BY_LANGUAGE.en}>
          <Routes>
            <Route path="/sections/:sectionId/criteria" element={<CriteriaListPage />} />
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
    // Click on the first criterion card (skip PageLayout and language switcher buttons)
    const allButtons = screen.getAllByRole('button')
    // Back button, RU, EN, then 5 criterion cards
    const firstCriterionCard = allButtons[3]
    await userEvent.click(firstCriterionCard)
    expect(mockNavigate).toHaveBeenCalledWith('/sections/mand/criteria/mand-1/assess')
  })

  it('redirects to home for invalid section', () => {
    renderPage('nonexistent')
    expect(screen.getByText('Home')).toBeInTheDocument()
  })
})
