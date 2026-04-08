import type { ReactNode } from 'react'
import { useCallback, useState } from 'react'

import { useLanguage } from '../../../hooks'
import { tProps } from '../../../i18n'
import styles from './ProgressiveDisclosure.module.css'

interface ProgressiveDisclosureProps {
  children: ReactNode
  collapsedLabel?: string
  expandedLabel?: string
}

export function ProgressiveDisclosure({
  children,
  collapsedLabel,
  expandedLabel,
}: ProgressiveDisclosureProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { t } = useLanguage()

  const resolvedCollapsedLabel = collapsedLabel ?? t('readMore')
  const resolvedExpandedLabel = expandedLabel ?? t('showLess')

  const handleToggle = useCallback(() => {
    setIsExpanded(previous => !previous)
  }, [])

  return (
    <div className={styles.container}>
      <div className={`${styles.content} ${isExpanded ? styles.expanded : ''}`}>
        <div className={styles.inner}>{children}</div>
      </div>
      <button
        className={styles.toggle}
        onClick={handleToggle}
        type="button"
        aria-expanded={isExpanded}
        {...tProps(isExpanded ? 'showLess' : 'readMore')}
      >
        {isExpanded ? resolvedExpandedLabel : resolvedCollapsedLabel}
      </button>
    </div>
  )
}
