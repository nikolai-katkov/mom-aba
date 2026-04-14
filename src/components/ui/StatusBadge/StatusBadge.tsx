import { Check } from 'lucide-react'

import { useLanguage } from '../../../hooks'
import type { UiTranslations } from '../../../i18n'
import { tProps } from '../../../i18n'
import type { LevelStatus } from '../../../types'
import styles from './StatusBadge.module.css'

interface StatusBadgeProps {
  status: LevelStatus
}

const STATUS_KEYS: Record<LevelStatus, keyof UiTranslations> = {
  NotStarted: 'statusNotStarted',
  InProgress: 'statusInProgress',
  Completed: 'statusCompleted',
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useLanguage()
  const key = STATUS_KEYS[status]

  return (
    <span className={`${styles.badge} ${styles[status]}`} {...tProps(key)}>
      {status === 'Completed' && <Check size={14} aria-hidden="true" />}
      {t(key)}
    </span>
  )
}
