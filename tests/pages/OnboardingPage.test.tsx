import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import { DictionaryProvider } from '../../src/hooks'
import { LanguageProvider } from '../../src/i18n'
import { VOCABULARY_BY_LANGUAGE } from '../../src/i18n/translations'
import { OnboardingPage } from '../../src/pages/OnboardingPage'
import { byT } from '../helpers/byT'

function renderPage() {
  return render(
    <MemoryRouter>
      <LanguageProvider initialLanguage="en">
        <DictionaryProvider vocabulary={VOCABULARY_BY_LANGUAGE.en}>
          <OnboardingPage />
        </DictionaryProvider>
      </LanguageProvider>
    </MemoryRouter>
  )
}

describe('OnboardingPage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the title and three level options', () => {
    renderPage()
    expect(byT('onboardingTitle')).toBeInTheDocument()
    expect(byT('onboardingBeginner')).toBeInTheDocument()
    expect(byT('onboardingIntermediate')).toBeInTheDocument()
    expect(byT('onboardingAdvanced')).toBeInTheDocument()
  })

  it('dims other cards when one is selected', async () => {
    renderPage()
    const buttons = screen.getAllByRole('button')
    const levelButtons = buttons.filter(b => b.dataset.level)

    await userEvent.click(levelButtons[1]) // intermediate

    expect(levelButtons[1]).toHaveAttribute('aria-pressed', 'true')
    // Other buttons should be disabled after selection
    expect(levelButtons[0]).toBeDisabled()
    expect(levelButtons[2]).toBeDisabled()
  })

  it('saves onboarding level to localStorage after selection', async () => {
    renderPage()
    const buttons = screen.getAllByRole('button')
    const levelButton = buttons.find(b => b.dataset.level)

    await userEvent.click(levelButton) // beginner

    await waitFor(
      () => {
        const stored = JSON.parse(
          localStorage.getItem('mom-aba-dictionary-state') ?? '{}'
        ) as Record<string, unknown>
        expect(stored.onboardingCompleted).toBe(true)
        expect(stored.onboardingLevel).toBe('beginner')
      },
      { timeout: 1000 }
    )
  })
})
