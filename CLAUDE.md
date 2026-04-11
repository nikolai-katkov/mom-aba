# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start

Prerequisites: Node.js 20+, modern browser.

```bash
npm install    # installs dependencies, sets up git hooks
npm run dev    # start dev server at http://localhost:5173
```

## Development Commands

```bash
npm run dev              # localhost:5173
npm run build            # Production build (tsc + vite)
npm run preview          # Preview production build
npm test                 # Unit tests (Vitest)
npm test -- --watch      # Watch mode
npm test -- --ui         # Browser UI (localhost:51204)
npm test -- --coverage   # Coverage report
npm run test:e2e                 # Playwright (headless)
npm run test:e2e -- --headed     # Visible browser
npm run test:e2e -- --ui         # Playwright UI mode
npm run test:e2e -- --debug      # Step-by-step debug
npm run test:e2e -- --project=desktop|tablet|mobile
npm run test:all         # Unit + E2E
npm run lint             # ESLint auto-fix
npm run format           # Prettier format
```

## Story Documentation Updates

Before committing any feature work, update the corresponding story documentation:

- Check acceptance criteria boxes `[x]` for completed items
- Update "Related Files" section with new/modified files
- Update `_epic.en.md` and `_epic.ru.md` with status and commit hashes
- Update `docs/roadmap/README.en.md` and `README.ru.md` status dashboard
- Update BOTH `.en.md` and `.ru.md` versions of any modified doc
- Commit documentation changes with code changes (single commit)

## Architecture

### Documentation Structure

```
docs/
├── README.{en,ru}.md           # Product overview (both languages)
├── roadmap/
│   ├── README.{en,ru}.md       # Status dashboard
│   ├── backlog.{en,ru}.md      # Unrefined features
│   └── {NN}-{name}/            # Epic folders with _epic.md + stories (both languages)
└── knowledge/                  # Domain reference articles (both languages)
```

**Anti-duplication rules:**

- How something works → knowledge/
- What to verify → story files only
- Status tracking → \_epic.md + story headers
- Future features → roadmap/backlog.md
- Development workflow → CLAUDE.md

### Domain Context

The app implements ABA-based developmental milestone assessments. Key domain concepts are documented in `docs/knowledge/`:

- Developmental Milestones Assessment ([EN](docs/knowledge/developmental-milestones-assessment.en.md) | [RU](docs/knowledge/developmental-milestones-assessment.ru.md)) - assessment structure, scoring types (TCT/NAB/KOM/NOV), MAND/TACT sections, development model, and UX screen mapping.

### Directory Structure

```
src/
├── components/
│   └── ui/             # Design system components (barrel: import from ./ui)
├── hooks/              # Custom React hooks (barrel: import from ./hooks)
├── i18n/               # Internationalization (types, context, translations)
│   └── translations/   # Translation files per namespace (ui, sections, etc.)
├── pages/              # Route-level page components
├── styles/
│   └── tokens.css      # Design system tokens (single source of truth)
└── utils/              # Generic utilities
```

### Design System

**Multi-theme:** 3 themes (Warm & Organic, Soft & Playful, Editorial & Premium) with light/dark mode each. Default: Warm + light.

**Theme architecture:** CSS custom properties overridden via `[data-theme]` + `[data-mode]` attributes on `<html>`. Theme CSS files in `src/styles/themes/`. `ThemeProvider` context provides `theme`, `setTheme`, `colorMode`, `toggleColorMode`. Persisted in localStorage (`neuron-theme`, `neuron-color-mode`).

**Each theme has:** Unique font pairing, color palette, shape language (border-radius), shadow style, gradient tokens, animation easing, layout variations (via `:global([data-theme])` CSS selectors and conditional JSX), and decorative elements (CSS pseudo-elements).

**Icons:** Lucide React (`lucide-react`) — tree-shakeable line icons throughout the UI.

**Token file:** `src/styles/tokens.css` — imported once in `main.tsx`, available globally. Theme overrides in `src/styles/themes/{warm,soft,editorial}.css`.

**Token categories:** Colors (primary, accent, warm, semantic, neutral, overlay), gradients (`--gradient-bg`, `--gradient-primary`), shadows, spacing (4px grid), border radius, typography, transitions, blur, animation timing, layout tokens.

**ControlsPill:** Floating combined control (language switcher + dark mode toggle + theme swatches) in bottom-right. Collapsible on mobile. Rendered in `App.tsx` outside routes.

### Internationalization (i18n)

**Languages:** Russian (default) and English. Language is persisted in localStorage (`neuron-language`).

**Architecture:** Custom hook + context (no library). `LanguageProvider` wraps the app, `useLanguage()` hook provides `t(key)` for UI strings and language-resolved domain data (`sections`, `sectionIntroductions`, `trainingContent`).

**Translation files:** `src/i18n/translations/` - one TypeScript file per namespace:

- `ui.ts` - UI chrome strings (`UiTranslations` interface, type-safe keys)
- `sections.ts` - Section/criterion data per language
- `introduction.ts` - Introduction content per language
- `training.ts` - Training content per language

**String interpolation:** `interpolate(template, values)` for patterns like `{completed}/{total}`.

**Translation sync rules (enforced):**

- When adding/modifying user-facing strings, update BOTH `en` and `ru` in the relevant translation file
- Run `npm test -- tests/i18n/translations.test.ts` to verify translation completeness
- All UI string keys must be defined in `UiTranslations` interface (`src/i18n/types.ts`)
- Domain data (sections, training, introduction) must have identical structure in both languages (same IDs, same array lengths)
- Use ABA-correct Russian terminology (МАНД, ТАКТ, эхоическая подсказка) rather than literal translations

**Component usage:** Call `useLanguage()` in components, use `t('keyName')` for UI strings, destructure `sections`/`sectionIntroductions`/`trainingContent` for domain data. Add `{...tProps('keyName')}` on elements that display translated text for test selectors.

**Missing translation handling:** `t()` falls back to other languages with a dev console warning. If no translation exists in any language, renders the key in dev mode and empty string in production.

**Testing:**

- Wrap components in `LanguageProvider` (use `renderWithProviders` helper from `tests/helpers/`)
- Query elements by translation key using `byT('keyName')` from `tests/helpers/byT.ts` - NEVER use hardcoded translation strings in test assertions
- `data-t` attributes are set in development only (stripped in production via `tProps()`)
- `byT(key)`, `allByT(key)`, `queryByT(key)` -- query helpers for `[data-t]` selectors

**Documentation:** Each doc file has `.en.md` and `.ru.md` versions with cross-language links. When modifying docs, update BOTH language versions.

## Translation & Content Quality

**These rules are mandatory and apply to ALL text changes — application strings AND documentation, in ANY language.**

### Terminology Rules

- Use established ABA, developmental psychology, and child development terms for each language — NEVER use literal word-for-word translations
- Russian is the primary authoring language; treat existing Russian text as the source of truth when translating to other languages
- Reference existing codebase translations (`src/i18n/translations/`) as the terminology baseline for consistency
- When adding a new language, align terminology with that language's professional literature in developmental psychology and ABA
- Preserve key ABA terms that have established equivalents: MAND/МАНД, TACT/ТАКТ, PECS, ABA

### Audience Rules (Application Text)

- Target audience is **parents, not ABA specialists** — write for clarity and emotional safety
- Replace uncommon specialist terms with concise plain-language explanations or use the technical term followed by a brief parenthetical:
  - "reinforcement" → "reward"
  - "non-reinforcing objects" → "everyday objects (not their favorites)"
  - "mand responses" → "requests"
  - "verbal operant framework" → omit or simplify to "Applied Behavior Analysis (ABA)"
  - "stimulus generalization" → "using the skill in different situations"
- When a technical term IS necessary for precision, immediately follow it with a short parent-friendly explanation
- Use normalizing, supportive language: "it is perfectly normal," "prompts are a normal part of learning"
- Avoid clinical detachment — write as if explaining to a caring parent, not documenting for a therapist

### Pre-Commit Text Audit (Mandatory)

Before EVERY commit that adds or modifies user-facing text in any language (app strings in `src/i18n/translations/` or documentation in `docs/`):

1. Review all changed text against the terminology and audience rules above
2. Check cross-language consistency — if text was changed in one language, verify the other language(s) match in meaning and tone
3. Check for incomplete or truncated sentences in all languages
4. Check that technical terms are either replaced with parent-friendly language or explained in context
5. Suggest specific improvements if any text does not meet these standards — do not silently pass non-compliant text

### Routing

React Router v7 (BrowserRouter) with routes declared in `App.tsx`.

### Styling

CSS Modules (`.module.css` per component). All styles MUST use design tokens from `tokens.css`.

**Compliance rules (enforced):**

- EVERY CSS file MUST use design tokens — no hardcoded colors, spacing, font sizes
- ALWAYS use design system components from `src/components/ui/` — never create custom UI primitives if a component exists
- NEVER patch design system component behavior from consumer CSS
- NEVER hardcode raw values (rgba, px font sizes, etc.)

**Verification commands:**

```bash
# Check for hardcoded rgba
grep -rn "rgba(" src/components/ src/pages/
# Check for hardcoded pixel font sizes
grep -rn "font-size:.*[0-9]px" src/components/
# Check for non-token spacing
grep -rn "[^-]10px\|14px\|22px" src/components/ui/
# Check for hardcoded letter-spacing
grep -rn "letter-spacing:" src/ --include="*.module.css" | grep -v "var(--letter-spacing"
```

## Testing

- **Unit:** Vitest + React Testing Library. Files in `tests/` mirroring `src/` structure.
- **E2E:** Playwright with 3 device profiles: desktop (1920x1080), tablet (768x1024), mobile (375x667).
- **Coverage targets:** 80% statements/functions/lines, 77% branches.
- Test at the lowest level that gives confidence.
- No snapshot testing for UI components.
- Use `userEvent` over `fireEvent` for user interactions.
- Zero tolerance for flaky tests — always fix root cause.

## Dependencies

### Runtime

- [React 18](https://react.dev/) — UI framework
- [React Router DOM 7](https://reactrouter.com/) — Client-side routing

### Development

- [TypeScript 5.6](https://www.typescriptlang.org/) — Strict type checking
- [Vite 6](https://vite.dev/) — Build tool and dev server
- [Vitest 4](https://vitest.dev/) — Unit test runner
- [Playwright](https://playwright.dev/) — E2E test runner
- [ESLint 9](https://eslint.org/) — Linting (11+ plugins, flat config)
- [Prettier 3.8](https://prettier.io/) — Code formatting
- [Husky 9](https://typicode.github.io/husky/) — Git hooks

## Code Style Guidelines

### Primary Principle

Heavy incline towards readability — code should read like natural language.

### Naming

- Full words, no abbreviations (except widely understood: `btn`, `ctx`, `ref`, `el`)
- Boolean prefixes: `has`, `is`, `should`, `can`
- Event handlers: `handleClick`, `handleChange`
- Constants: `UPPER_SNAKE_CASE`

### Functions

- Functional over classes
- Named exports (no default exports)
- Break down when logic becomes complex — each function does one thing
- Early returns for guards

### Error Handling

- Early returns for preconditions
- try-catch at I/O boundaries (fetch, storage, etc.)
- Let TypeScript catch type errors at compile time

### Comments

- Explain "why" not "what"
- No emojis in code or comments

### Abstractions

- Rule of 3+ before abstracting — three similar instances justify a shared utility
- Prefer composition over inheritance
- Keep exports minimal — barrel files re-export public API only

### TypeScript

- Interfaces for object shapes, type aliases for unions/intersections
- Prefer `unknown` over `any`
- Use discriminated unions for state machines

### React

- Destructure props in function signature
- Single object for related state (`useState` grouping)
- Custom hooks for reusable stateful logic
- Avoid inline object/array literals in JSX props (referential stability)

### Performance

- Measure before optimizing
- `useMemo`/`useCallback` only when profiling shows a need
- Prefer CSS transitions over JS animations

### Module Exports

- Keep exports minimal
- Barrel files (`index.ts`) re-export public API only
- Internal helpers stay unexported
