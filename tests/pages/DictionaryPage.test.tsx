import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { DictionaryProvider, useDictionary } from '../../src/hooks'
import { LanguageProvider } from '../../src/i18n'
import { VOCABULARY_BY_LANGUAGE } from '../../src/i18n/translations'
import { DictionaryPage } from '../../src/pages/DictionaryPage'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

function OnboardedWrapper({ children }: { children: ReactNode }) {
  const { isOnboardingCompleted, completeOnboarding } = useDictionary()

  if (!isOnboardingCompleted) {
    completeOnboarding('intermediate')
    return null
  }

  return children
}

function renderPage(categoryId?: string) {
  const path = categoryId ? `/dictionary/${categoryId}` : '/dictionary'
  return render(
    <MemoryRouter initialEntries={[path]}>
      <LanguageProvider initialLanguage="en">
        <DictionaryProvider vocabulary={VOCABULARY_BY_LANGUAGE.en}>
          <OnboardedWrapper>
            <Routes>
              <Route path="/dictionary/:categoryId?" element={<DictionaryPage />} />
            </Routes>
          </OnboardedWrapper>
        </DictionaryProvider>
      </LanguageProvider>
    </MemoryRouter>
  )
}

describe('DictionaryPage', () => {
  beforeEach(() => {
    localStorage.clear()
    mockNavigate.mockClear()
  })

  it('renders the dictionary title', () => {
    renderPage()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("My Child's Words")
  })

  it('renders category rail with all categories', () => {
    renderPage()
    expect(screen.getByRole('navigation', { name: 'Categories' })).toBeInTheDocument()
  })

  it('defaults to first category when no param', () => {
    renderPage()
    // First category is "toys", should show its name as h2
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Toys')
  })

  it('selects category from URL param', () => {
    renderPage('shapes')
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Shapes')
  })

  it('switches category on rail click', async () => {
    renderPage('toys')
    const shapesButton = screen.getByTitle('Shapes')
    await userEvent.click(shapesButton)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Shapes')
  })

  it('renders mastery badges on included words', () => {
    renderPage('toys')
    const badges = screen.getAllByText('requests')
    expect(badges.length).toBeGreaterThan(0)
  })

  it('toggles word inclusion on click', async () => {
    renderPage('toys')
    const pressedButtons = screen.getAllByRole('button', { pressed: true })
    const wordButton = pressedButtons.find(btn => btn.textContent.includes('ball'))
    expect(wordButton).toBeTruthy()

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- guaranteed above
    await userEvent.click(wordButton!)

    const unpressed = screen.getAllByRole('button', { pressed: false })
    const toggled = unpressed.find(btn => btn.textContent.includes('ball'))
    expect(toggled).toBeTruthy()
  })
})
