/**
 * Module Terroir / Sols — typage et accès au contenu.
 * Source : public_locales_fr_module_1.json (bornes du musée), copié dans src/content/modules/sols.json
 *
 * Ne JAMAIS modifier le JSON source directement — il est exporté du référentiel du musée.
 * Si une correction est nécessaire, l'effectuer dans le contenu source du musée puis re-copier.
 */
import raw from "@/content/modules/sols.json";

export type SolId = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

export type Sol = {
  id: SolId;
  /** Slug URL-safe dérivé du shortTitle (sans accents, kebab-case) */
  slug: string;
  title: string;
  shortTitle: string;
  origin: string;
  texture: string;
  areas: string;
  climate: string;
  grape_varieties: string;
  profile: string[];
  appellations: string;
  advantages: string[];
  constraints: string[];
  /** Couleur signature pour l'UI (tampon visuel du sol) */
  color: string;
  /** Description courte du tampon pour l'accessibilité */
  swatch: string;
};

export type SolsContent = {
  title: string;
  didYouKnow: string;
  labels: {
    origin: string;
    texture: string;
    areas: string;
    climate: string;
    grape_varieties: string;
    profile: string;
    appellations: string;
    advantages: string;
    constraints: string;
  };
  sols: Sol[];
};

/** Couleurs/textures inspirées de la réalité de chaque sol (à raffiner avec photos réelles plus tard). */
const VISUAL_BY_ID: Record<SolId, { color: string; swatch: string; slug: string }> = {
  "1": { color: "#2b2520", swatch: "Pierre volcanique sombre", slug: "volcanique" },
  "2": { color: "#e8d8a8", swatch: "Sable doré et fin", slug: "sable-limons" },
  "3": { color: "#c9a878", swatch: "Argile beige rosée", slug: "argile-calcaire" },
  "4": { color: "#5a6470", swatch: "Schiste gris-bleu feuilleté", slug: "schiste" },
  "5": { color: "#f0ebe0", swatch: "Craie blanc cassé", slug: "craie" },
  "6": { color: "#b89888", swatch: "Granite rose-gris cristallin", slug: "granite" },
  "7": { color: "#a08868", swatch: "Galets roulés brun-gris", slug: "graviers-galets" },
  "8": { color: "#a04830", swatch: "Argile rouge ferreuse", slug: "argile-rouge" },
};

function buildContent(): SolsContent {
  const items = raw.items as Record<SolId, Omit<Sol, "id" | "slug" | "color" | "swatch">>;
  const ids = Object.keys(items) as SolId[];

  const sols: Sol[] = ids.map((id) => ({
    id,
    ...items[id],
    ...VISUAL_BY_ID[id],
  }));

  return {
    title: raw.title,
    didYouKnow: raw.didYouKnow,
    labels: raw.labels as SolsContent["labels"],
    sols,
  };
}

const content = buildContent();

export function getSolsContent(): SolsContent {
  return content;
}

export function getSolBySlug(slug: string): Sol | undefined {
  return content.sols.find((s) => s.slug === slug);
}

export function getAllSolSlugs(): string[] {
  return content.sols.map((s) => s.slug);
}
