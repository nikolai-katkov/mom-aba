_[Русский](./05-13-tabs-component.ru.md)_

---

# 05-13: Tabs UI Component

Status: Done

## Summary

Add a generic `Tabs` component to the design system for switching between views. Used by the dictionary category detail page for mobile difficulty switching.

## User Acceptance Criteria

- [x] Tab bar renders horizontally with one button per option
- [x] Active tab is visually highlighted
- [x] Clicking a tab triggers the `onChange` callback with the tab value
- [x] Active tab scrolls into view smoothly when changed
- [x] Component respects all three themes (Warm, Soft, Editorial) via design tokens

## System Acceptance Criteria

- [x] `Tabs` component in `src/components/ui/Tabs/Tabs.tsx`
- [x] Generic type parameter `<T extends string>` for type-safe tab values
- [x] Props: `options: TabOption<T>[]`, `value: T`, `onChange: (value: T) => void`, optional `className`
- [x] `TabOption<T>` interface: `{ value: T; label: string }`
- [x] Uses `role="tablist"` on container, `role="tab"` and `aria-selected` on buttons
- [x] CSS module `Tabs.module.css` with `tabBar`, `tab`, `tabActive` classes using design tokens
- [x] Exported through `src/components/ui/index.ts` barrel (both `Tabs` component and `TabOption` type)

## Related Files

- `src/components/ui/Tabs/Tabs.tsx`
- `src/components/ui/Tabs/Tabs.module.css`
- `src/components/ui/index.ts`
