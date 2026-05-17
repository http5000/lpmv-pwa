/**
 * Module Terroir / Climat — typage et accès au contenu.
 * Source : module_2.json (bornes du musée), copié dans src/content/modules/climats.json
 * Images : /public/climats/<key>-climate.png — illustrations sketchy par climat
 * (extraites de la borne V6, même style que les icônes Module 1).
 */
import raw from "@/content/modules/climats.json";

/** Les 13 archétypes climatiques de la borne. */
export type ClimatKey =
  | "temperate_oceanic"
  | "warm_mediterranean"
  | "dry_continental"
  | "high_altitude"
  | "cool_humid"
  | "hot_dry_windy"
  | "cold_dry_windy"
  | "moderate_balanced"
  | "hot_humid_tropical"
  | "windy_balanced"
  | "cold_dry"
  | "hot_humid"
  | "composite";

export type ClimatFamily = "temperes" | "chauds" | "froids" | "speciaux";

export type Climat = {
  key: ClimatKey;
  /** Slug URL (kebab-case français) */
  slug: string;
  /** Famille pour regrouper visuellement la liste sur mobile */
  family: ClimatFamily;
  title: string;
  subtitle: string;
  growth: string;
  ripening: string;
  style: string;
  fruity: string;
  /** Couleur d'accent par climat (calée sur le ton de l'illustration) */
  accent: string;
  /** Chemin de l'illustration */
  image: string;
  /** Alt text */
  alt: string;
};

const FAMILIES: Record<ClimatKey, ClimatFamily> = {
  temperate_oceanic: "temperes",
  moderate_balanced: "temperes",
  windy_balanced: "temperes",
  warm_mediterranean: "chauds",
  hot_dry_windy: "chauds",
  hot_humid: "chauds",
  hot_humid_tropical: "chauds",
  cool_humid: "froids",
  cold_dry_windy: "froids",
  cold_dry: "froids",
  dry_continental: "speciaux",
  high_altitude: "speciaux",
  composite: "speciaux",
};

const ACCENTS: Record<ClimatKey, string> = {
  temperate_oceanic: "#7a9c8c",       // vert d'eau
  moderate_balanced: "#a3b58a",       // vert tendre
  windy_balanced: "#9cb4c6",          // bleu doux
  warm_mediterranean: "#e3a04e",      // orange chaud
  hot_dry_windy: "#c97b3c",           // terre brûlée
  hot_humid: "#b9854f",               // ambre
  hot_humid_tropical: "#d18d6b",      // pêche chaud
  cool_humid: "#6a8a9c",              // bleu froid
  cold_dry_windy: "#7d96a8",          // gris bleu
  cold_dry: "#8e9aa6",                // gris froid
  dry_continental: "#a07a55",         // brun continental
  high_altitude: "#94a3c2",           // bleu altitude
  composite: "#8b7ca0",               // mauve composite
};

/** Slug FR pour URL. */
const SLUGS: Record<ClimatKey, string> = {
  temperate_oceanic: "oceanique-tempere",
  warm_mediterranean: "mediterraneen-chaud",
  dry_continental: "continental-sec",
  high_altitude: "altitude",
  cool_humid: "frais-humide",
  hot_dry_windy: "chaud-sec-venteux",
  cold_dry_windy: "froid-sec-venteux",
  moderate_balanced: "modere-equilibre",
  hot_humid_tropical: "tropical-chaud-humide",
  windy_balanced: "venteux-equilibre",
  cold_dry: "froid-sec",
  hot_humid: "chaud-humide",
  composite: "composite",
};

/** Mapping clé JSON → nom de fichier image dans /public/climats/ */
const IMAGE_FILES: Record<ClimatKey, string> = {
  temperate_oceanic: "temperate-oceanic-climate.png",
  warm_mediterranean: "warm-mediterranean-climate.png",
  dry_continental: "dry-continental-climate.png",
  high_altitude: "high-altitude-climate.png",
  cool_humid: "cool-humid-climate.png",
  hot_dry_windy: "hot-dry-windy-climate.png",
  cold_dry_windy: "cool-dry-windy-climate.png",
  moderate_balanced: "moderate-balanced-climate.png",
  hot_humid_tropical: "hot-humid-tropical-climate.png",
  windy_balanced: "windy-balanced-climate.png",
  cold_dry: "cold-dry-climate.png",
  hot_humid: "hot-humid-climate.png",
  composite: "composite-climate.png",
};

export type ClimatsContent = {
  title: string;
  subtitle: string;
  touchRule: string;
  info: {
    title: string;
    firstMain: string;
    firstSecond: string;
    second: string;
    thirdMain: string;
    thirdBold: string;
  };
  labels: {
    growth: string;
    ripening: string;
    style: string;
    fruity: string;
  };
  families: {
    key: ClimatFamily;
    label: string;
    description: string;
  }[];
  climats: Climat[];
};

const FAMILY_LABELS: Record<ClimatFamily, { label: string; description: string }> = {
  temperes: {
    label: "Tempérés",
    description: "L'équilibre. Ni trop chaud, ni trop froid.",
  },
  chauds: {
    label: "Chauds",
    description: "Le soleil au pouvoir. Vins riches, parfois écrasants.",
  },
  froids: {
    label: "Froids",
    description: "Tension et acidité. Le risque de maturité incomplète.",
  },
  speciaux: {
    label: "Singuliers",
    description: "Continental, altitude, composite — les terroirs hors normes.",
  },
};

function buildContent(): ClimatsContent {
  // description_block contient un mélange de labels (strings) et de profils (objects).
  // On extrait séparément les labels (chaînes) et les entrées climat (objets).
  const block = raw.description_block as Record<string, string | Record<string, string>>;
  const ids = Object.keys(IMAGE_FILES) as ClimatKey[];

  const climats: Climat[] = ids.map((key) => {
    const entry = block[key] as Record<string, string>;
    return {
      key,
      slug: SLUGS[key],
      family: FAMILIES[key],
      title: entry.title,
      subtitle: entry.subtitle,
      growth: entry.growth,
      ripening: entry.ripening,
      style: entry.style,
      fruity: entry.fruity,
      accent: ACCENTS[key],
      image: `/climats/${IMAGE_FILES[key]}`,
      alt: `Illustration du climat ${entry.title.toLowerCase()}`,
    };
  });

  return {
    title: raw.title,
    subtitle: raw.subtitle,
    touchRule: raw.touchRule,
    info: {
      title: raw.info.title,
      firstMain: raw.info.first.main,
      firstSecond: raw.info.first.second,
      second: raw.info.second,
      thirdMain: raw.info.third.main,
      thirdBold: raw.info.third.bold,
    },
    labels: {
      growth: block.growth as string,
      ripening: block.ripening as string,
      style: block.style as string,
      fruity: "Style aromatique",
    },
    families: (Object.keys(FAMILY_LABELS) as ClimatFamily[]).map((key) => ({
      key,
      label: FAMILY_LABELS[key].label,
      description: FAMILY_LABELS[key].description,
    })),
    climats,
  };
}

const content = buildContent();

export function getClimatsContent(): ClimatsContent {
  return content;
}

export function getClimatBySlug(slug: string): Climat | undefined {
  return content.climats.find((c) => c.slug === slug);
}

export function getAllClimatSlugs(): string[] {
  return content.climats.map((c) => c.slug);
}
