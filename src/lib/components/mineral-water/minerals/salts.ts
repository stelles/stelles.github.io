import type { Mineral } from "./minerals";

export interface Salt extends Mineral {
  readonly chemistryName: string;
}

export type SaltOptionItem = Salt & {
  readonly optional: boolean;
};

export const Salts = {
  tableSalt: {
    name: "Table salt",
    chemistryName: "Sodium chloride",
    formula: "NaCl",
    formulaHtml: "NaCl",
    molarMass: 58.44,
  },
  plasterOfParis: {
    name: "Plaster of Paris",
    chemistryName: "Calcium sulfate hemihydrate",
    formula: "CaSO4.0.5H2O",
    formulaHtml: "CaSO<sub>4</sub>·0.5H<sub>2</sub>O",
    molarMass: 145.15,
  },
  epsomSalt: {
    name: "Epsom salt",
    chemistryName: "Magnesium sulfate heptahydrate",
    formula: "MgSO4.7H2O",
    formulaHtml: "MgSO<sub>4</sub>·7H<sub>2</sub>O",
    molarMass: 246.47,
  },
  bakingSoda: {
    name: "Baking soda",
    chemistryName: "Sodium bicarbonate",
    formula: "NaHCO3",
    formulaHtml: "NaHCO<sub>3</sub>",
    molarMass: 84.01,
  },
  magnesiumHydroxide: {
    name: "Milk of magnesia",
    chemistryName: "Magnesium hydroxide",
    formula: "Mg(OH)2",
    formulaHtml: "Mg(OH)<sub>2</sub>",
    molarMass: 58.3197,
  },
  calciumHydroxide: {
    name: "Slaked lime",
    chemistryName: "Calcium hydroxide",
    formula: "Ca(OH)2",
    formulaHtml: "Ca(OH)<sub>2</sub>",
    molarMass: 74.093,
  },
  calciumCarbonate: {
    name: "Chalk",
    chemistryName: "Calcium carbonate",
    formula: "CaCO3",
    formulaHtml: "CaCO<sub>3</sub>",
    molarMass: 100.08,
  },
  potassiumBicarbonate: {
    name: "Potassium bicarbonate",
    chemistryName: "Potassium bicarbonate",
    formula: "KHCO3",
    formulaHtml: "KHCO<sub>3</sub>",
    molarMass: 100.115,
  },
  calciumNitrate: {
    name: "Saltpeter",
    chemistryName: "Calcium nitrate tetrahydrate",
    formula: "Ca(NO3)2.4H2O",
    formulaHtml: "Ca(NO<sub>3</sub>)<sub>2</sub>·4H<sub>2</sub>O",
    molarMass: 236.15,
  },
  magnesiumCarbonate: {
    name: "Magnesium carbonate",
    chemistryName: "Magnesium carbonate",
    formula: "MgCO3",
    formulaHtml: "MgCO<sub>3</sub>",
    molarMass: 84.313,
  },
  magnesiumChloride: {
    name: "Magnesium chloride",
    chemistryName: "Magnesium chloride hexahydrate",
    formula: "MgCl2.6H2O",
    formulaHtml: "MgCl<sub>2</sub>·6H<sub>2</sub>O",
    molarMass: 203.31,
  },
} as const satisfies Record<string, Salt>;

export type SaltKey = keyof typeof Salts;
export const SaltKeys = Object.keys(Salts) as SaltKey[];

export type SaltDefinition = (typeof Salts)[SaltKey];

// Salt record to mmol/L
export type SaltRecipe = Record<SaltKey, number>;
export type SaltOptions = Record<SaltKey, boolean>;

const SALT_LIST = Object.values(Salts) as readonly SaltDefinition[];

export const OPTIONAL_SALTS: SaltDefinition[] = [
  Salts.calciumNitrate,
  Salts.magnesiumChloride,
  Salts.potassiumBicarbonate,
  Salts.magnesiumCarbonate,
  Salts.calciumCarbonate,
];

export const REQUIRED_SALTS: SaltDefinition[] = SALT_LIST.filter(
  (salt) => !OPTIONAL_SALTS.includes(salt),
);

export const DEFAULT_SALT_OPTIONS: SaltOptions = Object.fromEntries(
  SaltKeys.map((key) => [key, !OPTIONAL_SALTS.includes(Salts[key] as SaltDefinition)]),
) as SaltOptions;

export const SALT_OPTION_LABELS: Record<SaltKey, string> = Object.fromEntries(
  SaltKeys.map((key) => [key, Salts[key].formulaHtml]),
) as Record<SaltKey, string>;
