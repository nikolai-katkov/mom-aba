import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { Card, PageLayout, ProgressBar, StatusBadge } from '../components/ui'
import { SECTIONS } from '../data'
import { useAssessment } from '../hooks'
import type { Section } from '../types'
import styles from './SectionsListPage.module.css'

function SectionCard({ section }: { section: Section }) {
  const navigate = useNavigate()
  const { getSectionProgress } = useAssessment()
  const progress = getSectionProgress(section.id)

  const handleClick = useCallback(() => {
    navigate(`/sections/${section.id}/intro`)
  }, [navigate, section.id])

  return (
    <Card isDisabled={!section.isAvailable} onClick={handleClick}>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <div>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <p className={styles.sectionSubtitle}>
              {section.isAvailable ? section.subtitle : 'Coming soon'}
            </p>
          </div>
          {section.isAvailable ? <StatusBadge status={progress.status} /> : null}
        </div>
        {section.isAvailable ? (
          <div className={styles.progressArea}>
            <ProgressBar completed={progress.completed} total={progress.total} />
            <span className={styles.progressLabel}>
              {progress.completed}/{progress.total}
            </span>
          </div>
        ) : null}
      </div>
    </Card>
  )
}

export function SectionsListPage() {
  return (
    <PageLayout title="Neuron">
      <p className={styles.subtitle}>Helping parents support their autistic children</p>
      <div className={styles.sectionList}>
        {SECTIONS.map(section => (
          <SectionCard key={section.id} section={section} />
        ))}
      </div>
    </PageLayout>
  )
}
