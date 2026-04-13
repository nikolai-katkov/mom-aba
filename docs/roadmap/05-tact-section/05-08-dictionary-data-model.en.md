_[Русский](./05-08-dictionary-data-model.ru.md)_

---

# 05-08: Dictionary Data Model and State Management

Status: Done

## Summary

Define TypeScript types for the personal dictionary: word difficulty levels, vocabulary categories, verbal operants, mastery tiers, onboarding levels, and word/dictionary state. Add localStorage persistence utilities and criterion-to-category mapping logic.

## User Acceptance Criteria

- [x] Dictionary state persists across browser sessions (survives page refresh)
- [x] Each word tracks inclusion status and per-operant mastery independently

## System Acceptance Criteria

- [x] `src/types/vocabulary.ts` exports `WordDifficulty` (`simple | medium | complex`) and `VocabularyCategory` interface
- [x] `src/types/dictionary.ts` exports:
  - `VerbalOperant` type (`mand | tact | listenerResponding | echoic`)
  - `MasteryTier` type (`none | selfReport`)
  - `WordInclusionStatus` type (`included | excluded`)
  - `OnboardingLevel` type (`beginner | intermediate | advanced`)
  - `WordState` interface (inclusion + mastery per operant)
  - `DictionaryState` interface (version, onboarding flag, level, words record)
  - `VocabularyWord` interface (id, text, optional imageUrl)
- [x] `MOTIVATING_CATEGORY_IDS` constant: toys, domestic-animals, food, fruits, body-parts, transport
- [x] `EVERYDAY_CATEGORY_IDS` constant: clothing, footwear, furniture, dishes, appliances, headwear, school-supplies
- [x] `getCriterionCategoryIds(criterionId)` returns motivating for levels 1--2, everyday for tact-3, null (all) for higher levels
- [x] `getWordId` / `parseWordId` helpers for `category:difficulty:index` format
- [x] `loadDictionaryState` / `saveDictionaryState` utilities in `src/utils/storage.ts`
- [x] Both type files exported through `src/types/index.ts` barrel

## Related Files

- `src/types/vocabulary.ts`
- `src/types/dictionary.ts`
- `src/types/index.ts`
- `src/utils/storage.ts`
- `src/utils/index.ts`
