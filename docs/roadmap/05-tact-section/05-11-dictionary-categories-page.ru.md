_[English](./05-11-dictionary-categories-page.en.md)_

---

# 05-11: Страница категорий словаря

Статус: Готово

## Описание

Добавить маршрут `/dictionary`, отображающий все 27 категорий словаря в адаптивной сетке. Каждая карточка категории показывает иконку Lucide и название категории, при нажатии переходит на страницу деталей категории.

## Критерии приёмки для пользователя

- [x] Страница отображает сетку из 27 карточек категорий
- [x] Каждая карточка показывает уникальную иконку и название категории на текущем языке
- [x] Нажатие на карточку переходит на `/dictionary/:categoryId`
- [x] Заголовок страницы: "My Child's Words" (EN) / "Словарь ребёнка" (RU)
- [x] Текст подзаголовка: "Words your child is learning to say and understand" (EN) / "Слова, которые ваш ребёнок учится произносить и понимать" (RU)
- [x] Хлебные крошки показывают: Главная > Словарь ребёнка
- [x] Страница использует широкий вариант PageLayout

## Системные критерии приёмки

- [x] Компонент `DictionaryCategoriesPage` в `src/pages/DictionaryCategoriesPage.tsx`
- [x] Маршрут зарегистрирован в `App.tsx` по пути `/dictionary`
- [x] Карта `CATEGORY_ICONS` предоставляет иконку Lucide (размер 20) для каждого из 27 ID категорий
- [x] Читает `vocabulary` из `useLanguage()` для получения категорий на текущем языке
- [x] Использует `Card` и `PageLayout` из `src/components/ui/`
- [x] CSS-модуль `DictionaryCategoriesPage.module.css` для сетки и стилей карточек

## Зависит от

- 05-04 (данные словаря)
- 05-10 (обёртка DictionaryProvider)

## Связанные файлы

- `src/pages/DictionaryCategoriesPage.tsx`
- `src/pages/DictionaryCategoriesPage.module.css`
- `src/App.tsx`
