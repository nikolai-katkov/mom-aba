import styles from './ProgressBar.module.css'

interface ProgressBarProps {
  completed: number
  total: number
}

export function ProgressBar({ completed, total }: ProgressBarProps) {
  const percentage = total > 0 ? (completed / total) * 100 : 0

  return (
    <div
      className={styles.track}
      role="progressbar"
      aria-valuenow={completed}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`${completed} of ${total} completed`}
    >
      <div className={styles.fill} style={{ width: `${percentage}%` }} />
    </div>
  )
}
