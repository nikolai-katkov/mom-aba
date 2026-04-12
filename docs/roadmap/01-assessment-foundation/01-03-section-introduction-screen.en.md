_[Русский](./01-03-section-introduction-screen.ru.md)_

---

# 01-03: Section Introduction Screen

Status: Done

## Summary

Educational screen shown before the first assessment in a section. Explains what the skill category is, why it matters, and what the parent will do next. Uses progressive disclosure: short explanation visible by default, full explanation collapsed behind "Read more." Video slot shows a static placeholder image for MVP.

## User Acceptance Criteria

- [x] Short explanation visible by default: 3--5 bullets covering definition, practical value, and next steps
- [x] "Read more" expands to show full explanation (theory, examples, common mistakes)
- [x] Collapsing "Read more" hides the full explanation again
- [x] Video slot displays a static placeholder image with "Video coming soon" label
- [x] "Start" button navigates to criteria list
- [x] "Skip" button also navigates to criteria list (same destination, different intent tracking)
- [x] Content is specific to the section (Mand content for Mand)

## System Acceptance Criteria

- [x] Route: `/sections/:sectionId/intro`
- [x] Introduction content loaded from section data (not hardcoded in component)
- [x] "Skip" vs "Start" distinction tracked in state (for future analytics readiness, no analytics in MVP)
- [x] If user has already completed intro, navigating back shows it but does not block progress

## Development Acceptance Criteria

- [x] Progressive disclosure uses CSS transitions (not JS animation)
- [x] CSS Modules with design tokens only
- [x] Responsive across all device profiles
- [x] Unit test: "Read more" toggle behavior
- [x] E2E test: navigate from sections list, verify content renders, tap "Start" reaches criteria list

## Depends On

- 01-01 (data model), 01-02 (navigation context)

## Knowledge Reference

- [Developmental Milestones Assessment](../../knowledge/developmental-milestones-assessment.en.md)

## Related Files

- `src/pages/SectionIntroPage.tsx`
- `src/pages/SectionIntroPage.module.css`
- `src/components/ui/ProgressiveDisclosure/ProgressiveDisclosure.tsx`
- `src/components/ui/ProgressiveDisclosure/ProgressiveDisclosure.module.css`
- `src/components/ui/VideoPlaceholder/VideoPlaceholder.tsx`
- `src/components/ui/VideoPlaceholder/VideoPlaceholder.module.css`
- `tests/pages/SectionIntroPage.test.tsx`
