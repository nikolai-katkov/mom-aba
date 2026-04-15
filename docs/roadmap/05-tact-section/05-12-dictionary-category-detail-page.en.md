_[Русский](./05-12-dictionary-category-detail-page.ru.md)_

---

# 05-12: Dictionary Category Detail Page

Status: Done

## Summary

Add the `/dictionary/:categoryId` route showing all words in a category, organized by difficulty level. Words can be toggled between included/excluded and have per-operant mastery dots. Desktop shows three side-by-side columns; mobile uses tabs to switch between difficulty levels. Drag-and-drop moves words between inclusion zones.

## User Acceptance Criteria

- [x] Page title is the category name in the current language
- [x] Breadcrumbs show: Home > My Child's Words > [Category Name]
- [x] Each difficulty level (Simple, Medium, Complex) shows two zones: "In dictionary" and "Not included"
- [x] Words in "In dictionary" zone display four mastery dots (Mand, Tact, Listener, Echoic) -- clicking a dot toggles mastery
- [x] Clicking a word row toggles it between included and excluded
- [x] Words are draggable between the two zones via drag-and-drop
- [x] On desktop (wide viewport): all three difficulty columns render side by side
- [x] On mobile (narrow viewport): a tab bar switches between difficulty levels, showing one column at a time
- [x] Navigating to a non-existent categoryId redirects to `/dictionary`

## System Acceptance Criteria

- [x] `DictionaryCategoryDetailPage` component in `src/pages/DictionaryCategoryDetailPage.tsx`
- [x] Route registered in `App.tsx` at path `/dictionary/:categoryId`
- [x] Uses `Tabs` component from `src/components/ui/` for mobile difficulty switching
- [x] Uses `useDictionary()` for `getWordState`, `setWordInclusion`, `setWordMastery`
- [x] `MasteryDot` sub-component renders per-operant toggle buttons with `aria-label`
- [x] `WordRow` sub-component handles click toggle, drag start, and mastery dots
- [x] `DifficultyColumn` sub-component renders included/excluded zones with drag-over/drop handlers
- [x] CSS module with `desktopColumns` (side-by-side) and `mobileTabs` (hidden on desktop) layout classes

## Depends On

- 05-10 (DictionaryProvider and useDictionary)
- 05-13 (Tabs UI component)

## Related Files

- `src/pages/DictionaryPage.tsx`
- `src/pages/DictionaryPage.module.css`
- `src/pages/dictionaryConstants.ts`
- `src/components/ui/CategoryRail/CategoryRail.tsx`
- `src/components/ui/CategoryRail/CategoryRail.module.css`
- `src/App.tsx`
