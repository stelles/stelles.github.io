<script lang="ts">
  import AppHeader from "./AppHeader.svelte";
  import WaterProfileCard from "./WaterProfileCard.svelte";
  import SaltOptionsCard from "./SaltOptionsCard.svelte";
  import TargetInputsCard from "./TargetInputsCard.svelte";
  import RecipeResults from "./RecipeResults.svelte";
  import InstructionsCard from "./InstructionsCard.svelte";
  import CompositionSummary from "./CompositionSummary.svelte";
</script>

<div class="min-h-screen">
  <AppHeader />

  <main class="mx-auto max-w-6xl px-6 pb-16 pt-12">
    <section class="mb-10 text-center">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">
        Sparkling mineral design lab
      </p>
      <h2 class="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
        Mineral Water Calculator
      </h2>
      <p class="mt-3 text-slate-600">
        Compose custom mineral profiles with bubbly-blue controls and chemistry-first typography.
      </p>
      <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
        <span class="inline-flex items-center rounded-full border border-cyan-200/60 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
          pH-aware planning
        </span>
        <span class="inline-flex items-center rounded-full border border-sky-200/60 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
          mg/L precision
        </span>
        <span class="inline-flex items-center rounded-full border border-teal-200/60 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
          Sparkling-ready recipes
        </span>
      </div>
    </section>

    <section class="grid gap-6 lg:grid-cols-[1fr_2fr]">
      <div class="space-y-6">
        <WaterProfileCard />
        <SaltOptionsCard />
      </div>
      <div class="space-y-6">
        <TargetInputsCard />
        <RecipeResults />
        <InstructionsCard />
        <CompositionSummary />
      </div>
    </section>
  </main>
</div>
