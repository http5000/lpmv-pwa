/**
 * CapacitorAuthHandler — gère les deep links d'authentification dans l'app native.
 *
 * Flux (Capacitor uniquement) :
 *   1. User clique sur le magic link dans son email
 *   2. L'OS ouvre l'app via le scheme `lpmv://auth/callback?code=...`
 *   3. Ce composant capte le `appUrlOpen` et échange le code contre une session
 *   4. L'utilisateur est connecté sans quitter l'app
 *
 * Sur le web, ce composant n'a aucun effet (Capacitor n'est pas disponible).
 */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function CapacitorAuthHandler() {
  const router = useRouter();

  useEffect(() => {
    // N'agit que dans le contexte Capacitor natif
    let cleanup: (() => void) | undefined;

    (async () => {
      try {
        // Import dynamique — ne plante pas si Capacitor n'est pas dispo (web)
        const { App } = await import("@capacitor/app");
        const supabase = createSupabaseBrowserClient();

        const listener = await App.addListener("appUrlOpen", async (event) => {
          const url = new URL(event.url);

          // Détecter un callback d'auth Supabase
          // Schéma attendu : lpmv://auth/callback?code=xxx  ou  ?access_token=xxx
          if (
            url.host === "auth" &&
            url.pathname.startsWith("/callback")
          ) {
            const code = url.searchParams.get("code");
            const accessToken = url.hash
              ? new URLSearchParams(url.hash.slice(1)).get("access_token")
              : null;
            const refreshToken = url.hash
              ? new URLSearchParams(url.hash.slice(1)).get("refresh_token")
              : null;

            if (code) {
              // PKCE flow — échange le code contre une session
              const { error } = await supabase.auth.exchangeCodeForSession(code);
              if (!error) {
                router.replace("/compte");
              }
            } else if (accessToken && refreshToken) {
              // Implicit flow (legacy) — set session directement
              const { error } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
              });
              if (!error) {
                router.replace("/compte");
              }
            }
          }
        });

        cleanup = () => listener.remove();
      } catch {
        // Sur le web ou si Capacitor n'est pas disponible — silent fail
      }
    })();

    return () => cleanup?.();
  }, [router]);

  // Composant invisible — uniquement comportemental
  return null;
}
