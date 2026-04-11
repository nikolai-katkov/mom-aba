# Neuron

Application to help parents support their autistic children.

## Quick Start

Prerequisites: Node.js 20+, modern browser.

```bash
npm install    # installs dependencies, sets up git hooks
npm run dev    # start dev server at http://localhost:5173
```

## Commands

| Command            | Description                       |
| ------------------ | --------------------------------- |
| `npm run dev`      | Start dev server (localhost:5173) |
| `npm run build`    | Production build                  |
| `npm run preview`  | Preview production build          |
| `npm test`         | Run unit tests (Vitest)           |
| `npm run test:e2e` | Run E2E tests (Playwright)        |
| `npm run test:all` | Run unit + E2E tests              |
| `npm run lint`     | ESLint with auto-fix              |
| `npm run format`   | Prettier format                   |

## Tech Stack

React 18, TypeScript (strict), Vite, CSS Modules, Vitest + Playwright (testing).

## Documentation

- [Product Overview](docs/README.md) - vision and context
- [Roadmap](docs/roadmap/) - epics, stories, status dashboard
- [CLAUDE.md](CLAUDE.md) - development workflow, code style, architecture
