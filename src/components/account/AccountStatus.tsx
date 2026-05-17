"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Loader2, NotebookPen } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

/**
 * État compte côté client : affiche l'email + bouton se déconnecter.
 * Ne touche PAS au carnet localStorage (règle "jamais effacer le contenu user").
 */
export function AccountStatus({ email }: { email: string }) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    // Le proxy SSR rafraîchira la session sur la prochaine navigation.
    router.refresh();
    setSigningOut(false);
  }

  return (
    <div className="space-y-5">
      <div className="rounded-3xl bg-aubergine/[0.06] p-5">
        <p className="text-[10px] uppercase tracking-[0.22em] text-aubergine-soft">Connecté en tant que</p>
        <p className="mt-1 font-serif text-lg text-aubergine">{email}</p>
        <p className="mt-2 text-xs text-aubergine-soft">
          Tes dégustations sont synchronisées dans le cloud. Tu les retrouves sur tous tes appareils.
        </p>
      </div>

      <Link
        href="/chapitres/degustation/carnet"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-aubergine px-5 py-3 font-serif text-sm text-cream-light"
      >
        <NotebookPen size={14} /> Voir mon carnet
      </Link>

      <button
        type="button"
        onClick={handleSignOut}
        disabled={signingOut}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-cream-dark px-5 py-2.5 text-xs text-aubergine-soft transition-colors hover:text-aubergine disabled:opacity-50"
      >
        {signingOut ? <Loader2 size={12} className="animate-spin" /> : <LogOut size={12} />}
        Se déconnecter
      </button>

      <p className="text-[11px] leading-relaxed text-aubergine-soft">
        La déconnexion n&rsquo;efface rien : ton carnet reste sur cet appareil et dans le cloud.
      </p>
    </div>
  );
}
