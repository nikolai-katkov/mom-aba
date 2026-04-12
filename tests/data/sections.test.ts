import type { Language } from '../../src/i18n'
import { SECTIONS_BY_LANGUAGE } from '../../src/i18n/translations'

const LANGUAGES: Language[] = ['en', 'ru']

describe.each(LANGUAGES)('sections seed data (%s)', language => {
  const sections = SECTIONS_BY_LANGUAGE[language]
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- guaranteed by test assertions below
  const mandSection = sections.find(s => s.id === 'mand')!
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- guaranteed by test assertions below
  const tactSection = sections.find(s => s.id === 'tact')!

  it('Mand has exactly 5 criteria', () => {
    expect(mandSection.criteria).toHaveLength(5)
  })

  it('Mand is marked as available', () => {
    expect(mandSection.isAvailable).toBe(true)
  })

  it('has all required fields populated on every Mand criterion', () => {
    for (const criterion of mandSection.criteria) {
      expect(criterion.id).toBeTruthy()
      expect(criterion.sectionId).toBe('mand')
      expect(criterion.level).toBeGreaterThanOrEqual(1)
      expect(criterion.title).toBeTruthy()
      expect(criterion.description).toBeTruthy()
      expect(criterion.question).toBeTruthy()
      expect(['TestTrial', 'CombinedTrial', 'TimedObservation', 'FreeOperant']).toContain(
        criterion.scoringType
      )
      expect(Array.isArray(criterion.conditions)).toBe(true)
      expect(Array.isArray(criterion.examples)).toBe(true)
      expect(['Independence', 'Generalization', 'RepertoireSize']).toContain(
        criterion.developmentDimension
      )
    }
  })

  it('has Mand criteria ordered by level 1 through 5', () => {
    const levels = mandSection.criteria.map(c => c.level)
    expect(levels).toEqual([1, 2, 3, 4, 5])
  })

  it('has unique Mand criterion IDs', () => {
    const ids = mandSection.criteria.map(c => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('Tact exists and has 5 criteria', () => {
    expect(tactSection.criteria).toHaveLength(5)
  })

  it('Tact is marked as available', () => {
    expect(tactSection.isAvailable).toBe(true)
  })

  it('has all required fields populated on every Tact criterion', () => {
    for (const criterion of tactSection.criteria) {
      expect(criterion.id).toBeTruthy()
      expect(criterion.sectionId).toBe('tact')
      expect(criterion.level).toBeGreaterThanOrEqual(1)
      expect(criterion.title).toBeTruthy()
      expect(criterion.description).toBeTruthy()
      expect(criterion.question).toBeTruthy()
      expect(['TestTrial', 'CombinedTrial', 'TimedObservation', 'FreeOperant']).toContain(
        criterion.scoringType
      )
      expect(Array.isArray(criterion.conditions)).toBe(true)
      expect(Array.isArray(criterion.examples)).toBe(true)
      expect(['Independence', 'Generalization', 'RepertoireSize']).toContain(
        criterion.developmentDimension
      )
    }
  })

  it('has Tact criteria ordered by level 1 through 5', () => {
    const levels = tactSection.criteria.map(c => c.level)
    expect(levels).toEqual([1, 2, 3, 4, 5])
  })

  it('has unique Tact criterion IDs', () => {
    const ids = tactSection.criteria.map(c => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('contains all 9 sections in correct order', () => {
    expect(sections).toHaveLength(9)
    expect(sections.map(s => s.id)).toEqual([
      'mand',
      'tact',
      'listener-responding',
      'visual-perceptual',
      'independent-play',
      'social-behaviour',
      'motor-imitation',
      'echoic',
      'spontaneous-vocal',
    ])
  })

  it('has 7 placeholder sections marked unavailable with no criteria', () => {
    const placeholders = sections.filter(s => s.id !== 'mand' && s.id !== 'tact')
    expect(placeholders).toHaveLength(7)
    for (const section of placeholders) {
      expect(section.isAvailable).toBe(false)
      expect(section.criteria).toHaveLength(0)
    }
  })

  it('has globally unique criterion IDs across all sections', () => {
    const allIds = sections.flatMap(s => s.criteria.map(c => c.id))
    expect(new Set(allIds).size).toBe(allIds.length)
  })
})

describe('sections consistency across languages', () => {
  it('has the same criterion IDs in both languages', () => {
    const enIds = SECTIONS_BY_LANGUAGE.en.flatMap(s => s.criteria.map(c => c.id))
    const ruIds = SECTIONS_BY_LANGUAGE.ru.flatMap(s => s.criteria.map(c => c.id))
    expect(enIds).toEqual(ruIds)
  })

  it('has the same section IDs in both languages', () => {
    const enIds = SECTIONS_BY_LANGUAGE.en.map(s => s.id)
    const ruIds = SECTIONS_BY_LANGUAGE.ru.map(s => s.id)
    expect(enIds).toEqual(ruIds)
  })
})
