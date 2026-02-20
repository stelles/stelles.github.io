---
applyTo: "**"
---

# Project general coding standards

This is a SvelteKit project. Please follow these guidelines when providing code suggestions:

## Bundling

- Use bun for package management
- Vite is the build tool

## Project Structure

- Use SvelteKit's file-based routing in `src/routes/`
- Place components in `src/lib/components/`
- Store utilities in `src/lib/utils/`
- Keep types in `src/lib/types/`

## Code Style

- Use TypeScript for type safety
- Prefer composition API and reactive statements (`$:`)
- Use Svelte stores for state management
- Follow consistent naming conventions (camelCase for variables, PascalCase for components)

## SvelteKit Conventions

- Use `+page.svelte` for page components
- Use `+layout.svelte` for layout components
- Use `+page.server.ts` for server-side logic
- Use `+page.ts` for client-side page data loading
- Leverage SvelteKit's built-in features (forms, navigation, etc.)

## CSS Styling

- Use tailwindcss v4 for styling
- Prefer utility-first classes
- Use @theme colors defined in the `src/styles/app.css`

## Best Practices

- Keep components small and focused
- Use proper accessibility attributes
- Implement proper error handling
- Follow reactive programming patterns
- Use SvelteKit's built-in optimization features
