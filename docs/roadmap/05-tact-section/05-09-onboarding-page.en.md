_[Русский](./05-09-onboarding-page.ru.md)_

---

# 05-09: Onboarding Page

Status: Done

## Summary

Add an app-level onboarding gate that captures the child's current vocabulary level before granting access to the main app. The page presents three level cards (beginner, intermediate, advanced) that determine initial word inclusion in the dictionary.

## User Acceptance Criteria

- [x] On first visit (no dictionary state in localStorage), the onboarding page renders instead of the sections list
- [x] Page displays title "Where are we starting?" and subtitle "Choose what best describes your child right now"
- [x] Three level cards appear with staggered entrance animation (0.12s delay between cards):
  - Beginner (Baby icon): "Just starting" / "My child doesn't name things yet, or names 1--2 items"
  - Intermediate (Sparkles icon): "Knows some words" / "My child can name several familiar objects"
  - Advanced (Star icon): "Labels many things" / "My child confidently names various objects in daily life"
- [x] Tapping a card selects it (scale + glow animation), dims other cards, then completes onboarding after 600ms delay
- [x] After selection, the main app (sections list) renders; the onboarding page does not reappear on subsequent visits
- [x] All text available in both EN and RU

## System Acceptance Criteria

- [x] `OnboardingPage` component in `src/pages/OnboardingPage.tsx`
- [x] `OnboardingGate` wrapper in `App.tsx` checks `isOnboardingCompleted` from `useDictionary()`
- [x] Gate renders `OnboardingPage` when onboarding is incomplete, otherwise renders `children`
- [x] `completeOnboarding(level)` call initializes word states based on selected level:
  - beginner: only simple words from motivating categories
  - intermediate: all simple words across all categories
  - advanced: simple + medium words across all categories
- [x] Selected level and completion flag persisted in localStorage via `DictionaryState`
- [x] Icons from `lucide-react`: `Baby`, `Sparkles`, `Star`

## Depends On

- 05-08 (dictionary data model and DictionaryProvider)

## Related Files

- `src/pages/OnboardingPage.tsx`
- `src/pages/OnboardingPage.module.css`
- `src/App.tsx`
