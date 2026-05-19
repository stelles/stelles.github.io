<script lang="ts">
  import { SALT_OPTION_LABELS } from "../minerals/salts";
  import { totalGrams } from "../minerals/selectors";
  import { grams, targetLiters as liters } from "../state/mineralState";
  import type { SaltRecipe } from "../minerals/salts";

  type SubscriptToken = string | { sub: string };

  const total = $derived(totalGrams($grams));

  const stripTags = (value: string): string => value.replace(/<[^>]*>/g, "");

  const labelTokens = (label: string): SubscriptToken[] => {
    const tokens: SubscriptToken[] = [];
    const pattern = /<sub>(.*?)<\/sub>/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(label)) !== null) {
      const leading = label.slice(lastIndex, match.index);
      if (leading) {
        tokens.push(stripTags(leading));
      }
      tokens.push({ sub: stripTags(match[1]) });
      lastIndex = match.index + match[0].length;
    }

    const trailing = label.slice(lastIndex);
    if (trailing) {
      tokens.push(stripTags(trailing));
    }

    return tokens;
  };

  const labelText = (label: string): string =>
    labelTokens(label).map((token) => (typeof token === "string" ? token : token.sub)).join("");

  const gramEntries = $derived(Object.entries($grams) as [keyof SaltRecipe, number][]);
</script>

<div
  class="rounded-2xl border border-cyan-100/70 bg-gradient-to-br from-white via-sky-50/60 to-cyan-50/60 p-6 shadow-sm"
  id="recipe"
>
  <div class="flex flex-wrap items-center justify-between gap-3">
    <div>
      <p class="text-sm uppercase tracking-wide text-cyan-700">Step 4</p>
      <p class="text-lg font-semibold text-slate-900">Recipe for {$liters} L</p>
      <p class="text-sm text-slate-600">Grams per batch, ready for carbonation.</p>
    </div>
    <span class="inline-flex items-center rounded-full border border-cyan-200/70 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
      Totals: {total.toFixed(2)}g
    </span>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
    {#each gramEntries as [salt, amount] (salt)}
      {#if amount > 0.01}
        <div class="flex items-center justify-between rounded-xl border border-cyan-100/70 bg-white px-4 py-3 shadow-sm">
          <span class="text-sm font-medium text-slate-700 font-['IBM_Plex_Mono',ui-monospace]">
            <span class="sr-only">{labelText(SALT_OPTION_LABELS[salt] ?? salt)}</span>
            <span aria-hidden="true">
              {#each labelTokens(SALT_OPTION_LABELS[salt] ?? salt) as token, index (index)}
                {#if typeof token === "string"}
                  {token}
                {:else}
                  <sub>{token.sub}</sub>
                {/if}
              {/each}
            </span>
          </span>
          <span class="text-lg font-semibold text-slate-900 font-['IBM_Plex_Mono',ui-monospace] tabular-nums">
            {amount.toFixed(2)}g
          </span>
        </div>
      {/if}
    {/each}
  </div>

  <div class="mt-5 rounded-xl border border-cyan-100/70 bg-white/90 p-4 shadow-sm">
    <p class="text-sm text-slate-600">Total salt needed</p>
    <p class="text-3xl font-semibold text-slate-900 font-['IBM_Plex_Mono',ui-monospace] tabular-nums">
      {total.toFixed(2)}g
    </p>
  </div>
</div>
