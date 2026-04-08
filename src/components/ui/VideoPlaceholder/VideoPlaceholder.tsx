import styles from './VideoPlaceholder.module.css'

interface VideoPlaceholderProps {
  label?: string
}

export function VideoPlaceholder({ label = 'Video coming soon' }: VideoPlaceholderProps) {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
    </div>
  )
}
