<script lang="ts">
  import Icon from '@iconify/svelte';
  import { JobEntry, SectionHeader } from '$lib/components/ui/resume/index.js';
  import { Sam, Skills, Experience, contactLinks } from '$lib/resume';

  const skillEntries = Object.entries(Skills);

  function handlePrint(): void {
    window.print();
  }
</script>

<svelte:head>
  <title>{Sam.firstName} {Sam.lastName} - {Sam.title}</title>
</svelte:head>

<div
  class="bg-background print:bg-surface text-foreground flex justify-center p-4"
>
  <div class="relative max-w-4xl w-full">
    <button
      onclick={handlePrint}
      class="print:hidden absolute top-0 left-full ml-3 flex items-center gap-1.5 rounded border border-border bg-surface px-3 py-1.5 text-sm text-content shadow-sm transition-colors hover:text-highlight whitespace-nowrap"
    >
      <Icon icon="mdi:download" class="h-4 w-4" />
      Export PDF
    </button>
    <div
      class="bg-surface border-border w-full rounded border p-4 shadow-sm print:p-0 print:shadow-none print:border-0 print:rounded-none"
    >
      <!-- Header -->
      <section class="text-center text-content mb-4">
        <h1 class="text-4xl text-foreground">
          <span class="font-light">{Sam.firstName} </span>
          <span class="font-bold">{Sam.lastName}</span>
        </h1>
        <div class="text-sm tracking-widest uppercase mt-1">
          {Sam.title}
        </div>
        <div class="flex items-center justify-center gap-1 text-sm mt-0.5">
          <Icon icon="mdi:map-marker" class="h-3.5 w-3.5" />
          {Sam.location}
        </div>
        <div
          class="flex flex-wrap justify-center gap-x-5 gap-y-0.5 text-sm mt-2"
        >
          {#each contactLinks as link (link.href)}
            <a
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              class="flex items-center gap-1 transition-colors hover:text-highlight"
            >
              <Icon icon={link.icon} class="h-3.5 w-3.5" />{link.text}
            </a>
          {/each}
        </div>
      </section>
      <!-- Main Content -->
      <main class="space-y-4">
        <!-- Summary Section -->
        <section>
          <SectionHeader title="Summary" />
          <p class="text-sm leading-relaxed text-content">{Sam.summary}</p>
        </section>

        <!-- Skills Section -->
        <section>
          <SectionHeader title="Skills" />
          <div class="space-y-0.5">
            {#each skillEntries as [category, skillList] (category)}
              <div class="flex gap-x-2 items-baseline">
                <span
                  class="font-semibold text-content text-sm uppercase tracking-wide whitespace-nowrap w-auto shrink-0"
                >
                  {category}:
                </span>
                <span class="text-content text-sm">{skillList.join(', ')}</span>
              </div>
            {/each}
          </div>
        </section>

        <!-- Work Experience Section -->
        <section>
          <SectionHeader title="Work Experience" />
          <div class="space-y-3">
            {#each Experience as job (job.company + job.dateRange)}
              <JobEntry {job} />
            {/each}
          </div>
        </section>

        <!-- Education Section -->
        <section>
          <SectionHeader title="Education" />
          <article>
            <header>
              <div
                class="flex flex-wrap items-baseline justify-between gap-x-2"
              >
                <h3 class="text-content text-md font-bold">
                  Western Washington University
                </h3>
                <span class="text-sm font-light italic text-muted-foreground"
                  >Bellingham, WA</span
                >
              </div>
              <div
                class="flex flex-wrap items-baseline justify-between gap-x-2"
              >
                <h4
                  class="text-sm font-medium uppercase tracking-wide text-muted-foreground"
                >
                  B.S. in Computer Science
                </h4>
                <span class="text-sm font-light italic text-muted-foreground"
                  >Sept. 2011 - June 2016</span
                >
              </div>
            </header>
          </article>
        </section>
      </main>
    </div>
  </div>
</div>

<style>
  @media print {
    :global([data-slot='separator']) {
      border-top: 1px solid #888;
      height: 0 !important;
      background: transparent !important;
    }
  }
</style>
