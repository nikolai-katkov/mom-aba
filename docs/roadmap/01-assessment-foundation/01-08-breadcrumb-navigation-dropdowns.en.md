_[Русский](./01-08-breadcrumb-navigation-dropdowns.ru.md)_

---

# 01-08: Breadcrumb Navigation Dropdowns

Status: Done

## Summary

Hover-triggered popover dropdowns on desktop breadcrumb segments that have sibling pages (sections and criteria). Allows users to jump sideways between sections or criteria without navigating back. Mobile shows a single back link instead of the full trail.

## User Acceptance Criteria

- [x] Section breadcrumb segment (e.g., "Mand") shows dropdown with all available sections on hover
- [x] Criterion breadcrumb segment (e.g., "III - Generalize 6 requests") shows dropdown with all criteria in that section on hover
- [x] Current page highlighted in dropdown (bold + primary color)
- [x] Selecting a sibling navigates to the same page type (assessment -> assessment, training -> training)
- [x] Breadcrumb segments without siblings (Home, Levels, Training) have no dropdown
- [x] On narrow viewports (<=640px), full trail collapses to a single back link

## System Acceptance Criteria

- [x] Dropdown opens with 150ms enter delay, closes with 300ms leave delay
- [x] Keyboard accessible: Enter/Space toggles, ArrowDown/ArrowUp navigate items, Escape closes
- [x] ARIA: `aria-haspopup="menu"`, `aria-expanded`, `role="menu"`, `role="menuitem"`, `aria-current="location"`
- [x] Dropdown renders above page content (z-index on header)

## Development Acceptance Criteria

- [x] All styles use design tokens — adapts to all 3 themes (Warm/Soft/Editorial) x 2 modes automatically
- [x] Viewport breakpoint (640px) controls trail vs back link — not UA or touch detection
- [x] Touch targets sized via `@media (hover: none) and (pointer: coarse)` — not viewport
- [x] No "mobile" naming in CSS — uses viewport/pointer terminology
- [x] `BreadcrumbDropdown` is internal to Breadcrumbs directory (not exported from barrel)
- [x] `BreadcrumbItem` extended with optional `siblings` (backward-compatible)
- [x] ESLint and TypeScript clean
- [x] All existing tests pass

## Related Files

- `src/components/ui/Breadcrumbs/BreadcrumbDropdown.tsx` (new)
- `src/components/ui/Breadcrumbs/Breadcrumbs.tsx`
- `src/components/ui/Breadcrumbs/Breadcrumbs.module.css`
- `src/components/ui/PageLayout/PageLayout.module.css`
- `src/pages/SectionIntroPage.tsx`
- `src/pages/CriteriaListPage.tsx`
- `src/pages/CriterionAssessmentPage.tsx`
- `src/pages/TrainingPage.tsx`

## Implementation Notes

- Responsive strategy ported from `chords` project: viewport breakpoints for layout, pointer media queries for touch targets, no "mobile" assumptions
- VideoPlaceholder component deleted in same change — video inlined in SectionIntroPage, placeholders removed from TrainingPage and CriterionAssessmentPage
