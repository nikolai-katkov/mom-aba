_[Русский](./05-02-enable-tact-section.ru.md)_

---

# 05-02: Enable Tact Section

Status: Pending

## Summary

Flip `isAvailable` to `true` for the Tact section, fix the Russian subtitle, and remove the "coming soon" note from introduction text.

## User Acceptance Criteria

- [ ] Tact card on sections list is clickable and navigates to intro page
- [ ] RU subtitle shows "Называние" (changed from "Обозначение")
- [ ] Tact introduction page shows full explanation without "coming soon" note

## System Acceptance Criteria

- [ ] `sections.ts`: Tact `isAvailable` set to `true` in both languages
- [ ] `sections.ts`: RU subtitle changed to "Называние"
- [ ] `introduction.ts`: "coming soon" paragraph removed from EN and RU

## Related Files

- `src/i18n/translations/sections.ts`
- `src/i18n/translations/introduction.ts`
