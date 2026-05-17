import { AppHeader } from "@/components/AppHeader";
import { LoginForm } from "@/components/account/LoginForm";
import { AccountStatus } from "@/components/account/AccountStatus";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Mon compte — LPMV",
  description: "Connexion par lien magique pour synchroniser ton carnet de cave.",
};

type SearchParams = Promise<{ error?: string; next?: string }>;

export default async function ComptePage({ searchParams }: { searchParams: SearchParams }) {
  const { error, next } = await searchParams;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  return (
    <>
      <AppHeader crumbs={[{ label: "Mon compte" }]} />
      <main className="mx-auto w-full max-w-screen-sm flex-1 px-5 pb-16 pt-6">
        <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-or">Compte</p>
        <h1 className="mt-2 font-serif text-3xl leading-tight text-aubergine">
          {user ? "Tu es connecté" : "Garder ton carnet, partout"}
        </h1>
        <p className="mt-3 text-sm text-aubergine-soft">
          {user
            ? "Tes dégustations sont sauvegardées dans le cloud et synchronisées entre tes appareils."
            : "Ton carnet vit pour l'instant sur cet appareil. Connecte-toi pour le retrouver partout, sans le perdre."}
        </p>

        {error && !user && (
          <p
            role="alert"
            className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-800"
          >
            Connexion impossible : {decodeURIComponent(error)}
          </p>
        )}

        <section className="mt-8">
          {user ? <AccountStatus email={user.email ?? "(email inconnu)"} /> : <LoginForm next={next} />}
        </section>
      </main>
    </>
  );
}
