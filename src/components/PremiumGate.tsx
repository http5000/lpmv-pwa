/**
 * PremiumGate — enveloppe le contenu payant.
 *
 * - Si l'utilisateur est premium : affiche children normalement.
 * - Si non-premium : floute le contenu et affiche un rideau avec CTA → /premium.
 * - Si loading : skeleton neutre pendant la vérification.
 *
 * Le contenu reste dans le DOM (bon pour le SEO) mais est visuellement masqué.
 */
"use client";

import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { usePremium } from "@/lib/auth/usePremium";

type PremiumGateProps = {
  children: React.ReactNode;
  /** Label affiché dans l'overlay (ex : "Chapitre Terroir") */
  label?: string;
  /**
   * Si true, contourne la gate et affiche children directement.
   * Utiliser pour les leçons gratuites ou tout contenu toujours accessible.
   */
  skip?: boolean;
};

export function PremiumGate({ children, label, skip = false }: PremiumGateProps) {
  const { isPremium, loading } = usePremium();
  const router = useRouter();

  // Contournement explicite — rendu direct, pas de check Supabase
  if (skip) return <>{children}</>;

  // Skeleton pendant la résolution
  if (loading) {
    return (
      <div className="mx-auto w-full max-w-screen-sm flex-1 px-5 pb-16 pt-6">
        <div className="space-y-4">
          <div className="h-4 w-32 animate-pulse rounded-full bg-aubergine/[0.08]" />
          <div className="h-8 w-3/4 animate-pulse rounded-full bg-aubergine/[0.08]" />
          <div className="mt-6 h-48 animate-pulse rounded-3xl bg-aubergine/[0.06]" />
          <div className="h-4 w-full animate-pulse rounded-full bg-aubergine/[0.06]" />
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-aubergine/[0.06]" />
          <div className="h-4 w-4/6 animate-pulse rounded-full bg-aubergine/[0.06]" />
        </div>
      </div>
    );
  }

  // Premium confirmé → accès direct
  if (isPremium) {
    return <>{children}</>;
  }

  // Non-premium → rideau
  return (
    <div className="relative flex-1 overflow-hidden">
      {/* Contenu flouté — reste dans le DOM pour le SEO */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none"
        style={{ filter: "blur(3px) brightness(0.97)", userSelect: "none" }}
      >
        {children}
      </div>

      {/* Rideau superposé */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-cream/90 px-8 py-12 text-center backdrop-blur-[2px]">
        {/* Icône cadenas */}
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: "var(--color-aubergine)" }}
        >
          <Lock
            size={26}
            strokeWidth={1.5}
            style={{ color: "var(--color-cream-light)" }}
          />
        </div>

        {/* Texte */}
        <div className="max-w-xs">
          <p className="font-serif text-2xl leading-snug text-aubergine">
            {label ? label : "Contenu Premium"}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-aubergine-soft">
            Débloquez l&rsquo;accès complet : les 5 chapitres, les accords
            mets&nbsp;&amp;&nbsp;vin, toutes les mini-leçons, lire une
            étiquette.
          </p>
        </div>

        {/* CTA principal */}
        <div className="flex flex-col items-center gap-2.5">
          <button
            onClick={() => router.push("/premium")}
            className="rounded-full px-9 py-3.5 font-serif text-sm shadow-md transition-all active:scale-[0.97]"
            style={{
              background: "var(--color-aubergine)",
              color: "var(--color-cream-light)",
            }}
          >
            Débloquer — 19,90&nbsp;€
          </button>

          <p className="text-xs text-aubergine-soft">
            Accès à vie · Paiement unique sécurisé
          </p>
        </div>

        {/* Lien connexion si déjà acheté */}
        <button
          onClick={() => router.push("/compte")}
          className="text-xs text-aubergine-soft underline-offset-4 hover:text-or hover:underline"
        >
          Déjà acheté ? Se connecter
        </button>
      </div>
    </div>
  );
}
