<script lang="ts">
  import WaterProfileCard from '$lib/components/mineral-water/components/WaterProfileCard.svelte';
  import SaltOptionsCard from '$lib/components/mineral-water/components/SaltOptionsCard.svelte';
  import TargetInputsCard from '$lib/components/mineral-water/components/TargetInputsCard.svelte';
  import RecipeResults from '$lib/components/mineral-water/components/RecipeResults.svelte';
  import InstructionsCard from '$lib/components/mineral-water/components/InstructionsCard.svelte';
  import CompositionSummary from '$lib/components/mineral-water/components/CompositionSummary.svelte';
</script>

<div class="light min-h-screen">
  <main class="mx-auto max-w-6xl px-6 pb-16 pt-12">
    <section class="mb-10 text-center">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">
        Sparkling mineral design lab
      </p>
      <h2 class="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
        Mineral Water Calculator
      </h2>
      <p class="mt-3 text-slate-600">
        Compose custom mineral profiles with chemistry-first precision.
      </p>
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
