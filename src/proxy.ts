/**
 * Next.js 16 — Proxy (ex-Middleware) pour le refresh de session Supabase.
 *
 * Ce fichier remplace l'ancien `middleware.ts` (Next 16 a déprécié cette
 * convention au profit de `proxy.ts`, runtime Node.js). Voir
 * node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md.
 *
 * Le rôle : refresh automatique du token Supabase à chaque navigation,
 * pour que les Server Components / Server Actions trouvent une session
 * valide. La logique cookie suit le pattern @supabase/ssr.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Force le refresh si le token est expiré. On utilise getUser() qui contacte
  // Auth (sûr pour les décisions d'autorisation). Le résultat n'est pas utilisé
  // ici — il sert juste de side-effect pour le refresh + écriture cookies.
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    // On ignore les assets statiques, images optimisées, fichiers images directs.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
