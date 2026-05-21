import { AppHeader } from "@/components/AppHeader";
import { AccountContent } from "@/components/account/AccountContent";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = {
  title: "Mon compte — LPMV",
  description: "Connexion par lien magique pour synchroniser ton carnet de cave.",
};

/**
 * Shell statique de la page /compte.
 * Le contenu dynamique (état session, LoginForm vs AccountStatus, erreurs)
 * est délégué à <AccountContent> (Client Component) — compatible export
 * statique Capacitor et Vercel SSR.
 */
export default function ComptePage() {
  return (
    <>
      <AppHeader crumbs={[{ label: "Mon compte" }]} />
      <main className="mx-auto w-full max-w-screen-md flex-1 px-6 pb-24 pt-12 sm:px-10 sm:pt-16">
        <Reveal delay={0}>
          <AccountContent />
        </Reveal>
      </main>
    </>
  );
}
