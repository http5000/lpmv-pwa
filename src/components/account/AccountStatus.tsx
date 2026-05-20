"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

/**
 * État compte signé in : email + accès rapide carnet + sign out.
 * Pas de carte décorative — typographie pure pour rester field-guide.
 */
export function AccountStatus({ email }: { email: string }) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.refresh();
    setSigningOut(false);
  }

  return (
    <div className="space-y-10">
      <div>
        <p className="font-serif text-sm italic text-champetre">Connecté en tant que</p>
        <p className="mt-1 font-serif text-aubergine" style={{ fontSize: "var(--text-xl)" }}>
          {email}
        </p>
      </div>

      <div className="flex flex-col items-start gap-5">
        <Link
          href="/chapitres/degustation/carnet"
          className="inline-flex items-center gap-3 rounded-full bg-aubergine px-7 py-3.5 font-serif text-base text-cream-light transition-all duration-200 hover:-translate-y-0.5 hover:bg-aubergine-deep active:translate-y-0 active:scale-[0.98]"
          style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
        >
          Voir mon carnet <span aria-hidden="true">→</span>
        </Link>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="inline-flex items-center gap-2 text-sm text-aubergine-soft underline-offset-4 transition-colors hover:text-aubergine hover:underline disabled:opacity-50"
        >
          {signingOut ? <Loader2 size={12} className="animate-spin" /> : <LogOut size={12} />}
          Se déconnecter
        </button>
      </div>

      <p className="max-w-[42ch] text-xs leading-relaxed text-champetre">
        La déconnexion n&rsquo;efface rien : ton carnet reste sur ce téléphone et dans le cloud.
      </p>
    </div>
  );
}
