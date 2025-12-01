<script lang="ts">
  export { title };
</script>

{#snippet title(text: string)}
  <span>
    <span class="text-highlight">{text.substring(0, 3)}</span>
    {text.substring(3)}
  </span>
{/snippet}
