import { Check, X } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import type { BreadcrumbItem } from '../components/ui'
import { Button, PageLayout } from '../components/ui'
import { useAssessment, useLanguage, useTheme } from '../hooks'
import { tProps } from '../i18n'
import styles from './CriterionAssessmentPage.module.css'

export function CriterionAssessmentPage() {
  const { sectionId, criterionId } = useParams<{
    sectionId: string
    criterionId: string
  }>()
  const navigate = useNavigate()
  const { setCriterionResult } = useAssessment()
  const { t, sections } = useLanguage()
  const { theme } = useTheme()

  const section = sections.find(s => s.id === sectionId)
  const criterion = section?.criteria.find(c => c.id === criterionId)

  const breadcrumbs: BreadcrumbItem[] = useMemo(
    () =>
      section && criterion
        ? [
            { label: t('home'), path: '/' },
            { label: section.title, path: `/sections/${section.id}/criteria` },
            {
              label: `${criterion.level}. ${criterion.title}`,
              path: `/sections/${section.id}/criteria/${criterion.id}/assess`,
            },
          ]
        : [],
    [t, section, criterion]
  )

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
    <PageLayout title={`${criterion.level}. ${criterion.title}`} breadcrumbs={breadcrumbs}>
      <div
        className={[styles.assessmentLayout, styles[`layout_${theme}`]].filter(Boolean).join(' ')}
      >
        <div className={styles.mediaArea}>
          <div className={styles.illustrationPlaceholder}>
            <span className={styles.placeholderLabel} {...tProps('illustration')}>
              {t('illustration')}
            </span>
          </div>
        </div>

        <div className={styles.contentArea}>
          <h2 className={styles.question}>{criterion.question}</h2>

          {criterion.conditions.length > 0 && (
            <div className={styles.context}>
              <h3 className={styles.contextTitle} {...tProps('whatToLookFor')}>
                {t('whatToLookFor')}
              </h3>
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
              <span className={styles.examplesLabel} {...tProps('examplesPrefix')}>
                {t('examplesPrefix')}
              </span>
              {criterion.examples.join(', ')}
            </div>
          )}

          <div className={styles.actions}>
            <Button onClick={handleYes} {...tProps('yes')}>
              <Check size={18} aria-hidden="true" /> {t('yes')}
            </Button>
            <Button variant="secondary" onClick={handleNo} {...tProps('no')}>
              <X size={18} aria-hidden="true" /> {t('no')}
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
