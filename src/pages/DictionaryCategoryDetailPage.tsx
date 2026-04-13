import { useCallback, useMemo, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import type { BreadcrumbItem, TabOption } from '../components/ui'
import { PageLayout, Tabs } from '../components/ui'
import { useDictionary, useLanguage } from '../hooks'
import { tProps } from '../i18n'
import type { MasteryTier, VerbalOperant, WordDifficulty } from '../types'
import { getWordId, VERBAL_OPERANTS } from '../types'
import styles from './DictionaryCategoryDetailPage.module.css'

const OPERANT_LABEL_KEYS: Record<
  VerbalOperant,
  'operantMand' | 'operantTact' | 'operantListener' | 'operantEchoic'
> = {
  mand: 'operantMand',
  tact: 'operantTact',
  listenerResponding: 'operantListener',
  echoic: 'operantEchoic',
}

const DIFFICULTIES: WordDifficulty[] = ['simple', 'medium', 'complex']

const DIFFICULTY_KEYS: Record<
  WordDifficulty,
  'difficultySimple' | 'difficultyMedium' | 'difficultyComplex'
> = {
  simple: 'difficultySimple',
  medium: 'difficultyMedium',
  complex: 'difficultyComplex',
}

function MasteryDot({
  operant,
  wordId,
  isMastered,
  label,
  onToggle,
}: {
  operant: VerbalOperant
  wordId: string
  isMastered: boolean
  label: string
  onToggle: (wordId: string, operant: VerbalOperant) => void
}) {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      onToggle(wordId, operant)
    },
    [wordId, operant, onToggle]
  )

  return (
    <button
      type="button"
      className={`${styles.masteryDot} ${isMastered ? styles.masteryDotActive : ''}`}
      onClick={handleClick}
      title={label}
      aria-label={`${label}: ${isMastered ? 'yes' : 'no'}`}
    />
  )
}

interface WordRowProps {
  wordId: string
  text: string
  isIncluded: boolean
  mastery: Record<VerbalOperant, MasteryTier>
  onToggle: (wordId: string) => void
  onMasteryToggle: (wordId: string, operant: VerbalOperant) => void
}

function WordRow({ wordId, text, isIncluded, mastery, onToggle, onMasteryToggle }: WordRowProps) {
  const { t } = useLanguage()

  const handleClick = useCallback(() => {
    onToggle(wordId)
  }, [wordId, onToggle])

  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      e.dataTransfer.setData('text/plain', wordId)
      e.dataTransfer.effectAllowed = 'move'
    },
    [wordId]
  )

  return (
    <button
      type="button"
      className={`${styles.wordRow} ${isIncluded ? styles.wordRowIncluded : styles.wordRowExcluded}`}
      onClick={handleClick}
      aria-pressed={isIncluded}
      draggable
      onDragStart={handleDragStart}
    >
      <span className={styles.wordText}>{text}</span>
      {isIncluded ? (
        <span className={styles.masteryDots}>
          {VERBAL_OPERANTS.map(operant => (
            <MasteryDot
              key={operant}
              operant={operant}
              wordId={wordId}
              isMastered={mastery[operant] !== 'none'}
              label={t(OPERANT_LABEL_KEYS[operant])}
              onToggle={onMasteryToggle}
            />
          ))}
        </span>
      ) : null}
    </button>
  )
}

interface DifficultyColumnProps {
  difficulty: WordDifficulty
  categoryId: string
  words: string[]
  label: string
}

function DifficultyColumn({ difficulty, categoryId, words, label }: DifficultyColumnProps) {
  const { getWordState, setWordInclusion, setWordMastery } = useDictionary()

  const { included, excluded } = useMemo(() => {
    const inc: Array<{ id: string; text: string; mastery: Record<VerbalOperant, MasteryTier> }> = []
    const exc: Array<{ id: string; text: string; mastery: Record<VerbalOperant, MasteryTier> }> = []

    for (const [i, word] of words.entries()) {
      const wordId = getWordId(categoryId, difficulty, i)
      const state = getWordState(wordId)
      const entry = { id: wordId, text: word, mastery: state.mastery }
      if (state.inclusion === 'included') {
        inc.push(entry)
      } else {
        exc.push(entry)
      }
    }

    return { included: inc, excluded: exc }
  }, [categoryId, difficulty, words, getWordState])

  const handleToggle = useCallback(
    (wordId: string) => {
      const current = getWordState(wordId)
      setWordInclusion(wordId, current.inclusion === 'included' ? 'excluded' : 'included')
    },
    [getWordState, setWordInclusion]
  )

  const handleMasteryToggle = useCallback(
    (wordId: string, operant: VerbalOperant) => {
      const current = getWordState(wordId)
      const newTier = current.mastery[operant] === 'none' ? 'selfReport' : 'none'
      setWordMastery(wordId, operant, newTier)
    },
    [getWordState, setWordMastery]
  )

  const { t } = useLanguage()
  const [includedDragOver, setIncludedDragOver] = useState(false)
  const [excludedDragOver, setExcludedDragOver] = useState(false)

  const handleDragOverIncluded = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setIncludedDragOver(true)
  }, [])

  const handleDragOverExcluded = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setExcludedDragOver(true)
  }, [])

  const handleDragLeaveIncluded = useCallback((e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIncludedDragOver(false)
    }
  }, [])

  const handleDragLeaveExcluded = useCallback((e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setExcludedDragOver(false)
    }
  }, [])

  const handleDropIncluded = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIncludedDragOver(false)
      const wordId = e.dataTransfer.getData('text/plain')
      if (wordId) {
        setWordInclusion(wordId, 'included')
      }
    },
    [setWordInclusion]
  )

  const handleDropExcluded = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setExcludedDragOver(false)
      const wordId = e.dataTransfer.getData('text/plain')
      if (wordId) {
        setWordInclusion(wordId, 'excluded')
      }
    },
    [setWordInclusion]
  )

  return (
    <div className={styles.column}>
      <h3 className={styles.columnHeader}>{label}</h3>

      <div
        className={`${styles.zone} ${includedDragOver ? styles.zoneDragOver : ''}`}
        onDragOver={handleDragOverIncluded}
        onDragLeave={handleDragLeaveIncluded}
        onDrop={handleDropIncluded}
      >
        <span className={styles.zoneLabel} {...tProps('zoneIncluded')}>
          {t('zoneIncluded')}
        </span>
        <div className={styles.wordList}>
          {included.map(word => (
            <WordRow
              key={word.id}
              wordId={word.id}
              text={word.text}
              isIncluded
              mastery={word.mastery}
              onToggle={handleToggle}
              onMasteryToggle={handleMasteryToggle}
            />
          ))}
          {included.length === 0 ? <span className={styles.emptyHint}>&mdash;</span> : null}
        </div>
      </div>

      <div className={styles.divider} />

      <div
        className={`${styles.zone} ${excludedDragOver ? styles.zoneDragOver : ''}`}
        onDragOver={handleDragOverExcluded}
        onDragLeave={handleDragLeaveExcluded}
        onDrop={handleDropExcluded}
      >
        <span className={styles.zoneLabel} {...tProps('zoneExcluded')}>
          {t('zoneExcluded')}
        </span>
        <div className={styles.wordList}>
          {excluded.map(word => (
            <WordRow
              key={word.id}
              wordId={word.id}
              text={word.text}
              isIncluded={false}
              mastery={word.mastery}
              onToggle={handleToggle}
              onMasteryToggle={handleMasteryToggle}
            />
          ))}
          {excluded.length === 0 ? <span className={styles.emptyHint}>&mdash;</span> : null}
        </div>
      </div>
    </div>
  )
}

export function DictionaryCategoryDetailPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const { t, vocabulary } = useLanguage()
  const [activeTab, setActiveTab] = useState<WordDifficulty>('simple')

  const category = useMemo(
    () => vocabulary.find(c => c.id === categoryId),
    [vocabulary, categoryId]
  )

  const tabOptions: Array<TabOption<WordDifficulty>> = useMemo(
    () =>
      DIFFICULTIES.map(d => ({
        value: d,
        label: t(DIFFICULTY_KEYS[d]),
      })),
    [t]
  )

  const breadcrumbs: BreadcrumbItem[] = useMemo(
    () => [
      { label: t('home'), path: '/' },
      { label: t('dictionaryTitle'), path: '/dictionary' },
      { label: category?.name ?? '', path: `/dictionary/${categoryId}` },
    ],
    [t, category, categoryId]
  )

  if (!category) {
    return <Navigate to="/dictionary" replace />
  }

  return (
    <PageLayout title={category.name} breadcrumbs={breadcrumbs} wide>
      {/* Desktop: three columns side by side */}
      <div className={styles.desktopColumns}>
        {DIFFICULTIES.map(difficulty => (
          <DifficultyColumn
            key={difficulty}
            difficulty={difficulty}
            categoryId={category.id}
            words={category.words[difficulty]}
            label={t(DIFFICULTY_KEYS[difficulty])}
          />
        ))}
      </div>

      {/* Mobile: tabs switching between difficulty levels */}
      <div className={styles.mobileTabs}>
        <Tabs options={tabOptions} value={activeTab} onChange={setActiveTab} />
        <DifficultyColumn
          difficulty={activeTab}
          categoryId={category.id}
          words={category.words[activeTab]}
          label={t(DIFFICULTY_KEYS[activeTab])}
        />
      </div>
    </PageLayout>
  )
}
