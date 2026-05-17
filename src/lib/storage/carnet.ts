/**
 * Carnet de dégustation — persistence localStorage v1.
 *
 * Stocke les dégustations enregistrées par l'utilisateur sur SON appareil.
 * Pas de cloud sync pour l'instant (sera Supabase + auth en v2 premium).
 *
 * Règle absolue (cf. memory/feedback_never_erase_user_data.md +
 * feedback_lpmv_ne_pas_denigrer_musee.md) : on ne supprime jamais une entrée
 * sans confirmation explicite. Tout ce qui est ajouté reste, même si la
 * structure de l'app change.
 */

export type Tasting = {
  /** UUID local v4 généré côté client */
  id: string;
  /** ISO timestamp de création */
  createdAt: string;
  /** Nom du vin (saisi par le user, peut être vide) */
  wineName: string;
  /** Millésime éventuel */
  vintage?: string;
  /** Région éventuelle */
  region?: string;
  /** Note /5 (0 à 5, demi-étoiles autorisées) */
  rating: number;
  /** Étape Œil */
  oeil: {
    color?: string;
    intensity?: string;
    brilliance?: string;
    nuances?: string[];
    larmes?: string;
  };
  /** Étape Nez — arômes détectés (keys "family:aroma") */
  nez: {
    intensity?: number; // 1-5
    aromas?: string[];
  };
  /** Étape Bouche */
  bouche: {
    attaque?: string;
    corps?: string;
    acidite?: string;
    tanins?: string;
    sucrosite?: string;
    alcool?: string;
    finale?: string;
    /** Arômes en rétro-olfaction (mêmes keys que nez.aromas) */
    retroAromas?: string[];
  };
  /** Notes libres */
  notes?: string;
};

const STORAGE_KEY = "lpmv.carnet.v1";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function listTastings(): Tasting[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Tasting[];
    if (!Array.isArray(parsed)) return [];
    // Tri du plus récent au plus ancien
    return [...parsed].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return [];
  }
}

export function getTasting(id: string): Tasting | undefined {
  return listTastings().find((t) => t.id === id);
}

export function saveTasting(t: Omit<Tasting, "id" | "createdAt"> & { id?: string; createdAt?: string }): Tasting {
  if (!isBrowser()) throw new Error("saveTasting must run client-side");
  const all = listTastingsRaw();
  const id = t.id ?? cryptoRandomId();
  const createdAt = t.createdAt ?? new Date().toISOString();
  const next: Tasting = { ...(t as Tasting), id, createdAt };
  const existingIndex = all.findIndex((x) => x.id === id);
  if (existingIndex >= 0) all[existingIndex] = next;
  else all.push(next);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return next;
}

/** Supprime une dégustation. À n'appeler qu'après confirmation user explicite. */
export function deleteTasting(id: string): void {
  if (!isBrowser()) return;
  const all = listTastingsRaw().filter((t) => t.id !== id);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

function listTastingsRaw(): Tasting[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Tasting[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function cryptoRandomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `t_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}
