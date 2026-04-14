import { ListRestart, Play } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import type { BreadcrumbItem } from '../components/ui'
import { Button, PageLayout, ProgressiveDisclosure } from '../components/ui'
import { useLanguage } from '../hooks'
import { tProps } from '../i18n'
import { ROMAN } from '../utils'
import styles from './TrainingPage.module.css'

export function TrainingPage() {
  const { sectionId, levelId } = useParams<{
    sectionId: string
    levelId: string
  }>()
  const navigate = useNavigate()
  const { t, sections, trainingContent } = useLanguage()

  const section = sections.find(s => s.id === sectionId)
  const level = section?.levels.find(l => l.id === levelId)
  const training = levelId ? trainingContent[levelId] : undefined

  const sectionSiblings = useMemo(
    () =>
      sections
        .filter(s => s.isAvailable && s.levels.length > 0)
        .map(s => ({
          label: s.title,
          path: `/${s.id}/levels/${s.levels[0].id}/train`,
          isCurrent: s.id === sectionId,
        })),
    [sections, sectionId]
  )

  const levelSiblings = useMemo(
    () =>
      section
        ? section.levels.map(l => ({
            label: `${ROMAN[l.level]} - ${l.title}`,
            path: `/${section.id}/levels/${l.id}/train`,
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
            {
              label: t('breadcrumbTraining'),
              path: `/${section.id}/levels/${level.id}/train`,
            },
          ]
        : [],
    [t, section, level, sectionSiblings, levelSiblings]
  )

  const handleStartPractice = useCallback(() => {
    if (!section || !level) {
      return
    }
    navigate(`/${section.id}/levels/${level.id}/practice`)
  }, [navigate, section, level])

  const handleBack = useCallback(() => {
    if (!section) {
      return
    }
    navigate(`/${section.id}/levels`)
  }, [navigate, section])

  if (!section || !level || !training) {
    return <Navigate to={sectionId ? `/${sectionId}/levels` : '/'} replace />
  }

  return (
    <PageLayout title={`${ROMAN[level.level]} - ${level.title}`} breadcrumbs={breadcrumbs}>
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
              <h4 className={styles.mistakesTitle} {...tProps('commonMistakes')}>
                {t('commonMistakes')}
              </h4>
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
        <Button onClick={handleStartPractice} {...tProps('startPractice')}>
          <Play size={16} aria-hidden="true" /> {t('startPractice')}
        </Button>
        <Button variant="ghost" onClick={handleBack} {...tProps('backToList')}>
          <ListRestart size={16} aria-hidden="true" /> {t('backToList')}
        </Button>
      </div>
    </PageLayout>
  )
}
