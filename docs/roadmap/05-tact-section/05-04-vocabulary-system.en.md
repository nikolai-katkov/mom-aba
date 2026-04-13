_[Русский](./05-04-vocabulary-system.ru.md)_

---

# 05-04: Vocabulary System

Status: Done

## Summary

Create a vocabulary data structure with 27 word categories at three difficulty levels (simple, medium, complex), linked to the Tact section. Add TypeScript types and expose through the language context.

## User Acceptance Criteria

- [x] 27 vocabulary categories available in both EN and RU
- [x] Each category has words at simple, medium, and complex levels
- [x] Categories are linked to the Tact section

## System Acceptance Criteria

- [x] New types: `WordDifficulty`, `VocabularyCategory` in `src/types/vocabulary.ts`
- [x] New file `src/i18n/translations/vocabulary.ts` with all 27 categories
- [x] `LanguageContext` exposes `vocabulary: VocabularyCategory[]`
- [x] Both languages have identical structure (same IDs, same array lengths)

## Depends On

- 05-02 (Tact section must exist)

## Related Files

- `src/types/vocabulary.ts`
- `src/types/index.ts`
- `src/i18n/translations/vocabulary.ts`
- `src/i18n/translations/index.ts`
- `src/i18n/LanguageContext.tsx`
