import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { MemoryRouter } from 'react-router-dom'

import { AssessmentProvider } from '../../src/hooks'
import type { Language } from '../../src/i18n'
import { LanguageProvider } from '../../src/i18n'
import { SECTIONS_BY_LANGUAGE } from '../../src/i18n/translations'

interface RenderOptions {
  language?: Language
  initialEntries?: string[]
}

export function renderWithProviders(
  ui: ReactElement,
  { language = 'en', initialEntries = ['/'] }: RenderOptions = {}
) {
  const sections = SECTIONS_BY_LANGUAGE[language]

  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <LanguageProvider initialLanguage={language}>
        <AssessmentProvider sections={sections}>{ui}</AssessmentProvider>
      </LanguageProvider>
    </MemoryRouter>
  )
}
