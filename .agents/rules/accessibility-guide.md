---
trigger: always_on
description: This rule enforces WCAG 2.1 AA accessibility (a11y) standards, semantic HTML, keyboard operability, and ARIA best practices across all UI components and pages.
---

# Accessibility (a11y) & Semantic Standards (WCAG 2.1 AA)

All user interface code written for this project must strictly comply with WCAG 2.1 Level AA accessibility standards. Accessibility is not an afterthought or an optional audit step; it is a fundamental requirement for every component, layout, and page.

## 1. Heading Structure & Strict Hierarchy (WCAG 1.3.1)

- **Single `<h1>` Per Page:** Every route or page must render exactly one `<h1>` element representing the main topic or purpose of the page. If visual design does not display a visible title, render an `<h1>` with Tailwind's `sr-only` class (`<h1 className='sr-only'>...</h1>`).
- **Sequential Heading Levels (No Level Skipping):** Never skip heading levels downwards.
  - Correct: `<h1>` -> `<h2>` -> `<h3>` -> `<h4>`.
  - Incorrect: `<h1>` -> `<h3>` (skipping `<h2>`), or `<h2>` -> `<h4>` (skipping `<h3>`).
  - When nesting cards, accordion panels, or footer sections under a parent section headed by `<h2>`, sub-headings MUST be `<h3>`, not `<h4>`.
- **Headings for Structure, Not Sizing:** Never pick an `<h4>` or `<h5>` simply because its default typography looks smaller. Use the semantically correct heading tag (`<h2>` or `<h3>`) and apply appropriate Tailwind font size and weight classes (`text-sm font-bold`, etc.).

## 2. Accessible Names on Interactive Elements (WCAG 4.1.2)

- **Mandatory Accessible Name:** Every interactive element (`<button>`, `<a>`, `<Link>`, `<input>`, `<select>`, `<textarea>`) MUST have an unambiguous, accessible name perceivable by assistive technologies.
- **Icon-Only Buttons & Links:** Any interactive element that only renders an icon or visual graphic without visible text MUST specify a descriptive `aria-label`:
  - Brand Logo links: `<Link href='/' aria-label={appName}>` or descriptive text.
  - Theme toggles: `<button aria-label='Switch to light theme' ...>`
  - Modal dismissals: `<button aria-label='Close dialog' ...>`
  - Social media links: `<a href='...' aria-label='Visit our Twitter page' ...>`
  - Navigation toggles: `<button aria-label='Toggle navigation menu' ...>`
- **Concise & Contextual Labels:** Avoid generic labels like `'button'`, `'click here'`, or `'link'`. The label should clearly state the action or destination.
- **External Links:** Links opening in a new tab (`target='_blank'`) must include `rel='noopener noreferrer'` and provide accessible indication (e.g. `aria-label='View terms of service (opens in a new tab)'`).

## 3. Form Controls, Labels & Error Handling (WCAG 1.3.1, 3.3.1, 3.3.2)

- **Explicit Association:** Every form field (`<input>`, `<select>`, `<textarea>`) must have an associated programmatic label:
  - Prefer `<label htmlFor='field-id'>Label Text</label>` paired with `<input id='field-id' ... />`.
  - If a visual label is omitted by design, supply an explicit `aria-label='...'` or `aria-labelledby='...'`.
  - Never use `placeholder` as a substitute for an accessible label.
- **Error States & Validation Feedback:**
  - Always link error messages to their corresponding inputs using `aria-describedby='field-error-id'`.
  - Set `aria-invalid={Boolean(hasError)}` on invalid inputs.
  - Mark mandatory fields with `required` or `aria-required='true'`.
- **Loading & Submitting States:** Mark forms or submit buttons with `aria-busy='true'` during submission and disable interactive controls while preventing multiple submissions.

## 4. Keyboard Navigation & Visible Focus (WCAG 2.1.1, 2.4.7)

- **Complete Keyboard Operability:** All interactive components must be fully usable via keyboard alone (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`, arrow keys).
- **No Non-Interactive Clickable Elements:** Never attach `onClick` handlers to `<div>`, `<span>`, or `<li>` elements without providing:
  - `role='button'`
  - `tabIndex={0}`
  - Keyboard event handler (`onKeyDown` handling `Enter` and `' '`)
  - Prefer using native `<Button>` or `<Link>` whenever possible.
- **Mandatory Visible Focus Indicator:** Never disable focus indicators without an accessible alternative.
  - Disallowed: `outline-none` without `focus-visible` styles.
  - Required: Use Tailwind focus-visible utilities to ensure clear contrast:
    `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-dark-900`.
- **Modal & Dialog Trapping:**
  - Modals, drawers, and mobile slide-over menus must trap focus within the dialog while active.
  - Must specify `role='dialog'` or `role='alertdialog'` and `aria-modal='true'`.
  - Must provide `aria-labelledby` referencing the dialog title.
  - Must dismiss on `Escape` key press and return focus to the trigger element upon closing.

## 5. Non-Text Content & Decorative Graphics (WCAG 1.1.1)

- **Informative Images:** All `<Image>` and `<img>` tags conveying information must include meaningful `alt` text describing the content or purpose in plain layperson language.
- **Decorative Images:** Images that are purely decorative or redundant with adjacent text must specify `alt=''` to be ignored by assistive screen readers.
- **SVG & Icons:** Decorative SVG icons (such as Lucide icons) rendered alongside descriptive text must have `aria-hidden='true'` to prevent assistive technologies from reading unlabelled vector fragments.

## 6. Landmarks & Structural Semantics (WCAG 1.3.1, 2.4.1)

- **Semantic HTML5 Elements:** Use semantic landmark tags (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`) instead of generic nested `<div>` wrappers.
- **Unique Landmark Labels:** When multiple landmarks of the same type exist in the document (e.g. multiple `<nav>` elements in header and footer), differentiate them using descriptive `aria-label` attributes:
  - `<nav aria-label='Main navigation'>`
  - `<nav aria-label='Footer navigation'>`
  - `<nav aria-label='Breadcrumbs'>`
- **Single Main Landmark:** Ensure the page contains only one `<main>` landmark element representing the core page content.

## 7. Color Contrast & Dual-Theme Legibility (WCAG 1.4.3, 1.4.1)

- **Contrast Ratios:** Maintain at least 4.5:1 contrast ratio for normal body text and 3:1 for large text (18pt/24px or bold 14pt/18.66px) and active UI borders/states across BOTH light and dark themes.
- **Never Rely Solely on Color:** Status indicators (e.g. active plan, connected status, form errors) must not rely on color alone. Pair color cues with explicit text, badges, or descriptive icons with accessible labels.

## 8. Dynamic Content & Asynchronous Status Messages (WCAG 4.1.3)

- **Live Regions:** Announce asynchronous updates (toasts, real-time balance updates, network alerts) using `aria-live='polite'` and `role='status'`.
- **Alerts:** Critical immediate errors should use `role='alert'` and `aria-live='assertive'`.

## 9. Pre-Commit Accessibility Checklist

Before marking any UI code, page, or component complete, verify:

1. [ ] Exactly one `<h1>` exists on the page (use `sr-only` if visually omitted).
2. [ ] Heading levels follow a strict sequential hierarchy without jumping (no `<h1>` -> `<h3>`, no `<h2>` -> `<h4>`).
3. [ ] All buttons, links, and icon triggers have accessible names (`aria-label` where text is absent).
4. [ ] All input fields have programmatic labels and linked error messages (`aria-describedby`).
5. [ ] Interactive controls exhibit a high-contrast visible focus ring on keyboard navigation (`focus-visible:ring-2`).
6. [ ] Decorative icons and graphics carry `aria-hidden='true'` or `alt=''`.
7. [ ] Duplicate landmarks (e.g., `<nav>`) are uniquely identified with `aria-label`.
8. [ ] Color contrast meets WCAG 2.1 AA across both light and dark modes.
