/**
 * Module Vigne / Anatomie d'un pied de vigne.
 * Source : module_4.json (bornes du musée), copié dans src/content/modules/anatomie.json
 * 6 organes (de la racine au bourgeon) avec quote poétique, didYouKnow, et contenu.
 */
import raw from "@/content/modules/anatomie.json";

export type OrganeKey = "feuille" | "raisin" | "rameau" | "tronc" | "racines" | "bourgeon";

export type Organe = {
  id: string; // "1" à "6" (ordre du JSON musée)
  key: OrganeKey;
  slug: string;
  title: string;
  /** Phrase poétique courte (sous-titre) */
  quote: string;
  /** Anecdote "Le saviez-vous" */
  didYouKnow: string;
  /** Paragraphes HTML (peut contenir <strong>) */
  content: string[];
  /** Emoji simple en attendant un SVG dédié */
  emoji: string;
  /** Numéro d'ordre suggéré dans le cycle (de la racine au bourgeon) */
  cycleOrder: number;
};

/** Mapping ID JSON musée → key sémantique + assets visuels */
const META: Record<string, {
  key: OrganeKey;
  slug: string;
  emoji: string;
  cycleOrder: number;
}> = {
  "1": { key: "feuille",  slug: "feuille",  emoji: "🍃", cycleOrder: 4 },
  "2": { key: "raisin",   slug: "raisin",   emoji: "🍇", cycleOrder: 6 },
  "3": { key: "rameau",   slug: "rameau",   emoji: "🌿", cycleOrder: 3 },
  "4": { key: "tronc",    slug: "tronc",    emoji: "🪵", cycleOrder: 2 },
  "5": { key: "racines",  slug: "racines",  emoji: "🌱", cycleOrder: 1 },
  "6": { key: "bourgeon", slug: "bourgeon", emoji: "✨", cycleOrder: 5 },
};

export type AnatomieContent = {
  title: string;
  organes: Organe[];
  /** Organes triés selon le cycle naturel de la sève (du sol au fruit) */
  organesByCycle: Organe[];
};

function buildContent(): AnatomieContent {
  const items = raw.items as Record<string, {
    title: string;
    quote: string;
    didYouKnow: string;
    content: string[];
  }>;

  const organes: Organe[] = Object.entries(items).map(([id, entry]) => ({
    id,
    ...META[id],
    title: entry.title,
    quote: entry.quote,
    didYouKnow: entry.didYouKnow,
    content: entry.content,
  }));

  const organesByCycle = [...organes].sort((a, b) => a.cycleOrder - b.cycleOrder);

  return {
    title: raw.title,
    organes,
    organesByCycle,
  };
}

const content = buildContent();

export function getAnatomieContent(): AnatomieContent {
  return content;
}

export function getOrganeBySlug(slug: string): Organe | undefined {
  return content.organes.find((o) => o.slug === slug);
}
