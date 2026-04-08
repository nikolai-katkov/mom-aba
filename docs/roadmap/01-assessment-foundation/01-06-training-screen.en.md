_[Русский](./01-06-training-screen.ru.md)_

---

# 01-06: Training Screen

Status: Draft

## Summary

Guidance screen shown after a "No" assessment. Teaches the parent how to develop the specific skill using progressive disclosure: video placeholder, short step-by-step guide visible by default, full guide collapsed. "Retry" returns to the assessment screen for reassessment. "Back" returns to the criteria list.

## User Acceptance Criteria

- [ ] Video slot displays static placeholder image with "Video coming soon" label
- [ ] Short guide visible by default: numbered steps (e.g., 1. Show 2 items, 2. Wait, 3. Prompt if needed, 4. Reinforce)
- [ ] "Read more" expands to show full guide (detailed explanation, common mistakes, additional examples)
- [ ] Collapsing "Read more" hides the full guide
- [ ] "Retry" button navigates back to the assessment screen for this criterion
- [ ] "Back" button returns to the criteria list
- [ ] Training content is specific to the criterion (not generic)

## System Acceptance Criteria

- [ ] Route: `/sections/:sectionId/criteria/:criterionId/train`
- [ ] Training content loaded from separate training data model (not from criterion data)
- [ ] "Retry" navigates to assessment screen, preserving criterion context
- [ ] "Back" navigates to criteria list
- [ ] Criterion remains in InProgress status while in training loop
- [ ] No dead ends: both buttons always visible and functional

## Development Acceptance Criteria

- [ ] Progressive disclosure uses CSS transitions (consistent with introduction screen pattern)
- [ ] CSS Modules with design tokens only
- [ ] Responsive across all device profiles
- [ ] Reuse progressive disclosure component/pattern from 01-03 if applicable (rule of 2 -- watch for 3rd use)
- [ ] Unit test: "Read more" toggle behavior
- [ ] Unit test: correct training data loaded based on route params
- [ ] E2E test: arrive from "No" assessment, verify training content, tap "Retry" returns to assessment
- [ ] E2E test: "Back" returns to criteria list

## Depends On

- 01-01 (data model -- training data), 01-05 (navigation context)

## Knowledge Reference

- [Developmental Milestones Assessment](../../knowledge/developmental-milestones-assessment.en.md)

## Related Files

_None yet._
