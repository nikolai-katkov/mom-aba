_[Русский](./01-01-assessment-data-model.ru.md)_

---

# 01-01: Assessment Data Model

Status: Done

## Summary

Define TypeScript interfaces and seed data for the assessment hierarchy. Two separate models: assessment data (sections, criteria, conditions) and training data (guides, steps). Seed Mand section with 5 criteria and corresponding training content. Tact included as metadata only (placeholder).

## User Acceptance Criteria

- [x] Mand section has 5 criteria with human-readable titles, descriptions, conditions, and examples
- [x] Each criterion has a scoring type (TestTrial, FreeOperant, CombinedTrial, TimedObservation) that the UI can use to select input mode
- [x] Tact section exists as a placeholder with name and "coming soon" status
- [x] Training content for each Mand criterion includes step-by-step guide text

## System Acceptance Criteria

- [x] TypeScript interfaces: `Section`, `Criterion`, `ScoringType`, `CriterionStatus`, `TrainingContent`
- [x] `ScoringType` enum: `TestTrial`, `FreeOperant`, `CombinedTrial`, `TimedObservation`
- [x] `CriterionStatus` enum: `NotStarted`, `InProgress`, `Completed`
- [x] Assessment and training are separate data structures, linked by criterion ID
- [x] Score stored as numeric (0, 0.5, 1) internally, even if UI exposes binary Yes/No (see [PM Questions: Scoring Model](../../knowledge/pm-questions-scoring-model.en.md))
- [x] Structure supports adding Level II/III and additional sections without breaking changes
- [x] Development dimensions model: Independence, Generalization, Repertoire Size

## Development Acceptance Criteria

- [x] All interfaces exported from a barrel file (`src/types/` or `src/data/`)
- [x] Seed data in dedicated file(s), not inline in components
- [x] Unit tests validate seed data completeness (all 5 Mand criteria present, all fields populated)
- [x] Unit tests validate type correctness of seed data
- [x] No `any` types

## Knowledge Reference

- [Developmental Milestones Assessment](../../knowledge/developmental-milestones-assessment.en.md)
- [PM Questions: Scoring Model](../../knowledge/pm-questions-scoring-model.en.md)

## Related Files

- `src/types/assessment.ts`
- `src/types/state.ts`
- `src/types/introduction.ts`
- `src/types/training.ts`
- `src/types/index.ts`
- `src/i18n/translations/sections.ts`
- `src/i18n/translations/introduction.ts`
- `src/i18n/translations/training.ts`
- `tests/data/sections.test.ts`
- `tests/data/training.test.ts`
