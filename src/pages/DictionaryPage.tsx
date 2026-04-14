import { useCallback, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import type { BreadcrumbItem, TabOption } from '../components/ui'
import { CategoryRail, PageLayout, Tabs } from '../components/ui'
import { useDictionary, useLanguage } from '../hooks'
import type { MasteryRecord, VerbalOperant, WordDifficulty } from '../types'
import { getWordId, VERBAL_OPERANTS } from '../types'
import {
  CATEGORY_ICONS,
  DIFFICULTIES,
  DIFFICULTY_KEYS,
  OPERANT_LABEL_KEYS,
} from './dictionaryConstants'
import styles from './DictionaryPage.module.css'

// --- MasteryBadge ---

function MasteryBadge({
  operant,
  wordId,
  tier,
  label,
  onCycle,
}: {
  operant: VerbalOperant
  wordId: string
  tier: MasteryRecord['tier']
  label: string
  onCycle: (wordId: string, operant: VerbalOperant) => void
}) {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      onCycle(wordId, operant)
    },
    [wordId, operant, onCycle]
  )

  const tierClass =
    tier === 'mastered' ? styles.badgeMastered : tier === 'emerging' ? styles.badgeEmerging : ''

  return (
    <button
      type="button"
      className={`${styles.badge} ${tierClass}`}
      onClick={handleClick}
      aria-label={`${label}: ${tier}`}
    >
      {label}
    </button>
  )
}

// --- WordRow ---

interface WordRowProps {
  wordId: string
  text: string
  isIncluded: boolean
  mastery: Record<VerbalOperant, MasteryRecord>
  onToggle: (wordId: string) => void
  onMasteryCycle: (wordId: string, operant: VerbalOperant) => void
}

function WordRow({ wordId, text, isIncluded, mastery, onToggle, onMasteryCycle }: WordRowProps) {
  const { t } = useLanguage()

  const handleClick = useCallback(() => {
    onToggle(wordId)
  }, [wordId, onToggle])

  return (
    <button
      type="button"
      className={`${styles.wordRow} ${isIncluded ? styles.wordRowIncluded : styles.wordRowExcluded}`}
      onClick={handleClick}
      aria-pressed={isIncluded}
    >
      <span className={styles.wordText}>{text}</span>
      <span className={`${styles.masteryGrid} ${isIncluded ? '' : styles.masteryGridHidden}`}>
        {VERBAL_OPERANTS.map(operant => (
          <MasteryBadge
            key={operant}
            operant={operant}
            wordId={wordId}
            tier={mastery[operant].tier}
            label={t(OPERANT_LABEL_KEYS[operant])}
            onCycle={onMasteryCycle}
          />
        ))}
      </span>
    </button>
  )
}

// --- WordColumn ---

function WordColumn({
  difficulty,
  categoryId,
  words,
  label,
}: {
  difficulty: WordDifficulty
  categoryId: string
  words: string[]
  label: string
}) {
  const { getWordState, setWordInclusion, setWordMastery } = useDictionary()

  const wordEntries = useMemo(
    () =>
      words.map((text, i) => {
        const wordId = getWordId(categoryId, difficulty, i)
        const state = getWordState(wordId)
        return {
          id: wordId,
          text,
          mastery: state.mastery,
          isIncluded: state.inclusion === 'included',
        }
      }),
    [categoryId, difficulty, words, getWordState]
  )

  const handleToggle = useCallback(
    (wordId: string) => {
      const current = getWordState(wordId)
      setWordInclusion(wordId, current.inclusion === 'included' ? 'excluded' : 'included')
    },
    [getWordState, setWordInclusion]
  )

  const handleMasteryCycle = useCallback(
    (wordId: string, operant: VerbalOperant) => {
      const current = getWordState(wordId)
      const currentTier = current.mastery[operant].tier
      const nextTier =
        currentTier === 'notStarted'
          ? 'emerging'
          : currentTier === 'emerging'
            ? 'mastered'
            : 'notStarted'
      setWordMastery(wordId, operant, nextTier)
    },
    [getWordState, setWordMastery]
  )

  if (words.length === 0) {
    return null
  }

  return (
    <div className={styles.column}>
      <h3 className={styles.columnHeader}>{label}</h3>
      <div className={styles.wordList}>
        {wordEntries.map(entry => (
          <WordRow
            key={entry.id}
            wordId={entry.id}
            text={entry.text}
            isIncluded={entry.isIncluded}
            mastery={entry.mastery}
            onToggle={handleToggle}
            onMasteryCycle={handleMasteryCycle}
          />
        ))}
      </div>
    </div>
  )
}

// --- DictionaryPage ---

export function DictionaryPage() {
  const { categoryId: urlCategoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const { t, vocabulary } = useLanguage()
  const { getCategoryProgress } = useDictionary()

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    () => urlCategoryId ?? vocabulary[0].id
  )

  const category = useMemo(
    () => vocabulary.find(c => c.id === selectedCategoryId),
    [vocabulary, selectedCategoryId]
  )

  const handleCategoryChange = useCallback(
    (id: string) => {
      setSelectedCategoryId(id)
      navigate(`/dictionary/${id}`, { replace: true })
    },
    [navigate]
  )

  const getProgress = useCallback(
    (catId: string) => {
      const progress = getCategoryProgress(catId)
      return { included: progress.included, total: progress.total }
    },
    [getCategoryProgress]
  )

  const [activeTab, setActiveTab] = useState<WordDifficulty>('simple')

  const tabOptions: Array<TabOption<WordDifficulty>> = useMemo(
    () => DIFFICULTIES.map(d => ({ value: d, label: t(DIFFICULTY_KEYS[d]) })),
    [t]
  )

  const breadcrumbs: BreadcrumbItem[] = useMemo(
    () => [
      { label: t('home'), path: '/' },
      { label: t('dictionaryTitle'), path: '/dictionary' },
    ],
    [t]
  )

  return (
    <PageLayout title={t('dictionaryTitle')} breadcrumbs={breadcrumbs} extraWide>
      <div className={styles.layout}>
        <CategoryRail
          categories={vocabulary}
          activeId={selectedCategoryId}
          onChange={handleCategoryChange}
          icons={CATEGORY_ICONS}
          getProgress={getProgress}
        />

        {category ? (
          <div className={styles.content}>
            <h2 className={styles.categoryName}>{category.name}</h2>

            {/* Desktop: 3 columns */}
            <div className={styles.desktopColumns}>
              {DIFFICULTIES.map(difficulty => (
                <WordColumn
                  key={`${category.id}-${difficulty}`}
                  difficulty={difficulty}
                  categoryId={category.id}
                  words={category.words[difficulty]}
                  label={t(DIFFICULTY_KEYS[difficulty])}
                />
              ))}
            </div>

            {/* Mobile: tabs */}
            <div className={styles.mobileTabs}>
              <Tabs options={tabOptions} value={activeTab} onChange={setActiveTab} />
              <WordColumn
                key={`${category.id}-${activeTab}`}
                difficulty={activeTab}
                categoryId={category.id}
                words={category.words[activeTab]}
                label={t(DIFFICULTY_KEYS[activeTab])}
              />
            </div>
          </div>
        ) : null}
      </div>
    </PageLayout>
  )
}
