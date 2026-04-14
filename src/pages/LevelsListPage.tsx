import { useCallback, useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import type { BreadcrumbItem } from '../components/ui'
import { Card, PageLayout, ProgressBar, StatusBadge } from '../components/ui'
import { useAssessment, useLanguage } from '../hooks'
import { interpolate, tProps } from '../i18n'
import type { Level } from '../types'
import { ROMAN } from '../utils'
import styles from './LevelsListPage.module.css'

function LevelCard({ level, sectionId }: { level: Level; sectionId: string }) {
  const navigate = useNavigate()
  const { getLevelState } = useAssessment()
  const levelState = getLevelState(level.id)

  const handleClick = useCallback(() => {
    navigate(`/${sectionId}/levels/${level.id}`)
  }, [navigate, sectionId, level.id])

  return (
    <Card onClick={handleClick}>
      <div className={styles.levelCard}>
        <div className={styles.levelBadge}>{ROMAN[level.level]}</div>
        <div className={styles.levelContent}>
          <div className={styles.levelHeader}>
            <h3 className={styles.levelTitle}>{level.title}</h3>
            <StatusBadge status={levelState.status} />
          </div>
          <p className={styles.levelDescription}>{level.description}</p>
        </div>
      </div>
    </Card>
  )
}

export function LevelsListPage() {
  const { sectionId } = useParams<{ sectionId: string }>()
  const { getSectionProgress } = useAssessment()
  const { t, sections } = useLanguage()

  const section = sections.find(s => s.id === sectionId)

  const sectionSiblings = useMemo(
    () =>
      sections
        .filter(s => s.isAvailable)
        .map(s => ({
          label: s.title,
          path: `/${s.id}/levels`,
          isCurrent: s.id === sectionId,
        })),
    [sections, sectionId]
  )

  const breadcrumbs: BreadcrumbItem[] = useMemo(
    () =>
      section
        ? [
            { label: t('home'), path: '/' },
            { label: section.title, path: `/${section.id}`, siblings: sectionSiblings },
            { label: t('breadcrumbLevels'), path: `/${section.id}/levels` },
          ]
        : [],
    [t, section, sectionSiblings]
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

      <div className={styles.levelsList}>
        {section.levels.map(level => (
          <LevelCard key={level.id} level={level} sectionId={section.id} />
        ))}
      </div>
    </PageLayout>
  )
}
