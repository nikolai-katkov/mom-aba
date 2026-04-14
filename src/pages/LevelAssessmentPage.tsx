import { Check, X } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import type { BreadcrumbItem } from '../components/ui'
import { Button, PageLayout } from '../components/ui'
import { useAssessment, useLanguage, useTheme } from '../hooks'
import { tProps } from '../i18n'
import { ROMAN } from '../utils'
import styles from './LevelAssessmentPage.module.css'

export function LevelAssessmentPage() {
  const { sectionId, levelId } = useParams<{
    sectionId: string
    levelId: string
  }>()
  const navigate = useNavigate()
  const { setLevelResult } = useAssessment()
  const { t, sections } = useLanguage()
  const { theme } = useTheme()

  const section = sections.find(s => s.id === sectionId)
  const level = section?.levels.find(l => l.id === levelId)

  const sectionSiblings = useMemo(
    () =>
      sections
        .filter(s => s.isAvailable && s.levels.length > 0)
        .map(s => ({
          label: s.title,
          path: `/${s.id}/levels/${s.levels[0].id}`,
          isCurrent: s.id === sectionId,
        })),
    [sections, sectionId]
  )

  const levelSiblings = useMemo(
    () =>
      section
        ? section.levels.map(l => ({
            label: `${ROMAN[l.level]} - ${l.title}`,
            path: `/${section.id}/levels/${l.id}`,
            isCurrent: l.id === levelId,
          }))
        : [],
    [section, levelId]
  )

  const breadcrumbs: BreadcrumbItem[] = useMemo(
    () =>
      section && level
        ? [
            { label: t('home'), path: '/' },
            { label: section.title, path: `/${section.id}`, siblings: sectionSiblings },
            { label: t('breadcrumbLevels'), path: `/${section.id}/levels` },
            {
              label: `${ROMAN[level.level]} - ${level.title}`,
              path: `/${section.id}/levels/${level.id}`,
              siblings: levelSiblings,
            },
          ]
        : [],
    [t, section, level, sectionSiblings, levelSiblings]
  )

  const handleYes = useCallback(() => {
    if (!level || !section) {
      return
    }
    setLevelResult(level.id, 1)
    navigate(`/${section.id}/levels/${level.id}/mastery`)
  }, [level, section, setLevelResult, navigate])

  const handleNo = useCallback(() => {
    if (!level || !section) {
      return
    }
    setLevelResult(level.id, 0)
    navigate(`/${section.id}/levels/${level.id}/train`)
  }, [level, section, setLevelResult, navigate])

  if (!section || !level) {
    return <Navigate to={sectionId ? `/${sectionId}/levels` : '/'} replace />
  }

  return (
    <PageLayout title={`${ROMAN[level.level]} - ${level.title}`} breadcrumbs={breadcrumbs}>
      <div
        className={[styles.assessmentLayout, styles[`layout_${theme}`]].filter(Boolean).join(' ')}
      >
        <div className={styles.contentArea}>
          <h2 className={styles.question}>{level.question}</h2>

          {level.conditions.length > 0 && (
            <div className={styles.context}>
              <h3 className={styles.contextTitle} {...tProps('whatToLookFor')}>
                {t('whatToLookFor')}
              </h3>
              <ul className={styles.conditionsList}>
                {level.conditions.map(condition => (
                  <li key={condition} className={styles.conditionItem}>
                    {condition}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {level.examples.length > 0 && (
            <div className={styles.examples}>
              <span className={styles.examplesLabel} {...tProps('examplesPrefix')}>
                {t('examplesPrefix')}
              </span>
              {level.examples.join(', ')}
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
