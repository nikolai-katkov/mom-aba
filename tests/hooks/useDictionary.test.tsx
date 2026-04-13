import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'

import { DictionaryProvider, useDictionary } from '../../src/hooks'
import { VOCABULARY_BY_LANGUAGE } from '../../src/i18n/translations'
import { getWordId } from '../../src/types/dictionary'

const vocabulary = VOCABULARY_BY_LANGUAGE.en

function createWrapper() {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <DictionaryProvider vocabulary={vocabulary}>{children}</DictionaryProvider>
  }
}

describe('useDictionary', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('throws when used outside DictionaryProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderHook(() => useDictionary())).toThrow(
      'useDictionary must be used within a DictionaryProvider'
    )
    spy.mockRestore()
  })

  it('starts with onboarding not completed', () => {
    const { result } = renderHook(() => useDictionary(), {
      wrapper: createWrapper(),
    })
    expect(result.current.isOnboardingCompleted).toBe(false)
    expect(result.current.onboardingLevel).toBeNull()
  })

  it('completeOnboarding sets level and marks completed', () => {
    const { result } = renderHook(() => useDictionary(), {
      wrapper: createWrapper(),
    })

    act(() => {
      result.current.completeOnboarding('intermediate')
    })

    expect(result.current.isOnboardingCompleted).toBe(true)
    expect(result.current.onboardingLevel).toBe('intermediate')
  })

  it('intermediate level includes all simple words', () => {
    const { result } = renderHook(() => useDictionary(), {
      wrapper: createWrapper(),
    })

    act(() => {
      result.current.completeOnboarding('intermediate')
    })

    // Simple words should be included
    const simpleWord = getWordId('toys', 'simple', 0)
    expect(result.current.getWordState(simpleWord).inclusion).toBe('included')

    // Medium words should be excluded
    const mediumWord = getWordId('toys', 'medium', 0)
    expect(result.current.getWordState(mediumWord).inclusion).toBe('excluded')

    // Complex words should be excluded
    const complexWord = getWordId('toys', 'complex', 0)
    expect(result.current.getWordState(complexWord).inclusion).toBe('excluded')
  })

  it('beginner level includes only simple words from motivating categories', () => {
    const { result } = renderHook(() => useDictionary(), {
      wrapper: createWrapper(),
    })

    act(() => {
      result.current.completeOnboarding('beginner')
    })

    // Toys (motivating) simple → included
    const toysSimple = getWordId('toys', 'simple', 0)
    expect(result.current.getWordState(toysSimple).inclusion).toBe('included')

    // Shapes (not motivating) simple → excluded
    const shapesSimple = getWordId('shapes', 'simple', 0)
    expect(result.current.getWordState(shapesSimple).inclusion).toBe('excluded')
  })

  it('advanced level includes simple and medium words', () => {
    const { result } = renderHook(() => useDictionary(), {
      wrapper: createWrapper(),
    })

    act(() => {
      result.current.completeOnboarding('advanced')
    })

    const simpleWord = getWordId('toys', 'simple', 0)
    const mediumWord = getWordId('toys', 'medium', 0)
    const complexWord = getWordId('toys', 'complex', 0)

    expect(result.current.getWordState(simpleWord).inclusion).toBe('included')
    expect(result.current.getWordState(mediumWord).inclusion).toBe('included')
    expect(result.current.getWordState(complexWord).inclusion).toBe('excluded')
  })

  it('setWordInclusion toggles a word', () => {
    const { result } = renderHook(() => useDictionary(), {
      wrapper: createWrapper(),
    })

    act(() => {
      result.current.completeOnboarding('intermediate')
    })

    const wordId = getWordId('toys', 'simple', 0)
    expect(result.current.getWordState(wordId).inclusion).toBe('included')

    act(() => {
      result.current.setWordInclusion(wordId, 'excluded')
    })

    expect(result.current.getWordState(wordId).inclusion).toBe('excluded')
  })

  it('setWordMastery toggles operant mastery', () => {
    const { result } = renderHook(() => useDictionary(), {
      wrapper: createWrapper(),
    })

    act(() => {
      result.current.completeOnboarding('intermediate')
    })

    const wordId = getWordId('toys', 'simple', 0)
    expect(result.current.getWordState(wordId).mastery.tact).toBe('none')

    act(() => {
      result.current.setWordMastery(wordId, 'tact', 'selfReport')
    })

    expect(result.current.getWordState(wordId).mastery.tact).toBe('selfReport')
    // Other operants unchanged
    expect(result.current.getWordState(wordId).mastery.mand).toBe('none')
  })

  it('getCategoryProgress returns correct counts', () => {
    const { result } = renderHook(() => useDictionary(), {
      wrapper: createWrapper(),
    })

    act(() => {
      result.current.completeOnboarding('intermediate')
    })

    const progress = result.current.getCategoryProgress('toys')
    expect(progress.total).toBeGreaterThan(0)
    // Intermediate includes all simple words from toys
    const toysCategory = vocabulary.find(c => c.id === 'toys')
    expect(toysCategory).toBeDefined()
    expect(progress.included).toBe(toysCategory?.words.simple.length)
  })

  it('returns empty mastery for invalid word ID', () => {
    const { result } = renderHook(() => useDictionary(), {
      wrapper: createWrapper(),
    })

    const state = result.current.getWordState('invalid-id')
    expect(state.inclusion).toBe('excluded')
    expect(state.mastery.tact).toBe('none')
  })

  it('getCategoryProgress returns zeros for unknown category', () => {
    const { result } = renderHook(() => useDictionary(), {
      wrapper: createWrapper(),
    })

    const progress = result.current.getCategoryProgress('nonexistent')
    expect(progress.total).toBe(0)
    expect(progress.included).toBe(0)
  })

  it('getPracticeWords returns included words for a criterion', () => {
    const { result } = renderHook(() => useDictionary(), {
      wrapper: createWrapper(),
    })

    act(() => {
      result.current.completeOnboarding('intermediate')
    })

    // tact-1 → motivating categories only, all simple words included
    const words = result.current.getPracticeWords('tact-1')
    expect(words.length).toBeGreaterThan(0)
    // Every word should have an id and text
    for (const word of words) {
      expect(word.id).toBeTruthy()
      expect(word.text).toBeTruthy()
    }
  })

  it('getPracticeWords returns all included words for higher levels', () => {
    const { result } = renderHook(() => useDictionary(), {
      wrapper: createWrapper(),
    })

    act(() => {
      result.current.completeOnboarding('intermediate')
    })

    // tact-5 → null (all categories), should include all simple words
    const words = result.current.getPracticeWords('tact-5')
    expect(words.length).toBeGreaterThan(0)
    // Should be more words than tact-1 (which only has motivating categories)
    const tact1Words = result.current.getPracticeWords('tact-1')
    expect(words.length).toBeGreaterThan(tact1Words.length)
  })

  it('persists state to localStorage', () => {
    const { result: result1 } = renderHook(() => useDictionary(), {
      wrapper: createWrapper(),
    })

    act(() => {
      result1.current.completeOnboarding('intermediate')
    })

    // Re-render a new hook instance — should restore from localStorage
    const { result: result2 } = renderHook(() => useDictionary(), {
      wrapper: createWrapper(),
    })

    expect(result2.current.isOnboardingCompleted).toBe(true)
    expect(result2.current.onboardingLevel).toBe('intermediate')
  })
})
