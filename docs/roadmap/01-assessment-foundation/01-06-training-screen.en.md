_[Русский](./01-06-training-screen.ru.md)_

---

# 01-06: Training Screen

Status: Done

## Summary

Guidance screen shown after a "No" assessment. Teaches the parent how to develop the specific skill using progressive disclosure: video placeholder, short step-by-step guide visible by default, full guide collapsed. "Retry" returns to the assessment screen for reassessment. "Back" returns to the criteria list.

## User Acceptance Criteria

- [x] Video slot displays static placeholder image with "Video coming soon" label
- [x] Short guide visible by default: numbered steps (e.g., 1. Show 2 items, 2. Wait, 3. Prompt if needed, 4. Reinforce)
- [x] "Read more" expands to show full guide (detailed explanation, common mistakes, additional examples)
- [x] Collapsing "Read more" hides the full guide
- [x] "Retry" button navigates back to the assessment screen for this criterion
- [x] "Back" button returns to the criteria list
- [x] Training content is specific to the criterion (not generic)

## System Acceptance Criteria

- [x] Route: `/sections/:sectionId/criteria/:criterionId/train`
- [x] Training content loaded from separate training data model (not from criterion data)
- [x] "Retry" navigates to assessment screen, preserving criterion context
- [x] "Back" navigates to criteria list
- [x] Criterion remains in InProgress status while in training loop
- [x] No dead ends: both buttons always visible and functional

## Development Acceptance Criteria

- [x] Progressive disclosure uses CSS transitions (consistent with introduction screen pattern)
- [x] CSS Modules with design tokens only
- [x] Responsive across all device profiles
- [x] Reuse progressive disclosure component/pattern from 01-03 if applicable (rule of 2 - watch for 3rd use)
- [x] Unit test: "Read more" toggle behavior
- [x] Unit test: correct training data loaded based on route params
- [x] E2E test: arrive from "No" assessment, verify training content, tap "Retry" returns to assessment
- [x] E2E test: "Back" returns to criteria list

## Depends On

- 01-01 (data model - training data), 01-05 (navigation context)

## Knowledge Reference

- [Developmental Milestones Assessment](../../knowledge/developmental-milestones-assessment.en.md)

## Related Files

- `src/pages/TrainingPage.tsx`
- `src/pages/TrainingPage.module.css`
- `src/components/ui/ProgressiveDisclosure/ProgressiveDisclosure.tsx`
- `src/components/ui/VideoPlaceholder/VideoPlaceholder.tsx`
- `tests/pages/TrainingPage.test.tsx`
