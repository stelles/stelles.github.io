<script lang="ts">
  import { target } from "../state/mineralState";
  import type { MineralWaterComposition } from "../minerals/minerals";

  type Highlight = {
    label: string;
    key: keyof MineralWaterComposition;
  };

  const highlights = [
    { label: "Calcium", key: "calcium" },
    { label: "Magnesium", key: "magnesium" },
    { label: "Sodium", key: "sodium" },
    { label: "Bicarbonate", key: "bicarbonate" }
  ] satisfies ReadonlyArray<Highlight>;
</script>

<div class="rounded-2xl border border-cyan-100/70 bg-white/90 p-6 shadow-sm" id="composition">
  <div class="flex items-center justify-between">
    <div>
      <p class="text-sm uppercase tracking-wide text-cyan-700">Snapshot</p>
      <p class="text-lg font-semibold text-slate-900">Target Composition</p>
      <p class="text-sm text-slate-600">Key ions at a glance.</p>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
    {#each highlights as item (item.key)}
      <div class="rounded-xl border border-cyan-100/70 bg-gradient-to-br from-white to-cyan-50/60 p-3 text-center shadow-sm">
        <div class="text-xs text-slate-500 font-['IBM_Plex_Mono',ui-monospace]">
          {item.label}
        </div>
        <div class="text-lg font-semibold text-slate-900 font-['IBM_Plex_Mono',ui-monospace] tabular-nums">
          {$target[item.key].toFixed(0)}
        </div>
        <div class="text-xs text-slate-400">target mg/L</div>
      </div>
    {/each}
  </div>
</div>
