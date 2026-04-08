import type { ReactNode } from 'react'
import { useCallback, useState } from 'react'

import styles from './ProgressiveDisclosure.module.css'

interface ProgressiveDisclosureProps {
  children: ReactNode
  collapsedLabel?: string
  expandedLabel?: string
}

export function ProgressiveDisclosure({
  children,
  collapsedLabel = 'Read more',
  expandedLabel = 'Show less',
}: ProgressiveDisclosureProps) {
  const [isExpanded, setIsExpanded] = useState(false)

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
      >
        {isExpanded ? expandedLabel : collapsedLabel}
      </button>
    </div>
  )
}
