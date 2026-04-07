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
- Update `_epic.md` with status and commit hashes
- Update `docs/roadmap/README.md` status dashboard
- Commit documentation changes with code changes (single commit)

## Architecture

### Documentation Structure

```
docs/
├── README.md           # Product overview
├── roadmap/
│   ├── README.md       # Status dashboard
│   ├── backlog.md      # Unrefined features
│   └── {NN}-{name}/    # Epic folders with _epic.md + stories
└── knowledge/          # Domain reference articles
```

**Anti-duplication rules:**

- How something works → knowledge/
- What to verify → story files only
- Status tracking → \_epic.md + story headers
- Future features → roadmap/backlog.md
- Development workflow → CLAUDE.md

### Directory Structure

```
src/
├── components/
│   └── ui/             # Design system components (barrel: import from ./ui)
├── hooks/              # Custom React hooks (barrel: import from ./hooks)
├── pages/              # Route-level page components
├── styles/
│   └── tokens.css      # Design system tokens (single source of truth)
└── utils/              # Generic utilities
```

### Design System

**Theme:** "Playful & Bright" — light background, teal primary (#14b8a6), violet accent (#8b5cf6), coral warm (#f97316). Rounded radii, Nunito font.

**Token file:** `src/styles/tokens.css` — imported once in `main.tsx`, available globally.

**Token categories:** Colors (primary, accent, warm, semantic, neutral, overlay), shadows, spacing (4px grid), border radius, typography (Nunito primary, IBM Plex Mono), transitions, blur.

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
