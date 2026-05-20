<script lang="ts">
  import { recipe } from "../state/mineralState";
  import { recipeToMiligrams } from "../minerals/selectors";
  import { Salts, SaltKeys } from "../minerals/salts";

  const VOLUMES = [1, 5, 10, 20, 100];

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

  const gramsByVolume = $derived(
    VOLUMES.map((vol) => recipeToMiligrams($recipe, vol)),
  );

  const activeSalts = $derived(
    SaltKeys.filter((key) => (gramsByVolume[0]?.[key] ?? 0) >= 0.001),
  );

  const totals = $derived(
    gramsByVolume.map((grams) =>
      Object.values(grams).reduce((sum, g) => sum + g, 0),
    ),
  );

  const formatAmount = (grams: number): string => {
    const mg = grams * 1000;
    return mg <= 2000 ? `${Math.round(mg)} mg` : `${grams.toFixed(2)}g`;
  };
</script>

<div
  class="overflow-x-auto rounded-2xl border border-cyan-100/70 bg-white/90 shadow-sm"
>
  <table class="w-full text-sm">
    <thead>
      <tr class="border-b border-cyan-100/70 bg-cyan-50/40 text-left">
        <th
          class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500"
          >Salt</th
        >
        {#each VOLUMES as vol}
          <th
            class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500"
            >{vol} L</th
          >
        {/each}
      </tr>
    </thead>
    <tbody>
      {#if activeSalts.length === 0}
        <tr>
          <td
            colspan={VOLUMES.length + 1}
            class="px-4 py-6 text-center text-sm text-slate-400 italic"
          >
            No salts needed — tap water already meets or exceeds the target.
          </td>
        </tr>
      {:else}
        {#each activeSalts as key, i (key)}
          {@const salt = Salts[key]}
          {@const tokens = parseFormula(salt.formulaHtml)}
          <tr
            class="border-b border-cyan-100/40 last:border-0 {i % 2 === 1
              ? 'bg-cyan-50/20'
              : ''}"
          >
            <td class="px-4 py-3">
              <div class="font-medium text-slate-800">{salt.name}</div>
              <div
                class="font-['IBM_Plex_Mono',ui-monospace] text-xs text-slate-400"
              >
                {#each tokens as token}
                  {#if typeof token === "string"}{token}{:else}<sub
                      >{token.sub}</sub
                    >{/if}
                {/each}
              </div>
            </td>
            {#each gramsByVolume as grams}
              <td
                class="px-4 py-3 text-right font-['IBM_Plex_Mono',ui-monospace] tabular-nums text-slate-900"
              >
                {formatAmount(grams[key] ?? 0)}
              </td>
            {/each}
          </tr>
        {/each}
        <tr class="border-t border-cyan-200/60 bg-cyan-50/50 font-semibold">
          <td class="px-4 py-3 text-slate-700">Total</td>
          {#each totals as total}
            <td
              class="px-4 py-3 text-right font-['IBM_Plex_Mono',ui-monospace] tabular-nums text-slate-900"
            >
              {formatAmount(total)}
            </td>
          {/each}
        </tr>
      {/if}
    </tbody>
  </table>
</div>
