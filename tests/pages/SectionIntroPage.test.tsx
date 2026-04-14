import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { AssessmentProvider } from '../../src/hooks'
import { LanguageProvider } from '../../src/i18n'
import { SECTIONS_BY_LANGUAGE } from '../../src/i18n/translations'
import { SectionIntroPage } from '../../src/pages/SectionIntroPage'
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
    <MemoryRouter initialEntries={[`/${sectionId}`]}>
      <LanguageProvider initialLanguage="en">
        <AssessmentProvider sections={SECTIONS_BY_LANGUAGE.en}>
          <Routes>
            <Route path="/:sectionId" element={<SectionIntroPage />} />
            <Route path="/" element={<div>Home</div>} />
          </Routes>
        </AssessmentProvider>
      </LanguageProvider>
    </MemoryRouter>
  )
}

describe('SectionIntroPage', () => {
  beforeEach(() => {
    localStorage.clear()
    mockNavigate.mockClear()
  })

  it('renders section title', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: 'Mand', level: 1 })).toBeInTheDocument()
  })

  it('toggles full explanation', async () => {
    renderPage()
    const toggle = byT('readMore')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(toggle)
    expect(byT('showLess')).toHaveAttribute('aria-expanded', 'true')
  })

  it('navigates to levels list when Start is clicked', async () => {
    renderPage()
    await userEvent.click(byT('start'))
    expect(mockNavigate).toHaveBeenCalledWith('/mand/levels')
  })

  it('redirects to home for invalid sectionId', () => {
    renderPage('nonexistent')
    expect(screen.getByText('Home')).toBeInTheDocument()
  })
})
