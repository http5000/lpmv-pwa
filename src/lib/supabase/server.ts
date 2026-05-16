/**
 * Client Supabase pour usage côté serveur (Server Components, Route Handlers, Server Actions).
 * Gère les cookies pour la session auth.
 *
 * Si tu as besoin d'opérations admin (bypass RLS), utilise createSupabaseServiceClient
 * et garde le SERVICE_ROLE_KEY uniquement côté server.
 */
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // setAll appelé depuis un Server Component (lecture seule sur les cookies) — ignorer.
          }
        },
      },
    },
  );
}

/**
 * À utiliser UNIQUEMENT pour des opérations admin (back-office, migrations, webhooks).
 * Ne JAMAIS importer ce module dans un Client Component.
 */
export function createSupabaseServiceClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY manquante. Définir dans .env.local (jamais commiter).",
    );
  }
  // Import paresseux pour éviter d'embarquer côté browser par erreur.
  const { createClient } = require("@supabase/supabase-js");
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } },
  );
}
