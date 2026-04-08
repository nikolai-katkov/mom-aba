import { useCallback } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { Button, PageLayout, ProgressiveDisclosure, VideoPlaceholder } from '../components/ui'
import { SECTION_INTRODUCTIONS, SECTIONS } from '../data'
import styles from './SectionIntroPage.module.css'

export function SectionIntroPage() {
  const { sectionId } = useParams<{ sectionId: string }>()
  const navigate = useNavigate()

  const section = SECTIONS.find(s => s.id === sectionId)
  const introduction = sectionId ? SECTION_INTRODUCTIONS[sectionId] : undefined

  const criteriaPath = `/sections/${sectionId}/criteria`

  const handleStart = useCallback(() => {
    navigate(criteriaPath)
  }, [navigate, criteriaPath])

  const handleSkip = useCallback(() => {
    navigate(criteriaPath)
  }, [navigate, criteriaPath])

  if (!section || !introduction) {
    return <Navigate to="/" replace />
  }

  return (
    <PageLayout title={section.title} hasBackButton backPath="/">
      <p className={styles.sectionSubtitle}>{section.subtitle}</p>

      <VideoPlaceholder label={introduction.videoPlaceholderLabel} />

      <ul className={styles.bulletList}>
        {introduction.shortBullets.map(bullet => (
          <li key={bullet} className={styles.bulletItem}>
            {bullet}
          </li>
        ))}
      </ul>

      <ProgressiveDisclosure>
        <div className={styles.fullExplanation}>
          {introduction.fullExplanation.split('\n\n').map(paragraph => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </ProgressiveDisclosure>

      <div className={styles.actions}>
        <Button onClick={handleStart}>Start</Button>
        <Button variant="ghost" onClick={handleSkip}>
          Skip
        </Button>
      </div>
    </PageLayout>
  )
}
