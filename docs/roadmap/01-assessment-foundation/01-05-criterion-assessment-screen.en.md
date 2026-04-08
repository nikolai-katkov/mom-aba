_[Русский](./01-05-criterion-assessment-screen.ru.md)_

---

# 01-05: Criterion Assessment Screen

Status: Draft

## Summary

Binary assessment screen for a single criterion. Presents a clear Yes/No question with an illustration and contextual information. "Yes" marks the criterion as completed and returns to the criteria list. "No" navigates to the training screen.

## User Acceptance Criteria

- [ ] Clear, binary question displayed prominently (e.g., "Can the child request one of two items?")
- [ ] Illustration area shows a static placeholder image relevant to the criterion (2 distinct objects for MAND criteria)
- [ ] Context section shows: short explanation of what to look for, conditions from the criterion
- [ ] Two buttons: "Yes" and "No" -- no ambiguity, no other options
- [ ] "Yes" shows brief positive feedback, marks complete, returns to criteria list with updated status
- [ ] "No" navigates to training screen for this criterion
- [ ] Criterion conditions (e.g., "no prompts allowed") are visible so parent assesses correctly

## System Acceptance Criteria

- [ ] Route: `/sections/:sectionId/criteria/:criterionId/assess`
- [ ] "Yes" persists score (1) and updates criterion status to Completed
- [ ] "No" persists score (0) and updates criterion status to InProgress
- [ ] Score stored as numeric value (0 or 1), not boolean (see [PM Questions: Scoring Model](../../knowledge/pm-questions-scoring-model.en.md))
- [ ] State persists across page reloads
- [ ] Navigation: Yes -> criteria list, No -> training screen

## Development Acceptance Criteria

- [ ] CSS Modules with design tokens only
- [ ] Responsive across all device profiles
- [ ] Placeholder images use a consistent aspect ratio and fallback styling
- [ ] Unit test: Yes/No handlers update state correctly
- [ ] Unit test: correct criterion data loaded based on route params
- [ ] E2E test: full Yes flow (tap Yes -> returns to list with updated state)
- [ ] E2E test: full No flow (tap No -> reaches training screen)

## Depends On

- 01-01 (data model), 01-04 (navigation context)

## Knowledge Reference

- [Developmental Milestones Assessment](../../knowledge/developmental-milestones-assessment.en.md)

## Related Files

_None yet._
