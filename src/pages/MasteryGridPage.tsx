import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import type { BreadcrumbItem } from '../components/ui'
import { Button, PageLayout } from '../components/ui'
import { useAssessment, useDictionary, useLanguage } from '../hooks'
import { tProps } from '../i18n'
import type { VocabularyWord } from '../types'
import { getOperantForSection, parseWordId } from '../types'
import { CATEGORY_ICONS } from './dictionaryConstants'
import styles from './MasteryGridPage.module.css'

function WordTile({
  word,
  isSelected,
  onToggle,
}: {
  word: VocabularyWord
  isSelected: boolean
  onToggle: (wordId: string) => void
}) {
  const handleClick = useCallback(() => {
    onToggle(word.id)
  }, [word.id, onToggle])

  return (
    <button
      type="button"
      className={`${styles.tile} ${isSelected ? styles.tileSelected : ''}`}
      onClick={handleClick}
      aria-pressed={isSelected}
    >
      <span className={styles.tileText}>{word.text}</span>
    </button>
  )
}

export function MasteryGridPage() {
  const { sectionId, levelId } = useParams<{
    sectionId: string
    levelId: string
  }>()
  const navigate = useNavigate()
  const { t, sections, vocabulary } = useLanguage()
  const { setLevelResult } = useAssessment()
  const { getPracticeWords, getWordState, setWordMastery } = useDictionary()

  const section = sections.find(s => s.id === sectionId)
  const level = section?.levels.find(l => l.id === levelId)
  const operant = sectionId ? getOperantForSection(sectionId) : null

  const allWords = useMemo(() => {
    if (!levelId || !operant) {
      return []
    }
    return getPracticeWords(levelId, { operant })
  }, [levelId, operant, getPracticeWords])

  const categoryNames = useMemo(() => {
    const map = new Map<string, string>()
    for (const cat of vocabulary) {
      map.set(cat.id, cat.name)
    }
    return map
  }, [vocabulary])

  const wordsByCategory = useMemo(() => {
    const groups = new Map<string, VocabularyWord[]>()
    for (const word of allWords) {
      const parsed = parseWordId(word.id)
      const catId = parsed?.categoryId ?? 'unknown'
      const list = groups.get(catId)
      if (list) {
        list.push(word)
      } else {
        groups.set(catId, [word])
      }
    }
    return groups
  }, [allWords])

  // Pre-select words already mastered for this operant
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set())
  const initializedRef = useRef(false)

  useEffect(() => {
    if (initializedRef.current || allWords.length === 0 || !operant) {
      return
    }
    initializedRef.current = true
    const mastered = new Set<string>()
    for (const word of allWords) {
      if (getWordState(word.id).mastery[operant].tier === 'mastered') {
        mastered.add(word.id)
      }
    }
    if (mastered.size > 0) {
      setSelectedIds(mastered)
    }
  }, [allWords, operant, getWordState])

  // Auto-pass: if all words already mastered, go back
  useEffect(() => {
    if (!section || !level || !operant || allWords.length === 0) {
      return
    }
    const allMastered = allWords.every(w => getWordState(w.id).mastery[operant].tier === 'mastered')
    if (allMastered) {
      setLevelResult(level.id, 1)
      navigate(`/${section.id}/levels`, { replace: true })
    }
  }, [section, level, operant, allWords, getWordState, setLevelResult, navigate])

  const handleToggle = useCallback((wordId: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(wordId)) {
        next.delete(wordId)
      } else {
        next.add(wordId)
      }
      return next
    })
  }, [])

  const handleDone = useCallback(() => {
    if (!operant || !section) {
      return
    }
    for (const wordId of selectedIds) {
      setWordMastery(wordId, operant, 'mastered')
    }
    navigate(`/${section.id}/levels`, { replace: true })
  }, [operant, section, selectedIds, setWordMastery, navigate])

  const breadcrumbs: BreadcrumbItem[] = useMemo(
    () =>
      section && level
        ? [
            { label: t('home'), path: '/' },
            { label: section.title, path: `/${section.id}` },
            { label: t('breadcrumbLevels'), path: `/${section.id}/levels` },
            {
              label: t('masteryGridTitle'),
              path: `/${section.id}/levels/${level.id}/mastery`,
            },
          ]
        : [],
    [t, section, level]
  )

  if (!section || !level) {
    return <Navigate to={sectionId ? `/${sectionId}/levels` : '/'} replace />
  }

  if (allWords.length === 0) {
    return null // will redirect via useEffect
  }

  return (
    <PageLayout title={t('masteryGridTitle')} breadcrumbs={breadcrumbs}>
      <p className={styles.levelLabel}>{level.title}</p>
      <p className={styles.hint} {...tProps('masteryGridHint')}>
        {t('masteryGridHint')}
      </p>

      {Array.from(wordsByCategory.entries(), ([catId, words]) => (
        <div key={catId} className={styles.categorySection}>
          <h3 className={styles.categoryTitle}>
            {CATEGORY_ICONS[catId] ? (
              <span className={styles.categoryIcon}>{CATEGORY_ICONS[catId]}</span>
            ) : null}
            {categoryNames.get(catId) ?? catId}
          </h3>
          <div className={styles.grid}>
            {words.map(word => (
              <WordTile
                key={word.id}
                word={word}
                isSelected={selectedIds.has(word.id)}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>
      ))}

      <div className={styles.actions}>
        <Button onClick={handleDone} {...tProps('masteryDone')}>
          {t('masteryDone')}
          {selectedIds.size > 0 ? ` (${selectedIds.size})` : ''}
        </Button>
      </div>
    </PageLayout>
  )
}
