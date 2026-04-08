import { useLanguage } from '../../../hooks'
import type { UiTranslations } from '../../../i18n'
import { tProps } from '../../../i18n'
import type { CriterionStatus } from '../../../types'
import styles from './StatusBadge.module.css'

interface StatusBadgeProps {
  status: CriterionStatus
}

const STATUS_KEYS: Record<CriterionStatus, keyof UiTranslations> = {
  NotStarted: 'statusNotStarted',
  InProgress: 'statusInProgress',
  Completed: 'statusCompleted',
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useLanguage()
  const key = STATUS_KEYS[status]

  return (
    <span className={`${styles.badge} ${styles[status]}`} {...tProps(key)}>
      {status === 'Completed' && <span aria-hidden="true">&#10003; </span>}
      {t(key)}
    </span>
  )
}
