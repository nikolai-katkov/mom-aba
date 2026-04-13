_[English](./05-08-dictionary-data-model.en.md)_

---

# 05-08: Модель данных словаря и управление состоянием

Статус: Готово

## Описание

Определить TypeScript-типы для персонального словаря: уровни сложности слов, категории словаря, вербальные операнты, уровни освоения, уровни онбординга и состояние слов/словаря. Добавить утилиты сохранения в localStorage и логику сопоставления критериев с категориями.

## Критерии приёмки для пользователя

- [x] Состояние словаря сохраняется между сессиями браузера (переживает обновление страницы)
- [x] Каждое слово отслеживает статус включения и уровень освоения по каждому операнту независимо

## Системные критерии приёмки

- [x] `src/types/vocabulary.ts` экспортирует `WordDifficulty` (`simple | medium | complex`) и интерфейс `VocabularyCategory`
- [x] `src/types/dictionary.ts` экспортирует:
  - Тип `VerbalOperant` (`mand | tact | listenerResponding | echoic`)
  - Тип `MasteryTier` (`none | selfReport`)
  - Тип `WordInclusionStatus` (`included | excluded`)
  - Тип `OnboardingLevel` (`beginner | intermediate | advanced`)
  - Интерфейс `WordState` (включение + освоение по каждому операнту)
  - Интерфейс `DictionaryState` (версия, флаг онбординга, уровень, запись слов)
  - Интерфейс `VocabularyWord` (id, text, опциональный imageUrl)
- [x] Константа `MOTIVATING_CATEGORY_IDS`: toys, domestic-animals, food, fruits, body-parts, transport
- [x] Константа `EVERYDAY_CATEGORY_IDS`: clothing, footwear, furniture, dishes, appliances, headwear, school-supplies
- [x] `getCriterionCategoryIds(criterionId)` возвращает мотивирующие для уровней 1--2, бытовые для tact-3, null (все) для высших уровней
- [x] Хелперы `getWordId` / `parseWordId` для формата `category:difficulty:index`
- [x] Утилиты `loadDictionaryState` / `saveDictionaryState` в `src/utils/storage.ts`
- [x] Оба файла типов экспортируются через barrel `src/types/index.ts`

## Связанные файлы

- `src/types/vocabulary.ts`
- `src/types/dictionary.ts`
- `src/types/index.ts`
- `src/utils/storage.ts`
- `src/utils/index.ts`
