_[English](./05-15-i18n-dictionary-strings.en.md)_

---

# 05-15: i18n-строки словаря и онбординга

Статус: Готово

## Описание

Добавить все пользовательские строки для словаря, онбординга и связанного UI в оба файла переводов EN и RU. Добавить файл данных словаря с 27 категориями на обоих языках.

## Критерии приёмки для пользователя

- [x] Весь текст UI словаря и онбординга корректно отображается на обоих языках
- [x] Переключение языка мгновенно обновляет весь текст, связанный со словарём
- [x] Все 27 названий категорий словаря переведены

## Системные критерии приёмки

- [x] `ui.ts` содержит следующие ключи в обоих `en` и `ru`:

| Ключ                         | EN                                                       | RU                                                             |
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

- [x] `vocabulary.ts` экспортирует `VOCABULARY_BY_LANGUAGE` с 27 категориями на язык, идентичные ID и количество слов
- [x] Все ключи определены в интерфейсе `UiTranslations` (`src/i18n/types.ts`)
- [x] Тест полноты переводов проходит: `npm test -- tests/i18n/translations.test.ts`

## Связанные файлы

- `src/i18n/translations/ui.ts`
- `src/i18n/translations/vocabulary.ts`
- `src/i18n/types.ts`
