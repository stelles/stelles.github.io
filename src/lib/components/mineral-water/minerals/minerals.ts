export interface MineralWaterComposition {
  readonly calcium: number;
  readonly magnesium: number;
  readonly sodium: number;
  readonly potassium: number;
  readonly bicarbonate: number;
  readonly sulfate: number;
  readonly chloride: number;
  readonly nitrate: number;
}

export type MineralNames = keyof MineralWaterComposition;
export type MineralWaterUpdate = Partial<MineralWaterComposition>;

export interface Mineral {
  readonly name: string;
  readonly formula: string;
  readonly formulaHtml: string;
  readonly molarMass: number;
}

export const MINERALS = {
  calcium: {
    name: "Calcium",
    formula: "Ca",
    formulaHtml: "Ca",
    molarMass: 40.078,
  },
  magnesium: {
    name: "Magnesium",
    formula: "Mg",
    formulaHtml: "Mg",
    molarMass: 24.305,
  },
  sodium: {
    name: "Sodium",
    formula: "Na",
    formulaHtml: "Na",
    molarMass: 22.99,
  },
  potassium: {
    name: "Potassium",
    formula: "K",
    formulaHtml: "K",
    molarMass: 39.098,
  },
  bicarbonate: {
    name: "Bicarbonate",
    formula: "HCO3-",
    formulaHtml: "HCO<sub>3</sub>-",
    molarMass: 61.01,
  },
  sulfate: {
    name: "Sulfate",
    formula: "SO4--",
    formulaHtml: "SO<sub>4</sub><sup>--</sup>",
    molarMass: 96.06,
  },
  chloride: {
    name: "Chloride",
    formula: "Cl-",
    formulaHtml: "Cl<sup>-</sup>",
    molarMass: 35.45,
  },
  nitrate: {
    name: "Nitrate",
    formula: "NO3-",
    formulaHtml: "NO<sub>3</sub><sup>-</sup>",
    molarMass: 62.0049,
  },
} as const satisfies Record<string, Mineral>;

export type MineralKey = keyof typeof MINERALS;
export type MineralDefinition = (typeof MINERALS)[MineralKey];
export type MineralFormula = MineralDefinition["formula"];

export const ION_MINERALS = Object.values(MINERALS) as readonly MineralDefinition[];

export type MineralField = {
  key: MineralNames;
  label: string;
  min?: number;
  step?: number;
};

export const TARGET_FIELDS: MineralField[] = (
  Object.entries(MINERALS) as [MineralNames, MineralDefinition][]
).map(([key, mineral]) => ({
  key,
  label: mineral.formulaHtml,
}));

export const EMPTY_COMPOSITION: MineralWaterComposition = {
  calcium: 0,
  magnesium: 0,
  sodium: 0,
  potassium: 0,
  bicarbonate: 0,
  sulfate: 0,
  chloride: 0,
  nitrate: 0,
};

export const normalizeComposition = (
  composition: MineralWaterComposition,
): MineralWaterComposition => ({
  calcium: Math.max(0, composition.calcium),
  magnesium: Math.max(0, composition.magnesium),
  sodium: Math.max(0, composition.sodium),
  potassium: Math.max(0, composition.potassium),
  bicarbonate: Math.max(0, composition.bicarbonate),
  sulfate: Math.max(0, composition.sulfate),
  chloride: Math.max(0, composition.chloride),
  nitrate: Math.max(0, composition.nitrate),
});
