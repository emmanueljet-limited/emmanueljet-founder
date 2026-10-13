---
trigger: always_on
description: This rule explains Next.js conventions, architecture, and best practices for fullstack development.
---

# Next.js Rules

This document defines the strict technical constraints and architectural standards for the Next.js 16 workspace. All agents and contributors must strictly adhere to these rules to ensure build stability, code quality, and maintainability.

## Directory Structure

Code is organized into strict architectural layers with unidirectional dependencies. Higher layers may import from lower layers, but never in reverse.

```txt
app/          -> Route handlers, pages, layouts, and seo generators
components/   -> Reusable, presentational UI components organized by domain
configs/      -> Pure static configuration objects (app, cache, log, page, etc.)
contexts/     -> React Contexts, Providers, and state-consumption hooks
hooks/        -> Shared, non-UI custom React hooks
libraries/    -> Infrastructure, storage, API, sync services, logger, etc
types/        -> Pure TypeScript type and interface definitions
utilities/    -> Pure, framework-agnostic helper functions (pure math, dates, strings)
```

### Layer Dependency Rules

1. **`configs` is a foundational layer:** It must NEVER import from `utilities`, `libraries`, or `components`. Deriving configuration from environment variables must happen strictly within the config layer.
2. **`utilities` must remain pure:** Helper functions in `utilities` must have zero React runtime dependencies. No React hooks (`useSyncExternalStore`, `useState`, etc.) and no `'use client'` directives in `utilities`.
3. **No circular dependencies:** Modules must never directly or indirectly import themselves through barrels or sibling files.
4. **Zero Barrel Files (Direct File Imports Only):** Barrel files are strictly banned across the entire codebase. Always import directly from the specific module file. This accelerates Turbopack compilation, optimizes tree-shaking, and prevents circular evaluation.

## TypeScript Enforcement

- **Strict Mode:** ALWAYS write code assuming `"strict": true` is enabled.
- **No Implicit Any:** NEVER leave a variable type implicit if it infers to `any`. Define types explicitly.
- **Strict Null Checks:** Do not assume values exist. Use Optional Chaining (`user?.profile?.id`) and Nullish Coalescing (`??`) rather than force-unwrapping (`!`).
- **Strict Readonly Immutability for Configs:** All configuration interfaces and static structures must declare properties and nested collections with `readonly` (e.g., `readonly string[]`, `Readonly<Record<...>>`). Arrays of routes or items must be frozen with `as const` or typed `readonly`.
- **Path Aliases:** ALWAYS use the `@/` path alias for imports.
  - *Correct:* `import Button from '@/components/common/Button'`
  - *Incorrect:* `import Button from '../../components/common/Button'`
- **Explicit Type Imports:** ALWAYS use `import type { ... }` when importing interfaces or types.
- **Interfaces over Types:** Use `interface` definitions instead of `type` aliases for object shapes.
- **Exhaustive JSDoc Documentation:** Every exported symbol (constants, config objects, helper functions, types, interfaces, and individual interface properties) must have clean, descriptive JSDoc comments (`/** ... */`) documenting purpose, arguments, and return types so any developer immediately understands its role.
- **DOM Lib:** Browser APIs (`window`, `document`, `navigator`) must be guarded by `typeof window !== 'undefined'` or wrapped inside lifecycle hooks.

## ESLint & Code Hygiene Standards

The workspace strictly enforces ESLint flat config with zero warnings permitted for errors:

- **File Length Discipline:** Files should remain focused and readable, targeting under 250–300 lines where practical.
- **Arrow Functions Only:** STRICTLY use Arrow Functions for all components, helpers, and logic.
  - `const MyComponent = () => { ... };`
  - Function declarations (`function MyComponent() {}`) are banned.
- **Semicolons Required:** All statements must terminate with a semicolon.
- **Strict Equality:** ALWAYS use `===` and `!==`. Loose equality is banned.
- **Variable Declarations:** Use `const` by default. Never use `var`.
- **Quotes:**
  - Code strings: Single Quotes (`'`) by default. Backticks (`` ` ``) only for template literals.
  - JSX Attributes: STRICTLY use Single Quotes (`className='flex items-center'`).
- **JSX Best Practices:**
  - Boolean prop shorthand: Use `<Component unoptimized />` instead of `<Component unoptimized={true} />`.
  - Self-closing tags: Use `<Component />` instead of `<Component></Component>` when empty.
  - No redundant curlies for strings: Use `title='Overview'` instead of `title={'Overview'}`.
- **Whitespace & Formatting:**
  - Maximum of 1 empty line between code blocks.
  - Every file must terminate with a single newline.
  - No consecutive whitespace spam in string literals.
- **Import Grouping:** Sort imports in this exact order, separated by empty lines:
  1. Built-in Node/runtime modules
  2. External dependencies (`react`, `next`, `lucide-react`)
  3. Internal workspace modules (`@/components`, `@/utilities`, `@/configs`)
- **Prohibited:**
  - Direct `console.log` statements (use structured Logger).
  - `TODO` and `FIXME` comments in active code are STRICTLY PROHIBITED (Zero technical debt policy). Address and implement requirements immediately.
  - Unused variables (if an unused argument is required by a signature, prefix with `_`).

## Component Scope & Performance Optimization

- **Module-Level Static Constants:** Any static arrays, route mappings, navigation lists, filter options, or lookup objects that do not depend on React props, state, or hooks MUST be declared **outside** the component function at module scope.
  - *Rationale:* Declaring static objects/arrays inside components forces memory reallocation and garbage collection churn on every render cycle, and breaks referential equality for child components and hook dependencies.

## Native Implementation Standards (No External Libs)

- **Strict Zero-Dependency Philosophy:** Do NOT install external packages for trivial tasks. Use native Web and Node APIs.
  - No `axios` (Use native `fetch`).
  - No `date-fns` or `moment` (Use native `Intl.DateTimeFormat`).
- **State Management:** Use native React Context, `useReducer`, or URL Search Params. Do not install Redux, Zustand, or Recoil.
- **Form Handling:** Use native `<form>` handling, React Server Actions, `FormData`, and React 19 `useActionState`.
- **Utilities:** If any helper function is needed, create your own helper function in `@/utilities`.

## Environment Variable Hygiene & Security

- **Client Leak Prevention:** Strictly prohibit using `NEXT_PUBLIC_` for API secrets, private keys, database credentials, or server-only tokens.
- **Environment Documentation:** Every environment variable accessed in `process.env` MUST be documented with empty values in `.env.example`.
- **Centralized Access:** Access environment variables strictly within `configs/` or Server Actions; never scatter raw `process.env` calls inside deep UI components.

## Next.js 16 Patterns

- **RSC by Default:** Server Components are the default. Minimize `'use client'` directives.
- **DO NOT REPEAT YOURSELF:** Follow DRY code principles always.
- **App Router:** Follow standard file conventions (`page.tsx`, `layout.tsx`, `route.ts`, `robots.ts`, `sitemap.ts`).
- **Media:** Use `next/image` for all images, properly specifying responsive attributes.
- **Push Interactivity to Leaves:** Keep layouts and pages as Server Components. Wrap only the interactive buttons, forms, or modal triggers in small `'use client'` leaf components.
- **Server Actions:** Mark server action files with `"use server"` at the top. Ensure data passed across server-client boundaries is serializable.
- **Route Boundaries:** Resilient routes should define `error.tsx`, `not-found.tsx`, and `loading.tsx` where appropriate.

## Accessibility (a11y) & Semantic Standards (WCAG 2.1 AA)

- **Heading Hierarchy:** Every route MUST contain exactly one `<h1>` (use Tailwind `sr-only` if visually omitted). Headings must progress sequentially (`<h1>` -> `<h2>` -> `<h3>` -> `<h4>`) without skipping levels.
- **Accessible Names for Interactive Controls:** Every button, link, and input must have an unambiguous accessible name. All icon-only buttons or links (e.g. logo, close icon, theme switcher, hamburger menu) MUST have an explicit `aria-label`.
- **Form Controls & Association:** All `<input>`, `<select>`, and `<textarea>` elements must have an associated `<label htmlFor='...'>` or `aria-label`/`aria-labelledby`. Link field errors using `aria-describedby` and set `aria-invalid`.
- **Keyboard Navigation & Visible Focus:** All interactive elements must be keyboard-operable (`Tab`, `Enter`, `Space`, `Escape`). Never suppress focus outlines without a visible high-contrast `focus-visible:` ring (e.g., `focus-visible:ring-2 focus-visible:ring-primary-500`).
- **Media & Decorative Elements:** Every image must have an `alt` attribute (descriptive layperson text if informative, or `alt=''` if decorative). Decorative SVG icons must specify `aria-hidden='true'`.
- **Semantic Landmarks:** Use semantic landmark tags (`<header>`, `<nav>`, `<main>`, `<footer>`). When multiple landmarks of the same type exist (e.g., header nav vs. footer nav), distinguish them with explicit `aria-label` attributes (`<nav aria-label='Main navigation'>`, `<nav aria-label='Footer navigation'>`).
- **Contrast & Dual-Theme:** Ensure all text, buttons, and active borders satisfy WCAG 2.1 AA contrast ratios (minimum 4.5:1 for body text, 3:1 for large text and UI controls) in both light and dark themes.