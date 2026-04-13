_[Русский](./05-10-dictionary-provider.ru.md)_

---

# 05-10: Dictionary Provider and State Hook

Status: Done

## Summary

Implement `DictionaryProvider` context and `useDictionary` hook that manage word inclusion, per-operant mastery tracking, onboarding completion, category progress calculation, and practice word retrieval filtered by criterion.

## User Acceptance Criteria

- [x] Words can be toggled between included/excluded in the dictionary
- [x] Each word tracks mastery independently across four verbal operants (Mand, Tact, Listener Responding, Echoic)
- [x] Category progress reflects the current inclusion and mastery counts
- [x] Practice words on the training page are filtered to the child's included words for the relevant criterion

## System Acceptance Criteria

- [x] `DictionaryProvider` accepts `vocabulary: VocabularyCategory[]` prop and wraps children with context
- [x] `useDictionary()` hook returns:
  - `isOnboardingCompleted: boolean`
  - `onboardingLevel: OnboardingLevel | null`
  - `completeOnboarding(level)` -- initializes default word states based on level
  - `getWordState(wordId)` -- returns stored or derived default state
  - `setWordInclusion(wordId, status)` -- toggles word inclusion
  - `setWordMastery(wordId, operant, tier)` -- updates per-operant mastery
  - `getCategoryProgress(categoryId)` -- returns `{ included, total, mastered: Record<VerbalOperant, number> }`
  - `getPracticeWords(criterionId)` -- returns `VocabularyWord[]` filtered by criterion category mapping and inclusion status
- [x] State persisted to localStorage via `useEffect` on state change
- [x] Default word state derived on-demand from onboarding level (lazy materialization -- only explicitly changed words stored)
- [x] `getVocabularyWord(vocabulary, wordId)` utility exported from the hook module for resolving word IDs to text
- [x] Provider and hook exported through `src/hooks/index.ts` barrel

## Depends On

- 05-08 (dictionary types and storage utilities)
- 05-04 (vocabulary data)

## Related Files

- `src/hooks/useDictionary.tsx`
- `src/hooks/index.ts`
- `src/App.tsx`
