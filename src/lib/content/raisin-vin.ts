/**
 * Module Vinification / Du raisin au vin.
 * Source : public_locales_fr_module_9.json
 *
 * 4 chemins parallèles (rouge / blanc / rosé / orange), 7 à 8 étapes chacun.
 * Chaque étape : title, text (résumé), details (approfondissement), didYouKnow (anecdote).
 */
import raw from "@/content/modules/raisin-vin.json";

export type WineType = "red" | "white" | "rose" | "orange";

export type Step = {
  id: string;
  title: string;
  text: string;
  details: string;
  didYouKnow: string;
  /** Chemin de l'image (extraite de la borne V6) */
  image: string;
};

export type Path = {
  key: WineType;
  label: string;
  /** Phrase courte d'ambiance */
  tagline: string;
  /** Couleur signature pour l'UI */
  accent: string;
  /** Slug pour fragment URL */
  slug: string;
  steps: Step[];
};

export type RaisinVinContent = {
  start: { title: string; content: string; touchRule: string; bottomTouchRule: string };
  paths: Path[];
};

const META: Record<WineType, { label: string; tagline: string; accent: string; slug: string }> = {
  red: {
    label: "Vin rouge",
    tagline: "Macération longue, tanins, garde.",
    accent: "#7A1F2B",
    slug: "rouge",
  },
  white: {
    label: "Vin blanc",
    tagline: "Pressurage direct, fraîcheur, fruit pur.",
    accent: "#C6A15B",
    slug: "blanc",
  },
  rose: {
    label: "Vin rosé",
    tagline: "Brève macération, élégance, légèreté.",
    accent: "#D17A8D",
    slug: "rose",
  },
  orange: {
    label: "Vin orange",
    tagline: "Cépages blancs macérés comme un rouge.",
    accent: "#D88A3B",
    slug: "orange",
  },
};

function buildPath(key: WineType): Path {
  const data = (raw as Record<string, unknown>)[key] as {
    label: string;
    items: Record<string, { title: string; text: string; details: string; didYouKnow: string }>;
  };
  const steps: Step[] = Object.entries(data.items)
    .map(([id, v]) => ({
      id,
      title: v.title,
      text: v.text,
      details: v.details,
      didYouKnow: v.didYouKnow,
      image: `/raisin-vin/${key}/${id}.png`,
    }))
    .sort((a, b) => Number(a.id) - Number(b.id));
  return {
    key,
    ...META[key],
    label: data.label ?? META[key].label,
    steps,
  };
}

export function getRaisinVinContent(): RaisinVinContent {
  return {
    start: (raw as Record<string, unknown>).start as RaisinVinContent["start"],
    paths: (["red", "white", "rose", "orange"] as WineType[]).map(buildPath),
  };
}

export function getPathBySlug(slug: string): Path | undefined {
  return getRaisinVinContent().paths.find((p) => p.slug === slug);
}
