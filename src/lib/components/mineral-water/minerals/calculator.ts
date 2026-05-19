import type { Mineral, MineralWaterComposition } from "./minerals";
import { ION_MINERALS, MINERALS } from "./minerals";
import type { SaltOptions, SaltRecipe } from "./salts";
import { DEFAULT_SALT_OPTIONS, SaltKeys, Salts } from "./salts";

const buildMolarMassLookup = (minerals: readonly Mineral[]) =>
  minerals.reduce<Record<string, number>>((acc, mineral) => {
    acc[mineral.formula] = mineral.molarMass;
    return acc;
  }, {});

const SALT_MOLAR_MASS = buildMolarMassLookup(Object.values(Salts));
const ION_MOLAR_MASS = buildMolarMassLookup(ION_MINERALS);

const createEmptyRecipe = (): SaltRecipe =>
  SaltKeys.reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {} as SaltRecipe);

export const calculateMineralDeficit = (
  targetWater: MineralWaterComposition,
  tapWater: MineralWaterComposition,
): MineralWaterComposition => {
  return {
    calcium: Math.max(0, targetWater.calcium - tapWater.calcium),
    magnesium: Math.max(0, targetWater.magnesium - tapWater.magnesium),
    sodium: Math.max(0, targetWater.sodium - tapWater.sodium),
    potassium: Math.max(0, targetWater.potassium - tapWater.potassium),
    bicarbonate: Math.max(0, targetWater.bicarbonate - tapWater.bicarbonate),
    sulfate: Math.max(0, targetWater.sulfate - tapWater.sulfate),
    chloride: Math.max(0, targetWater.chloride - tapWater.chloride),
    nitrate: Math.max(0, targetWater.nitrate - tapWater.nitrate),
  };
};

export class MineralCalculator {
  constructor(private saltOptions: SaltOptions = DEFAULT_SALT_OPTIONS) {}

  calculate(targetWater: MineralWaterComposition, tapWater: MineralWaterComposition): SaltRecipe {
    let calcium = Math.max(0, targetWater.calcium - tapWater.calcium) / MINERALS.calcium.molarMass;
    let magnesium =
      Math.max(0, targetWater.magnesium - tapWater.magnesium) / MINERALS.magnesium.molarMass;
    let sodium = Math.max(0, targetWater.sodium - tapWater.sodium) / MINERALS.sodium.molarMass;
    let potassium =
      Math.max(0, targetWater.potassium - tapWater.potassium) / MINERALS.potassium.molarMass;
    let bicarbonate =
      Math.max(0, targetWater.bicarbonate - tapWater.bicarbonate) / MINERALS.bicarbonate.molarMass;
    let sulfate = Math.max(0, targetWater.sulfate - tapWater.sulfate) / MINERALS.sulfate.molarMass;
    let chloride =
      Math.max(0, targetWater.chloride - tapWater.chloride) / MINERALS.chloride.molarMass;
    let nitrate = Math.max(0, targetWater.nitrate - tapWater.nitrate) / MINERALS.nitrate.molarMass;

    const recipe = createEmptyRecipe();

    // NaCl: sodium + chloride
    recipe.tableSalt = Math.min(sodium, chloride);
    sodium = Math.max(0, sodium - recipe.tableSalt);
    chloride = Math.max(0, chloride - recipe.tableSalt);

    // NaHCO3: remaining sodium + bicarbonate
    recipe.bakingSoda = Math.min(sodium, bicarbonate);
    sodium = Math.max(0, sodium - recipe.bakingSoda);
    bicarbonate = Math.max(0, bicarbonate - recipe.bakingSoda);

    // KHCO3 (optional): potassium + bicarbonate
    if (this.saltOptions.potassiumBicarbonate) {
      recipe.potassiumBicarbonate = Math.min(potassium, bicarbonate);
      potassium = Math.max(0, potassium - recipe.potassiumBicarbonate);
      bicarbonate = Math.max(0, bicarbonate - recipe.potassiumBicarbonate);
    }

    // MgCl2·6H2O (optional): magnesium + 2×chloride
    if (this.saltOptions.magnesiumChloride) {
      recipe.magnesiumChloride = chloride / 2;
      magnesium = Math.max(0, magnesium - recipe.magnesiumChloride);
      chloride = 0;
    }

    // Ca(NO3)2·4H2O (optional): calcium + 2×nitrate
    if (this.saltOptions.calciumNitrate) {
      recipe.calciumNitrate = nitrate / 2;
      calcium = Math.max(0, calcium - recipe.calciumNitrate);
      nitrate = 0;
    }

    // MgSO4·7H2O: magnesium + sulfate
    recipe.epsomSalt = Math.min(magnesium, sulfate);
    magnesium = Math.max(0, magnesium - recipe.epsomSalt);
    sulfate = Math.max(0, sulfate - recipe.epsomSalt);

    // CaSO4·0.5H2O: calcium + remaining sulfate
    recipe.plasterOfParis = Math.min(calcium, sulfate);
    calcium = Math.max(0, calcium - recipe.plasterOfParis);
    sulfate = Math.max(0, sulfate - recipe.plasterOfParis);

    // Mg(OH)2: magnesium + 2×bicarbonate (via alkalinity)
    recipe.magnesiumHydroxide = Math.min(magnesium, bicarbonate / 2);
    magnesium = Math.max(0, magnesium - recipe.magnesiumHydroxide);
    bicarbonate = Math.max(0, bicarbonate - recipe.magnesiumHydroxide * 2);

    // Ca(OH)2: calcium + 2×bicarbonate
    recipe.calciumHydroxide = Math.min(calcium, bicarbonate / 2);
    calcium = Math.max(0, calcium - recipe.calciumHydroxide);
    bicarbonate = Math.max(0, bicarbonate - recipe.calciumHydroxide * 2);

    // MgCO3 (optional): remaining magnesium + 2×bicarbonate
    if (this.saltOptions.magnesiumCarbonate) {
      recipe.magnesiumCarbonate = Math.min(magnesium, bicarbonate / 2);
      magnesium = Math.max(0, magnesium - recipe.magnesiumCarbonate);
      bicarbonate = Math.max(0, bicarbonate - recipe.magnesiumCarbonate * 2);
    }

    // CaCO3 (optional): remaining calcium + 2×bicarbonate
    if (this.saltOptions.calciumCarbonate) {
      recipe.calciumCarbonate = Math.min(calcium, bicarbonate / 2);
      calcium = Math.max(0, calcium - recipe.calciumCarbonate);
      bicarbonate = Math.max(0, bicarbonate - recipe.calciumCarbonate * 2);
    }

    return recipe;
  }

  recipeToGrams(recipe: SaltRecipe, liters: number = 1): Record<string, number> {
    return Object.entries(recipe).reduce<Record<string, number>>((acc, [salt, mmol]) => {
      const molarMass = SALT_MOLAR_MASS[salt] ?? 0;
      acc[salt] = (mmol * molarMass * liters) / 1000;
      return acc;
    }, {});
  }

  calculateActualComposition(recipe: SaltRecipe): MineralWaterComposition {
    const getAmount = (key: keyof SaltRecipe) => recipe[key] ?? 0;

    return {
      calcium:
        (getAmount("calciumNitrate") +
          getAmount("plasterOfParis") +
          getAmount("calciumHydroxide") +
          getAmount("calciumCarbonate")) *
        (ION_MOLAR_MASS["Ca"] ?? 0),
      magnesium:
        (getAmount("magnesiumChloride") +
          getAmount("epsomSalt") +
          getAmount("magnesiumHydroxide") +
          getAmount("magnesiumCarbonate")) *
        (ION_MOLAR_MASS["Mg"] ?? 0),
      sodium: (getAmount("tableSalt") + getAmount("bakingSoda")) * (ION_MOLAR_MASS["Na"] ?? 0),
      potassium: getAmount("potassiumBicarbonate") * (ION_MOLAR_MASS["K"] ?? 0),
      bicarbonate:
        (getAmount("bakingSoda") +
          getAmount("potassiumBicarbonate") +
          2 * getAmount("magnesiumHydroxide") +
          2 * getAmount("calciumHydroxide") +
          2 * getAmount("magnesiumCarbonate") +
          2 * getAmount("calciumCarbonate")) *
        (ION_MOLAR_MASS["HCO3-"] ?? 0),
      sulfate:
        (getAmount("epsomSalt") + getAmount("plasterOfParis")) * (ION_MOLAR_MASS["SO4--"] ?? 0),
      chloride:
        (getAmount("tableSalt") + 2 * getAmount("magnesiumChloride")) *
        (ION_MOLAR_MASS["Cl-"] ?? 0),
      nitrate: 2 * getAmount("calciumNitrate") * (ION_MOLAR_MASS["NO3-"] ?? 0),
    };
  }
}
