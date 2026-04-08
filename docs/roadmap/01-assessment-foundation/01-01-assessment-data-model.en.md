_[Русский](./01-01-assessment-data-model.ru.md)_

---

# 01-01: Assessment Data Model

Status: Draft

## Summary

Define TypeScript interfaces and seed data for the assessment hierarchy. Two separate models: assessment data (sections, criteria, conditions) and training data (guides, steps). Seed MAND section with 5 criteria and corresponding training content. TACT included as metadata only (placeholder).

## User Acceptance Criteria

- [ ] MAND section has 5 criteria with human-readable titles, descriptions, conditions, and examples
- [ ] Each criterion has a scoring type (TCT, NAB, KOM, NOV) that the UI can use to select input mode
- [ ] TACT section exists as a placeholder with name and "coming soon" status
- [ ] Training content for each MAND criterion includes step-by-step guide text

## System Acceptance Criteria

- [ ] TypeScript interfaces: `Section`, `Criterion`, `ScoringType`, `CriterionStatus`, `TrainingContent`
- [ ] `ScoringType` enum: `TCT`, `NAB`, `KOM`, `NOV`
- [ ] `CriterionStatus` enum: `NotStarted`, `InProgress`, `Completed`
- [ ] Assessment and training are separate data structures, linked by criterion ID
- [ ] Score stored as numeric (0, 0.5, 1) internally, even if UI exposes binary Yes/No (see [PM Questions: Scoring Model](../../knowledge/pm-questions-scoring-model.en.md))
- [ ] Structure supports adding Level II/III and additional sections without breaking changes
- [ ] Development dimensions model: Independence, Generalization, Repertoire Size

## Development Acceptance Criteria

- [ ] All interfaces exported from a barrel file (`src/types/` or `src/data/`)
- [ ] Seed data in dedicated file(s), not inline in components
- [ ] Unit tests validate seed data completeness (all 5 MAND criteria present, all fields populated)
- [ ] Unit tests validate type correctness of seed data
- [ ] No `any` types

## Knowledge Reference

- [Developmental Milestones Assessment](../../knowledge/developmental-milestones-assessment.en.md)
- [PM Questions: Scoring Model](../../knowledge/pm-questions-scoring-model.en.md)

## Related Files

_None yet._
