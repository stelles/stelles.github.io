import { derived, writable } from "svelte/store";
import { MINERAL_WATERS, TapWaters, DEFAULT_WATER_NAME } from "../minerals/mineralwaters";
import { DEFAULT_SALT_OPTIONS } from "../minerals/salts";
import type { MineralWaterComposition } from "../minerals/minerals";
import { normalizeComposition, EMPTY_COMPOSITION } from "../minerals/minerals";
import type { SaltOptions } from "../minerals/salts";
import { calculateRecipe, recipeToGrams } from "../minerals/selectors";

export const MINERAL_WATER_LIST = MINERAL_WATERS;

export const selectedWaterIdx = writable(0);
export const selectedWaterIndex = selectedWaterIdx;
export const targetLiters = writable(1);
export const liters = targetLiters;

export const target = writable<MineralWaterComposition>({ ...MINERAL_WATERS[0].composition });

export const saltOptions = writable<SaltOptions>({ ...DEFAULT_SALT_OPTIONS });

export const selectedTapWaterKey = writable<string>(Object.keys(TapWaters)[0] ?? "");

const tapWaterComposition = derived(selectedTapWaterKey, ($key) => {
  return TapWaters[$key]?.composition ?? EMPTY_COMPOSITION;
});

export const presetNames = MINERAL_WATERS.map((water) => water.name);

export const recipe = derived(
  [target, saltOptions, tapWaterComposition],
  ([$target, $saltOptions, $tap]) => {
    return calculateRecipe($target, $tap, $saltOptions);
  },
);

export const grams = derived([recipe, targetLiters], ([$recipe, $liters]) => {
  return recipeToGrams($recipe, $liters);
});

export const loadPreset = (name: string) => {
  const idx = MINERAL_WATERS.findIndex((w) => w.name === name);
  if (idx >= 0) {
    selectedWaterIdx.set(idx);
    target.set({ ...MINERAL_WATERS[idx].composition });
  }
};

export const resetState = () => {
  const idx = Math.max(
    0,
    MINERAL_WATERS.findIndex((w) => w.name === DEFAULT_WATER_NAME),
  );
  selectedWaterIdx.set(idx);
  target.set({ ...MINERAL_WATERS[idx].composition });
  targetLiters.set(1);
  saltOptions.set({ ...DEFAULT_SALT_OPTIONS });
};

export const updateTargetField = (key: keyof MineralWaterComposition, value: number) => {
  target.update((current) => ({
    ...current,
    [key]: Number.isFinite(value) ? value : current[key],
  }));
};

export const updateTarget = (next: MineralWaterComposition) => {
  target.set(normalizeComposition(next));
};

export const updateSaltOption = (key: keyof SaltOptions, enabled: boolean) => {
  saltOptions.update((current) => ({
    ...current,
    [key]: enabled,
  }));
};

export const updateTapWater = (key: string) => {
  selectedTapWaterKey.set(key);
};
