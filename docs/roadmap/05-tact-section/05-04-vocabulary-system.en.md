_[Русский](./05-04-vocabulary-system.ru.md)_

---

# 05-04: Vocabulary System

Status: Pending

## Summary

Create a vocabulary data structure with 27 word categories at three difficulty levels (simple, medium, complex), linked to the Tact section. Add TypeScript types and expose through the language context.

## User Acceptance Criteria

- [ ] 27 vocabulary categories available in both EN and RU
- [ ] Each category has words at simple, medium, and complex levels
- [ ] Categories are linked to the Tact section

## System Acceptance Criteria

- [ ] New types: `WordDifficulty`, `VocabularyCategory` in `src/types/vocabulary.ts`
- [ ] New file `src/i18n/translations/vocabulary.ts` with all 27 categories
- [ ] `LanguageContext` exposes `vocabulary: VocabularyCategory[]`
- [ ] Both languages have identical structure (same IDs, same array lengths)

## Depends On

- 05-02 (Tact section must exist)

## Related Files

- `src/types/vocabulary.ts` (new)
- `src/types/index.ts`
- `src/i18n/translations/vocabulary.ts` (new)
- `src/i18n/translations/index.ts`
- `src/i18n/LanguageContext.tsx`
