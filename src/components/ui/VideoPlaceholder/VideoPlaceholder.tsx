import { useLanguage } from '../../../hooks'
import { tProps } from '../../../i18n'
import styles from './VideoPlaceholder.module.css'

interface VideoPlaceholderProps {
  label?: string
}

export function VideoPlaceholder({ label }: VideoPlaceholderProps) {
  const { t } = useLanguage()
  const resolvedLabel = label ?? t('videoComingSoon')

  return (
    <div className={styles.container}>
      <span className={styles.label} {...tProps('videoComingSoon')}>
        {resolvedLabel}
      </span>
    </div>
  )
}
