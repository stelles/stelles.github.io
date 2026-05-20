# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bunx astro dev      # dev server at http://localhost:4321
bunx astro build    # production static build
bunx astro preview  # preview the production build
bunx astro check    # TypeScript + Svelte type checking
```

Package manager is **bun**. Use `bun add` / `bun remove` for dependencies. Note: `bun run <script>` fails if `astro` is not on PATH; use `bunx astro` directly instead.

## Architecture

**Stack**: Astro (static output) + Svelte 5 + TailwindCSS v4 + TypeScript. Deployed to GitHub Pages.

**Routing**: File-based via `src/pages/`. Current pages: `/`, `/resume`, `/portfolio/mineral-water`.

**Layout**: `src/layouts/Layout.astro` is the single shared layout — it owns the nav, dark mode initialization (inline script to avoid FOUC), and the `<slot />`.

**Svelte islands**: Interactive Svelte components are mounted in Astro pages with `client:only="svelte"`. Top-level island wrappers live in `src/components/` (e.g., `MineralWaterCalculator.svelte`, `DarkModeToggle.svelte`). These are thin shells that import and render from `src/lib/`.

**Path alias**: `$lib` → `src/lib/` (configured in both `tsconfig.json` and `astro.config.mjs`).

### Feature: Mineral Water Calculator (`src/lib/components/mineral-water/`)

The main interactive feature. Architecture:

- **State** (`state/mineralState.ts`): Svelte stores (`writable`/`derived`) for target composition, salt options, liters, and selected preset. The tap water composition is hardcoded to Seattle.
- **Logic** (`minerals/calculator.ts`): `MineralCalculator` class operates in **mmol units** internally. It resolves a `SaltRecipe` by greedily matching ion deficits to available salts in priority order. `recipeToGrams()` converts mmol → grams for a given volume.
- **Data** (`minerals/minerals.ts`, `salts.ts`, `mineralwaters.ts`): Mineral ion definitions, salt compounds with molar masses, and preset mineral water profiles.
- **UI** (`components/CalculatorShell.svelte` and siblings): Consumes stores directly; `CalculatorShell` is the top-level orchestrator.

### Feature: Resume (`src/pages/resume.astro`)

Static Astro page — no client-side JS. All resume content (name, summary, skills, job history) lives in `src/lib/resume.ts` as plain TypeScript data. The page supports `window.print()` for PDF export, with print-specific Tailwind classes throughout.

### UI Primitives (`src/lib/components/ui/`)

Shadcn-style components built on [bits-ui](https://bits-ui.com): `Card`, `Tabs`, `Tooltip`, `Sheet`, `Separator`. Also contains `resume/` subcomponents (`JobEntry`, `SectionHeader`).

`src/lib/utils.ts` exports `cn()` (clsx + tailwind-merge) — use this for conditional class composition.

### Icons

Two mechanisms in use:
- `iconify-icon` web component (`<iconify-icon icon="mdi:..." />`) — used in Astro templates; imported via `Layout.astro`
- `@iconify/svelte` — available for Svelte components
