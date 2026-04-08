# 01-07: Assessment Loop and State Management

Status: Draft

## Summary

Wire up the full assessment loop: Assess > (if No) Train > Reassess > repeat. Ensure state transitions are consistent, progress persists across sessions, and the user always has a clear path forward. This story covers the cross-cutting state management and navigation flow that connects screens 01-02 through 01-06.

## User Acceptance Criteria

- [ ] After completing training and tapping "Retry," user sees the same criterion's assessment screen (not a different criterion)
- [ ] After tapping "Yes" on reassessment, criterion updates to Completed and user returns to criteria list
- [ ] Progress on sections list screen reflects real-time state (no stale data)
- [ ] Closing and reopening the app preserves all progress (criteria states, section progress)
- [ ] Navigating back at any point does not lose progress
- [ ] Section status transitions: Not started -> In progress (first assessment) -> Completed (all 5 done)

## System Acceptance Criteria

- [ ] State stored in localStorage (MVP persistence layer)
- [ ] State shape: map of criterion IDs to `{ status: CriterionStatus, score: number }`
- [ ] State updates are atomic (no partial writes that could corrupt data)
- [ ] Browser back/forward navigation works correctly through the assessment loop
- [ ] Route guards: accessing assessment/training for a nonexistent criterion redirects to criteria list
- [ ] No dead-end states: every screen has at least one forward navigation option

## Development Acceptance Criteria

- [ ] State management via React context or a custom hook (no prop drilling across 4+ levels)
- [ ] Single source of truth for assessment state (one hook/store, not scattered useState calls)
- [ ] Unit tests for state transitions: NotStarted -> InProgress -> Completed
- [ ] Unit tests for localStorage persistence (write on change, read on mount)
- [ ] Unit test: corrupted/missing localStorage falls back to clean initial state
- [ ] E2E test: full loop -- assess "No" -> training -> retry -> assess "Yes" -> criteria list updated
- [ ] E2E test: close and reopen app, verify state persisted

## Depends On

- 01-02, 01-03, 01-04, 01-05, 01-06 (all screens)

## Knowledge Reference

- [Developmental Milestones Assessment](../../knowledge/developmental-milestones-assessment.md)

## Related Files

_None yet._
