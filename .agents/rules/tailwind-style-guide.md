---
trigger: always_on
description: This rule explains Tailwind CSS 4 changes, new features, and best practices for modern UI development.
---

# Tailwind CSS Rules & Guidelines

This document defines the technical standards for writing CSS and utility classes using **Tailwind CSS v4** in modern, accessible applications.

## Core Architecture & CSS-First Configuration

Tailwind v4 replaces `tailwind.config.js` with pure CSS configuration via the `@theme` directive in your root CSS file:

```css
@import "tailwindcss";

@theme {
  --font-display: "Poppins", "sans-serif";
  --breakpoint-3xl: 1920px;
  --color-primary-500: oklch(0.65 0.24 265.1);
  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
}
```

- **Theme Configuration**:
  - `--color-*`: Colors (e.g., `--color-primary-500`, `--color-background`)
  - `--font-*`: Font families (e.g., `--font-sans`, `--font-mono`)
  - `--text-*`: Font sizes (e.g., `--text-xl`)
  - `--font-weight-*`: Font weights (e.g., `--font-weight-bold`)
  - `--spacing-*`: Spacing values (e.g., `--spacing-4`)
  - `--radius-*`: Border radius (e.g., `--radius-md`, `--radius-xl`)
  - `--shadow-*`: Box shadows (e.g., `--shadow-lg`)

## Design Token Discipline & Anti-Patterns

- **No Arbitrary Hex Codes:** NEVER write hardcoded hex values (e.g., `bg-[#0f172a]` or `text-[#3b82f6]`) when a semantic theme token exists (`bg-background`, `text-foreground`, `bg-primary-500`). Use design tokens to guarantee consistent theming.
- **Dynamic Classes & Zero-Dependency:** Do NOT install `clsx` or `tailwind-merge`. Use clean template literals or the native `cn(...)` utility in `@/utilities`:
- **JSX Quote Standards:** Strictly use single quotes for all JSX class strings: `className='flex items-center gap-3'`.

## Dual-Theme Enforcement (Light & Dark Mode)

All UI surfaces, typography, and borders must explicitly support both light and dark modes:

- Configure dark mode variant in CSS:
  
  ```css
  @custom-variant dark (&:where(.dark, .dark *));
  ```

- Always pair surface colors, borders, and text:
  
  ```tsx
  <div className='bg-white dark:bg-dark-900 border border-dark-200 dark:border-dark-800 text-dark-900 dark:text-dark-100'>
    <p className='text-dark-500 dark:text-dark-400'>Supporting copy</p>
  </div>
  ```

## Container Queries

Use container queries with `@container` and container breakpoints to build responsive component-driven layouts:

```html
<!-- Create a container context -->
<div class="@container">
  <!-- Elements respond to container size, not viewport width -->
  <div class="@sm:text-lg @md:text-xl @lg:text-2xl @max-md:block @min-md:hidden">
    Responsive to container
  </div>
</div>
```

## Enhanced Gradients & 3D Transforms

- **Modern Gradients:** Use Tailwind v4 gradient syntax with OKLCH color interpolation:
  
  ```html
  <div class="bg-linear-to-r/oklch from-primary-500 to-accent-500">
    Smooth OKLCH gradient
  </div>
  <div class="bg-radial-[at_25%_25%] from-primary-500/20 to-transparent">
    Radial glow backdrop
  </div>
  ```

- **3D Transforms:**
  
  ```html
  <div class="transform-3d rotate-x-12 rotate-y-6 translate-z-4 perspective-distant">
    3D transformed element
  </div>
  ```

## Modern Variants & Transitions

- **Initial Mount Animations:** Use `starting:` for transitions on first mount:
  
  ```html
  <div class="opacity-0 starting:opacity-100 transition duration-300">
    Smooth fade in
  </div>
  ```

- **Descendant Selectors:** Use `**:` to target deep nested content without manual cascading classes:
  
  ```html
  <article class="**:text-dark-800 dark:**:text-dark-200 prose">
    <!-- All descendants inherit color -->
  </article>
  ```

- **Positional Variants:** Use `not-first:`, `nth-3:`, `first:`, and `last:` for structural spacing.
