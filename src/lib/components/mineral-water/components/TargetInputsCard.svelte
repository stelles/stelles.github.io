<script lang="ts">
  import { MINERALS, TARGET_FIELDS } from "../minerals/minerals";
  import { target, tapWaterComposition } from "../state/mineralState";

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

  const rows = TARGET_FIELDS.map((field) => ({
    key: field.key,
    tokens: parseFormula(MINERALS[field.key].formulaHtml),
  }));
</script>

<div
  class="rounded-2xl border border-teal-200/60 bg-white shadow-sm dark:border-teal-900/50 dark:bg-slate-900"
  id="calculator"
>
  <div class="px-6 pt-6 pb-3">
    <p class="text-lg font-semibold text-slate-900 dark:text-slate-100">Target Composition</p>
    <p class="text-sm text-slate-500 dark:text-slate-400">Ion targets in mg/L.</p>
  </div>

  <div class="overflow-x-auto">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-y border-teal-100/60 bg-teal-50/50 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:border-slate-700/50 dark:bg-slate-800 dark:text-slate-400">
          <th class="px-4 py-2 text-left">Ion</th>
          <th class="px-4 py-2">Target</th>
          <th class="px-4 py-2">Tap</th>
          <th class="px-4 py-2">Add</th>
        </tr>
      </thead>
      <tbody>
        {#each rows as row, i (row.key)}
          {@const tap = tapWaterComposition[row.key] ?? 0}
          {@const deficit = Math.max(0, ($target[row.key] ?? 0) - tap)}
          <tr class="border-b border-teal-100/60 last:border-0 dark:border-slate-700/50 {i % 2 === 1 ? 'bg-teal-50/30 dark:bg-slate-800/40' : ''}">
            <td class="px-4 py-2 font-['IBM_Plex_Mono',ui-monospace] text-xs text-slate-600 dark:text-slate-400">
              {#each row.tokens as token}
                {#if typeof token === "string"}{token}{:else}<sub>{token.sub}</sub>{/if}
              {/each}
            </td>
            <td class="px-4 py-2 text-right font-['IBM_Plex_Mono',ui-monospace] tabular-nums text-slate-800 dark:text-slate-200">
              {$target[row.key] ?? 0}
            </td>
            <td class="px-4 py-2 text-right font-['IBM_Plex_Mono',ui-monospace] tabular-nums text-slate-500 dark:text-slate-400">
              {tap}
            </td>
            <td class="px-4 py-2 text-right font-['IBM_Plex_Mono',ui-monospace] tabular-nums {deficit > 0 ? 'text-amber-600 font-semibold dark:text-amber-400' : 'text-slate-300 dark:text-slate-600'}">
              {deficit.toFixed(1)}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
