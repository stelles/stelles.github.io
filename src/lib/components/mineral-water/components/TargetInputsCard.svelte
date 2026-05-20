<script lang="ts">
  import { TARGET_FIELDS } from "../minerals/minerals";
  import type { MineralNames } from "../minerals/minerals";
  import { target, updateTargetField } from "../state/mineralState";

  type SubscriptToken = string | { sub: string };

  const handleInput = (key: MineralNames) => (event: Event) => {
    if (!(event.currentTarget instanceof HTMLInputElement)) {
      return;
    }
    updateTargetField(key, Number(event.currentTarget.value));
  };

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

  const targetFields = TARGET_FIELDS;
</script>

<div
  class="rounded-2xl border border-cyan-100/70 bg-gradient-to-br from-white via-cyan-50/60 to-sky-50/60 p-6 shadow-sm"
  id="calculator"
>
  <div class="flex items-center justify-between">
    <div>
      <p class="text-lg font-semibold text-slate-900">Target Composition</p>
      <p class="text-sm text-slate-600">Set ion targets in mg/L.</p>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
    {#each targetFields as field (field.key)}
      <div class="space-y-2">
        <label
          for={field.key}
          class="text-sm font-medium text-slate-600 font-['IBM_Plex_Mono',ui-monospace]"
        >
          <span class="sr-only">{labelText(field.label)}</span>
          <span aria-hidden="true">
            {#each labelTokens(field.label) as token, index (index)}
              {#if typeof token === "string"}
                {token}
              {:else}
                <sub>{token.sub}</sub>
              {/if}
            {/each}
          </span>
        </label>
        <input
          id={field.key}
          type="number"
          min={field.min}
          step={field.step}
          class="w-full rounded-xl border border-cyan-200/70 bg-white/90 p-2.5 text-sm text-slate-900 shadow-sm focus:border-cyan-400 focus:ring-cyan-300 font-['IBM_Plex_Mono',ui-monospace] tabular-nums"
          value={$target[field.key] ?? 0}
          oninput={handleInput(field.key)}
        />
      </div>
    {/each}
  </div>
</div>
