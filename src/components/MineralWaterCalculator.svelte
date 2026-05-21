<script lang="ts">
  import WaterProfileCard from '$lib/components/mineral-water/components/WaterProfileCard.svelte';
  import TargetInputsCard from '$lib/components/mineral-water/components/TargetInputsCard.svelte';
  import RecipeTable from '$lib/components/mineral-water/components/RecipeTable.svelte';
</script>

<div class="min-h-screen bg-stone-50 dark:bg-slate-950">
  <main class="mx-auto max-w-6xl px-6 pb-16 pt-10">
    <div class="mb-8">
      <h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">Mineral Water Calculator</h2>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Salt amounts to add per batch volume, starting from Seattle municipal tap water.
      </p>
    </div>
    <div class="grid gap-6 lg:grid-cols-[320px_1fr]">
      <div class="space-y-6">
        <WaterProfileCard />
        <TargetInputsCard />
      </div>
      <RecipeTable />
    </div>
  </main>
</div>
