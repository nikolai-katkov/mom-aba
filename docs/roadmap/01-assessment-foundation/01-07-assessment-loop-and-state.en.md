_[Русский](./01-07-assessment-loop-and-state.ru.md)_

---

# 01-07: Assessment Loop and State Management

Status: Done

## Summary

Wire up the full assessment loop: Assess > (if No) Train > Reassess > repeat. Ensure state transitions are consistent, progress persists across sessions, and the user always has a clear path forward. This story covers the cross-cutting state management and navigation flow that connects screens 01-02 through 01-06.

## User Acceptance Criteria

- [x] After completing training and tapping "Retry," user sees the same criterion's assessment screen (not a different criterion)
- [x] After tapping "Yes" on reassessment, criterion updates to Completed and user returns to criteria list
- [x] Progress on sections list screen reflects real-time state (no stale data)
- [x] Closing and reopening the app preserves all progress (criteria states, section progress)
- [x] Navigating back at any point does not lose progress
- [x] Section status transitions: Not started -> In progress (first assessment) -> Completed (all 5 done)

## System Acceptance Criteria

- [x] State stored in localStorage (MVP persistence layer)
- [x] State shape: map of criterion IDs to `{ status: CriterionStatus, score: number }`
- [x] State updates are atomic (no partial writes that could corrupt data)
- [x] Browser back/forward navigation works correctly through the assessment loop
- [x] Route guards: accessing assessment/training for a nonexistent criterion redirects to criteria list
- [x] No dead-end states: every screen has at least one forward navigation option

## Development Acceptance Criteria

- [x] State management via React context or a custom hook (no prop drilling across 4+ levels)
- [x] Single source of truth for assessment state (one hook/store, not scattered useState calls)
- [x] Unit tests for state transitions: NotStarted -> InProgress -> Completed
- [x] Unit tests for localStorage persistence (write on change, read on mount)
- [x] Unit test: corrupted/missing localStorage falls back to clean initial state
- [x] E2E test: full loop - assess "No" -> training -> retry -> assess "Yes" -> criteria list updated
- [x] E2E test: close and reopen app, verify state persisted

## Depends On

- 01-02, 01-03, 01-04, 01-05, 01-06 (all screens)

## Knowledge Reference

- [Developmental Milestones Assessment](../../knowledge/developmental-milestones-assessment.en.md)

## Related Files

- `src/hooks/useAssessment.tsx`
- `src/utils/storage.ts`
- `src/App.tsx`
- `tests/hooks/useAssessment.test.tsx`
- `tests/utils/storage.test.ts`
- `e2e/specs/assessment-flow.e2e.ts`
