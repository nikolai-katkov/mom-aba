import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { DictionaryProvider, useDictionary } from '../../src/hooks'
import { LanguageProvider } from '../../src/i18n'
import { VOCABULARY_BY_LANGUAGE } from '../../src/i18n/translations'
import { DictionaryCategoryDetailPage } from '../../src/pages/DictionaryCategoryDetailPage'

/**
 * Wrapper that auto-completes onboarding at intermediate level
 * so the dictionary has included words to display.
 */
function OnboardedWrapper({ children }: { children: ReactNode }) {
  const { isOnboardingCompleted, completeOnboarding } = useDictionary()

  if (!isOnboardingCompleted) {
    completeOnboarding('intermediate')
    return null
  }

  return children
}

function renderPage(categoryId = 'toys') {
  return render(
    <MemoryRouter initialEntries={[`/dictionary/${categoryId}`]}>
      <LanguageProvider initialLanguage="en">
        <DictionaryProvider vocabulary={VOCABULARY_BY_LANGUAGE.en}>
          <OnboardedWrapper>
            <Routes>
              <Route path="/dictionary/:categoryId" element={<DictionaryCategoryDetailPage />} />
              <Route path="/dictionary" element={<div>Dictionary Home</div>} />
            </Routes>
          </OnboardedWrapper>
        </DictionaryProvider>
      </LanguageProvider>
    </MemoryRouter>
  )
}

describe('DictionaryCategoryDetailPage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the category title', () => {
    renderPage('toys')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Toys')
  })

  it('renders difficulty column headers', () => {
    renderPage('toys')
    // Each difficulty appears in both desktop columns and mobile tabs
    expect(screen.getAllByText('Simple').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Medium').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Complex').length).toBeGreaterThanOrEqual(1)
  })

  it('renders included words as pressed buttons', () => {
    renderPage('toys')
    // Intermediate level = all simple words included
    const ballButtons = screen.getAllByRole('button', { name: 'ball' })
    expect(ballButtons[0]).toHaveAttribute('aria-pressed', 'true')
  })

  it('toggles a word from included to excluded on click', async () => {
    renderPage('toys')
    const ballButtons = screen.getAllByRole('button', { name: 'ball' })

    await userEvent.click(ballButtons[0])

    const updatedButtons = screen.getAllByRole('button', { name: 'ball' })
    expect(updatedButtons[0]).toHaveAttribute('aria-pressed', 'false')
  })

  it('redirects to /dictionary for invalid category', () => {
    renderPage('nonexistent')
    expect(screen.getByText('Dictionary Home')).toBeInTheDocument()
  })

  it('renders mastery dots on included words', () => {
    renderPage('toys')
    const requestingDots = screen.getAllByTitle('Requesting')
    expect(requestingDots.length).toBeGreaterThan(0)
  })
})
