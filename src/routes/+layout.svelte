<script lang="ts">
  import '../styles/app.css';

  let { children } = $props();

  let darkmode = $state<boolean | null>(null);

  function setDarkmode(value: boolean): void {
    darkmode = value;

    if (typeof window === 'undefined') return;
    document.documentElement.classList.toggle('dark', value);
    localStorage.setItem('theme', value ? 'dark' : 'light');
  }

  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme');
    if (stored !== null) {
      setDarkmode(stored === 'dark');
    } else {
      setDarkmode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }
</script>

<header
  class="print:hidden sticky top-0 z-40 border-b border-border bg-surface/90 text-content backdrop-blur"
>
  <div class="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
    <a
      href="/"
      class="text-sm font-semibold tracking-wide uppercase text-foreground hover:text-highlight transition-colors"
    >
      Sam Stelle
    </a>
    <nav class="flex items-center gap-2">
      <a
        href="/"
        class="rounded px-2.5 py-1 text-sm font-medium text-content hover:text-highlight hover:bg-surface-secondary transition-colors"
      >
        Home
      </a>
      <a
        href="/resume"
        class="rounded px-2.5 py-1 text-sm font-medium text-content hover:text-highlight hover:bg-surface-secondary transition-colors"
      >
        Resume
      </a>
      <button
        type="button"
        onclick={() => setDarkmode(!(darkmode ?? false))}
        class:invisible={darkmode === null}
        class="ml-1 inline-flex h-9 w-9 items-center justify-center rounded border border-border bg-surface-secondary text-lg shadow-sm transition-colors hover:text-highlight"
        aria-label="Toggle dark mode"
      >
        {darkmode ? '☀️' : '🌙'}
      </button>
    </nav>
  </div>
</header>

<svelte:head>
  <title>Sam Stelle</title>
</svelte:head>

{@render children()}
