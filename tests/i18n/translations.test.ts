import {
  INTRODUCTIONS_BY_LANGUAGE,
  SECTIONS_BY_LANGUAGE,
  TRAINING_BY_LANGUAGE,
  UI_TRANSLATIONS,
} from '../../src/i18n/translations'

describe('translation completeness', () => {
  it('has the same UI translation keys in both languages', () => {
    const enKeys = Object.keys(UI_TRANSLATIONS.en).sort()
    const ruKeys = Object.keys(UI_TRANSLATIONS.ru).sort()
    expect(enKeys).toEqual(ruKeys)
  })

  it('has no empty UI translation values', () => {
    for (const [lang, translations] of Object.entries(UI_TRANSLATIONS)) {
      for (const [key, value] of Object.entries(translations)) {
        expect(value, `${lang}.${key} is empty`).toBeTruthy()
      }
    }
  })

  it('has the same section IDs in both languages', () => {
    const enIds = SECTIONS_BY_LANGUAGE.en.map(s => s.id)
    const ruIds = SECTIONS_BY_LANGUAGE.ru.map(s => s.id)
    expect(enIds).toEqual(ruIds)
  })

  it('has the same criterion IDs in both languages', () => {
    const enIds = SECTIONS_BY_LANGUAGE.en.flatMap(s => s.criteria.map(c => c.id))
    const ruIds = SECTIONS_BY_LANGUAGE.ru.flatMap(s => s.criteria.map(c => c.id))
    expect(enIds).toEqual(ruIds)
  })

  it('has the same number of criteria per section in both languages', () => {
    for (let i = 0; i < SECTIONS_BY_LANGUAGE.en.length; i++) {
      expect(
        SECTIONS_BY_LANGUAGE.en[i].criteria.length,
        `section ${SECTIONS_BY_LANGUAGE.en[i].id}`
      ).toBe(SECTIONS_BY_LANGUAGE.ru[i].criteria.length)
    }
  })

  it('has the same introduction keys in both languages', () => {
    const enKeys = Object.keys(INTRODUCTIONS_BY_LANGUAGE.en).sort()
    const ruKeys = Object.keys(INTRODUCTIONS_BY_LANGUAGE.ru).sort()
    expect(enKeys).toEqual(ruKeys)
  })

  it('has the same training keys in both languages', () => {
    const enKeys = Object.keys(TRAINING_BY_LANGUAGE.en).sort()
    const ruKeys = Object.keys(TRAINING_BY_LANGUAGE.ru).sort()
    expect(enKeys).toEqual(ruKeys)
  })

  it('has non-empty section titles and subtitles in both languages', () => {
    for (const lang of ['en', 'ru'] as const) {
      for (const section of SECTIONS_BY_LANGUAGE[lang]) {
        expect(section.title, `${lang} section ${section.id} title`).toBeTruthy()
        expect(section.subtitle, `${lang} section ${section.id} subtitle`).toBeTruthy()
      }
    }
  })

  it('has non-empty criterion fields in both languages', () => {
    for (const lang of ['en', 'ru'] as const) {
      for (const section of SECTIONS_BY_LANGUAGE[lang]) {
        for (const criterion of section.criteria) {
          expect(criterion.title, `${lang} ${criterion.id} title`).toBeTruthy()
          expect(criterion.description, `${lang} ${criterion.id} description`).toBeTruthy()
          expect(criterion.question, `${lang} ${criterion.id} question`).toBeTruthy()
        }
      }
    }
  })

  it('has non-empty introduction content in both languages', () => {
    for (const lang of ['en', 'ru'] as const) {
      for (const [key, intro] of Object.entries(INTRODUCTIONS_BY_LANGUAGE[lang])) {
        expect(intro.shortBullets.length, `${lang} ${key} shortBullets`).toBeGreaterThan(0)
        expect(intro.fullExplanation, `${lang} ${key} fullExplanation`).toBeTruthy()
      }
    }
  })
})
