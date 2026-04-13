_[Русский](./05-14-training-page-integration.ru.md)_

---

# 05-14: Training Page Integration (Practice Words)

Status: Done

## Summary

Integrate the personal dictionary into the training page. After the step-by-step guide, display a "Practice words" section showing the child's included vocabulary words relevant to the current criterion, with image placeholders.

## User Acceptance Criteria

- [x] Training page shows a "Practice words" section below the step guide
- [x] Section header: "Practice words" with hint "From your child's dictionary"
- [x] Words display as cards in a responsive grid, each with an image placeholder (Image icon) and the word text
- [x] Only words marked as "included" in the dictionary appear
- [x] Words are filtered by criterion relevance:
  - Tact/Mand levels 1--2: only motivating categories (toys, domestic animals, food, fruits, body parts, transport)
  - Tact level 3: only everyday categories (clothing, footwear, furniture, dishes, appliances, headwear, school supplies)
  - Tact levels 4--5 and Mand levels 3--5: all included words
- [x] Section is hidden if no included words match the criterion

## System Acceptance Criteria

- [x] `PracticeWordsSection` component in `TrainingPage.tsx` accepts `criterionId` prop
- [x] Calls `useDictionary().getPracticeWords(criterionId)` to get filtered, included words
- [x] `PracticeWordCard` sub-component renders each word with image placeholder and label
- [x] CSS classes: `practiceSection`, `practiceHeader`, `practiceTitle`, `practiceHint`, `practiceGrid`, `wordCard`, `wordImage`, `wordLabel`
- [x] Translation keys: `practiceWords`, `practiceWordsHint`

## Depends On

- 05-10 (DictionaryProvider and getPracticeWords)

## Related Files

- `src/pages/TrainingPage.tsx`
- `src/pages/TrainingPage.module.css`
