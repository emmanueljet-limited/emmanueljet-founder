---
trigger: always_on
description: This rule explains Next.js SEO best practices for fullstack development.
---

# Next.js 16 SEO & Metadata Standards

This document defines the strict SEO implementation rules using the native Next.js Metadata API.
**Constraint**: Do NOT use `next-seo` or `react-helmet`. Use strictly native `next` APIs.

## Global Metadata Configuration (`layout.tsx`)

- **Base URL**: ALWAYS define `metadata` in the root layout to ensure absolute Open Graph and Twitter image URLs.
- **Title Template**: Use a title template (`%s | BrandName`) to enforce uniform branding across sub-pages while preserving a descriptive index title.
- **Keywords**: Populate global keywords relevant to the project.
- **Social Cards**: Always configure complete Open Graph and Twitter cards.

## Dynamic Metadata (`page.tsx`)

- **Request Memoization**: Next.js automatically dedupes and memoizes identical `fetch` requests between `metadata` and the Page component. Do not write manual caching layers for metadata fetching.
- **Self-Referencing Canonicals**: Ensure every route defines a canonical URL pointing to itself.
  **Languages**: If we add multi-language support, `use alternates: { languages: ... }`.

## File-Based Metadata (The "Magic Files")

Always generate search and indexing files programmatically in TypeScript:

- **Robots**: `app/robots.ts` (Dynamic `Robots` generation targeting sitemap and crawlers).
- **Sitemap**: `app/sitemap.ts` (Dynamic `MetadataRoute.Sitemap` array).
- **Manifest**: `app/manifest.ts` (Dynamic `MetadataRoute.Manifest` for PWA compliance).

## AI & LLM Search Engine Discoverability

Modern web discovery includes LLM search engines (Perplexity, ChatGPT Search, Gemini, Claude):

- **Summary File**: Serve `/llms.txt` via `app/llms.txt/route.ts` providing clean markdown architecture and summaries for LLM crawlers.
- **Full Context File**: Serve `/llms-full.txt` via `app/llms-full.txt/route.ts` containing comprehensive documentation and technical specs for deep LLM retrieval.

## Structured Data (JSON-LD)

- **Implementation**: Inject JSON-LD schema using a native `<script>` tag inside Server Components.
- **Security Standard**: Ensure JSON schema payloads are serializable and XSS-safe.
