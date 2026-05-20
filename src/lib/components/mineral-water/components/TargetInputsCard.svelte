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
  class="rounded-2xl border border-cyan-100/70 bg-gradient-to-br from-white via-cyan-50/60 to-sky-50/60 shadow-sm"
  id="calculator"
>
  <div class="px-6 pt-6 pb-3">
    <p class="text-lg font-semibold text-slate-900">Target Composition</p>
    <p class="text-sm text-slate-600">Ion targets in mg/L.</p>
  </div>

  <div class="overflow-x-auto">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-y border-cyan-100/70 bg-cyan-50/40 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
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
          <tr class="border-b border-cyan-100/40 last:border-0 {i % 2 === 1 ? 'bg-cyan-50/20' : ''}">
            <td class="px-4 py-2 font-['IBM_Plex_Mono',ui-monospace] text-xs text-slate-700">
              {#each row.tokens as token}
                {#if typeof token === "string"}{token}{:else}<sub>{token.sub}</sub>{/if}
              {/each}
            </td>
            <td class="px-4 py-2 text-right font-['IBM_Plex_Mono',ui-monospace] tabular-nums text-slate-800">
              {$target[row.key] ?? 0}
            </td>
            <td class="px-4 py-2 text-right font-['IBM_Plex_Mono',ui-monospace] tabular-nums text-slate-600">
              {tap}
            </td>
            <td class="px-4 py-2 text-right font-['IBM_Plex_Mono',ui-monospace] tabular-nums {deficit > 0 ? 'text-cyan-700 font-semibold' : 'text-slate-400'}">
              {deficit.toFixed(1)}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
