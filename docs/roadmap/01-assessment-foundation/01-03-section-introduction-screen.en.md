_[Русский](./01-03-section-introduction-screen.ru.md)_

---

# 01-03: Section Introduction Screen

Status: Draft

## Summary

Educational screen shown before the first assessment in a section. Explains what the skill category is, why it matters, and what the parent will do next. Uses progressive disclosure: short explanation visible by default, full explanation collapsed behind "Read more." Video slot shows a static placeholder image for MVP.

## User Acceptance Criteria

- [ ] Short explanation visible by default: 3--5 bullets covering definition, practical value, and next steps
- [ ] "Read more" expands to show full explanation (theory, examples, common mistakes)
- [ ] Collapsing "Read more" hides the full explanation again
- [ ] Video slot displays a static placeholder image with "Video coming soon" label
- [ ] "Start" button navigates to criteria list
- [ ] "Skip" button also navigates to criteria list (same destination, different intent tracking)
- [ ] Content is specific to the section (MAND content for MAND)

## System Acceptance Criteria

- [ ] Route: `/sections/:sectionId/intro`
- [ ] Introduction content loaded from section data (not hardcoded in component)
- [ ] "Skip" vs "Start" distinction tracked in state (for future analytics readiness, no analytics in MVP)
- [ ] If user has already completed intro, navigating back shows it but does not block progress

## Development Acceptance Criteria

- [ ] Progressive disclosure uses CSS transitions (not JS animation)
- [ ] CSS Modules with design tokens only
- [ ] Responsive across all device profiles
- [ ] Unit test: "Read more" toggle behavior
- [ ] E2E test: navigate from sections list, verify content renders, tap "Start" reaches criteria list

## Depends On

- 01-01 (data model), 01-02 (navigation context)

## Knowledge Reference

- [Developmental Milestones Assessment](../../knowledge/developmental-milestones-assessment.en.md)

## Related Files

_None yet._
