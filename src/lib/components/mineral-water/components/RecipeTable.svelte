<script lang="ts">
  import { recipe } from "../state/mineralState";
  import { recipeToMiligrams } from "../minerals/selectors";
  import { Salts, SaltKeys } from "../minerals/salts";

  type FormulaToken = string | { sub: string };

  const parseFormula = (html: string): FormulaToken[] => {
    const tokens: FormulaToken[] = [];
    const re = /<sub>(.*?)<\/sub>/g;
    let lastIdx = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(html)) !== null) {
      const text = html.slice(lastIdx, m.index).replace(/<[^>]*>/g, "");
      if (text) tokens.push(text);
      tokens.push({ sub: m[1] });
      lastIdx = m.index + m[0].length;
    }
    const rest = html.slice(lastIdx).replace(/<[^>]*>/g, "");
    if (rest) tokens.push(rest);
    return tokens;
  };

  let targetMl = $state(1000);
  let multiplier = $state(5);

  const col1Grams = $derived(recipeToMiligrams($recipe, targetMl / 1000));
  const col2Grams = $derived(recipeToMiligrams($recipe, (targetMl * multiplier) / 1000));

  const activeSalts = $derived(SaltKeys.filter((key) => (col1Grams[key] ?? 0) >= 0.001));

  const col1Total = $derived(Object.values(col1Grams).reduce((sum, g) => sum + g, 0));
  const col2Total = $derived(Object.values(col2Grams).reduce((sum, g) => sum + g, 0));

  const formatAmount = (grams: number): string => {
    const mg = grams * 1000;
    return mg <= 2000 ? `${Math.round(mg)} mg` : `${grams.toFixed(2)} g`;
  };

  const inputClass =
    "w-16 rounded border border-teal-200 bg-white px-1.5 py-0.5 text-right text-xs tabular-nums text-slate-700 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-300 font-['IBM_Plex_Mono',ui-monospace] dark:border-teal-800 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-teal-600";
</script>

<div class="overflow-x-auto rounded-2xl border border-teal-200/60 bg-white shadow-sm dark:border-teal-900/50 dark:bg-slate-900">
  <table class="w-full text-sm">
    <thead>
      <tr class="border-b border-teal-100/60 bg-teal-50/50 text-left dark:border-slate-700/50 dark:bg-slate-800">
        <th class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Salt
        </th>
        <th class="px-4 py-3 text-right">
          <label class="flex items-center justify-end gap-1.5">
            <input type="number" min="1" step="1" class={inputClass} bind:value={targetMl} />
            <span class="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">ml</span>
          </label>
        </th>
        <th class="px-4 py-3 text-right">
          <label class="flex items-center justify-end gap-1.5">
            <span class="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">×</span>
            <input type="number" min="1" step="1" class={inputClass} bind:value={multiplier} />
          </label>
        </th>
      </tr>
    </thead>
    <tbody>
      {#if activeSalts.length === 0}
        <tr>
          <td colspan="3" class="px-4 py-6 text-center text-sm italic text-slate-400 dark:text-slate-500">
            No salts needed — tap water already meets or exceeds the target.
          </td>
        </tr>
      {:else}
        {#each activeSalts as key, i (key)}
          {@const salt = Salts[key]}
          {@const tokens = parseFormula(salt.formulaHtml)}
          <tr class="border-b border-teal-100/60 last:border-0 dark:border-slate-700/50 {i % 2 === 1 ? 'bg-teal-50/30 dark:bg-slate-800/40' : ''}">
            <td class="px-4 py-3">
              <div class="font-medium text-slate-800 dark:text-slate-200">{salt.name}</div>
              <div class="font-['IBM_Plex_Mono',ui-monospace] text-xs text-slate-500 dark:text-slate-400">
                {#if salt.chemistryName}{salt.chemistryName} · {/if}{#each tokens as token}{#if typeof token === "string"}{token}{:else}<sub>{token.sub}</sub>{/if}{/each}
              </div>
            </td>
            <td class="px-4 py-3 text-right font-['IBM_Plex_Mono',ui-monospace] tabular-nums text-slate-800 dark:text-slate-200">
              {formatAmount(col1Grams[key] ?? 0)}
            </td>
            <td class="px-4 py-3 text-right font-['IBM_Plex_Mono',ui-monospace] tabular-nums text-slate-800 dark:text-slate-200">
              {formatAmount(col2Grams[key] ?? 0)}
            </td>
          </tr>
        {/each}
        <tr class="border-t border-teal-200/60 bg-teal-50/60 dark:border-slate-700/50 dark:bg-slate-800">
          <td class="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Total</td>
          <td class="px-4 py-3 text-right font-['IBM_Plex_Mono',ui-monospace] tabular-nums font-semibold text-amber-600 dark:text-amber-400">
            {formatAmount(col1Total)}
          </td>
          <td class="px-4 py-3 text-right font-['IBM_Plex_Mono',ui-monospace] tabular-nums font-semibold text-amber-600 dark:text-amber-400">
            {formatAmount(col2Total)}
          </td>
        </tr>
      {/if}
    </tbody>
  </table>
</div>
