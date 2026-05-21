<script lang="ts">
  import {
    loadPreset,
    presetNames,
    selectedWaterIndex,
    MINERAL_WATER_LIST,
  } from "../state/mineralState";

  const presetItems = presetNames.map((name, index) => ({ name, value: String(index) })) satisfies ReadonlyArray<{
    name: string;
    value: string;
  }>;

  const handleLoad = (event: Event) => {
    if (!(event.currentTarget instanceof HTMLSelectElement)) return;
    const index = parseInt(event.currentTarget.value);
    const water = MINERAL_WATER_LIST[index];
    if (water) loadPreset(water.name);
  };

  const handleReload = () => {
    const water = MINERAL_WATER_LIST[$selectedWaterIndex];
    if (water) loadPreset(water.name);
  };
</script>

<div class="rounded-2xl border border-teal-200/60 bg-white shadow-sm dark:border-teal-900/50 dark:bg-slate-900">
  <div class="px-6 pt-6 pb-4">
    <p class="text-lg font-semibold text-slate-900 dark:text-slate-100">Water Profile</p>
    <p class="text-sm text-slate-500 dark:text-slate-400">Start from a bottled reference.</p>
  </div>

  <div class="px-6 pb-6 space-y-3">
    <label for="preset" class="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
      Preset Mineral Waters
    </label>
    <select
      id="preset"
      class="w-full rounded-xl border border-teal-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-300 dark:border-teal-800 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-teal-600 dark:focus:ring-teal-700"
      value={String($selectedWaterIndex)}
      onchange={handleLoad}
    >
      {#each presetItems as item (item.value)}
        <option value={item.value}>{item.name}</option>
      {/each}
    </select>

    <div class="text-sm text-slate-500 dark:text-slate-400">
      Tap Water: <span class="font-medium text-slate-700 dark:text-slate-300">Seattle</span>
    </div>

    <button
      type="button"
      class="inline-flex items-center justify-center rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-300 dark:bg-teal-500 dark:hover:bg-teal-400 dark:focus:ring-teal-700"
      onclick={handleReload}
    >
      Reload preset
    </button>
  </div>
</div>
