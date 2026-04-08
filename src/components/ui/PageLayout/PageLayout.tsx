import type { ReactNode } from 'react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './PageLayout.module.css'

interface PageLayoutProps {
  children: ReactNode
  title?: string
  hasBackButton?: boolean
  backPath?: string
}

export function PageLayout({ children, title, hasBackButton = false, backPath }: PageLayoutProps) {
  const navigate = useNavigate()

  const handleBack = useCallback(() => {
    if (backPath) {
      navigate(backPath)
    } else {
      navigate(-1)
    }
  }, [navigate, backPath])

  return (
    <main className={styles.layout}>
      {hasBackButton || title ? (
        <header className={styles.header}>
          {hasBackButton ? (
            <button
              className={styles.backButton}
              onClick={handleBack}
              type="button"
              aria-label="Go back"
            >
              &#8592; Back
            </button>
          ) : null}
          {title ? <h1 className={styles.title}>{title}</h1> : null}
        </header>
      ) : null}
      <div className={styles.content}>{children}</div>
    </main>
  )
}
