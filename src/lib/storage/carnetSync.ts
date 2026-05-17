/**
 * Couche sync du carnet — offline-first.
 *
 * Règles :
 *  - localStorage est la source de vérité de la lecture (instant, offline-OK).
 *  - À chaque mutation : on écrit en local d'abord, puis on pousse au cloud
 *    si une session existe (fire-and-forget, on log si ça échoue).
 *  - Au montage avec session active : on rapatrie le cloud, on remonte les
 *    entrées locales encore absentes (= migration auto premier login).
 *  - Au logout : on n'efface JAMAIS localStorage (règle non-négociable
 *    "ne jamais effacer le contenu user", cf CLAUDE.md §2).
 *
 * Aucune réconciliation par updated_at pour l'instant : v1 single-device
 * dominant. Les multi-devices auront le comportement attendu tant que les
 * écritures sont espacées dans le temps.
 */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  type Tasting,
  listTastings,
  saveTasting as saveLocal,
  deleteTasting as deleteLocal,
} from "./carnet";
import {
  fetchCloudTastings,
  upsertCloudTasting,
  deleteCloudTasting,
} from "./carnetCloud";

export type SyncState = "idle" | "syncing" | "synced" | "error";

export type UseCarnetResult = {
  tastings: Tasting[];
  loading: boolean;
  user: User | null;
  syncState: SyncState;
  syncError: string | null;
  save: (input: Omit<Tasting, "id" | "createdAt"> & { id?: string; createdAt?: string }) => Tasting;
  remove: (id: string) => void;
  /** Re-déclenche un sync manuel (utile pour bouton "Synchroniser"). */
  resync: () => Promise<void>;
};

export function useCarnet(): UseCarnetResult {
  const [tastings, setTastings] = useState<Tasting[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [syncState, setSyncState] = useState<SyncState>("idle");
  const [syncError, setSyncError] = useState<string | null>(null);
  const supabaseRef = useRef<ReturnType<typeof createSupabaseBrowserClient> | null>(null);

  if (!supabaseRef.current) supabaseRef.current = createSupabaseBrowserClient();

  // Sync cloud → local + push local-only → cloud.
  const reconcile = useCallback(async (signedInUser: User) => {
    const supabase = supabaseRef.current!;
    setSyncState("syncing");
    setSyncError(null);
    try {
      const local = listTastings();
      const cloud = await fetchCloudTastings(supabase, signedInUser.id);
      const cloudIds = new Set(cloud.map((t) => t.id));
      const localIds = new Set(local.map((t) => t.id));

      // 1. Pousser au cloud les entries locales pas encore là-haut (initial migration).
      const toPush = local.filter((t) => !cloudIds.has(t.id));
      await Promise.all(toPush.map((t) => upsertCloudTasting(supabase, t, signedInUser.id)));

      // 2. Ramener en local les entries cloud absentes localement.
      const merged: Tasting[] = [...local];
      for (const t of cloud) {
        if (!localIds.has(t.id)) {
          // saveLocal persist en localStorage.
          saveLocal(t);
          merged.push(t);
        }
      }

      // Trie au plus récent.
      merged.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      setTastings(merged);
      setSyncState("synced");
    } catch (e) {
      setSyncState("error");
      setSyncError(e instanceof Error ? e.message : String(e));
      console.error("[carnetSync] reconcile failed", e);
    }
  }, []);

  // Bootstrap : local immédiat + listener session.
  useEffect(() => {
    const supabase = supabaseRef.current!;
    let active = true;

    // 1. Affiche tout de suite ce qu'on a en local.
    setTastings(listTastings());
    setLoading(false);

    // 2. Récupère la session courante.
    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      const u = data.user ?? null;
      setUser(u);
      if (u) void reconcile(u);
    });

    // 3. Réagit aux signin / signout.
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      if (!active) return;
      const u = session?.user ?? null;
      setUser(u);
      if (u) void reconcile(u);
      else setSyncState("idle");
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [reconcile]);

  const save = useCallback<UseCarnetResult["save"]>((input) => {
    const t = saveLocal(input);
    setTastings(listTastings());
    if (user) {
      void upsertCloudTasting(supabaseRef.current!, t, user.id).catch((e) => {
        setSyncState("error");
        setSyncError(e instanceof Error ? e.message : String(e));
        console.error("[carnetSync] upsert failed", e);
      });
    }
    return t;
  }, [user]);

  const remove = useCallback<UseCarnetResult["remove"]>((id) => {
    deleteLocal(id);
    setTastings(listTastings());
    if (user) {
      void deleteCloudTasting(supabaseRef.current!, id).catch((e) => {
        setSyncState("error");
        setSyncError(e instanceof Error ? e.message : String(e));
        console.error("[carnetSync] delete failed", e);
      });
    }
  }, [user]);

  const resync = useCallback(async () => {
    if (user) await reconcile(user);
  }, [user, reconcile]);

  return { tastings, loading, user, syncState, syncError, save, remove, resync };
}

/**
 * Hook léger pour les pages qui n'ont besoin que d'écrire (ex: TastingGuide).
 * Pas de fetch cloud au montage — on suppose que le carnet a déjà été
 * réconcilié depuis la page /carnet (ou le sera à la prochaine visite).
 */
export function useSaveTasting() {
  const [user, setUser] = useState<User | null>(null);
  const supabaseRef = useRef<ReturnType<typeof createSupabaseBrowserClient> | null>(null);
  if (!supabaseRef.current) supabaseRef.current = createSupabaseBrowserClient();

  useEffect(() => {
    const supabase = supabaseRef.current!;
    let active = true;
    supabase.auth.getUser().then(({ data }) => {
      if (active) setUser(data.user ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      if (active) setUser(session?.user ?? null);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return useCallback<UseCarnetResult["save"]>((input) => {
    const t = saveLocal(input);
    if (user) {
      void upsertCloudTasting(supabaseRef.current!, t, user.id).catch((e) => {
        console.error("[carnetSync] upsert failed", e);
      });
    }
    return t;
  }, [user]);
}
