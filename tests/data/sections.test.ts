import { MAND_SECTION, SECTIONS, TACT_SECTION } from '../../src/data'

describe('MAND section seed data', () => {
  it('has exactly 5 criteria', () => {
    expect(MAND_SECTION.criteria).toHaveLength(5)
  })

  it('is marked as available', () => {
    expect(MAND_SECTION.isAvailable).toBe(true)
  })

  it('has all required fields populated on every criterion', () => {
    for (const criterion of MAND_SECTION.criteria) {
      expect(criterion.id).toBeTruthy()
      expect(criterion.sectionId).toBe('mand')
      expect(criterion.level).toBeGreaterThanOrEqual(1)
      expect(criterion.title).toBeTruthy()
      expect(criterion.description).toBeTruthy()
      expect(criterion.question).toBeTruthy()
      expect(['TCT', 'NAB', 'KOM', 'NOV']).toContain(criterion.scoringType)
      expect(Array.isArray(criterion.conditions)).toBe(true)
      expect(Array.isArray(criterion.examples)).toBe(true)
      expect(['Independence', 'Generalization', 'RepertoireSize']).toContain(
        criterion.developmentDimension
      )
    }
  })

  it('has criteria ordered by level 1 through 5', () => {
    const levels = MAND_SECTION.criteria.map(c => c.level)
    expect(levels).toEqual([1, 2, 3, 4, 5])
  })

  it('has unique criterion IDs', () => {
    const ids = MAND_SECTION.criteria.map(c => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('TACT section seed data', () => {
  it('exists and has 5 criteria', () => {
    expect(TACT_SECTION.criteria).toHaveLength(5)
  })

  it('is marked as unavailable', () => {
    expect(TACT_SECTION.isAvailable).toBe(false)
  })

  it('has unique criterion IDs', () => {
    const ids = TACT_SECTION.criteria.map(c => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('SECTIONS array', () => {
  it('contains both MAND and TACT', () => {
    expect(SECTIONS).toHaveLength(2)
    expect(SECTIONS.map(s => s.id)).toEqual(['mand', 'tact'])
  })

  it('has globally unique criterion IDs across all sections', () => {
    const allIds = SECTIONS.flatMap(s => s.criteria.map(c => c.id))
    expect(new Set(allIds).size).toBe(allIds.length)
  })
})
