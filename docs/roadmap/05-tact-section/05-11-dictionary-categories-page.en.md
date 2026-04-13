_[Русский](./05-11-dictionary-categories-page.ru.md)_

---

# 05-11: Dictionary Categories Page

Status: Done

## Summary

Add the `/dictionary` route displaying all 27 vocabulary categories in a responsive grid. Each category card shows a Lucide icon and the category name, and navigates to the category detail page on click.

## User Acceptance Criteria

- [x] Page renders a grid of 27 category cards
- [x] Each card displays a distinct icon and the category name in the current language
- [x] Clicking a card navigates to `/dictionary/:categoryId`
- [x] Page title is "My Child's Words" (EN) / "Словарь ребёнка" (RU)
- [x] Subtitle text: "Words your child is learning to say and understand" (EN) / "Слова, которые ваш ребёнок учится произносить и понимать" (RU)
- [x] Breadcrumbs show: Home > My Child's Words
- [x] Page uses the wide PageLayout variant

## System Acceptance Criteria

- [x] `DictionaryCategoriesPage` component in `src/pages/DictionaryCategoriesPage.tsx`
- [x] Route registered in `App.tsx` at path `/dictionary`
- [x] `CATEGORY_ICONS` map provides a Lucide icon (size 20) for each of the 27 category IDs
- [x] Reads `vocabulary` from `useLanguage()` to get language-resolved categories
- [x] Uses `Card` and `PageLayout` from `src/components/ui/`
- [x] CSS module `DictionaryCategoriesPage.module.css` for grid layout and card styling

## Depends On

- 05-04 (vocabulary data)
- 05-10 (DictionaryProvider wrapping)

## Related Files

- `src/pages/DictionaryCategoriesPage.tsx`
- `src/pages/DictionaryCategoriesPage.module.css`
- `src/App.tsx`
