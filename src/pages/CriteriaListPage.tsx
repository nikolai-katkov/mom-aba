import { useCallback, useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import type { BreadcrumbItem } from '../components/ui'
import { Card, PageLayout, ProgressBar, StatusBadge } from '../components/ui'
import { useAssessment, useLanguage } from '../hooks'
import { interpolate, tProps } from '../i18n'
import type { Criterion } from '../types'
import { ROMAN } from '../utils'
import styles from './CriteriaListPage.module.css'

function CriterionCard({ criterion, sectionId }: { criterion: Criterion; sectionId: string }) {
  const navigate = useNavigate()
  const { getCriterionState } = useAssessment()
  const criterionState = getCriterionState(criterion.id)

  const handleClick = useCallback(() => {
    navigate(`/${sectionId}/levels/${criterion.id}`)
  }, [navigate, sectionId, criterion.id])

  return (
    <Card onClick={handleClick}>
      <div className={styles.criterionCard}>
        <div className={styles.levelBadge}>{ROMAN[criterion.level]}</div>
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
  const { t, sections } = useLanguage()

  const section = sections.find(s => s.id === sectionId)

  const breadcrumbs: BreadcrumbItem[] = useMemo(
    () =>
      section
        ? [
            { label: t('home'), path: '/' },
            { label: section.title, path: `/${section.id}` },
            { label: t('breadcrumbLevels'), path: `/${section.id}/levels` },
          ]
        : [],
    [t, section]
  )

  if (!section) {
    return <Navigate to="/" replace />
  }

  const progress = getSectionProgress(section.id)

  return (
    <PageLayout title={section.title} breadcrumbs={breadcrumbs}>
      <div className={styles.progressHeader}>
        <ProgressBar completed={progress.completed} total={progress.total} />
        <span className={styles.progressLabel} {...tProps('completedOfTotal')}>
          {interpolate(t('completedOfTotal'), {
            completed: progress.completed,
            total: progress.total,
          })}
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
