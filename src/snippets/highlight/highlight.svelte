<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn, type WithElementRef } from "$lib/utils.js";

  let ref = null;

  type Props = WithElementRef<
    HTMLAttributes<HTMLElement> & {
      as?: keyof HTMLElementTagNameMap;
      children?: Snippet;
    }
  >;

  let {
    as = "span",
    class: className,
    children,
    ...restProps
  }: Props = $props();

  // Extract text content from children
  let textContent = $state("");
  let containerRef: HTMLElement | null = $state(null);

  $effect(() => {
    if (containerRef) {
      textContent = containerRef.textContent || "";
    }
  });

  let firstThree = $derived(textContent.slice(0, 3));
  let restOfText = $derived(textContent.slice(3));
</script>

<span bind:this={containerRef} style="display: none;">
  {@render children?.()}
</span>

<svelte:element
  this={as}
  bind:this={ref}
  data-slot="highlight"
  class={cn(className)}
  {...restProps}
>
  <span class="text-highlight">{firstThree}</span>{restOfText}

  <!--
    Usage:
    <Highlight>Hello World</Highlight> - First 3 letters "Hel" will be highlighted
    <Highlight as="strong" class="text-xl">Welcome</Highlight> - "Wel" highlighted in large strong text
  -->
</svelte:element>
