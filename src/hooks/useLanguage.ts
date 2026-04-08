import { useContext } from 'react'

import type { LanguageContextValue } from '../i18n'
import { LanguageContext } from '../i18n'

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
