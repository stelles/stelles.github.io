<script lang="ts">
    import { Separator } from '$lib/components/ui/separator/index.js';

    let { title }: { title: string } = $props();
</script>

<h2 class="text-base font-bold">
    <span class="text-highlight">{title.slice(0, 3)}</span>{title.slice(3)}
</h2>
<Separator class="my-1" />
