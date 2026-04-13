import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import { DictionaryProvider } from '../../src/hooks'
import { LanguageProvider } from '../../src/i18n'
import { VOCABULARY_BY_LANGUAGE } from '../../src/i18n/translations'
import { DictionaryCategoriesPage } from '../../src/pages/DictionaryCategoriesPage'

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
    <MemoryRouter initialEntries={['/dictionary']}>
      <LanguageProvider initialLanguage="en">
        <DictionaryProvider vocabulary={VOCABULARY_BY_LANGUAGE.en}>
          <DictionaryCategoriesPage />
        </DictionaryProvider>
      </LanguageProvider>
    </MemoryRouter>
  )
}

describe('DictionaryCategoriesPage', () => {
  beforeEach(() => {
    localStorage.clear()
    mockNavigate.mockClear()
  })

  it('renders the dictionary title', () => {
    renderPage()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("My Child's Words")
  })

  it('renders 27 category cards', () => {
    renderPage()
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBe(27)
  })

  it('navigates to category detail when a card is clicked', async () => {
    renderPage()
    await userEvent.click(screen.getByText('Toys'))
    expect(mockNavigate).toHaveBeenCalledWith('/dictionary/toys')
  })
})
