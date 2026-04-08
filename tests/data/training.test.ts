import { MAND_SECTION, TRAINING_CONTENT } from '../../src/data'

describe('training content seed data', () => {
  it('has training content for every MAND criterion', () => {
    for (const criterion of MAND_SECTION.criteria) {
      expect(TRAINING_CONTENT[criterion.id]).toBeDefined()
    }
  })

  it('has at least one step in shortGuide for each entry', () => {
    for (const content of Object.values(TRAINING_CONTENT)) {
      expect(content.shortGuide.length).toBeGreaterThanOrEqual(1)
    }
  })

  it('has criterionId matching the key for each entry', () => {
    for (const [key, content] of Object.entries(TRAINING_CONTENT)) {
      expect(content.criterionId).toBe(key)
    }
  })

  it('has non-empty fullGuide and commonMistakes for each entry', () => {
    for (const content of Object.values(TRAINING_CONTENT)) {
      expect(content.fullGuide).toBeTruthy()
      expect(content.commonMistakes.length).toBeGreaterThanOrEqual(1)
    }
  })
})
