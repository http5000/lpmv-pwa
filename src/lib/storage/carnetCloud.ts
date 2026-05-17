/**
 * Couche cloud du carnet — CRUD Supabase sur la table `tastings`.
 *
 * Ne fait AUCUNE persistence locale. C'est carnetSync.ts qui orchestre
 * cloud + local (offline-first). À n'appeler que depuis un Client Component
 * via un client browser Supabase.
 *
 * Schéma DB (cf supabase/migrations/20260518120000_create_tastings.sql) :
 *   id uuid, user_id uuid, wine_name text, vintage text, region text,
 *   rating numeric, payload jsonb, created_at timestamptz, updated_at timestamptz
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Tasting } from "./carnet";

type TastingRow = {
  id: string;
  user_id: string;
  wine_name: string;
  vintage: string | null;
  region: string | null;
  rating: number;
  payload: {
    oeil?: Tasting["oeil"];
    nez?: Tasting["nez"];
    bouche?: Tasting["bouche"];
    notes?: Tasting["notes"];
  };
  created_at: string;
  updated_at: string;
};

function rowToTasting(row: TastingRow): Tasting {
  return {
    id: row.id,
    createdAt: row.created_at,
    wineName: row.wine_name,
    vintage: row.vintage ?? undefined,
    region: row.region ?? undefined,
    rating: Number(row.rating),
    oeil: row.payload.oeil ?? {},
    nez: row.payload.nez ?? {},
    bouche: row.payload.bouche ?? {},
    notes: row.payload.notes,
  };
}

function tastingToRow(t: Tasting, userId: string): Omit<TastingRow, "updated_at"> {
  return {
    id: t.id,
    user_id: userId,
    wine_name: t.wineName ?? "",
    vintage: t.vintage ?? null,
    region: t.region ?? null,
    rating: t.rating ?? 0,
    payload: {
      oeil: t.oeil ?? {},
      nez: t.nez ?? {},
      bouche: t.bouche ?? {},
      notes: t.notes,
    },
    created_at: t.createdAt,
  };
}

export async function fetchCloudTastings(supabase: SupabaseClient, userId: string): Promise<Tasting[]> {
  const { data, error } = await supabase
    .from("tastings")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as TastingRow[]).map(rowToTasting);
}

export async function upsertCloudTasting(
  supabase: SupabaseClient,
  tasting: Tasting,
  userId: string,
): Promise<void> {
  const { error } = await supabase.from("tastings").upsert(tastingToRow(tasting, userId), {
    onConflict: "id",
  });
  if (error) throw error;
}

export async function deleteCloudTasting(supabase: SupabaseClient, id: string): Promise<void> {
  const { error } = await supabase.from("tastings").delete().eq("id", id);
  if (error) throw error;
}
