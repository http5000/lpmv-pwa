/**
 * Hook React pour suivre l'état de session Supabase côté client.
 *
 * Renvoie { user, loading } et reste réactif aux signin/signout via
 * onAuthStateChange. À utiliser dans tout composant qui doit afficher
 * un état différent selon que l'user est connecté ou non.
 */
"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export type SessionState = {
  user: User | null;
  loading: boolean;
};

export function useSession(): SessionState {
  const [state, setState] = useState<SessionState>({ user: null, loading: true });

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      setState({ user: data.user ?? null, loading: false });
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      setState({ user: session?.user ?? null, loading: false });
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}
