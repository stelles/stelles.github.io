import { derived, writable } from "svelte/store";
import { MINERAL_WATERS, TapWaters, DEFAULT_WATER_NAME } from "../minerals/mineralwaters";
import { DEFAULT_SALT_OPTIONS } from "../minerals/salts";
import type { MineralWaterComposition } from "../minerals/minerals";
import { EMPTY_COMPOSITION } from "../minerals/minerals";
import type { SaltOptions } from "../minerals/salts";
import { calculateRecipe, recipeToMiligrams } from "../minerals/selectors";

export const MINERAL_WATER_LIST = MINERAL_WATERS;

function persistedWritable<T>(key: string, initial: T) {
  const stored = typeof localStorage !== "undefined" ? localStorage.getItem(key) : null;
  const store = writable<T>(stored ? (JSON.parse(stored) as T) : initial);
  store.subscribe((value) => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  });
  return store;
}

export const selectedWaterIdx = persistedWritable("mw-selectedWaterIdx", 0);
export const selectedWaterIndex = selectedWaterIdx;

export const targetLiters = writable(1);
export const liters = targetLiters;

export const saltOptions = writable<SaltOptions>({ ...DEFAULT_SALT_OPTIONS });

export const tapWaterComposition = TapWaters["Seattle"]?.composition ?? EMPTY_COMPOSITION;

export const presetNames = MINERAL_WATERS.map((water) => water.name);

export const target = derived(
  selectedWaterIdx,
  ($idx) => ({ ...(MINERAL_WATERS[$idx]?.composition ?? MINERAL_WATERS[0].composition) }),
);

export const recipe = derived(
  [target, saltOptions],
  ([$target, $saltOptions]) => {
    return calculateRecipe($target, tapWaterComposition, $saltOptions);
  },
);

export const grams = derived([recipe, targetLiters], ([$recipe, $liters]) => {
  return recipeToMiligrams($recipe, $liters);
});

export const loadPreset = (name: string) => {
  const idx = MINERAL_WATERS.findIndex((w) => w.name === name);
  if (idx >= 0) selectedWaterIdx.set(idx);
};

export const resetState = () => {
  const idx = Math.max(
    0,
    MINERAL_WATERS.findIndex((w) => w.name === DEFAULT_WATER_NAME),
  );
  selectedWaterIdx.set(idx);
  targetLiters.set(1);
  saltOptions.set({ ...DEFAULT_SALT_OPTIONS });
};

export const updateSaltOption = (key: keyof SaltOptions, enabled: boolean) => {
  saltOptions.update((current) => ({
    ...current,
    [key]: enabled,
  }));
};
