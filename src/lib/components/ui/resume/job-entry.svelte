<script lang="ts">
    import type { JobEntry } from '$lib/types';

    let { job }: { job: JobEntry } = $props();
</script>

<article>
    <header>
        <div class="flex flex-wrap items-baseline justify-between gap-x-2">
            <h3 class="text-content text-md font-bold">{job.company}</h3>
            <span class="text-sm font-light italic text-muted-foreground"
                >{job.location}</span
            >
        </div>
        <div class="flex flex-wrap items-baseline justify-between gap-x-2">
            <h4
                class="text-sm font-medium uppercase tracking-wide text-muted-foreground"
            >
                {job.title}
            </h4>
            <span class="text-sm font-light italic text-muted-foreground"
                >{job.dateRange}</span
            >
        </div>
        {#if job.description}
            <p class="text-sm italic text-muted-foreground">
                {job.description}
            </p>
        {/if}
    </header>
    <ul
        class="ml-4 list-outside list-disc space-y-0.5 text-sm leading-normal text-content mt-1"
    >
        {#each job.responsibilities as responsibility (responsibility)}
            <li>{responsibility}</li>
        {/each}
    </ul>
</article>
