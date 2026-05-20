import Link from "next/link";
import { AppHeader } from "@/components/AppHeader";
import { Reveal } from "@/components/motion/Reveal";
import { CHAPITRES } from "@/lib/chapitres";

export const metadata = {
  title: "Les chapitres — Le Petit Musée du Vin",
};

/**
 * Liste des 5 chapitres en table-of-contents manuscrit.
 * Hanging numerals à gauche, titres Cormorant grand, statut en métadonnée discrète.
 * Pas de side-stripe, pas de cartes — voir DESIGN.md §Card discipline.
 */
export default function ChapitresPage() {
  return (
    <>
      <AppHeader crumbs={[{ label: "Les chapitres" }]} />
      <main className="mx-auto w-full max-w-screen-md flex-1 px-6 pb-24 pt-10 sm:px-10">
        <Reveal delay={0}>
          <h1 className="display max-w-[18ch]" style={{ fontSize: "var(--text-4xl)" }}>
            Cinq chapitres pour comprendre une gorgée.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-aubergine-soft">
            Le chemin suggéré va du sol jusqu&rsquo;à ta gorgée. Pioche où tu veux,
            quand tu veux.
          </p>
        </Reveal>

        <ol className="mt-16 sm:mt-20">
          {CHAPITRES.map((chapitre, idx) => {
            const moduleCount = chapitre.modules.length;
            const available = chapitre.modules.filter(
              (m) => m.status === "available",
            ).length;
            const isComplete = available === moduleCount;
            return (
              <li key={chapitre.slug} className="border-t border-cream-dark first:border-t-0">
                <Reveal delay={0.2 + idx * 0.06}>
                  <Link
                    href={`/chapitres/${chapitre.slug}`}
                    className="group grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-5 py-8 sm:grid-cols-[4.5rem_1fr_auto] sm:gap-8 sm:py-10"
                  >
                    {/* Hanging numeral */}
                    <span
                      aria-hidden="true"
                      className="hanging-numeral select-none transition-colors duration-300 group-hover:text-or"
                      style={{
                        fontSize: "var(--text-4xl)",
                        transitionTimingFunction: "var(--ease-out-quart)",
                      }}
                    >
                      {idx + 1}
                    </span>

                    {/* Titre + sous-titre + statut */}
                    <div className="min-w-0">
                      <h2
                        className="display text-aubergine transition-colors duration-300 group-hover:text-or"
                        style={{
                          fontSize: "var(--text-3xl)",
                          transitionTimingFunction: "var(--ease-out-quart)",
                        }}
                      >
                        <span className="mr-3" aria-hidden="true">{chapitre.emoji}</span>
                        {chapitre.title}
                      </h2>
                      <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-aubergine-soft sm:text-base">
                        {chapitre.subtitle}
                      </p>
                      <p className="mt-4 font-sans text-xs text-champetre">
                        {isComplete ? (
                          <>Les {moduleCount} modules sont là.</>
                        ) : (
                          <>{available} sur {moduleCount} modules disponibles.</>
                        )}
                      </p>
                    </div>

                    {/* Indicateur de direction, baseline du titre */}
                    <span
                      aria-hidden="true"
                      className="self-center text-2xl text-aubergine-soft transition-all duration-300 group-hover:translate-x-1 group-hover:text-or"
                      style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
                    >
                      →
                    </span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ol>

        {/* Fin de liste : citation discrète qui ouvre vers la suite */}
        <Reveal delay={0.6}>
          <div className="mt-24 border-t border-cream-dark pt-12">
            <p className="font-serif text-sm italic leading-relaxed text-champetre">
              Tout finit dans le verre. Mais on apprend mieux quand on commence par le sol.
            </p>
          </div>
        </Reveal>
      </main>
    </>
  );
}
