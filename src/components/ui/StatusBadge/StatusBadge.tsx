import type { CriterionStatus } from '../../../types'
import styles from './StatusBadge.module.css'

interface StatusBadgeProps {
  status: CriterionStatus
}

const STATUS_LABELS: Record<CriterionStatus, string> = {
  NotStarted: 'Not started',
  InProgress: 'In progress',
  Completed: 'Completed',
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[status]}`}>
      {status === 'Completed' && <span aria-hidden="true">&#10003; </span>}
      {STATUS_LABELS[status]}
    </span>
  )
}
