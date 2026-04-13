_[Русский](./05-02-enable-tact-section.ru.md)_

---

# 05-02: Enable Tact Section

Status: Done

## Summary

Flip `isAvailable` to `true` for the Tact section, fix the Russian subtitle, and remove the "coming soon" note from introduction text.

## User Acceptance Criteria

- [x] Tact card on sections list is clickable and navigates to intro page
- [x] RU subtitle shows "Называние" (changed from "Обозначение")
- [x] Tact introduction page shows full explanation without "coming soon" note

## System Acceptance Criteria

- [x] `sections.ts`: Tact `isAvailable` set to `true` in both languages
- [x] `sections.ts`: RU subtitle changed to "Называние"
- [x] `introduction.ts`: "coming soon" paragraph removed from EN and RU

## Related Files

- `src/i18n/translations/sections.ts`
- `src/i18n/translations/introduction.ts`
