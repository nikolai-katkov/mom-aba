import { Image, ListRestart, RotateCcw } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import type { BreadcrumbItem } from '../components/ui'
import { Button, PageLayout, ProgressiveDisclosure, VideoPlaceholder } from '../components/ui'
import { useDictionary, useLanguage } from '../hooks'
import { tProps } from '../i18n'
import type { VocabularyWord } from '../types'
import { ROMAN } from '../utils'
import styles from './TrainingPage.module.css'

function PracticeWordCard({ word }: { word: VocabularyWord }) {
  return (
    <div className={styles.wordCard}>
      <div className={styles.wordImage}>
        {word.imageUrl ? (
          <img src={word.imageUrl} alt={word.text} className={styles.wordImg} />
        ) : (
          <Image size={24} aria-hidden="true" />
        )}
      </div>
      <span className={styles.wordLabel}>{word.text}</span>
    </div>
  )
}

function PracticeWordsSection({ criterionId }: { criterionId: string }) {
  const { t } = useLanguage()
  const { getPracticeWords } = useDictionary()

  const words = useMemo(() => getPracticeWords(criterionId), [getPracticeWords, criterionId])

  if (words.length === 0) {
    return null
  }

  return (
    <section className={styles.practiceSection}>
      <div className={styles.practiceHeader}>
        <h3 className={styles.practiceTitle} {...tProps('practiceWords')}>
          {t('practiceWords')}
        </h3>
        <span className={styles.practiceHint} {...tProps('practiceWordsHint')}>
          {t('practiceWordsHint')}
        </span>
      </div>
      <div className={styles.practiceGrid}>
        {words.map(word => (
          <PracticeWordCard key={word.id} word={word} />
        ))}
      </div>
    </section>
  )
}

export function TrainingPage() {
  const { sectionId, criterionId } = useParams<{
    sectionId: string
    criterionId: string
  }>()
  const navigate = useNavigate()
  const { t, sections, trainingContent } = useLanguage()

  const section = sections.find(s => s.id === sectionId)
  const criterion = section?.criteria.find(c => c.id === criterionId)
  const training = criterionId ? trainingContent[criterionId] : undefined

  const breadcrumbs: BreadcrumbItem[] = useMemo(
    () =>
      section && criterion
        ? [
            { label: t('home'), path: '/' },
            { label: section.title, path: `/${section.id}` },
            { label: t('breadcrumbLevels'), path: `/${section.id}/levels` },
            {
              label: `${ROMAN[criterion.level]} - ${criterion.title}`,
              path: `/${section.id}/levels/${criterion.id}`,
            },
            {
              label: t('breadcrumbTraining'),
              path: `/${section.id}/levels/${criterion.id}/train`,
            },
          ]
        : [],
    [t, section, criterion]
  )

  const handleRetry = useCallback(() => {
    if (!section || !criterion) {
      return
    }
    navigate(`/${section.id}/levels/${criterion.id}`)
  }, [navigate, section, criterion])

  const handleBack = useCallback(() => {
    if (!section) {
      return
    }
    navigate(`/${section.id}/levels`)
  }, [navigate, section])

  if (!section || !criterion || !training) {
    return <Navigate to={sectionId ? `/${sectionId}/levels` : '/'} replace />
  }

  return (
    <PageLayout title={`${ROMAN[criterion.level]} - ${criterion.title}`} breadcrumbs={breadcrumbs}>
      <VideoPlaceholder />

      <ol className={styles.stepList}>
        {training.shortGuide.map(step => (
          <li key={step.stepNumber} className={styles.stepItem}>
            {step.instruction}
          </li>
        ))}
      </ol>

      <PracticeWordsSection criterionId={criterion.id} />

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
        <Button onClick={handleRetry} {...tProps('retryAssessment')}>
          <RotateCcw size={16} aria-hidden="true" /> {t('retryAssessment')}
        </Button>
        <Button variant="ghost" onClick={handleBack} {...tProps('backToList')}>
          <ListRestart size={16} aria-hidden="true" /> {t('backToList')}
        </Button>
      </div>
    </PageLayout>
  )
}
