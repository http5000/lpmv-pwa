/**
 * Module Terroir / Sols — typage et accès au contenu.
 * Source : public_locales_fr_module_1.json (bornes du musée), copié dans src/content/modules/sols.json
 * Images : /public/sols/item_N.png (thumb) et item_N_full.png (HD), extraites de l'app borne V6.
 * Icônes catégories : /public/sols/icons/*.png (style sketchy illustré, mêmes que la borne).
 *
 * Ne JAMAIS modifier le JSON source directement — il est exporté du référentiel du musée.
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
  /** Couleur signature fallback pour l'UI si l'image ne charge pas */
  color: string;
  /** Alt text de l'image */
  alt: string;
  /** Chemin de l'image thumb (détourée, ~150-200px) */
  image: string;
  /** Chemin de l'image full-res (détourée, ~600-800px) */
  imageFull: string;
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
  /** Icônes illustrées (style sketchy) par catégorie, à afficher à côté du label */
  icons: {
    origin: string;
    texture: string;
    areas: string;
    climate: string;
    grape_varieties: string;
    profile: string;
    appellations: string;
    advantages: string;
    constraints: string;
    info: string;
  };
  sols: Sol[];
};

/** Métadonnées visuelles complémentaires (couleur fallback + slug + alt). */
const META_BY_ID: Record<SolId, { color: string; slug: string; alt: string }> = {
  "1": { color: "#2b2520", slug: "volcanique",       alt: "Échantillon de pierre volcanique sombre" },
  "2": { color: "#e8d8a8", slug: "sable-limons",     alt: "Sable doré et fin" },
  "3": { color: "#c9a878", slug: "argile-calcaire",  alt: "Argile beige rosée" },
  "4": { color: "#5a6470", slug: "schiste",          alt: "Schiste gris-bleu feuilleté" },
  "5": { color: "#f0ebe0", slug: "craie",            alt: "Craie blanc cassé" },
  "6": { color: "#b89888", slug: "granite",          alt: "Granite rose-gris cristallin" },
  "7": { color: "#a08868", slug: "graviers-galets",  alt: "Galets roulés brun-gris" },
  "8": { color: "#a04830", slug: "argile-rouge",     alt: "Argile rouge ferreuse" },
};

const ICONS_PATH = "/sols/icons";
const ICONS = {
  // Note : pas d'icône dédiée pour origin/texture sur la borne — on réutilise areas (carte) pour origin
  // et info (ampoule) pour texture, en attendant des icônes spécifiques.
  origin: `${ICONS_PATH}/areas.png`,
  texture: `${ICONS_PATH}/info.png`,
  areas: `${ICONS_PATH}/areas.png`,
  climate: `${ICONS_PATH}/climate.png`,
  grape_varieties: `${ICONS_PATH}/grape_varieties.png`,
  profile: `${ICONS_PATH}/profile.png`,
  appellations: `${ICONS_PATH}/appellations.png`,
  advantages: `${ICONS_PATH}/advantages.png`,
  constraints: `${ICONS_PATH}/constraints.png`,
  info: `${ICONS_PATH}/info.png`,
};

function buildContent(): SolsContent {
  const items = raw.items as Record<SolId, Omit<Sol, "id" | "slug" | "color" | "alt" | "image" | "imageFull">>;
  const ids = Object.keys(items) as SolId[];

  const sols: Sol[] = ids.map((id) => ({
    id,
    ...items[id],
    ...META_BY_ID[id],
    image: `/sols/item_${id}.png`,
    imageFull: `/sols/item_${id}_full.png`,
  }));

  return {
    title: raw.title,
    didYouKnow: raw.didYouKnow,
    labels: raw.labels as SolsContent["labels"],
    icons: ICONS,
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
