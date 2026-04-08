import { useCallback } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { Button, PageLayout } from '../components/ui'
import { SECTIONS } from '../data'
import { useAssessment } from '../hooks'
import styles from './CriterionAssessmentPage.module.css'

export function CriterionAssessmentPage() {
  const { sectionId, criterionId } = useParams<{
    sectionId: string
    criterionId: string
  }>()
  const navigate = useNavigate()
  const { setCriterionResult } = useAssessment()

  const section = SECTIONS.find(s => s.id === sectionId)
  const criterion = section?.criteria.find(c => c.id === criterionId)

  const handleYes = useCallback(() => {
    if (!criterion || !section) {
      return
    }
    setCriterionResult(criterion.id, 1)
    navigate(`/sections/${section.id}/criteria`)
  }, [criterion, section, setCriterionResult, navigate])

  const handleNo = useCallback(() => {
    if (!criterion || !section) {
      return
    }
    setCriterionResult(criterion.id, 0)
    navigate(`/sections/${section.id}/criteria/${criterion.id}/train`)
  }, [criterion, section, setCriterionResult, navigate])

  if (!section || !criterion) {
    return <Navigate to={sectionId ? `/sections/${sectionId}/criteria` : '/'} replace />
  }

  return (
    <PageLayout hasBackButton backPath={`/sections/${section.id}/criteria`}>
      <div className={styles.illustrationPlaceholder}>
        <span className={styles.placeholderLabel}>Illustration</span>
      </div>

      <h2 className={styles.question}>{criterion.question}</h2>

      {criterion.conditions.length > 0 && (
        <div className={styles.context}>
          <h3 className={styles.contextTitle}>What to look for</h3>
          <ul className={styles.conditionsList}>
            {criterion.conditions.map(condition => (
              <li key={condition} className={styles.conditionItem}>
                {condition}
              </li>
            ))}
          </ul>
        </div>
      )}

      {criterion.examples.length > 0 && (
        <div className={styles.examples}>
          <span className={styles.examplesLabel}>Examples: </span>
          {criterion.examples.join(', ')}
        </div>
      )}

      <div className={styles.actions}>
        <Button onClick={handleYes}>Yes</Button>
        <Button variant="secondary" onClick={handleNo}>
          No
        </Button>
      </div>
    </PageLayout>
  )
}
