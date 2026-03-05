# SvelteKit 5 Presentation Site - AI Agent Instructions

## Project Overview

This is a personal presentation site built with SvelteKit 2 and Svelte 5 using runes-based reactivity. The project uses Tailwind CSS v4, TypeScript, and includes component libraries like bits-ui for accessible UI components. It's designed for creating interactive presentations with Animotion and maintaining a personal portfolio/resume section.

## Architecture & Key Concepts

### Svelte 5 Runes System (CRITICAL)

- **This project uses Svelte 5 runes mode** - configured via `compilerOptions: { runes: true }` in `svelte.config.js`
- Use `$state()` for reactive local state - NOT `let` variables for reactivity
- Use `$derived()` for computed values - NOT `$:` reactive statements
- Use `$effect()` for side effects - NOT `$:` statements or lifecycle hooks
- Use `$props()` for component props - NOT `export let`
- Use `$bindable()` for two-way bindings between components
- Use `{@render children?.()}` pattern for slot content - NOT `<slot>`

Example pattern from `+layout.svelte`:

```svelte
<script lang="ts">
  let { children } = $props();
  let darkmode = $state(false);

  $effect(() => {
    if (darkmode) {
      document.documentElement.classList.add("dark");
    }
  });
</script>

{@render children()}
```

### Component Structure

- UI components follow bits-ui patterns in `src/lib/components/ui/`
- Each UI component folder has an `index.ts` for clean exports
- Components use TypeScript with proper type imports from `svelte/elements`
- Utility function `cn()` from `$lib/utils.js` for conditional class merging
- `WithElementRef` type for ref binding patterns with `$bindable(null)`

### Tailwind CSS v4 Integration

- Uses new Tailwind v4 with `@tailwindcss/vite` plugin
- Theme tokens defined as CSS custom properties in `src/styles/app.css`
- Dark mode via `.dark` class variant: `@custom-variant dark (.dark &);`
- Theme variables use OKLCH color space for better color handling
- Custom theme extensions with `@theme inline` blocks
- Border radius system uses CSS calc for consistent sizing

Color system pattern:

```css
:root {
  --primary: oklch(0.208 0.042 265.755);
  --highlight: var(--color-green-700);
}

@theme .dark {
  --primary: oklch(0.929 0.013 255.508);
  --highlight: var(--color-green-400);
}
```

### Build Tooling

- **Package manager**: `bun` - use `bun install`, `bun run dev`, etc.
- **Dev server**: Vite 6 with SvelteKit plugin
- **Development port**: http://localhost:5173/
- Vite config includes Tailwind plugin: `tailwindcss()` before `sveltekit()`

## Development Workflows

### Running the Project

```bash
bun run dev          # Start dev server
bun run build        # Production build
bun run preview      # Preview build
bun run check        # Type checking with svelte-check
```

### Adding Components

1. Create component in `src/lib/components/ui/<component-name>/`
2. Use TypeScript with `HTMLAttributes<HTMLElement>` for extensibility
3. Export via `index.ts` in component folder
4. Apply `cn()` utility for merging classes
5. Use `data-slot` attributes for component identification

Example structure:

```svelte
<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  bind:this={ref}
  data-slot="card"
  class={cn("rounded-xl border p-6", className)}
  {...restProps}
>
  {@render children?.()}
</div>
```

### Styling Conventions

- Use Tailwind utility classes as primary styling method
- Prefer `@theme` colors over hardcoded values
- Use semantic color tokens (e.g., `text-foreground`, `bg-card`)
- Dark mode handled via `.dark` class on `<html>` element
- Component-scoped custom properties when needed
- Follow mobile-first responsive patterns

## Critical Patterns & Anti-Patterns

### ✅ DO Use (Svelte 5)

```svelte
<script lang="ts">
  let count = $state(0);
  let doubled = $derived(count * 2);

  $effect(() => {
    console.log(`Count is ${count}`);
  });

  let { prop1, prop2 } = $props();
</script>
```

### ❌ DON'T Use (Legacy Svelte 4)

```svelte
<script lang="ts">
  let count = 0;  // NOT reactive in runes mode
  $: doubled = count * 2;  // Compile error
  export let prop1;  // Use $props() instead

  // Don't use lifecycle hooks:
  // onMount, beforeUpdate, afterUpdate
  // Use $effect() instead
</script>
```

### Event Handlers

- Use `onclick` NOT `on:click` directive
- Use TypeScript event types: `MouseEvent`, `KeyboardEvent`
- Arrow functions for inline handlers when accessing component state

```svelte
<button onclick={(e: MouseEvent) => count++}>
  Click me
</button>
```

## Common Tasks

### Adding a New Page

1. Create `src/routes/[pagename]/+page.svelte`
2. Add navigation link in `src/routes/+layout.svelte`
3. Use SvelteKit's file-based routing conventions
4. Add page-specific metadata with `<svelte:head>`

### Adding UI Components from bits-ui

1. Install bits-ui components: `bun add bits-ui`
2. Create wrapper in `src/lib/components/ui/`
3. Apply project theme colors and styling
4. Export from component's `index.ts`
5. Document accessible keyboard interactions

### Dark Mode Implementation

The dark mode toggle is in `+layout.svelte`:

- State managed with `$state(false)`
- Applied via class toggle on `document.documentElement`
- CSS custom properties respond to `.dark` class
- Could be enhanced with localStorage persistence

## Dependencies & Libraries

### Core Framework

- `@sveltejs/kit@^2.22.0` - SvelteKit application framework
- `svelte@^5.34.7` - Svelte 5 with runes support
- `vite@^6.3.5` - Build tool and dev server

### UI & Styling

- `tailwindcss@^4.1.17` - Utility-first CSS framework
- `@tailwindcss/vite@^4.1.17` - Vite plugin for Tailwind v4
- `bits-ui@^2.11.0` - Accessible component primitives
- `clsx@^2.1.1` / `tailwind-merge@^3.3.1` - Class name utilities
- `@lucide/svelte@^0.544.0` - Icon library

### Animation & Presentation

- `@animotion/core` / `@animotion/motion` - Presentation framework
- `reveal.js@^5.2.1` - Presentation library
- `shiki@^3.7.0` - Syntax highlighting
- `shiki-magic-move@^1.1.0` - Code transition animations

### Development Tools

- `typescript@^5.8.3` - Type safety
- `svelte-check@^4.2.2` - Type checking for Svelte
- `prettier-plugin-svelte@^3.4.0` - Code formatting

## Known Gotchas & Pitfalls

1. **Reactivity requires runes**: Plain `let` variables are NOT reactive in this project
2. **Children prop pattern**: Always use `{@render children?.()}` with optional chaining
3. **Tailwind v4 differences**: No traditional config file, uses CSS-first approach
4. **Bun as package manager**: Use `bun` commands, not `npm` or `bun`
5. **Dark mode class**: Applied to `documentElement`, not `<body>`
6. **Component refs**: Use `$bindable(null)` pattern with `WithElementRef` type

## Testing & Quality

Currently configured with:

- TypeScript strict mode via `svelte-check`
- Prettier formatting with Svelte plugin
- No explicit test suite configured (consider adding Vitest + @testing-library/svelte)

## Deployment

- Uses `@sveltejs/adapter-auto` which auto-detects deployment platform
- Build command: `bun run build`
- Preview: `bun run preview`
- Static site generation possible by switching to `@sveltejs/adapter-static`

## Migration Notes

This project follows Svelte 5 patterns. When referencing documentation:

- Use official Svelte 5 docs: https://svelte.dev/docs/svelte
- Ignore Svelte 4 patterns with `export let`, `$:`, `on:click`, `<slot>`
- Follow runes examples from Svelte 5 migration guide
- Tailwind v4 docs: https://tailwindcss.com/docs (v4 beta)

## File Organization Reference

```
src/
├── lib/
│   ├── components/ui/    # Reusable UI components
│   │   ├── card/         # Component with variants
│   │   ├── sheet/        # Dialog/modal components
│   │   └── tabs/         # Tab components
│   ├── utils.ts          # Utility functions (cn, etc.)
│   └── index.ts          # Library exports
├── routes/
│   ├── +layout.svelte    # Root layout with nav/dark mode
│   ├── +page.svelte      # Home page
│   └── resume/           # Resume section
├── snippets/
│   └── highlight/        # Code highlighting snippets
└── styles/
    └── app.css           # Tailwind imports + theme tokens
```

---

**For AI agents**: When implementing features, prioritize Svelte 5 runes patterns, use existing component structures as templates, leverage Tailwind theme tokens, and maintain TypeScript types throughout. Always check `svelte.config.js` `compilerOptions` to confirm runes mode before suggesting code patterns.
