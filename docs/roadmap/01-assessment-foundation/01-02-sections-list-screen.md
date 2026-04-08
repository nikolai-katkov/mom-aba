# 01-02: Sections List Screen

Status: Draft

## Summary

App entry point showing available skill sections as cards. MAND is active with progress tracking. TACT is shown as a disabled "coming soon" placeholder. Tapping MAND navigates to the MAND introduction screen.

## User Acceptance Criteria

- [ ] MAND card displays: title "MAND", subtitle "Requests", status (Not started / In progress / Completed), progress (X/5)
- [ ] TACT card displays: title "TACT", subtitle "Coming soon", visually disabled/greyed
- [ ] Tapping MAND card navigates to MAND introduction screen
- [ ] Tapping TACT card does nothing (disabled)
- [ ] Progress updates reflect actual assessment state (persisted across sessions)

## System Acceptance Criteria

- [ ] Route: `/` (app entry point)
- [ ] Section progress computed from criterion states (count of Completed out of total)
- [ ] Section status derived: all NotStarted = "Not started", any InProgress or mixed = "In progress", all Completed = "Completed"
- [ ] State persists across page reloads (localStorage or equivalent)

## Development Acceptance Criteria

- [ ] CSS Modules with design tokens only (no hardcoded values)
- [ ] Responsive across desktop (1920x1080), tablet (768x1024), mobile (375x667)
- [ ] Unit test for progress/status derivation logic
- [ ] E2E test: load app, verify MAND card visible, tap navigates to intro

## Depends On

- 01-01 (data model)

## Knowledge Reference

- [Developmental Milestones Assessment](../../knowledge/developmental-milestones-assessment.md)

## Related Files

_None yet._
