import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Accueil — calme, aéré, hospitalier. Voir DESIGN.md §Vision.
 * Pas de drench, pas d'oversize agressif : un cream qui respire,
 * le logo officiel comme point d'ancrage, une promesse courte,
 * un bouton. Le ton est celui d'une porte ouverte, pas d'un slogan.
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-1 flex-col bg-cream">
      <div className="mx-auto flex w-full max-w-screen-sm flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <Reveal delay={0}>
          <Logo size="lg" variant="aubergine" />
        </Reveal>

        <Reveal delay={0.18}>
          <h1
            className="display mt-16 max-w-[14ch] text-aubergine sm:mt-20"
            style={{ fontSize: "var(--text-3xl)" }}
          >
            Le vin, à ton rythme.
          </h1>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-6 max-w-[34ch] text-base leading-relaxed text-aubergine-soft">
            Le compagnon du Petit Musée du Vin.
            <br className="hidden sm:inline" />
            {" "}Cinq chapitres pour comprendre une gorgée.
          </p>
        </Reveal>

        <Reveal delay={0.46}>
          <Link
            href="/chapitres"
            className="group mt-14 inline-flex items-center gap-3 rounded-full bg-aubergine px-7 py-3.5 font-serif text-base text-cream-light transition-all duration-200 hover:-translate-y-0.5 hover:bg-aubergine-deep active:translate-y-0 active:scale-[0.98]"
            style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
          >
            <span>Entrer</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
              style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
            >
              →
            </span>
          </Link>
        </Reveal>
      </div>

    </main>
  );
}
