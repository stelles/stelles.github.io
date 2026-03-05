<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import Highlight from "../../snippets/highlight/highlight.svelte";
  import Icon from "@iconify/svelte";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import type { Snippet } from "svelte";
  import { Summary, Skills, Experience, type JobEntry } from "$lib/resume";
</script>

{#snippet jobEntry(job: JobEntry)}
  <article>
    <header class="">
      <div class="flex flex-wrap items-baseline justify-between gap-x-2">
        <h3 class="text-content text-sm font-semibold">
          {job.title}
        </h3>
        <span class="text-xs font-light italic text-muted-foreground">
          {job.dateRange}
        </span>
      </div>
      <div class="flex flex-wrap items-baseline justify-between gap-x-2">
        <h4 class="text-sm font-medium">{job.company}</h4>
        <span class="text-xs font-medium italic text-muted-foreground">
          {job.location}
        </span>
      </div>
      {#if job.description}
        <p class="text-xs italic text-muted-foreground">
          {job.description}
        </p>
      {/if}
    </header>
    <ul
      class="ml-4 list-outside list-disc space-y-0.5 text-xs leading-normal text-content"
    >
      {#each job.responsibilities as responsibility}
        <li>{responsibility}</li>
      {/each}
    </ul>
  </article>
{/snippet}

<svelte:head>
  <title></title>
</svelte:head>

<div class="bg-background text-content flex justify-center p-4">
  <!-- Main Content Container -->
  <div class="bg-surface max-w-4xl rounded shadow-sm border p-6">
    <Card.Root>
      <Card.Header class="grid grid-cols-2 gap-4 pb-4">
        <Card.Title class="text-foreground font-bold">
          <h1><Highlight>Samuel Stelle</Highlight></h1>
        </Card.Title>
        <Card.Description class="flex flex-col gap-1 text-muted-foreground">
          <div class="font-semibold text-xs tracking-wide">
            SENIOR SOFTWARE ENGINEER
          </div>
          <div class="flex items-center text-xs">
            <Icon icon="mdi:map-marker" class="h-4 w-4" />
            Seattle, Washington
          </div>
        </Card.Description>
        <Card.Action>
          <!-- Right: Contact (Phone, Email, Socials) -->
          <div class="flex flex-col items-end gap-0.5 text-right text-xs">
            <a
              href="tel:206-437-5268"
              class="flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              (206) 437-5268
              <Icon icon="mdi:phone" class="h-3.5 w-3.5" />
            </a>
            <a
              href="mailto:samuelstelle@gmail.com"
              class="flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              samuelstelle@gmail.com
              <Icon icon="mdi:email" class="h-3.5 w-3.5" />
            </a>
            <a
              href="https://github.com/stelles"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              @stelles
              <Icon icon="mdi:github" class="h-3.5 w-3.5" />
            </a>
            <a
              href="https://linkedin.com/in/samuel-stelle"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              @samuel-stelle
              <Icon icon="mdi:linkedin" class="h-3.5 w-3.5" />
            </a>
          </div>
        </Card.Action>
      </Card.Header>
    </Card.Root>
    <Separator />

    <!-- Main Content -->
    <main>
      <!-- Summary Section -->
      <section>
        <h2 class="font-bold">
          <Highlight>Summary</Highlight>
        </h2>
        <Separator class="" />
        <p class="text-sm leading-normal text-content">
          {Summary}
        </p>
      </section>

      <!-- Skills Section -->
      <section>
        <h2 class="font-bold">
          <Highlight>Skills</Highlight>
        </h2>
        <Separator class="" />
        <div class="space-y-1">
          {#each Object.entries(Skills) as [category, skillList]}
            <div class="flex flex-wrap items-baseline gap-x-1.5">
              <span class="font-semibold text-tertiary text-xs">
                {category}:
              </span>
              <span class="text-xs text-content">
                {skillList.join(", ")}
              </span>
            </div>
          {/each}
        </div>
      </section>

      <!-- Work Experience Section -->
      <section>
        <h2 class="font-bold">
          <Highlight>Work Experience</Highlight>
        </h2>
        <Separator class="" />

        <div class="space-y-1">
          {#each Experience as job}
            {@render jobEntry(job)}
          {/each}
        </div>
      </section>

      <!-- Education Section -->
      <section>
        <h2 class="font-bold">
          <Highlight>Education</Highlight>
        </h2>
        <Separator class="" />
        <article>
          <header>
            <div class="flex flex-wrap items-baseline justify-between gap-x-2">
              <div class="text-content text-sm font-semibold">
                B.S. IN COMPUTER SCIENCE
              </div>
              <span class="text-xs font-medium italic text-muted-foreground"
                >Sept. 2011 - June 2016</span
              >
            </div>
            <div class="flex flex-wrap items-baseline justify-between gap-x-2">
              <div class="text-sm font-medium">
                Western Washington University
              </div>
              <span class="text-xs font-medium italic text-muted-foreground"
                >Bellingham, WA</span
              >
            </div>
          </header>
        </article>
      </section>
    </main>
  </div>
</div>
