import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { Card, PageLayout, ProgressBar, StatusBadge } from '../components/ui'
import { useAssessment, useLanguage } from '../hooks'
import { tProps } from '../i18n'
import type { Section } from '../types'
import styles from './SectionsListPage.module.css'

function SectionCard({ section }: { section: Section }) {
  const navigate = useNavigate()
  const { getSectionProgress } = useAssessment()
  const { t } = useLanguage()
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
              {section.isAvailable ? (
                section.subtitle
              ) : (
                <span {...tProps('comingSoon')}>{t('comingSoon')}</span>
              )}
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
  const { t, sections } = useLanguage()

  return (
    <PageLayout title={t('appTitle')}>
      <p className={styles.subtitle} {...tProps('appSubtitle')}>
        {t('appSubtitle')}
      </p>
      <div className={styles.sectionList}>
        {sections.map(section => (
          <SectionCard key={section.id} section={section} />
        ))}
      </div>
    </PageLayout>
  )
}
