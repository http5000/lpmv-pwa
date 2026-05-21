import Link from "next/link";
import { AppHeader } from "@/components/AppHeader";
import { CarnetList } from "@/components/degustation/CarnetList";
import { AuthStatusPill } from "@/components/account/AuthStatusPill";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = {
  title: "Mon carnet de cave — Dégustation",
  description: "Toutes tes dégustations enregistrées, en un seul endroit.",
};

/**
 * Shell statique — compatible export Capacitor et Vercel SSR.
 * AuthStatusPill lit la session côté client (useSession), pas besoin
 * de createSupabaseServerClient ici.
 */
export default function CarnetPage() {
  return (
    <>
      <AppHeader
        crumbs={[
          { label: "Chapitres", href: "/chapitres" },
          { label: "Dégustation", href: "/chapitres/degustation" },
          { label: "Mon carnet" },
        ]}
      />
      <main className="mx-auto w-full max-w-screen-md flex-1 px-6 pb-24 pt-10 sm:px-10">
        <Reveal delay={0}>
          <div className="flex items-baseline justify-between gap-6">
            <h1 className="display max-w-[12ch]" style={{ fontSize: "var(--text-4xl)" }}>
              Mon carnet de cave.
            </h1>
            <Link
              href="/chapitres/degustation/guide"
              className="shrink-0 rounded-full bg-aubergine px-5 py-2.5 font-serif text-sm text-cream-light transition-all duration-200 hover:-translate-y-0.5 hover:bg-aubergine-deep active:translate-y-0 active:scale-[0.98]"
              style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
            >
              + Déguster
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-aubergine-soft">
            Chaque bouteille que tu prends le temps d&rsquo;écouter laisse une trace ici.
            Au fil des saisons, ton palais se dessine.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-6">
            <AuthStatusPill next="/chapitres/degustation/carnet" />
          </div>
        </Reveal>

        <section className="mt-12">
          <CarnetList />
        </section>
      </main>
    </>
  );
}
