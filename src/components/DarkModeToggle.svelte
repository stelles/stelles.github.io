<script lang="ts">
  let darkmode = $state(document.documentElement.classList.contains('dark'));

  function toggle() {
    darkmode = !darkmode;
    document.documentElement.classList.toggle('dark', darkmode);
    localStorage.setItem('theme', darkmode ? 'dark' : 'light');
  }
</script>

<button
  type="button"
  onclick={toggle}
  class="ml-1 inline-flex h-9 w-9 items-center justify-center rounded border border-border bg-surface-secondary text-lg shadow-sm transition-colors hover:text-highlight"
  aria-label="Toggle dark mode"
>
  {darkmode ? '☀️' : '🌙'}
</button>
