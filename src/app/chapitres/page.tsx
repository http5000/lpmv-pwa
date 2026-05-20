import Image from "next/image";
import Link from "next/link";
import { AppHeader } from "@/components/AppHeader";
import { Reveal } from "@/components/motion/Reveal";
import { CHAPITRES } from "@/lib/chapitres";

export const metadata = {
  title: "Les chapitres — Le Petit Musée du Vin",
};

/**
 * Liste des 5 chapitres en cartes image-led.
 * Photo du chapitre à gauche, titre + sous-titre + avancement à droite.
 * Le numéro est une légende discrète ("Chapitre 1"), pas un chiffre qui flotte.
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
          <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-aubergine-soft">
            Le chemin va du sol jusqu&rsquo;à ta gorgée. Mais tu peux piocher où tu veux,
            quand tu veux.
          </p>
        </Reveal>

        <ol className="mt-12 flex flex-col gap-4 sm:mt-16 sm:gap-5">
          {CHAPITRES.map((chapitre, idx) => {
            const moduleCount = chapitre.modules.length;
            const available = chapitre.modules.filter(
              (m) => m.status === "available",
            ).length;
            const isComplete = available === moduleCount;
            return (
              <li key={chapitre.slug}>
                <Reveal delay={0.18 + idx * 0.07}>
                  <Link
                    href={`/chapitres/${chapitre.slug}`}
                    className="group flex items-stretch overflow-hidden rounded-3xl border border-cream-dark bg-cream-light transition-all duration-300 hover:-translate-y-0.5 hover:border-champetre hover:shadow-[var(--shadow-lift)]"
                    style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
                  >
                    {/* Image */}
                    <div className="relative w-28 shrink-0 overflow-hidden sm:w-44">
                      <Image
                        src={chapitre.image}
                        alt={chapitre.imageAlt}
                        fill
                        sizes="(max-width: 640px) 112px, 176px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
                      />
                    </div>

                    {/* Texte */}
                    <div className="flex min-w-0 flex-1 flex-col justify-center p-5 sm:p-7">
                      <p className="font-serif text-sm italic text-champetre">
                        Chapitre {idx + 1}
                      </p>
                      <h2
                        className="mt-1 display text-aubergine transition-colors duration-300 group-hover:text-or"
                        style={{
                          fontSize: "var(--text-2xl)",
                          transitionTimingFunction: "var(--ease-out-quart)",
                        }}
                      >
                        {chapitre.title}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-aubergine-soft">
                        {chapitre.subtitle}
                      </p>
                      <p className="mt-3 text-xs text-champetre">
                        {isComplete
                          ? `Les ${moduleCount} modules sont là.`
                          : `${available} sur ${moduleCount} modules disponibles.`}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </main>
    </>
  );
}
