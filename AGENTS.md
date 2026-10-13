# Agent Rules

Act as a senior full stack engineer building a production-ready portfolio from scratch. Build the website as a real service that could scale to millions of users.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:context-agent-rules -->

## Project Context

Always adhere to the project technical constraints in `.agents/rules`. When writing or changing code, ensure the implementation is documented clearly and consistently in the relevant code comments, docs, and project files.

### 1. Architectural Layers

* **`app/`**: Route pages, layouts, and route handlers.
* **`components/`**: Pure UI components organized by domain.
* **`configs/`**: Static configuration. **Must never import from utilities or higher layers.**
* **`constants/`**: Static constants. **Must never import from utilities or higher layers.**
* **`contexts/`**: React context definitions, state providers, and consumer hooks.
* **`hooks/`**: Standalone, non-UI custom React hooks.
* **`libraries/`**: Core services.
* **`types/`**: Pure TypeScript interface definitions.
* **`utilities/`**: Pure helper functions. **Zero React hooks, zero client directives.**

### 2. Core Commandments

* **Path Aliases:** STRICTLY use `@/` path alias for cross-module imports. Never use relative `../../`.
* **Zero Dependency:** Use native Web/Node APIs (native `fetch`, `Intl` helper).
* **Strict Code Hygiene:** Arrow functions only, single quotes (`'`), mandatory semicolons, and strict equality (`===`).
* **Layperson Terminology:** Eliminate technical jargon across both user-facing copy and developer-facing comments/types.
* **Performance & Scope:** Declare static arrays, objects, and navigation items OUTSIDE component render functions at module level to prevent garbage collection churn and maintain referential stability.
* **Accessibility (a11y) First:** STRICTLY enforce WCAG 2.1 AA standards across all UI code: single `<h1>` per page, sequential heading hierarchy (zero skipped levels), mandatory accessible names on all buttons and links (explicit `aria-label` for icon-only controls), programmatic form labels, visible `:focus-visible` focus rings, decorative graphic hiding (`aria-hidden='true'`), and distinctive landmark labeling (`<nav aria-label='...'>`).
* **Comprehensive JSDoc:** Every exported variable, constant, config object, helper function, type, interface, and property MUST have clear JSDoc comments (`/** ... */`).
* **File Length:** Maintain modular file discipline by keeping components under 250-300 lines where practical.

For the complete technical specifications, see [.agents/rules/nextjs-code-guide.md](.agents/rules/nextjs-code-guide.md) and [.agents/rules/accessibility-guide.md](.agents/rules/accessibility-guide.md).

<!-- END:context-agent-rules -->
