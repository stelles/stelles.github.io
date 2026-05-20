<script lang="ts">
  import {
    loadPreset,
    presetNames,
    resetState,
    selectedWaterIndex,
    MINERAL_WATER_LIST,
  } from "../state/mineralState";

  const presetItems = presetNames.map((name, index) => ({ name, value: String(index) })) satisfies ReadonlyArray<{
    name: string;
    value: string;
  }>;

  const handleLoad = (event: Event) => {
    if (!(event.currentTarget instanceof HTMLSelectElement)) {
      return;
    }
    const index = parseInt(event.currentTarget.value);
    const water = MINERAL_WATER_LIST[index];
    if (water) {
      loadPreset(water.name);
    }
  };

  const handleReset = () => {
    resetState();
  };

  const handleReload = () => {
    const water = MINERAL_WATER_LIST[$selectedWaterIndex];
    if (water) {
      loadPreset(water.name);
    }
  };
</script>

<div class="rounded-2xl border border-cyan-100/70 bg-white/80 p-6 shadow-sm">
  <div class="flex items-center justify-between">
    <div>
      <p class="text-sm uppercase tracking-wide text-cyan-700">Step 1</p>
      <p class="text-lg font-semibold text-slate-900">Water Profile</p>
      <p class="text-sm text-slate-600">Start from a bottled reference.</p>
    </div>
  </div>

  <div class="mt-4 space-y-3">
    <label for="preset" class="text-sm text-slate-600">Preset Mineral Waters</label>
    <select
      id="preset"
      class="w-full rounded-xl border border-cyan-200/70 bg-white p-2.5 text-sm text-slate-900 shadow-sm focus:border-cyan-400 focus:ring-cyan-300"
      value={String($selectedWaterIndex)}
      onchange={handleLoad}
    >
      {#each presetItems as item (item.value)}
        <option value={item.value}>{item.name}</option>
      {/each}
    </select>

    <div class="text-sm text-slate-600">
      Tap Water Source: <span class="font-medium text-slate-800">Seattle</span>
    </div>

    <div class="flex flex-wrap gap-3">
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200"
        onclick={handleReload}
      >
        Reload preset
      </button>
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-lg border border-cyan-100 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-cyan-50 focus:outline-none focus:ring-4 focus:ring-cyan-100"
        onclick={handleReset}
      >
        Reset
      </button>
    </div>
  </div>
</div>
