import type { ReactNode } from 'react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { useLanguage } from '../../../hooks'
import { tProps } from '../../../i18n'
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher'
import styles from './PageLayout.module.css'

interface PageLayoutProps {
  children: ReactNode
  title?: string
  hasBackButton?: boolean
  backPath?: string
}

export function PageLayout({ children, title, hasBackButton = false, backPath }: PageLayoutProps) {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const handleBack = useCallback(() => {
    if (backPath) {
      navigate(backPath)
    } else {
      navigate(-1)
    }
  }, [navigate, backPath])

  return (
    <main className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          {hasBackButton ? (
            <button
              className={styles.backButton}
              onClick={handleBack}
              type="button"
              aria-label={t('goBack')}
              {...tProps('back')}
            >
              &#8592; {t('back')}
            </button>
          ) : (
            <div />
          )}
          <LanguageSwitcher />
        </div>
        {title ? <h1 className={styles.title}>{title}</h1> : null}
      </header>
      <div className={styles.content}>{children}</div>
    </main>
  )
}
