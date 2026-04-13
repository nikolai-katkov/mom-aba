_[Русский](./05-15-i18n-dictionary-strings.ru.md)_

---

# 05-15: i18n Dictionary and Onboarding Strings

Status: Done

## Summary

Add all user-facing strings for the dictionary, onboarding, and related UI to both EN and RU translation files. Add vocabulary data file with 27 categories in both languages.

## User Acceptance Criteria

- [x] All dictionary and onboarding UI text renders correctly in both EN and RU
- [x] Language switching updates all dictionary-related text immediately
- [x] All 27 vocabulary category names are translated

## System Acceptance Criteria

- [x] `ui.ts` includes the following keys in both `en` and `ru`:

| Key                          | EN                                                       | RU                                                             |
| ---------------------------- | -------------------------------------------------------- | -------------------------------------------------------------- |
| `dictionaryTitle`            | My Child's Words                                         | Словарь ребёнка                                                |
| `dictionarySubtitle`         | Words your child is learning to say and understand       | Слова, которые ваш ребёнок учится произносить и понимать       |
| `difficultySimple`           | Simple                                                   | Простые                                                        |
| `difficultyMedium`           | Medium                                                   | Средние                                                        |
| `difficultyComplex`          | Complex                                                  | Сложные                                                        |
| `zoneIncluded`               | In dictionary                                            | В словаре                                                      |
| `zoneExcluded`               | Not included                                             | Не включены                                                    |
| `operantMand`                | Requesting                                               | Просьбы                                                        |
| `operantTact`                | Labeling                                                 | Называние                                                      |
| `operantListener`            | Understanding                                            | Понимание                                                      |
| `operantEchoic`              | Repeating                                                | Повторение                                                     |
| `onboardingTitle`            | Where are we starting?                                   | С чего начинаем?                                               |
| `onboardingSubtitle`         | Choose what best describes your child right now          | Выберите, что лучше описывает вашего ребёнка сейчас            |
| `onboardingBeginner`         | Just starting                                            | Только начинаем                                                |
| `onboardingBeginnerDesc`     | My child doesn't name things yet, or names 1--2 items    | Ребёнок пока не называет или называет 1--2 предмета            |
| `onboardingIntermediate`     | Knows some words                                         | Знает несколько слов                                           |
| `onboardingIntermediateDesc` | My child can name several familiar objects               | Ребёнок может назвать несколько знакомых предметов             |
| `onboardingAdvanced`         | Labels many things                                       | Называет многое                                                |
| `onboardingAdvancedDesc`     | My child confidently names various objects in daily life | Ребёнок уверенно называет разные предметы в повседневной жизни |
| `practiceWords`              | Practice words                                           | Слова для тренировки                                           |
| `practiceWordsHint`          | From your child's dictionary                             | Из словаря вашего ребёнка                                      |

- [x] `vocabulary.ts` exports `VOCABULARY_BY_LANGUAGE` with 27 categories per language, identical IDs and word counts
- [x] All keys defined in `UiTranslations` interface (`src/i18n/types.ts`)
- [x] Translation completeness test passes: `npm test -- tests/i18n/translations.test.ts`

## Related Files

- `src/i18n/translations/ui.ts`
- `src/i18n/translations/vocabulary.ts`
- `src/i18n/types.ts`
