<script lang="ts">
  import { onMount } from 'svelte';
  import '../styles/app.css';

  let { children } = $props();

  let darkmode = $state<boolean | null>(null);

  onMount(() => {
    const stored = localStorage.getItem('theme');
    if (stored !== null) {
      darkmode = stored === 'dark';
    } else {
      darkmode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  });

  $effect(() => {
    if (darkmode === null) return;
    document.documentElement.classList.toggle('dark', darkmode);
    localStorage.setItem('theme', darkmode ? 'dark' : 'light');
  });
</script>

<header class="bg-surface-secondary text-content">
  <nav class="print:hidden">
    <a href="/">Home</a>
    <a href="/resume">Resume</a>
    <button
      onclick={() => (darkmode = !darkmode)}
      class:invisible={darkmode === null}
    >
      {darkmode ? '☀️' : '🌙'}
    </button>
  </nav>
</header>

<svelte:head>
  <title>Sam Stelle</title>
</svelte:head>

{@render children()}
