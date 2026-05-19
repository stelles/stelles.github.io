import type { MineralWaterComposition } from "./minerals";
import type { SaltOptions, SaltRecipe } from "./salts";
import { MineralCalculator } from "./calculator";
import { MINERAL_WATERS } from "./mineralwaters";

export const cloneTarget = (target: MineralWaterComposition): MineralWaterComposition => ({
  ...target,
});

export const getPresetTarget = (name: string): MineralWaterComposition => {
  const targetWater = MINERAL_WATERS.find((water) => water.name === name) ?? MINERAL_WATERS[0];
  return { ...targetWater.composition };
};

export const calculateRecipe = (
  target: MineralWaterComposition,
  tapWater: MineralWaterComposition,
  saltOptions: SaltOptions,
): SaltRecipe => {
  const calc = new MineralCalculator(saltOptions);
  return calc.calculate(target, tapWater);
};

export const recipeToGrams = (recipe: SaltRecipe, liters: number): Record<string, number> => {
  const calc = new MineralCalculator();
  return calc.recipeToGrams(recipe, liters);
};

export const totalGrams = (grams: Record<string, number>): number =>
  Object.values(grams).reduce((sum, amount) => sum + amount, 0);
