import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Accueil — l'app faite par Le Petit Musée du Vin pour apprendre le vin.
 * S'adresse autant aux visiteurs du musée qu'à ceux qui ne sont jamais venus.
 *
 * Ton : accessible, décomplexé, aéré (cf le site du musée). Cream qui respire,
 * logo officiel en aubergine, une vraie photo, une promesse courte, un bouton.
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-1 flex-col bg-cream">
      <div className="mx-auto flex w-full max-w-screen-sm flex-1 flex-col items-center px-6 pt-12 pb-16 text-center sm:pt-16">
        <Reveal delay={0}>
          <Logo size="lg" variant="bare" />
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-12 w-full overflow-hidden rounded-3xl shadow-[var(--shadow-lift)] sm:mt-14">
            <Image
              src="/chapitres/hero.jpg"
              alt="Un verre de vin rouge posé face à un vignoble qui descend vers un lac et des collines."
              width={1200}
              height={800}
              priority
              className="aspect-[3/2] w-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <h1
            className="display mt-12 max-w-[16ch] text-aubergine"
            style={{ fontSize: "var(--text-3xl)" }}
          >
            Comprendre le vin, de la vigne au verre.
          </h1>
        </Reveal>

        <Reveal delay={0.44}>
          <p className="mt-6 max-w-[36ch] text-base leading-relaxed text-aubergine-soft">
            L&rsquo;application du Petit Musée du Vin pour apprendre le vin.
            {" "}Cinq chapitres pour comprendre une gorgée.
          </p>
        </Reveal>

        <Reveal delay={0.58}>
          <Link
            href="/chapitres"
            className="group mt-12 inline-flex items-center gap-3 rounded-full bg-aubergine px-8 py-3.5 font-serif text-base text-cream-light transition-all duration-200 hover:-translate-y-0.5 hover:bg-aubergine-deep active:translate-y-0 active:scale-[0.98]"
            style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
          >
            <span>Explorer</span>
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
