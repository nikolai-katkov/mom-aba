import { useCallback } from 'react'

import { useLanguage } from '../../../hooks'
import type { Language } from '../../../i18n'
import styles from './LanguageSwitcher.module.css'

const LANGUAGES: Language[] = ['ru', 'en']

const LANGUAGE_LABELS: Record<Language, string> = {
  ru: 'RU',
  en: 'EN',
}

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  const handleRu = useCallback(() => {
    setLanguage('ru')
  }, [setLanguage])

  const handleEn = useCallback(() => {
    setLanguage('en')
  }, [setLanguage])

  const handlers: Record<Language, () => void> = {
    ru: handleRu,
    en: handleEn,
  }

  return (
    <div className={styles.switcher} role="group" aria-label={t('switchLanguage')}>
      {LANGUAGES.map(lang => (
        <button
          key={lang}
          type="button"
          className={`${styles.button} ${lang === language ? styles.active : ''}`}
          aria-pressed={lang === language}
          onClick={handlers[lang]}
        >
          {LANGUAGE_LABELS[lang]}
        </button>
      ))}
    </div>
  )
}
