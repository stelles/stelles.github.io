<script lang="ts">
  import { onMount } from "svelte";
  import "../styles/app.css";

  let { children } = $props();

  let darkmode = $state(false);

  //   onMount(() => {
  //     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  //     darkmode = mediaQuery.matches;

  //     const handler = (e: MediaQueryListEvent) => (darkmode = e.matches);
  //     mediaQuery.addEventListener("change", handler);

  //     return () => mediaQuery.removeEventListener("change", handler);
  //   });

  $effect(() => {
    if (darkmode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });
</script>

<nav>
  <a href="/">Home</a>
  <a href="/resume">Resume</a>
  <button onclick={() => (darkmode = !darkmode)}>
    {darkmode ? "☀️" : "🌙"}
  </button>
</nav>

<svelte:head>
  <title>"Sam Stelle"</title>
</svelte:head>

{@render children()}
