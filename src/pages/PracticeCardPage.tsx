import { ChevronDown, ChevronUp, Hand, ThumbsUp, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import type { BreadcrumbItem } from '../components/ui'
import { Button, PageLayout, SwipeCard } from '../components/ui'
import { useAssessment, useDictionary, useLanguage } from '../hooks'
import { tProps } from '../i18n'
import { interpolate } from '../i18n/interpolate'
import type { MasteryTier, VocabularyWord } from '../types'
import { getOperantForSection } from '../types'
import styles from './PracticeCardPage.module.css'

interface CardResponse {
  wordId: string
  tier: MasteryTier
}

function DeckProgress({ current, total }: { current: number; total: number }) {
  const { t } = useLanguage()
  return (
    <div className={styles.progress} {...tProps('cardProgress')}>
      {interpolate(t('cardProgress'), {
        completed: String(current),
        total: String(total),
      })}
    </div>
  )
}

function PracticeCardContent({
  word,
  prompt,
}: {
  word: VocabularyWord
  prompt: { brief: string; detail: string }
}) {
  const [showDetail, setShowDetail] = useState(false)

  const toggleDetail = useCallback(() => {
    setShowDetail(prev => !prev)
  }, [])

  return (
    <div className={styles.cardContent}>
      <div className={styles.wordArea}>
        <span className={styles.wordText}>{word.text}</span>
      </div>
      <p className={styles.promptBrief}>{prompt.brief}</p>
      <button
        type="button"
        className={styles.detailToggle}
        onClick={toggleDetail}
        aria-expanded={showDetail}
      >
        {showDetail ? (
          <ChevronUp size={16} aria-hidden="true" />
        ) : (
          <ChevronDown size={16} aria-hidden="true" />
        )}
      </button>
      {showDetail ? <p className={styles.promptDetail}>{prompt.detail}</p> : null}
    </div>
  )
}

function CardActions({
  onSaidIt,
  onNeededHelp,
  onNotYet,
}: {
  onSaidIt: () => void
  onNeededHelp: () => void
  onNotYet: () => void
}) {
  const { t } = useLanguage()

  return (
    <div className={styles.actions}>
      <Button variant="ghost" onClick={onNotYet} {...tProps('notYet')}>
        <X size={16} aria-hidden="true" /> {t('notYet')}
      </Button>
      <Button variant="secondary" onClick={onNeededHelp} {...tProps('neededHelp')}>
        <Hand size={16} aria-hidden="true" /> {t('neededHelp')}
      </Button>
      <Button onClick={onSaidIt} {...tProps('saidIt')}>
        <ThumbsUp size={16} aria-hidden="true" /> {t('saidIt')}
      </Button>
    </div>
  )
}

export function PracticeCardPage() {
  const { sectionId, levelId } = useParams<{
    sectionId: string
    levelId: string
  }>()
  const navigate = useNavigate()
  const { t, sections, trainingContent } = useLanguage()
  const { setLevelResult } = useAssessment()
  const { getPracticeWords, setWordMastery } = useDictionary()

  const section = sections.find(s => s.id === sectionId)
  const level = section?.levels.find(l => l.id === levelId)
  const training = levelId ? trainingContent[levelId] : undefined
  const operant = sectionId ? getOperantForSection(sectionId) : null

  const words = useMemo(() => {
    if (!levelId || !operant) {
      return []
    }
    return getPracticeWords(levelId, { operant, unmasteredOnly: true })
  }, [levelId, operant, getPracticeWords])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [responses, setResponses] = useState<CardResponse[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  // Auto-pass: if no words, go back
  useEffect(() => {
    if (section && level && words.length === 0) {
      setLevelResult(level.id, 1)
      navigate(`/${section.id}/levels`, { replace: true })
    }
  }, [section, level, words.length, setLevelResult, navigate])

  const finishDeck = useCallback(
    (allResponses: CardResponse[]) => {
      if (!operant || !section) {
        return
      }
      for (const response of allResponses) {
        if (response.tier !== 'notStarted') {
          setWordMastery(response.wordId, operant, response.tier)
        }
      }
      navigate(`/${section.id}/levels`, { replace: true })
    },
    [operant, section, setWordMastery, navigate]
  )

  const recordResponse = useCallback(
    (tier: MasteryTier) => {
      if (isAnimating || currentIndex >= words.length) {
        return
      }
      const word = words[currentIndex]
      const response: CardResponse = { wordId: word.id, tier }
      const newResponses = [...responses, response]
      setResponses(newResponses)

      if (currentIndex >= words.length - 1) {
        finishDeck(newResponses)
      } else {
        setIsAnimating(true)
        setTimeout(() => {
          setCurrentIndex(prev => prev + 1)
          setIsAnimating(false)
        }, 350)
      }
    },
    [isAnimating, currentIndex, words, responses, finishDeck]
  )

  const handleSaidIt = useCallback(() => {
    recordResponse('mastered')
  }, [recordResponse])
  const handleNeededHelp = useCallback(() => {
    recordResponse('emerging')
  }, [recordResponse])
  const handleNotYet = useCallback(() => {
    recordResponse('notStarted')
  }, [recordResponse])

  const breadcrumbs: BreadcrumbItem[] = useMemo(
    () =>
      section && level
        ? [
            { label: t('home'), path: '/' },
            { label: section.title, path: `/${section.id}` },
            { label: t('breadcrumbLevels'), path: `/${section.id}/levels` },
            {
              label: t('practiceTitle'),
              path: `/${section.id}/levels/${level.id}/practice`,
            },
          ]
        : [],
    [t, section, level]
  )

  if (!section || !level || !training) {
    return <Navigate to={sectionId ? `/${sectionId}/levels` : '/'} replace />
  }

  if (words.length === 0) {
    return null
  }

  const visibleCards = words.slice(currentIndex, currentIndex + 3)

  return (
    <PageLayout title={t('practiceTitle')} breadcrumbs={breadcrumbs}>
      <DeckProgress current={currentIndex + 1} total={words.length} />

      <div className={styles.cardStack}>
        {visibleCards
          .map((word, i) => (
            <SwipeCard
              key={word.id}
              isActive={i === 0}
              stackIndex={i}
              onSwipeRight={handleSaidIt}
              onSwipeLeft={handleNotYet}
            >
              <PracticeCardContent word={word} prompt={training.practicePrompt} />
            </SwipeCard>
          ))
          .reverse()}
      </div>

      <CardActions
        onSaidIt={handleSaidIt}
        onNeededHelp={handleNeededHelp}
        onNotYet={handleNotYet}
      />
    </PageLayout>
  )
}
