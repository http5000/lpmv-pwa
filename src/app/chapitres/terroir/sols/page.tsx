import Image from "next/image";
import Link from "next/link";
import { AppHeader } from "@/components/AppHeader";
import { SolsMap } from "@/components/sols/SolsMap";
import { getSolsContent } from "@/lib/content/sols";

export const metadata = {
  title: "Voyage au cœur des sols — Terroir",
  description: "Volcanique, craie, schiste… 8 sols, 8 personnalités de vin.",
};

export default function SolsPage() {
  const { title, didYouKnow, sols, labels } = getSolsContent();

  return (
    <>
      <AppHeader
        crumbs={[
          { label: "Chapitres", href: "/chapitres" },
          { label: "Terroir", href: "/chapitres/terroir" },
          { label: "Sols" },
        ]}
      />
      <main className="mx-auto w-full max-w-screen-sm flex-1 px-5 pb-16 pt-6">
        <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-or">
          Module 1 / 3 — Terroir
        </p>
        <h1 className="mt-2 font-serif text-3xl leading-tight text-aubergine">
          {title}
        </h1>

        {/* Intro lead — TOUJOURS visible (pas dans details collapsed) */}
        <section
          aria-labelledby="intro-sol-title"
          className="mt-5 rounded-2xl bg-aubergine/[0.05] p-5"
        >
          <h2
            id="intro-sol-title"
            className="font-serif text-lg leading-snug text-aubergine"
          >
            Le sol, première signature du vin
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-aubergine">
            Toutes les terres ne sont pas adaptées à la vigne. Là où elle peut
            pousser, <strong className="text-or">le sol joue un rôle décisif</strong>
            {" : "}il influence la vigueur de la plante, sa résistance, la vitesse
            de maturation des raisins et les arômes qui se développeront.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-aubergine-soft">
            Un même cépage exprimera une personnalité complètement différente
            s&rsquo;il pousse sur du granit, de la craie ou des cendres
            volcaniques.
          </p>
          <p className="mt-3 font-serif text-sm italic text-or">
            Avec le climat et le travail du vigneron, le sol est l&rsquo;un des
            trois piliers du terroir.
          </p>

          {/* Repli pour lire la version intégrale */}
          <details className="mt-4 border-t border-aubergine/15 pt-3">
            <summary className="cursor-pointer text-xs font-medium text-aubergine-soft underline-offset-4 hover:text-or hover:underline">
              Aller plus loin sur le rôle du sol
            </summary>
            <div
              className="prose prose-sm mt-3 max-w-none text-sm leading-relaxed text-aubergine [&_h2]:hidden [&_li]:my-0.5 [&_p]:my-2 [&_strong]:text-or"
              dangerouslySetInnerHTML={{ __html: didYouKnow }}
            />
          </details>
        </section>

        {/* Consigne tactile */}
        <p className="mt-7 text-center font-serif text-base italic text-aubergine-soft">
          Touche un sol pour découvrir sa personnalité.
        </p>

        {/* Carte de France interactive */}
        <section className="mt-3">
          <SolsMap sols={sols} labels={labels} />
        </section>

        {/* Vue liste de secours */}
        <details className="mt-10 rounded-xl border border-cream-dark bg-cream-light p-4">
          <summary className="cursor-pointer list-none font-serif text-sm text-or">
            Voir la liste complète des 8 sols
          </summary>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {sols.map((sol) => (
              <li key={sol.id}>
                <Link
                  href={`/chapitres/terroir/sols/${sol.slug}`}
                  className="group flex flex-col items-center rounded-xl border border-cream-dark bg-cream p-3 transition-all hover:border-or active:scale-[0.98]"
                >
                  <Image
                    src={sol.image}
                    alt={sol.alt}
                    width={70}
                    height={70}
                    className="h-16 w-16 object-contain"
                  />
                  <p className="mt-2 text-center font-serif text-xs leading-tight text-aubergine group-hover:text-or">
                    {sol.shortTitle}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </details>

        <div className="mt-12 text-center">
          <Link
            href="/chapitres/terroir"
            className="text-sm text-aubergine-soft underline-offset-4 hover:text-or hover:underline"
          >
            ← Retour au chapitre Terroir
          </Link>
        </div>
      </main>
    </>
  );
}
