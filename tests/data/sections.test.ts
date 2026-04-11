import type { Language } from '../../src/i18n'
import { SECTIONS_BY_LANGUAGE } from '../../src/i18n/translations'

const LANGUAGES: Language[] = ['en', 'ru']

describe.each(LANGUAGES)('sections seed data (%s)', language => {
  const sections = SECTIONS_BY_LANGUAGE[language]
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- guaranteed by test assertions below
  const mandSection = sections.find(s => s.id === 'mand')!
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- guaranteed by test assertions below
  const tactSection = sections.find(s => s.id === 'tact')!

  it('MAND has exactly 5 criteria', () => {
    expect(mandSection.criteria).toHaveLength(5)
  })

  it('MAND is marked as available', () => {
    expect(mandSection.isAvailable).toBe(true)
  })

  it('has all required fields populated on every MAND criterion', () => {
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

  it('has MAND criteria ordered by level 1 through 5', () => {
    const levels = mandSection.criteria.map(c => c.level)
    expect(levels).toEqual([1, 2, 3, 4, 5])
  })

  it('has unique MAND criterion IDs', () => {
    const ids = mandSection.criteria.map(c => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('TACT exists and has 5 criteria', () => {
    expect(tactSection.criteria).toHaveLength(5)
  })

  it('TACT is marked as unavailable', () => {
    expect(tactSection.isAvailable).toBe(false)
  })

  it('has unique TACT criterion IDs', () => {
    const ids = tactSection.criteria.map(c => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('contains both MAND and TACT', () => {
    expect(sections).toHaveLength(2)
    expect(sections.map(s => s.id)).toEqual(['mand', 'tact'])
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
