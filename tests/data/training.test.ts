import type { Language } from '../../src/i18n'
import { SECTIONS_BY_LANGUAGE, TRAINING_BY_LANGUAGE } from '../../src/i18n/translations'

const LANGUAGES: Language[] = ['en', 'ru']

describe.each(LANGUAGES)('training content seed data (%s)', language => {
  const sections = SECTIONS_BY_LANGUAGE[language]
  const training = TRAINING_BY_LANGUAGE[language]
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- guaranteed by test assertions
  const mandSection = sections.find(s => s.id === 'mand')!

  it('has training content for every MAND criterion', () => {
    for (const criterion of mandSection.criteria) {
      expect(training[criterion.id]).toBeDefined()
    }
  })

  it('has at least one step in shortGuide for each entry', () => {
    for (const content of Object.values(training)) {
      expect(content.shortGuide.length).toBeGreaterThanOrEqual(1)
    }
  })

  it('has criterionId matching the key for each entry', () => {
    for (const [key, content] of Object.entries(training)) {
      expect(content.criterionId).toBe(key)
    }
  })

  it('has non-empty fullGuide and commonMistakes for each entry', () => {
    for (const content of Object.values(training)) {
      expect(content.fullGuide).toBeTruthy()
      expect(content.commonMistakes.length).toBeGreaterThanOrEqual(1)
    }
  })
})

describe('training consistency across languages', () => {
  it('has the same training keys in both languages', () => {
    const enKeys = Object.keys(TRAINING_BY_LANGUAGE.en).sort()
    const ruKeys = Object.keys(TRAINING_BY_LANGUAGE.ru).sort()
    expect(enKeys).toEqual(ruKeys)
  })
})
