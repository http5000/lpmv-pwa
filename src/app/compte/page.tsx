import { AppHeader } from "@/components/AppHeader";
import { LoginForm } from "@/components/account/LoginForm";
import { AccountStatus } from "@/components/account/AccountStatus";
import { Reveal } from "@/components/motion/Reveal";
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
      <main className="mx-auto w-full max-w-screen-md flex-1 px-6 pb-24 pt-12 sm:px-10 sm:pt-16">
        <Reveal delay={0}>
          <h1
            className="display max-w-[14ch]"
            style={{ fontSize: "var(--text-4xl)" }}
          >
            {user ? "Te voilà connecté." : "Garder ton carnet, partout."}
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-aubergine-soft">
            {user
              ? "Tes dégustations sont sauvegardées dans le cloud et synchronisées entre tes appareils. Tu peux te déconnecter sans rien perdre."
              : "Ton carnet vit pour l'instant sur ce téléphone. Connecte-toi pour le retrouver partout — sans mot de passe, juste un lien dans ta boîte mail."}
          </p>
        </Reveal>

        {error && !user && (
          <Reveal delay={0.16}>
            <p
              role="alert"
              className="mt-8 max-w-[46ch] border-l-0 bg-or/10 px-5 py-4 text-sm text-aubergine-deep"
            >
              Connexion impossible : {decodeURIComponent(error)}
            </p>
          </Reveal>
        )}

        <Reveal delay={0.22}>
          <section className="mt-12 max-w-[42ch]">
            {user ? <AccountStatus email={user.email ?? "(email inconnu)"} /> : <LoginForm next={next} />}
          </section>
        </Reveal>
      </main>
    </>
  );
}
