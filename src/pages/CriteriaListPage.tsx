import { useCallback } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { Card, PageLayout, ProgressBar, StatusBadge } from '../components/ui'
import { SECTIONS } from '../data'
import { useAssessment } from '../hooks'
import type { Criterion } from '../types'
import styles from './CriteriaListPage.module.css'

function CriterionCard({ criterion, sectionId }: { criterion: Criterion; sectionId: string }) {
  const navigate = useNavigate()
  const { getCriterionState } = useAssessment()
  const criterionState = getCriterionState(criterion.id)

  const handleClick = useCallback(() => {
    navigate(`/sections/${sectionId}/criteria/${criterion.id}/assess`)
  }, [navigate, sectionId, criterion.id])

  return (
    <Card onClick={handleClick}>
      <div className={styles.criterionCard}>
        <div className={styles.levelBadge}>{criterion.level}</div>
        <div className={styles.criterionContent}>
          <div className={styles.criterionHeader}>
            <h3 className={styles.criterionTitle}>{criterion.title}</h3>
            <StatusBadge status={criterionState.status} />
          </div>
          <p className={styles.criterionDescription}>{criterion.description}</p>
        </div>
      </div>
    </Card>
  )
}

export function CriteriaListPage() {
  const { sectionId } = useParams<{ sectionId: string }>()
  const { getSectionProgress } = useAssessment()

  const section = SECTIONS.find(s => s.id === sectionId)

  if (!section) {
    return <Navigate to="/" replace />
  }

  const progress = getSectionProgress(section.id)

  return (
    <PageLayout title={section.title} hasBackButton backPath={`/sections/${section.id}/intro`}>
      <div className={styles.progressHeader}>
        <ProgressBar completed={progress.completed} total={progress.total} />
        <span className={styles.progressLabel}>
          {progress.completed}/{progress.total} completed
        </span>
      </div>

      <div className={styles.criteriaList}>
        {section.criteria.map(criterion => (
          <CriterionCard key={criterion.id} criterion={criterion} sectionId={section.id} />
        ))}
      </div>
    </PageLayout>
  )
}
