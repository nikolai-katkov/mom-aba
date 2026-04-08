import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { AssessmentProvider } from '../../src/hooks'
import { LanguageProvider } from '../../src/i18n'
import { SECTIONS_BY_LANGUAGE } from '../../src/i18n/translations'
import { TrainingPage } from '../../src/pages/TrainingPage'
import { byT } from '../helpers/byT'

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
      <LanguageProvider initialLanguage="en">
        <AssessmentProvider sections={SECTIONS_BY_LANGUAGE.en}>
          <Routes>
            <Route
              path="/sections/:sectionId/criteria/:criterionId/train"
              element={<TrainingPage />}
            />
            <Route path="/sections/:sectionId/criteria" element={<div>Criteria List</div>} />
            <Route path="/" element={<div>Home</div>} />
          </Routes>
        </AssessmentProvider>
      </LanguageProvider>
    </MemoryRouter>
  )
}

describe('TrainingPage', () => {
  beforeEach(() => {
    localStorage.clear()
    mockNavigate.mockClear()
  })

  it('renders video placeholder', () => {
    renderPage()
    expect(byT('videoComingSoon')).toBeInTheDocument()
  })

  it('toggles full guide', async () => {
    renderPage()
    const toggle = byT('readMore')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(toggle)
    expect(byT('showLess')).toHaveAttribute('aria-expanded', 'true')
  })

  it('navigates to assessment when Retry is clicked', async () => {
    renderPage()
    await userEvent.click(byT('retryAssessment'))
    expect(mockNavigate).toHaveBeenCalledWith('/sections/mand/criteria/mand-1/assess')
  })

  it('navigates to criteria list when Back is clicked', async () => {
    renderPage()
    await userEvent.click(byT('backToList'))
    expect(mockNavigate).toHaveBeenCalledWith('/sections/mand/criteria')
  })

  it('redirects for invalid criterion', () => {
    renderPage('mand', 'nonexistent')
    expect(screen.getByText('Criteria List')).toBeInTheDocument()
  })
})
