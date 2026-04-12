_[Русский](./01-05-criterion-assessment-screen.ru.md)_

---

# 01-05: Criterion Assessment Screen

Status: Done

## Summary

Binary assessment screen for a single criterion. Presents a clear Yes/No question with an illustration and contextual information. "Yes" marks the criterion as completed and returns to the criteria list. "No" navigates to the training screen.

## User Acceptance Criteria

- [x] Clear, binary question displayed prominently (e.g., "Can the child request one of two items?")
- [x] ~~Illustration area shows a static placeholder image~~ (removed — placeholder not shown when illustration unavailable)
- [x] Context section shows: short explanation of what to look for, conditions from the criterion
- [x] Two buttons: "Yes" and "No" - no ambiguity, no other options
- [x] "Yes" shows brief positive feedback, marks complete, returns to criteria list with updated status
- [x] "No" navigates to training screen for this criterion
- [x] Criterion conditions (e.g., "no prompts allowed") are visible so parent assesses correctly

## System Acceptance Criteria

- [x] Route: `/sections/:sectionId/criteria/:criterionId/assess`
- [x] "Yes" persists score (1) and updates criterion status to Completed
- [x] "No" persists score (0) and updates criterion status to InProgress
- [x] Score stored as numeric value (0 or 1), not boolean (see [PM Questions: Scoring Model](../../knowledge/pm-questions-scoring-model.en.md))
- [x] State persists across page reloads
- [x] Navigation: Yes -> criteria list, No -> training screen

## Development Acceptance Criteria

- [x] CSS Modules with design tokens only
- [x] Responsive across all device profiles
- [x] ~~Placeholder images use a consistent aspect ratio and fallback styling~~ (removed with illustration placeholder)
- [x] Unit test: Yes/No handlers update state correctly
- [x] Unit test: correct criterion data loaded based on route params
- [x] E2E test: full Yes flow (tap Yes -> returns to list with updated state)
- [x] E2E test: full No flow (tap No -> reaches training screen)

## Depends On

- 01-01 (data model), 01-04 (navigation context)

## Knowledge Reference

- [Developmental Milestones Assessment](../../knowledge/developmental-milestones-assessment.en.md)

## Related Files

- `src/pages/CriterionAssessmentPage.tsx`
- `src/pages/CriterionAssessmentPage.module.css`
- `src/components/ui/Button/Button.tsx`
- `src/components/ui/Button/Button.module.css`
- `tests/pages/CriterionAssessmentPage.test.tsx`
