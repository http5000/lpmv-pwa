import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Accueil — drench aubergine, mot signature oversize, asymétrie posée.
 * Voir DESIGN.md §Vision et §Color strategy.
 *
 * Le mot "L'apprenti" est tenu en clamp(--text-6xl) — c'est l'imagery
 * principale de la page. Pas de photo : la typo EST l'image.
 */
export default function Home() {
  return (
    <main className="drench-aubergine relative flex min-h-screen flex-1 flex-col overflow-hidden">
      {/* Logo flotte en haut à gauche */}
      <div className="px-6 pt-8 sm:px-10 sm:pt-12">
        <Reveal delay={0}>
          <Logo size="sm" variant="aubergine" />
        </Reveal>
      </div>

      {/* Hero asymétrique : mot signature à gauche, baseline alignée bas */}
      <div className="flex flex-1 flex-col justify-end px-6 pb-16 sm:px-10 sm:pb-24">
        <Reveal delay={0.12}>
          <p className="font-serif text-sm italic text-or sm:text-base">
            Le Petit Musée du Vin, prolongé.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <h1 className="display-tight mt-6 text-cream-light" style={{ fontSize: "var(--text-6xl)" }}>
            L&rsquo;apprenti
            <br />
            <span className="text-or">du verre.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.42}>
          <div className="mt-12 grid gap-10 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-16">
            <p className="max-w-[34ch] text-base leading-relaxed text-cream-light/80">
              Sols, climats, vigne, cycle, vinification, dégustation.
              <br />
              Cinq chapitres pour comprendre une gorgée.
            </p>

            <Link
              href="/chapitres"
              className="group inline-flex w-fit items-center gap-3 self-start rounded-full bg-cream-light px-7 py-3.5 font-serif text-base text-aubergine transition-all duration-200 hover:-translate-y-0.5 hover:bg-or hover:text-aubergine active:translate-y-0 active:scale-[0.98] sm:self-end"
              style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
            >
              <span>Commencer le voyage</span>
              <span aria-hidden="true" className="text-lg transition-transform duration-300 group-hover:translate-x-1" style={{ transitionTimingFunction: "var(--ease-out-quart)" }}>
                →
              </span>
            </Link>
          </div>
        </Reveal>

        {/* Citation du Mentor, asymétrique et discrète */}
        <Reveal delay={0.6}>
          <div className="mt-20 flex justify-end sm:mt-24">
            <figure className="max-w-[26ch] text-right">
              <blockquote className="font-serif text-sm italic leading-relaxed text-cream-light/55 sm:text-base">
                Le sol, la vigne, la saison, le geste. Quatre lectures pour un seul verre.
              </blockquote>
              <figcaption className="mt-3 text-xs text-cream-light/40">— Le Mentor</figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
