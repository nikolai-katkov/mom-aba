import type { Language } from '../../src/i18n'
import { SECTIONS_BY_LANGUAGE } from '../../src/i18n/translations'

const LANGUAGES: Language[] = ['en', 'ru']

describe.each(LANGUAGES)('sections seed data (%s)', language => {
  const sections = SECTIONS_BY_LANGUAGE[language]
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- guaranteed by test assertions below
  const mandSection = sections.find(s => s.id === 'mand')!
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- guaranteed by test assertions below
  const tactSection = sections.find(s => s.id === 'tact')!

  it('Mand has exactly 5 levels', () => {
    expect(mandSection.levels).toHaveLength(5)
  })

  it('Mand is marked as available', () => {
    expect(mandSection.isAvailable).toBe(true)
  })

  it('has all required fields populated on every Mand level', () => {
    for (const level of mandSection.levels) {
      expect(level.id).toBeTruthy()
      expect(level.sectionId).toBe('mand')
      expect(level.level).toBeGreaterThanOrEqual(1)
      expect(level.title).toBeTruthy()
      expect(level.description).toBeTruthy()
      expect(level.question).toBeTruthy()
      expect(['TestTrial', 'CombinedTrial', 'TimedObservation', 'FreeOperant']).toContain(
        level.scoringType
      )
      expect(Array.isArray(level.conditions)).toBe(true)
      expect(Array.isArray(level.examples)).toBe(true)
      expect(['Independence', 'Generalization', 'RepertoireSize']).toContain(
        level.developmentDimension
      )
    }
  })

  it('has Mand levels ordered by level 1 through 5', () => {
    const levelNumbers = mandSection.levels.map(l => l.level)
    expect(levelNumbers).toEqual([1, 2, 3, 4, 5])
  })

  it('has unique Mand level IDs', () => {
    const ids = mandSection.levels.map(l => l.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('Tact exists and has 5 levels', () => {
    expect(tactSection.levels).toHaveLength(5)
  })

  it('Tact is marked as available', () => {
    expect(tactSection.isAvailable).toBe(true)
  })

  it('has all required fields populated on every Tact level', () => {
    for (const level of tactSection.levels) {
      expect(level.id).toBeTruthy()
      expect(level.sectionId).toBe('tact')
      expect(level.level).toBeGreaterThanOrEqual(1)
      expect(level.title).toBeTruthy()
      expect(level.description).toBeTruthy()
      expect(level.question).toBeTruthy()
      expect(['TestTrial', 'CombinedTrial', 'TimedObservation', 'FreeOperant']).toContain(
        level.scoringType
      )
      expect(Array.isArray(level.conditions)).toBe(true)
      expect(Array.isArray(level.examples)).toBe(true)
      expect(['Independence', 'Generalization', 'RepertoireSize']).toContain(
        level.developmentDimension
      )
    }
  })

  it('has Tact levels ordered by level 1 through 5', () => {
    const levelNumbers = tactSection.levels.map(l => l.level)
    expect(levelNumbers).toEqual([1, 2, 3, 4, 5])
  })

  it('has unique Tact level IDs', () => {
    const ids = tactSection.levels.map(l => l.id)
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

  it('has 7 placeholder sections marked unavailable with no levels', () => {
    const placeholders = sections.filter(s => s.id !== 'mand' && s.id !== 'tact')
    expect(placeholders).toHaveLength(7)
    for (const section of placeholders) {
      expect(section.isAvailable).toBe(false)
      expect(section.levels).toHaveLength(0)
    }
  })

  it('has globally unique level IDs across all sections', () => {
    const allIds = sections.flatMap(s => s.levels.map(l => l.id))
    expect(new Set(allIds).size).toBe(allIds.length)
  })
})

describe('sections consistency across languages', () => {
  it('has the same level IDs in both languages', () => {
    const enIds = SECTIONS_BY_LANGUAGE.en.flatMap(s => s.levels.map(l => l.id))
    const ruIds = SECTIONS_BY_LANGUAGE.ru.flatMap(s => s.levels.map(l => l.id))
    expect(enIds).toEqual(ruIds)
  })

  it('has the same section IDs in both languages', () => {
    const enIds = SECTIONS_BY_LANGUAGE.en.map(s => s.id)
    const ruIds = SECTIONS_BY_LANGUAGE.ru.map(s => s.id)
    expect(enIds).toEqual(ruIds)
  })
})
