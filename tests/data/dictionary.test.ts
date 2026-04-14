import { describe, expect, it } from 'vitest'

import { getVocabularyWord } from '../../src/hooks/useDictionary'
import { VOCABULARY_BY_LANGUAGE } from '../../src/i18n/translations'
import {
  EVERYDAY_CATEGORY_IDS,
  getLevelCategoryIds,
  getWordId,
  MOTIVATING_CATEGORY_IDS,
  parseWordId,
} from '../../src/types/dictionary'

describe('Word ID helpers', () => {
  describe('getWordId', () => {
    it('produces category:difficulty:index format', () => {
      expect(getWordId('toys', 'simple', 0)).toBe('toys:simple:0')
      expect(getWordId('body-parts', 'complex', 5)).toBe('body-parts:complex:5')
    })
  })

  describe('parseWordId', () => {
    it('parses valid word IDs', () => {
      expect(parseWordId('toys:simple:0')).toEqual({
        categoryId: 'toys',
        difficulty: 'simple',
        index: 0,
      })
      expect(parseWordId('body-parts:complex:5')).toEqual({
        categoryId: 'body-parts',
        difficulty: 'complex',
        index: 5,
      })
    })

    it('returns null for invalid IDs', () => {
      expect(parseWordId('')).toBeNull()
      expect(parseWordId('toys')).toBeNull()
      expect(parseWordId('toys:simple')).toBeNull()
      expect(parseWordId('toys:invalid:0')).toBeNull()
      expect(parseWordId('toys:simple:abc')).toBeNull()
      expect(parseWordId('toys:simple:-1')).toBeNull()
    })

    it('round-trips with getWordId', () => {
      const id = getWordId('fruits', 'medium', 3)
      const parsed = parseWordId(id)
      expect(parsed).toEqual({ categoryId: 'fruits', difficulty: 'medium', index: 3 })
    })
  })
})

describe('getLevelCategoryIds', () => {
  it('returns motivating categories for tact levels 1-2', () => {
    expect(getLevelCategoryIds('tact-1')).toBe(MOTIVATING_CATEGORY_IDS)
    expect(getLevelCategoryIds('tact-2')).toBe(MOTIVATING_CATEGORY_IDS)
  })

  it('returns motivating categories for mand levels 1-2', () => {
    expect(getLevelCategoryIds('mand-1')).toBe(MOTIVATING_CATEGORY_IDS)
    expect(getLevelCategoryIds('mand-2')).toBe(MOTIVATING_CATEGORY_IDS)
  })

  it('returns everyday categories for tact level 3', () => {
    expect(getLevelCategoryIds('tact-3')).toBe(EVERYDAY_CATEGORY_IDS)
  })

  it('returns null (all categories) for tact levels 4-5', () => {
    expect(getLevelCategoryIds('tact-4')).toBeNull()
    expect(getLevelCategoryIds('tact-5')).toBeNull()
  })

  it('returns null (all categories) for mand levels 3-5', () => {
    expect(getLevelCategoryIds('mand-3')).toBeNull()
    expect(getLevelCategoryIds('mand-4')).toBeNull()
    expect(getLevelCategoryIds('mand-5')).toBeNull()
  })

  it('returns null for unsupported sections', () => {
    expect(getLevelCategoryIds('echoic-1')).toBeNull()
    expect(getLevelCategoryIds('listener-responding-1')).toBeNull()
  })
})

describe('getVocabularyWord', () => {
  const vocabulary = VOCABULARY_BY_LANGUAGE.en

  it('returns word for valid ID', () => {
    const word = getVocabularyWord(vocabulary, 'toys:simple:0')
    expect(word).toEqual({ id: 'toys:simple:0', text: 'ball' })
  })

  it('returns null for invalid word ID format', () => {
    expect(getVocabularyWord(vocabulary, 'invalid')).toBeNull()
    expect(getVocabularyWord(vocabulary, '')).toBeNull()
  })

  it('returns null for non-existent category', () => {
    expect(getVocabularyWord(vocabulary, 'nonexistent:simple:0')).toBeNull()
  })

  it('returns null for out-of-bounds index', () => {
    expect(getVocabularyWord(vocabulary, 'toys:simple:999')).toBeNull()
  })
})
