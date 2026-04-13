_[Русский](./05-07-tests.ru.md)_

---

# 05-07: Tests

Status: Done

## Summary

Update existing tests and add new tests for Tact data, vocabulary system, placeholder sections, and E2E assessment flow.

## System Acceptance Criteria

- [x] `sections.test.ts`: section count 9, Tact available, placeholder assertions
- [x] `training.test.ts`: tact-1 through tact-5 exist in both languages
- [x] New `vocabulary.test.ts`: 27 categories, both languages, structure validation
- [x] E2E: Tact assessment happy path and training path
- [x] All 3 device profiles pass

## Related Files

- `tests/data/sections.test.ts`
- `tests/data/training.test.ts`
- `tests/data/vocabulary.test.ts`
- `e2e/specs/tact-assessment-flow.e2e.ts`
