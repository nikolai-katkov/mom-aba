import { useCallback } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { Button, PageLayout, ProgressiveDisclosure, VideoPlaceholder } from '../components/ui'
import { SECTIONS, TRAINING_CONTENT } from '../data'
import styles from './TrainingPage.module.css'

export function TrainingPage() {
  const { sectionId, criterionId } = useParams<{
    sectionId: string
    criterionId: string
  }>()
  const navigate = useNavigate()

  const section = SECTIONS.find(s => s.id === sectionId)
  const criterion = section?.criteria.find(c => c.id === criterionId)
  const training = criterionId ? TRAINING_CONTENT[criterionId] : undefined

  const handleRetry = useCallback(() => {
    if (!section || !criterion) {
      return
    }
    navigate(`/sections/${section.id}/criteria/${criterion.id}/assess`)
  }, [navigate, section, criterion])

  const handleBack = useCallback(() => {
    if (!section) {
      return
    }
    navigate(`/sections/${section.id}/criteria`)
  }, [navigate, section])

  if (!section || !criterion || !training) {
    return <Navigate to={sectionId ? `/sections/${sectionId}/criteria` : '/'} replace />
  }

  return (
    <PageLayout title={criterion.title} hasBackButton backPath={`/sections/${section.id}/criteria`}>
      <VideoPlaceholder />

      <ol className={styles.stepList}>
        {training.shortGuide.map(step => (
          <li key={step.stepNumber} className={styles.stepItem}>
            {step.instruction}
          </li>
        ))}
      </ol>

      <ProgressiveDisclosure>
        <div className={styles.fullGuide}>
          {training.fullGuide.split('\n\n').map(paragraph => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}

          {training.commonMistakes.length > 0 && (
            <>
              <h4 className={styles.mistakesTitle}>Common mistakes</h4>
              <ul className={styles.mistakesList}>
                {training.commonMistakes.map(mistake => (
                  <li key={mistake}>{mistake}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </ProgressiveDisclosure>

      <div className={styles.actions}>
        <Button onClick={handleRetry}>Retry Assessment</Button>
        <Button variant="ghost" onClick={handleBack}>
          Back to List
        </Button>
      </div>
    </PageLayout>
  )
}
