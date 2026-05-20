/**
 * Guide de dégustation — descripteurs et roue aromatique.
 *
 * Principe : pour chaque dimension sensorielle, on propose un PANEL RESTREINT
 * (3-5 choix simples) toujours visible + un PANEL ÉTENDU (vocabulaire pro,
 * exhaustif) accessible via "+". L'objectif : ne pas effrayer le novice,
 * mais ne pas frustrer l'amateur curieux.
 *
 * Sources de vocabulaire : roue aromatique standard, vocabulaire INAO.
 */

// ============================================================
// ŒIL
// ============================================================

export type ColorFamily = {
  key: string;
  label: string;
  /** Couleur CSS pour la pastille */
  swatch: string;
  /** Pour quel type de vin (blanc / rouge / rosé / orange) */
  wineType: "blanc" | "rouge" | "rose" | "orange";
};

export const COLORS_PRIMARY: ColorFamily[] = [
  { key: "blanc-pale", label: "Blanc pâle", swatch: "#f5f0d0", wineType: "blanc" },
  { key: "blanc-dore", label: "Blanc doré", swatch: "#e8c860", wineType: "blanc" },
  { key: "blanc-ambre", label: "Ambré", swatch: "#c89030", wineType: "blanc" },
  { key: "rose-pale", label: "Rosé pâle", swatch: "#f6c8b8", wineType: "rose" },
  { key: "rose-saumon", label: "Rosé saumon", swatch: "#e8997a", wineType: "rose" },
  { key: "orange", label: "Orange ambré", swatch: "#d8843b", wineType: "orange" },
  { key: "rouge-clair", label: "Rouge clair", swatch: "#a04848", wineType: "rouge" },
  { key: "rouge-rubis", label: "Rouge rubis", swatch: "#7a1f2b", wineType: "rouge" },
  { key: "rouge-grenat", label: "Rouge grenat", swatch: "#5a1822", wineType: "rouge" },
  { key: "pourpre", label: "Pourpre profond", swatch: "#3a0e1c", wineType: "rouge" },
];

export const COLOR_NUANCES_EXTENDED = [
  "Reflets verts",
  "Reflets dorés",
  "Reflets orangés",
  "Reflets violets",
  "Reflets tuilés",
  "Reflets bruns",
  "Reflets cuivre",
  "Reflets bronze",
];

export const INTENSITE = [
  { key: "pale", label: "Pâle" },
  { key: "soutenue", label: "Soutenue" },
  { key: "profonde", label: "Profonde" },
];

export const BRILLANCE = [
  { key: "limpide", label: "Limpide" },
  { key: "brillant", label: "Brillant" },
  { key: "trouble", label: "Trouble" },
  { key: "mat", label: "Mat" },
];

export const LARMES = [
  { key: "fines-rapides", label: "Fines et rapides" },
  { key: "fines-lentes", label: "Fines et lentes" },
  { key: "epaisses-lentes", label: "Épaisses et lentes" },
];

// ============================================================
// NEZ — Roue aromatique
// ============================================================

export type AromaFamily = {
  key: string;
  label: string;
  emoji: string;
  /** Couleur d'accent pour le tag */
  accent: string;
  /** Liste restreinte (5-7) — visible direct */
  primary: string[];
  /** Liste étendue (10-20) — visible via + */
  extended: string[];
};

export const AROMA_FAMILIES: AromaFamily[] = [
  {
    key: "fruits-rouges",
    label: "Fruits rouges",
    emoji: "🍒",
    accent: "#a8424f",
    primary: ["Cerise", "Fraise", "Framboise", "Groseille", "Cassis"],
    extended: [
      "Cerise burlat",
      "Cerise griotte",
      "Fraise des bois",
      "Mûre",
      "Myrtille",
      "Cranberry",
      "Confiture de fruits rouges",
      "Cassis frais",
      "Liqueur de framboise",
    ],
  },
  {
    key: "fruits-noirs",
    label: "Fruits noirs",
    emoji: "🫐",
    accent: "#3a1a2e",
    primary: ["Mûre", "Myrtille", "Cassis", "Prune", "Figue"],
    extended: [
      "Confiture de mûre",
      "Prune noire",
      "Pruneau d'Agen",
      "Figue séchée",
      "Cassis confit",
      "Sureau noir",
      "Réglisse",
    ],
  },
  {
    key: "fruits-blancs",
    label: "Fruits blancs",
    emoji: "🍐",
    accent: "#c8d4a8",
    primary: ["Pomme", "Poire", "Pêche", "Abricot", "Coing"],
    extended: [
      "Pomme verte",
      "Pomme reinette",
      "Poire williams",
      "Pêche de vigne",
      "Pêche blanche",
      "Abricot mûr",
      "Mirabelle",
      "Quetsche",
      "Nectarine",
    ],
  },
  {
    key: "fruits-jaunes",
    label: "Agrumes & jaunes",
    emoji: "🍋",
    accent: "#e8c860",
    primary: ["Citron", "Pamplemousse", "Orange", "Mandarine", "Ananas"],
    extended: [
      "Zeste de citron",
      "Citron vert / lime",
      "Pomelo",
      "Bergamote",
      "Mandarine confite",
      "Cédrat",
      "Yuzu",
      "Marmelade d'orange",
    ],
  },
  {
    key: "fruits-exotiques",
    label: "Fruits exotiques",
    emoji: "🥭",
    accent: "#e8a040",
    primary: ["Mangue", "Litchi", "Fruit de la passion", "Goyave", "Banane"],
    extended: [
      "Papaye",
      "Mangue mûre",
      "Lychee frais",
      "Maracuja",
      "Ananas Victoria",
      "Noix de coco",
      "Fruit du dragon",
    ],
  },
  {
    key: "fleurs",
    label: "Fleurs",
    emoji: "🌸",
    accent: "#d8a8c8",
    primary: ["Violette", "Rose", "Acacia", "Aubépine", "Chèvrefeuille"],
    extended: [
      "Tilleul",
      "Sureau blanc",
      "Jasmin",
      "Fleur d'oranger",
      "Fleur de vigne",
      "Pivoine",
      "Iris",
      "Lavande",
      "Camomille",
      "Genêt",
    ],
  },
  {
    key: "vegetal",
    label: "Végétal & herbacé",
    emoji: "🌿",
    accent: "#7a8b5a",
    primary: ["Herbe coupée", "Menthe", "Poivron vert", "Foin", "Sous-bois"],
    extended: [
      "Buis",
      "Asperge",
      "Artichaut",
      "Eucalyptus",
      "Pin",
      "Thym",
      "Romarin",
      "Garrigue",
      "Champignon",
      "Truffe noire",
      "Fougère",
      "Humus",
    ],
  },
  {
    key: "epices",
    label: "Épices",
    emoji: "🌶️",
    accent: "#a04830",
    primary: ["Poivre noir", "Cannelle", "Vanille", "Réglisse", "Anis"],
    extended: [
      "Poivre blanc",
      "Poivre rose",
      "Poivre Sichuan",
      "Clou de girofle",
      "Gingembre",
      "Muscade",
      "Curry",
      "Cardamome",
      "Safran",
      "Genièvre",
    ],
  },
  {
    key: "boise",
    label: "Boisé & torréfié",
    emoji: "🪵",
    accent: "#7a5230",
    primary: ["Vanille", "Pain grillé", "Tabac blond", "Café", "Chocolat"],
    extended: [
      "Cèdre",
      "Santal",
      "Bois neuf",
      "Coco grillée",
      "Caramel",
      "Praline",
      "Brioche grillée",
      "Cacao",
      "Moka",
      "Fumée",
      "Goudron",
    ],
  },
  {
    key: "mineral",
    label: "Minéral",
    emoji: "🪨",
    accent: "#7a8090",
    primary: ["Craie", "Silex", "Pierre à fusil", "Iode", "Coquille d'huître"],
    extended: [
      "Graphite",
      "Embruns",
      "Hydrocarbure",
      "Pétrole (Riesling)",
      "Schiste mouillé",
      "Granit",
      "Argile",
      "Encre",
    ],
  },
  {
    key: "patisserie",
    label: "Pâtisserie & miel",
    emoji: "🍯",
    accent: "#e8b860",
    primary: ["Miel", "Brioche", "Beurre frais", "Pain d'épices", "Noisette"],
    extended: [
      "Amande grillée",
      "Pistache",
      "Biscuit",
      "Pâte d'amande",
      "Cire d'abeille",
      "Caramel au beurre",
      "Praliné",
      "Frangipane",
    ],
  },
  {
    key: "animal",
    label: "Animal & complexe",
    emoji: "🍖",
    accent: "#5a3a30",
    primary: ["Cuir", "Gibier", "Fourrure", "Viande grillée", "Champignon"],
    extended: [
      "Cuir vieux",
      "Sous-bois",
      "Sang frais",
      "Venaison",
      "Bouillon",
      "Jus de viande",
      "Écurie",
      "Cave humide",
    ],
  },
];

// ============================================================
// BOUCHE
// ============================================================

export const ATTAQUE = [
  { key: "douce", label: "Douce" },
  { key: "vive", label: "Vive" },
  { key: "chaude", label: "Chaude" },
  { key: "explosive", label: "Explosive" },
];

export const CORPS = [
  { key: "leger", label: "Léger" },
  { key: "moyen", label: "Moyen" },
  { key: "charnu", label: "Charnu" },
  { key: "charpente", label: "Charpenté" },
];

export const ACIDITE = [
  { key: "faible", label: "Faible" },
  { key: "fraiche", label: "Fraîche" },
  { key: "vive", label: "Vive" },
  { key: "tranchante", label: "Tranchante" },
];

export const TANINS = [
  { key: "absents", label: "Absents", description: "Vin blanc / rosé typique" },
  { key: "soyeux", label: "Soyeux" },
  { key: "presents", label: "Présents" },
  { key: "serres", label: "Serrés" },
  { key: "astringents", label: "Astringents" },
];

export const SUCROSITE = [
  { key: "brut-sec", label: "Brut / Sec", description: "0-4 g/L" },
  { key: "demi-sec", label: "Demi-sec", description: "4-12 g/L" },
  { key: "moelleux", label: "Moelleux", description: "12-45 g/L" },
  { key: "liquoreux", label: "Liquoreux", description: "+ de 45 g/L" },
];

export const ALCOOL = [
  { key: "leger", label: "Léger", description: "< 11°" },
  { key: "modere", label: "Modéré", description: "11-13°" },
  { key: "chaud", label: "Chaud", description: "13-14°" },
  { key: "brulant", label: "Brûlant", description: "+ de 14°" },
];

export const FINALE = [
  { key: "courte", label: "Courte", description: "1-3 caudalies" },
  { key: "moyenne", label: "Moyenne", description: "4-6 caudalies" },
  { key: "longue", label: "Longue", description: "7-10 caudalies" },
  { key: "persistante", label: "Persistante", description: "+ de 10 caudalies" },
];

export const STEPS = ["oeil", "nez", "bouche", "verdict"] as const;
export type StepKey = (typeof STEPS)[number];

export const STEP_META: Record<StepKey, { num: number; label: string; emoji: string; helper: string }> = {
  oeil: { num: 1, label: "L'œil", emoji: "👁️", helper: "Lève ton verre, observe-le contre la lumière." },
  nez: { num: 2, label: "Le nez", emoji: "👃", helper: "Plonge ton nez, puis fais tourner — sens à nouveau." },
  bouche: { num: 3, label: "La bouche", emoji: "👄", helper: "Prends une bonne gorgée, mâche-la mentalement." },
  verdict: { num: 4, label: "Le verdict", emoji: "✨", helper: "Une note, quelques mots, et c'est dans ton carnet." },
};
