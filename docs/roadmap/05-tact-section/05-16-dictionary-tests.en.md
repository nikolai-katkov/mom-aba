_[Русский](./05-16-dictionary-tests.ru.md)_

---

# 05-16: Dictionary Tests

Status: Done

## Summary

Add unit tests for dictionary data model helpers, vocabulary seed data validation, and the `useDictionary` hook (onboarding, word inclusion, mastery tracking, category progress, practice words, localStorage persistence).

## System Acceptance Criteria

- [x] `tests/data/dictionary.test.ts`:
  - `getWordId` produces `category:difficulty:index` format
  - `parseWordId` parses valid IDs and returns null for invalid IDs
  - Round-trip: `parseWordId(getWordId(...))` returns original values
  - `getCriterionCategoryIds` returns motivating for tact/mand 1--2, everyday for tact-3, null for higher levels, null for unsupported sections
  - `getVocabularyWord` resolves valid IDs to word text, returns null for invalid/missing
- [x] `tests/data/vocabulary.test.ts`:
  - Both languages have exactly 27 categories
  - All categories linked to `tact` section
  - Unique category IDs per language
  - Non-empty names for every category
  - Non-empty word arrays at all three difficulty levels
  - Same category IDs across both languages
  - Same word counts per difficulty per category across languages
- [x] `tests/hooks/useDictionary.test.tsx`:
  - Throws when used outside `DictionaryProvider`
  - Starts with onboarding not completed
  - `completeOnboarding` sets level and marks completed
  - Beginner: includes only simple words from motivating categories
  - Intermediate: includes all simple words
  - Advanced: includes simple + medium words
  - `setWordInclusion` toggles word inclusion status
  - `setWordMastery` toggles per-operant mastery
  - `getCategoryProgress` returns correct included/total counts
  - `getWordState` returns excluded + none mastery for invalid word IDs
  - `getCategoryProgress` returns zeros for unknown category
  - `getPracticeWords` returns included words filtered by criterion
  - `getPracticeWords` returns more words for higher levels than lower levels
  - State persists to localStorage across re-renders

## Related Files

- `tests/data/dictionary.test.ts`
- `tests/data/vocabulary.test.ts`
- `tests/hooks/useDictionary.test.tsx`
