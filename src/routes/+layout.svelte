<script lang="ts">
  import { onMount } from "svelte";
  import "../styles/app.css";

  let { children } = $props();

  let darkmode = $state(false);

  onMount(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    darkmode = mediaQuery.matches;
  });

  $effect(() => {
    document.documentElement.classList.toggle("dark", darkmode);
  });
</script>

<header>
  <nav class="print:hidden">
    <a href="/">Home</a>
    <a href="/resume">Resume</a>
    <button onclick={() => (darkmode = !darkmode)}>
      {darkmode ? "☀️" : "🌙"}
    </button>
  </nav>
</header>

<svelte:head>
  <title>"Sam Stelle"</title>
</svelte:head>

{@render children()}
