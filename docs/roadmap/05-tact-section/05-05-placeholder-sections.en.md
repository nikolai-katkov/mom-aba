_[Русский](./05-05-placeholder-sections.ru.md)_

---

# 05-05: Placeholder Sections

Status: Done

## Summary

Add 7 new sections with `isAvailable: false` for future VB-MAPP Level I categories: Listener Responding, Visual Perceptual, Independent Play, Social Behaviour, Motor Imitation, Echoic, Spontaneous Vocal Behaviour.

## User Acceptance Criteria

- [x] Sections list shows 9 total sections (2 active, 7 placeholder)
- [x] Each placeholder has a distinct icon and "Coming soon" label
- [x] Placeholder cards are visually disabled

## System Acceptance Criteria

- [x] 7 section constants added to `sections.ts` (both languages) with `isAvailable: false` and `criteria: []`
- [x] Stub introductions added to `introduction.ts` for all 7 sections
- [x] `SECTION_ICONS` in `SectionsListPage.tsx` includes all 9 section IDs

## Depends On

- 05-02 (same file: sections.ts)

## Related Files

- `src/i18n/translations/sections.ts`
- `src/i18n/translations/introduction.ts`
- `src/pages/SectionsListPage.tsx`
