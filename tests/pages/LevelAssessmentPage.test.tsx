import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { AssessmentProvider, ThemeProvider } from '../../src/hooks'
import { LanguageProvider } from '../../src/i18n'
import { SECTIONS_BY_LANGUAGE } from '../../src/i18n/translations'
import { LevelAssessmentPage } from '../../src/pages/LevelAssessmentPage'
import { byT } from '../helpers/byT'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

function renderPage(sectionId = 'mand', levelId = 'mand-1') {
  return render(
    <MemoryRouter initialEntries={[`/${sectionId}/levels/${levelId}`]}>
      <ThemeProvider initialTheme="warm" initialColorMode="light">
        <LanguageProvider initialLanguage="en">
          <AssessmentProvider sections={SECTIONS_BY_LANGUAGE.en}>
            <Routes>
              <Route path="/:sectionId/levels/:levelId" element={<LevelAssessmentPage />} />
              <Route path="/:sectionId/levels" element={<div>Levels List</div>} />
              <Route path="/" element={<div>Home</div>} />
            </Routes>
          </AssessmentProvider>
        </LanguageProvider>
      </ThemeProvider>
    </MemoryRouter>
  )
}

describe('LevelAssessmentPage', () => {
  beforeEach(() => {
    localStorage.clear()
    mockNavigate.mockClear()
  })

  it('renders what to look for section', () => {
    renderPage()
    expect(byT('whatToLookFor')).toBeInTheDocument()
  })

  it('navigates to mastery grid when Yes is clicked', async () => {
    renderPage()
    await userEvent.click(byT('yes'))
    expect(mockNavigate).toHaveBeenCalledWith('/mand/levels/mand-1/mastery')
  })

  it('navigates to training when No is clicked', async () => {
    renderPage()
    await userEvent.click(byT('no'))
    expect(mockNavigate).toHaveBeenCalledWith('/mand/levels/mand-1/train')
  })

  it('redirects for invalid level', () => {
    renderPage('mand', 'nonexistent')
    expect(screen.getByText('Levels List')).toBeInTheDocument()
  })
})
