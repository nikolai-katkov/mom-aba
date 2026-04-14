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

function renderPage(sectionId = 'mand', levelId = 'mand-1') {
  return render(
    <MemoryRouter initialEntries={[`/${sectionId}/levels/${levelId}/train`]}>
      <LanguageProvider initialLanguage="en">
        <AssessmentProvider sections={SECTIONS_BY_LANGUAGE.en}>
          <Routes>
            <Route path="/:sectionId/levels/:levelId/train" element={<TrainingPage />} />
            <Route path="/:sectionId/levels" element={<div>Levels List</div>} />
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

  it('toggles full guide', async () => {
    renderPage()
    const toggle = byT('readMore')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(toggle)
    expect(byT('showLess')).toHaveAttribute('aria-expanded', 'true')
  })

  it('navigates to practice when Start Practice is clicked', async () => {
    renderPage()
    await userEvent.click(byT('startPractice'))
    expect(mockNavigate).toHaveBeenCalledWith('/mand/levels/mand-1/practice')
  })

  it('navigates to levels list when Back is clicked', async () => {
    renderPage()
    await userEvent.click(byT('backToList'))
    expect(mockNavigate).toHaveBeenCalledWith('/mand/levels')
  })

  it('redirects for invalid level', () => {
    renderPage('mand', 'nonexistent')
    expect(screen.getByText('Levels List')).toBeInTheDocument()
  })
})
