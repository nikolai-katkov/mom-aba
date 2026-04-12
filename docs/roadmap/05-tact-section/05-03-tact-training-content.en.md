_[Русский](./05-03-tact-training-content.ru.md)_

---

# 05-03: Tact Training Content

Status: Pending

## Summary

Add training content for all 5 Tact criteria (tact-1 through tact-5) in both EN and RU. Each entry includes a 4-step shortGuide, fullGuide, and commonMistakes array.

## User Acceptance Criteria

- [ ] Each Tact criterion's training page shows a 4-step short guide
- [ ] "Read more" expands to show full guide text
- [ ] Common mistakes section shows 4 items per criterion
- [ ] Content is parent-friendly: warm, actionable, avoids clinical jargon
- [ ] RU content uses established ABA Russian terminology

## System Acceptance Criteria

- [ ] `training.ts` contains keys `tact-1` through `tact-5` in both languages
- [ ] Each entry has `criterionId` matching its key
- [ ] Each entry has exactly 4 steps in `shortGuide`
- [ ] Each entry has non-empty `fullGuide` and `commonMistakes` (4 items)

## Depends On

- 05-02 (Tact must be available for E2E testing)

## Related Files

- `src/i18n/translations/training.ts`
