_[Русский](./01-04-criteria-list-screen.ru.md)_

---

# 01-04: Criteria List Screen

Status: Draft

## Summary

Progression screen showing the 5 criteria within a section as level cards. Each card displays a simplified title, short description, status, and optional progress. Cards are ordered by developmental level (1--5). Tapping a card navigates to the criterion assessment screen.

## User Acceptance Criteria

- [ ] 5 cards displayed in order, each with: simplified title, short description, status badge
- [ ] Status badges: "Not started" (default), "In progress", "Completed"
- [ ] Completed criteria are visually distinct (checkmark, color change, or similar)
- [ ] Tapping any card navigates to that criterion's assessment screen
- [ ] Overall section progress visible (e.g., "2/5 completed" or progress bar)
- [ ] Cards reflect current assessment state (updated after returning from assessment/training)

## System Acceptance Criteria

- [ ] Route: `/sections/:sectionId/criteria`
- [ ] Criterion status read from persisted state
- [ ] Progress recalculated on mount and after navigation returns
- [ ] All 5 criteria accessible regardless of completion order (no forced linearity for MVP)

## Development Acceptance Criteria

- [ ] CSS Modules with design tokens only
- [ ] Responsive across all device profiles
- [ ] Unit test for progress calculation (0/5, 3/5, 5/5 states)
- [ ] Unit test for status badge rendering per criterion state
- [ ] E2E test: navigate from intro, verify 5 cards rendered, tap one reaches assessment

## Depends On

- 01-01 (data model), 01-03 (navigation context)

## Knowledge Reference

- [Developmental Milestones Assessment](../../knowledge/developmental-milestones-assessment.en.md)

## Related Files

_None yet._
