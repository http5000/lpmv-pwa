/**
 * Callback magic link Supabase.
 *
 * Flux : user reçoit l'email, clique → atterrit ici avec ?code=...&next=...
 * On échange le code contre une session (cookies SSR posées par
 * createSupabaseServerClient), puis on redirige vers `next` ou /compte.
 *
 * Erreurs : si pas de code ou échec d'échange, on redirige vers /compte?error=...
 * pour donner un feedback explicite — jamais d'erreur opaque.
 *
 * Note Capacitor : quand CAPACITOR_BUILD=1, Next.js fait un export statique et ne
 * peut pas inclure de Route Handlers dynamiques. On force "force-static" pour que
 * le build passe — au build time il n'y a pas de code donc cette route retourne
 * une simple redirection vers /compte?error=missing_code, ce qui est un fichier
 * statique inoffensif. Dans l'app native, l'auth est gérée par CapacitorAuthHandler
 * via le deep link lpmv://auth/callback ; cette route n'est jamais utilisée.
 */
import { NextResponse, type NextRequest } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const nextPath = url.searchParams.get("next") ?? "/compte";

  // Garde-fou anti open-redirect : on ne suit `next` que s'il est relatif.
  const safeNext = nextPath.startsWith("/") && !nextPath.startsWith("//")
    ? nextPath
    : "/compte";

  if (!code) {
    return NextResponse.redirect(new URL("/compte?error=missing_code", url.origin));
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    const msg = encodeURIComponent(error.message);
    return NextResponse.redirect(new URL(`/compte?error=${msg}`, url.origin));
  }

  return NextResponse.redirect(new URL(safeNext, url.origin));
}
