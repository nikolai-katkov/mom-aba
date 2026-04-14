import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import type {
  DictionaryState,
  MasteryRecord,
  MasteryTier,
  OnboardingLevel,
  VerbalOperant,
  VocabularyCategory,
  VocabularyWord,
  WordDifficulty,
  WordInclusionStatus,
  WordState,
} from '../types'
import {
  DEFAULT_MASTERY,
  getLevelCategoryIds,
  getWordId,
  MOTIVATING_CATEGORY_IDS,
  parseWordId,
} from '../types'
import { createInitialDictionaryState, loadDictionaryState, saveDictionaryState } from '../utils'

// --- Default inclusion logic ---

function shouldIncludeByDefault(
  categoryId: string,
  difficulty: WordDifficulty,
  level: OnboardingLevel
): boolean {
  switch (level) {
    case 'beginner': {
      return difficulty === 'simple' && MOTIVATING_CATEGORY_IDS.includes(categoryId)
    }
    case 'intermediate': {
      return (
        difficulty === 'simple' ||
        (difficulty === 'medium' && MOTIVATING_CATEGORY_IDS.includes(categoryId))
      )
    }
    case 'advanced': {
      return true
    }
  }
}

function getDefaultWordState(
  categoryId: string,
  difficulty: WordDifficulty,
  level: OnboardingLevel | null
): WordState {
  const inclusion: WordInclusionStatus =
    level !== null && shouldIncludeByDefault(categoryId, difficulty, level)
      ? 'included'
      : 'excluded'

  return { inclusion, mastery: { ...DEFAULT_MASTERY } }
}

// --- Vocabulary word accessor ---

export function getVocabularyWord(
  vocabulary: VocabularyCategory[],
  wordId: string
): VocabularyWord | null {
  const parsed = parseWordId(wordId)
  if (!parsed) {
    return null
  }

  const category = vocabulary.find(c => c.id === parsed.categoryId)
  if (!category) {
    return null
  }

  const words = category.words[parsed.difficulty]
  if (parsed.index < 0 || parsed.index >= words.length) {
    return null
  }

  return {
    id: wordId,
    text: words[parsed.index],
  }
}

// --- Context ---

interface DictionaryContextValue {
  isOnboardingCompleted: boolean
  onboardingLevel: OnboardingLevel | null
  completeOnboarding: (level: OnboardingLevel) => void
  getWordState: (wordId: string) => WordState
  setWordInclusion: (wordId: string, status: WordInclusionStatus) => void
  setWordMastery: (wordId: string, operant: VerbalOperant, tier: MasteryTier) => void
  getCategoryProgress: (categoryId: string) => CategoryProgress
  getPracticeWords: (
    levelId: string,
    options?: { operant?: VerbalOperant; unmasteredOnly?: boolean }
  ) => VocabularyWord[]
  resetDictionary: () => void
}

export interface CategoryProgress {
  included: number
  total: number
  mastered: Record<VerbalOperant, number>
}

const DictionaryContext = createContext<DictionaryContextValue | null>(null)
DictionaryContext.displayName = 'DictionaryContext'

interface DictionaryProviderProps {
  children: ReactNode
  vocabulary: VocabularyCategory[]
}

export function DictionaryProvider({ children, vocabulary }: DictionaryProviderProps) {
  const [state, setState] = useState<DictionaryState>(loadDictionaryState)

  useEffect(() => {
    saveDictionaryState(state)
  }, [state])

  const completeOnboarding = useCallback(
    (level: OnboardingLevel) => {
      setState(previous => {
        // Store all initially-included words. Excluded words use on-demand defaults.
        const initialWords: Record<string, WordState> = {}
        for (const category of vocabulary) {
          const difficulties: WordDifficulty[] = ['simple', 'medium', 'complex']
          for (const difficulty of difficulties) {
            for (let i = 0; i < category.words[difficulty].length; i++) {
              const wordId = getWordId(category.id, difficulty, i)
              const defaultState = getDefaultWordState(category.id, difficulty, level)
              if (defaultState.inclusion === 'included') {
                initialWords[wordId] = defaultState
              }
            }
          }
        }

        return {
          ...previous,
          version: 2,
          onboardingCompleted: true,
          onboardingLevel: level,
          words: { ...initialWords, ...previous.words },
        }
      })
    },
    [vocabulary]
  )

  const getWordState = useCallback(
    (wordId: string): WordState => {
      const stored = state.words[wordId] as WordState | undefined
      if (stored) {
        return stored
      }

      // Derive default from onboarding level
      const parsed = parseWordId(wordId)
      if (!parsed) {
        return { inclusion: 'excluded', mastery: { ...DEFAULT_MASTERY } }
      }

      return getDefaultWordState(parsed.categoryId, parsed.difficulty, state.onboardingLevel)
    },
    [state.words, state.onboardingLevel]
  )

  const setWordInclusion = useCallback((wordId: string, status: WordInclusionStatus) => {
    setState(previous => ({
      ...previous,
      words: {
        ...previous.words,
        [wordId]: {
          ...(previous.words[wordId] ?? {
            inclusion: 'excluded',
            mastery: { ...DEFAULT_MASTERY },
          }),
          inclusion: status,
        },
      },
    }))
  }, [])

  const setWordMastery = useCallback(
    (wordId: string, operant: VerbalOperant, tier: MasteryTier) => {
      setState(previous => {
        const parsed = parseWordId(wordId)
        const fallback: WordState = parsed
          ? getDefaultWordState(parsed.categoryId, parsed.difficulty, previous.onboardingLevel)
          : { inclusion: 'excluded', mastery: { ...DEFAULT_MASTERY } }
        const current = previous.words[wordId] ?? fallback
        const record: MasteryRecord =
          tier === 'notStarted'
            ? { tier: 'notStarted', updatedAt: null }
            : { tier, updatedAt: Date.now() }
        return {
          ...previous,
          words: {
            ...previous.words,
            [wordId]: {
              ...current,
              mastery: { ...current.mastery, [operant]: record },
            },
          },
        }
      })
    },
    []
  )

  const getCategoryProgress = useCallback(
    (categoryId: string): CategoryProgress => {
      const category = vocabulary.find(c => c.id === categoryId)
      if (!category) {
        return {
          included: 0,
          total: 0,
          mastered: { mand: 0, tact: 0, listenerResponding: 0, echoic: 0 },
        }
      }

      let total = 0
      let included = 0
      const mastered: Record<VerbalOperant, number> = {
        mand: 0,
        tact: 0,
        listenerResponding: 0,
        echoic: 0,
      }

      const difficulties: WordDifficulty[] = ['simple', 'medium', 'complex']
      for (const difficulty of difficulties) {
        for (let i = 0; i < category.words[difficulty].length; i++) {
          total++
          const wordId = getWordId(category.id, difficulty, i)
          const wordState = getWordState(wordId)
          if (wordState.inclusion !== 'included') {
            continue
          }
          included++
          for (const operant of Object.keys(mastered) as VerbalOperant[]) {
            if (wordState.mastery[operant].tier === 'mastered') {
              mastered[operant]++
            }
          }
        }
      }

      return { included, total, mastered }
    },
    [vocabulary, getWordState]
  )

  const isWordEligible = useCallback(
    (
      wordState: WordState,
      options?: { operant?: VerbalOperant; unmasteredOnly?: boolean }
    ): boolean => {
      if (wordState.inclusion !== 'included') {
        return false
      }
      if (!options?.unmasteredOnly || !options.operant) {
        return true
      }
      return wordState.mastery[options.operant].tier !== 'mastered'
    },
    []
  )

  const getPracticeWords = useCallback(
    (
      levelId: string,
      options?: { operant?: VerbalOperant; unmasteredOnly?: boolean }
    ): VocabularyWord[] => {
      const categoryFilter = getLevelCategoryIds(levelId)
      const categories = categoryFilter
        ? vocabulary.filter(c => categoryFilter.includes(c.id))
        : vocabulary

      const result: VocabularyWord[] = []
      const difficulties: WordDifficulty[] = ['simple', 'medium', 'complex']

      for (const category of categories) {
        for (const difficulty of difficulties) {
          for (let i = 0; i < category.words[difficulty].length; i++) {
            const wordId = getWordId(category.id, difficulty, i)
            const wordState = getWordState(wordId)
            if (isWordEligible(wordState, options)) {
              result.push({ id: wordId, text: category.words[difficulty][i] })
            }
          }
        }
      }

      return result
    },
    [vocabulary, getWordState, isWordEligible]
  )

  const resetDictionary = useCallback(() => {
    setState(createInitialDictionaryState())
  }, [])

  const value = useMemo(
    () => ({
      isOnboardingCompleted: state.onboardingCompleted,
      onboardingLevel: state.onboardingLevel,
      completeOnboarding,
      getWordState,
      setWordInclusion,
      setWordMastery,
      getCategoryProgress,
      getPracticeWords,
      resetDictionary,
    }),
    [
      state.onboardingCompleted,
      state.onboardingLevel,
      completeOnboarding,
      getWordState,
      setWordInclusion,
      setWordMastery,
      getCategoryProgress,
      getPracticeWords,
      resetDictionary,
    ]
  )

  return <DictionaryContext.Provider value={value}>{children}</DictionaryContext.Provider>
}

export function useDictionary(): DictionaryContextValue {
  const context = useContext(DictionaryContext)
  if (!context) {
    throw new Error('useDictionary must be used within a DictionaryProvider')
  }
  return context
}
