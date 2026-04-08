import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import { AssessmentProvider } from '../../src/hooks'
import { LanguageProvider } from '../../src/i18n'
import { SECTIONS_BY_LANGUAGE } from '../../src/i18n/translations'
import { SectionsListPage } from '../../src/pages/SectionsListPage'
import { byT } from '../helpers/byT'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

function renderPage() {
  return render(
    <MemoryRouter>
      <LanguageProvider initialLanguage="en">
        <AssessmentProvider sections={SECTIONS_BY_LANGUAGE.en}>
          <SectionsListPage />
        </AssessmentProvider>
      </LanguageProvider>
    </MemoryRouter>
  )
}

describe('SectionsListPage', () => {
  beforeEach(() => {
    localStorage.clear()
    mockNavigate.mockClear()
  })

  it('renders MAND card with title and progress', () => {
    renderPage()
    expect(screen.getByText('MAND')).toBeInTheDocument()
    expect(screen.getByText('0/5')).toBeInTheDocument()
  })

  it('renders TACT card as coming soon', () => {
    renderPage()
    expect(screen.getByText('TACT')).toBeInTheDocument()
    expect(byT('comingSoon')).toBeInTheDocument()
  })

  it('navigates to MAND intro when MAND card is clicked', async () => {
    renderPage()
    await userEvent.click(screen.getByText('MAND'))
    expect(mockNavigate).toHaveBeenCalledWith('/sections/mand/intro')
  })

  it('does not navigate when TACT card is clicked', async () => {
    renderPage()
    await userEvent.click(screen.getByText('TACT'))
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})
