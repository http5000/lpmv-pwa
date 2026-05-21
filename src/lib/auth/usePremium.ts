/**
 * Hook React — accès premium de l'utilisateur connecté.
 *
 * Lit `profiles.premium_access` dans Supabase après avoir récupéré la session.
 * Résultat mis en cache en mémoire pour la durée de la session (pas de requête
 * à chaque changement de page).
 *
 * Utilisation :
 *   const { isPremium, loading } = usePremium();
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "@/lib/auth/useSession";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type PremiumState = {
  isPremium: boolean;
  loading: boolean;
};

// Cache module-level : évite de requêter Supabase à chaque montage
const cache = new Map<string, boolean>();

export function usePremium(): PremiumState {
  const { user, loading: sessionLoading } = useSession();
  const fetchedRef = useRef(false);

  const [state, setState] = useState<PremiumState>({
    isPremium: false,
    loading: true,
  });

  useEffect(() => {
    // Attendre la résolution de la session
    if (sessionLoading) return;

    // Pas d'utilisateur → pas premium, fin
    if (!user) {
      setState({ isPremium: false, loading: false });
      fetchedRef.current = false;
      return;
    }

    // Déjà en cache pour cet userId
    if (cache.has(user.id)) {
      setState({ isPremium: cache.get(user.id)!, loading: false });
      return;
    }

    // Évite les appels multiples concurrents
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const supabase = createSupabaseBrowserClient();
    supabase
      .from("profiles")
      .select("premium_access")
      .eq("id", user.id)
      .single()
      .then(({ data, error }) => {
        const isPremium = !error && (data?.premium_access ?? false);
        cache.set(user.id, isPremium);
        setState({ isPremium, loading: false });
      });
  }, [user, sessionLoading]);

  return state;
}
