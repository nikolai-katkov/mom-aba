import type { ReactNode } from 'react'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

import type { Section, SectionIntroduction, TrainingContent } from '../types'
import { loadLanguage, saveLanguage } from '../utils'
import {
  INTRODUCTIONS_BY_LANGUAGE,
  SECTIONS_BY_LANGUAGE,
  TRAINING_BY_LANGUAGE,
  UI_TRANSLATIONS,
} from './translations'
import type { Language, UiTranslations } from './types'

const LANGUAGES: Language[] = ['ru', 'en']

function resolveTranslation(key: keyof UiTranslations, language: Language): string {
  const value = UI_TRANSLATIONS[language][key]
  if (value) {
    return value
  }

  // Try fallback to other languages
  for (const fallbackLang of LANGUAGES) {
    if (fallbackLang === language) {
      continue
    }
    const fallback = UI_TRANSLATIONS[fallbackLang][key]
    if (fallback) {
      if (import.meta.env.DEV) {
        console.warn(
          `[i18n] Missing "${language}" translation for "${key}", falling back to "${fallbackLang}"`
        )
      }
      return fallback
    }
  }

  // No translation found in any language
  if (import.meta.env.DEV) {
    console.warn(`[i18n] Missing translation for "${key}" in all languages, rendering key`)
    return key
  }
  return ''
}

export interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: keyof UiTranslations) => string
  sections: Section[]
  sectionIntroductions: Record<string, SectionIntroduction>
  trainingContent: Record<string, TrainingContent>
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
LanguageContext.displayName = 'LanguageContext'

interface LanguageProviderProps {
  children: ReactNode
  initialLanguage?: Language
}

export function LanguageProvider({ children, initialLanguage }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => initialLanguage ?? loadLanguage())

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    saveLanguage(lang)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const t = useCallback(
    (key: keyof UiTranslations): string => resolveTranslation(key, language),
    [language]
  )

  const sections = useMemo(() => SECTIONS_BY_LANGUAGE[language], [language])
  const sectionIntroductions = useMemo(() => INTRODUCTIONS_BY_LANGUAGE[language], [language])
  const trainingContent = useMemo(() => TRAINING_BY_LANGUAGE[language], [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      sections,
      sectionIntroductions,
      trainingContent,
    }),
    [language, setLanguage, t, sections, sectionIntroductions, trainingContent]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
