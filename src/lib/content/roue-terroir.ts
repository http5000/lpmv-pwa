/**
 * Module Terroir / Roue Terroir — typage + accès au contenu.
 * Source : module_3.json (la version COMPLÈTE, pas public_locales qui a plein de TBD).
 * Concept : machine à sous à 3 rouleaux — Sol × Climat × Savoir-faire.
 * 8 × 7 × 5 = 280 combinaisons possibles, chacune produit un profil de vin.
 */
import raw from "@/content/modules/roue-terroir.json";

export type SoilKey =
  | "chalk"
  | "clay"
  | "schist"
  | "granite"
  | "volcanic"
  | "redClay"
  | "pebbles"
  | "sandsAndSilts";

export type ClimateKey =
  | "hotAndDry"
  | "coolOceanic"
  | "oceanic"
  | "temperate"
  | "dryContinental"
  | "dryMountain"
  | "mediterranean";

export type ManagementKey =
  | "balancedManagement"
  | "intensiveControl"
  | "minimalIntervention"
  | "patientAging"
  | "yieldFocused";

export type ReelItem<K extends string> = {
  key: K;
  label: string;
  /** Chemin de l'icône / image */
  icon: string;
};

export type ReelResult = {
  soil: ReelItem<SoilKey>;
  climate: ReelItem<ClimateKey>;
  management: ReelItem<ManagementKey>;
  description: string;
  acidity: string;
  alcohol: string;
  texture: string;
  aromas: string;
  grapeVarieties: string;
  /** "TBD" si non rempli côté contenu musée — on signale */
  isTbd: boolean;
};

const SOIL_ICONS: Record<SoilKey, { icon: string; itemId: string }> = {
  chalk: { icon: "/sols/item_5.png", itemId: "5" },
  clay: { icon: "/sols/item_3.png", itemId: "3" },
  schist: { icon: "/sols/item_4.png", itemId: "4" },
  granite: { icon: "/sols/item_6.png", itemId: "6" },
  volcanic: { icon: "/sols/item_1.png", itemId: "1" },
  redClay: { icon: "/sols/item_8.png", itemId: "8" },
  pebbles: { icon: "/sols/item_7.png", itemId: "7" },
  sandsAndSilts: { icon: "/sols/item_2.png", itemId: "2" },
};

const CLIMATE_ICONS: Record<ClimateKey, string> = {
  hotAndDry: "/climats/hot-dry-windy-climate.png",
  coolOceanic: "/climats/cool-humid-climate.png",
  oceanic: "/climats/temperate-oceanic-climate.png",
  temperate: "/climats/moderate-balanced-climate.png",
  dryContinental: "/climats/dry-continental-climate.png",
  dryMountain: "/climats/high-altitude-climate.png",
  mediterranean: "/climats/warm-mediterranean-climate.png",
};

const MANAGEMENT_ICONS: Record<ManagementKey, string> = {
  balancedManagement: "/shared-icons/diamond.svg",
  intensiveControl: "/shared-icons/magic-glass-of-wine.svg",
  minimalIntervention: "/shared-icons/hands-and-leave.svg",
  patientAging: "/shared-icons/barrel.svg",
  yieldFocused: "/shared-icons/grapes-in-box.svg",
};

const SOILS: SoilKey[] = [
  "chalk",
  "clay",
  "schist",
  "granite",
  "volcanic",
  "redClay",
  "pebbles",
  "sandsAndSilts",
];
const CLIMATES: ClimateKey[] = [
  "hotAndDry",
  "coolOceanic",
  "oceanic",
  "temperate",
  "dryContinental",
  "dryMountain",
  "mediterranean",
];
const MANAGEMENTS: ManagementKey[] = [
  "balancedManagement",
  "intensiveControl",
  "minimalIntervention",
  "patientAging",
  "yieldFocused",
];

type RawEntry = {
  description: string;
  acidity: string;
  alcohol: string;
  texture: string;
  aromas: string;
};

export type RoueContent = {
  title: string;
  subtitle: string;
  info: {
    title: string;
    main: { first: string; second: string; third: string };
    secondary: { title: string; first: string; second: string; third: string };
  };
  modal: {
    win: { title: string; message: string };
    examples: string;
    profile: {
      title: string;
      acidity: string;
      alcohol: string;
      texture: string;
      aromas: string;
    };
    grapeVarieties: { title: string };
  };
  soils: ReelItem<SoilKey>[];
  climates: ReelItem<ClimateKey>[];
  managements: ReelItem<ManagementKey>[];
};

function buildItems(): {
  soils: ReelItem<SoilKey>[];
  climates: ReelItem<ClimateKey>[];
  managements: ReelItem<ManagementKey>[];
} {
  const elements = raw.elements as Record<string, string>;
  return {
    soils: SOILS.map((k) => ({ key: k, label: elements[k], icon: SOIL_ICONS[k].icon })),
    climates: CLIMATES.map((k) => ({ key: k, label: elements[k], icon: CLIMATE_ICONS[k] })),
    managements: MANAGEMENTS.map((k) => ({ key: k, label: elements[k], icon: MANAGEMENT_ICONS[k] })),
  };
}

const items = buildItems();

export function getRoueContent(): RoueContent {
  return {
    title: raw.title,
    subtitle: raw.subtitle,
    info: raw.info as RoueContent["info"],
    modal: raw.modal as unknown as RoueContent["modal"],
    soils: items.soils,
    climates: items.climates,
    managements: items.managements,
  };
}

/** Lookup d'une combinaison dans le data set du musée. */
export function lookupCombo(
  soil: SoilKey,
  climate: ClimateKey,
  management: ManagementKey,
): ReelResult | null {
  // Accès dynamique au modal[soil][climate][management]
  // (le JSON musée stocke les combos directement dans modal.{soilKey}.{climateKey}.{managementKey})
  const modal = raw.modal as unknown as Record<string, unknown>;
  const grapes = (modal.grapeVarieties as Record<string, string>) ?? {};
  const soilNode = modal[soil] as Record<string, unknown> | undefined;
  if (!soilNode) return null;
  const climateNode = soilNode[climate] as Record<string, RawEntry> | undefined;
  if (!climateNode) return null;
  const entry = climateNode[management];
  if (!entry) return null;

  const soilItem = items.soils.find((s) => s.key === soil)!;
  const climateItem = items.climates.find((c) => c.key === climate)!;
  const managementItem = items.managements.find((m) => m.key === management)!;
  const isTbd = entry.description === "TBD" || !entry.description;

  return {
    soil: soilItem,
    climate: climateItem,
    management: managementItem,
    description: isTbd
      ? "Cette combinaison reste à explorer — le musée a encore à dire sur ce mariage."
      : entry.description,
    acidity: isTbd ? "—" : entry.acidity,
    alcohol: isTbd ? "—" : entry.alcohol,
    texture: isTbd ? "—" : entry.texture,
    aromas: isTbd ? "—" : entry.aromas,
    grapeVarieties: grapes[soil] ?? "—",
    isTbd,
  };
}

/** Compte les combinaisons vraiment renseignées (pas TBD) pour info user/stats. */
export function countRealCombos(): { total: number; real: number } {
  let real = 0;
  let total = 0;
  for (const s of SOILS) {
    for (const c of CLIMATES) {
      for (const m of MANAGEMENTS) {
        total++;
        const r = lookupCombo(s, c, m);
        if (r && !r.isTbd) real++;
      }
    }
  }
  return { total, real };
}
