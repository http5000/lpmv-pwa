"use client";

/**
 * AccountContent — gère l'état dynamique de la page /compte.
 *
 * Extrait en Client Component pour être compatible avec l'export statique
 * Capacitor (pas de cookies/headers côté serveur). Sur Vercel, le résultat
 * est identique : client-side hydration immédiate après SSR du shell.
 */

import { Suspense } from "react";
import { useSession } from "@/lib/auth/useSession";
import { LoginForm } from "./LoginForm";
import { AccountStatus } from "./AccountStatus";
import { useSearchParams } from "next/navigation";

function AccountContentInner() {
  const { user, loading } = useSession();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const next = searchParams.get("next") ?? undefined;

  return (
    <>
      {/* Titre contextuel */}
      <h1
        className="display max-w-[14ch]"
        style={{ fontSize: "var(--text-4xl)" }}
      >
        {loading
          ? "Chargement…"
          : user
          ? "Te voilà connecté."
          : "Garder ton carnet, partout."}
      </h1>

      {/* Sous-titre contextuel */}
      <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-aubergine-soft">
        {user
          ? "Tes dégustations sont sauvegardées dans le cloud et synchronisées entre tes appareils. Tu peux te déconnecter sans rien perdre."
          : "Ton carnet vit pour l'instant sur ce téléphone. Connecte-toi pour le retrouver partout — sans mot de passe, juste un lien dans ta boîte mail."}
      </p>

      {/* Erreur auth */}
      {error && !user && (
        <p
          role="alert"
          className="mt-8 max-w-[46ch] bg-or/10 px-5 py-4 text-sm text-aubergine-deep"
        >
          Connexion impossible : {decodeURIComponent(error)}
        </p>
      )}

      {/* Formulaire ou état compte */}
      <section className="mt-12 max-w-[42ch]">
        {loading ? null : user ? (
          <AccountStatus email={user.email ?? "(email inconnu)"} />
        ) : (
          <LoginForm next={next} />
        )}
      </section>
    </>
  );
}

export function AccountContent() {
  // Suspense requis pour useSearchParams() dans un Client Component
  return (
    <Suspense>
      <AccountContentInner />
    </Suspense>
  );
}
