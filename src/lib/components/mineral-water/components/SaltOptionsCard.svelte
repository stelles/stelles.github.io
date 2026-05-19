<script lang="ts">
  import { Salts, SaltKeys, OPTIONAL_SALTS } from "../minerals/salts";
  import { saltOptions, updateSaltOption } from "../state/mineralState";
  import type { SaltOptions, SaltKey } from "../minerals/salts";

  const saltList = SaltKeys.map((key) => ({
    key,
    name: Salts[key].name,
    chemistryName: Salts[key].chemistryName,
    formula: Salts[key].formula,
    optional: OPTIONAL_SALTS.some((s) => s.formula === Salts[key].formula),
  }));

  const requiredSalts = saltList.filter((salt) => !salt.optional);
  const optionalSalts = saltList.filter((salt) => salt.optional);

  const handleChange = (key: SaltKey) => (event: Event) => {
    if (!(event.currentTarget instanceof HTMLInputElement)) {
      return;
    }
    updateSaltOption(key, event.currentTarget.checked);
  };
</script>

<div class="rounded-2xl border border-cyan-100/70 bg-white/80 p-6 shadow-sm">
  <div class="flex items-center justify-between">
    <div>
      <p class="text-sm uppercase tracking-wide text-cyan-700">Step 2</p>
      <p class="text-lg font-semibold text-slate-900">Available Salts</p>
      <p class="text-sm text-slate-600">Toggle the reagents you have on hand.</p>
    </div>
  </div>

  <div class="mt-4 space-y-5">
    <div class="space-y-3">
      <div class="flex items-center gap-2">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Required salts</p>
        <span
          class="inline-flex h-5 w-5 items-center justify-center rounded-full border border-cyan-100 text-[11px] text-cyan-700"
          title="Required salts are core building blocks for matching target minerals."
          aria-label="Required salts are core building blocks for matching target minerals."
        >
          i
        </span>
      </div>
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {#each requiredSalts as salt (salt.key)}
          <label class="group flex items-center gap-2 rounded-xl border border-cyan-100/80 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm">
            <input
              type="checkbox"
              class="h-4 w-4 rounded border-cyan-200 text-cyan-600 focus:ring-2 focus:ring-cyan-300"
              checked={$saltOptions[salt.key]}
              onchange={handleChange(salt.key)}
            />
            <span class="flex flex-1 items-center justify-between gap-2">
              <span class="text-sm text-slate-700">
                {salt.name}
                <span class="text-xs text-slate-400">({salt.chemistryName})</span>
              </span>
            </span>
          </label>
        {/each}
      </div>
    </div>

    <div class="space-y-3">
      <div class="flex items-center gap-2">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Optional salts</p>
        <span
          class="inline-flex h-5 w-5 items-center justify-center rounded-full border border-cyan-100 text-[11px] text-cyan-700"
          title="Optional salts refine flavor and balance but are not required."
          aria-label="Optional salts refine flavor and balance but are not required."
        >
          i
        </span>
      </div>
      {#if optionalSalts.length > 0}
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {#each optionalSalts as salt (salt.key)}
            <label class="group flex items-center gap-2 rounded-xl border border-cyan-100/80 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm">
              <input
                type="checkbox"
                class="h-4 w-4 rounded border-cyan-200 text-cyan-600 focus:ring-2 focus:ring-cyan-300"
                checked={$saltOptions[salt.key]}
                onchange={handleChange(salt.key)}
              />
              <span class="flex flex-1 items-center justify-between gap-2">
                <span class="text-sm text-slate-700">
                  {salt.name}
                  <span class="text-xs text-slate-400">({salt.chemistryName})</span>
                </span>
              </span>
            </label>
          {/each}
        </div>
      {:else}
        <p class="text-sm text-slate-500">No optional salts configured yet.</p>
      {/if}
    </div>
  </div>
</div>
