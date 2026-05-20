import Link from "next/link";
import { notFound } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import { Reveal } from "@/components/motion/Reveal";
import { CHAPITRES, getChapitreBySlug } from "@/lib/chapitres";

export async function generateStaticParams() {
  return CHAPITRES.map((c) => ({ chapitre: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapitre: string }>;
}) {
  const { chapitre: slug } = await params;
  const chapitre = getChapitreBySlug(slug);
  if (!chapitre) return {};
  return {
    title: `${chapitre.title} — Le Petit Musée du Vin`,
    description: chapitre.subtitle,
  };
}

/**
 * Page chapitre : hero drench aubergine avec titre oversize + mentor,
 * puis liste de modules en hanging numerals (pas en cartes).
 * Voir DESIGN.md §Color strategy et §Card discipline.
 */
export default async function ChapitrePage({
  params,
}: {
  params: Promise<{ chapitre: string }>;
}) {
  const { chapitre: slug } = await params;
  const chapitre = getChapitreBySlug(slug);
  if (!chapitre) notFound();

  const chapitreIndex = CHAPITRES.findIndex((c) => c.slug === chapitre.slug) + 1;

  return (
    <>
      <AppHeader
        crumbs={[
          { label: "Les chapitres", href: "/chapitres" },
          { label: chapitre.title },
        ]}
      />

      {/* Hero drench aubergine */}
      <section className="drench-aubergine">
        <div className="mx-auto w-full max-w-screen-md px-6 py-16 sm:px-10 sm:py-24">
          <Reveal delay={0}>
            <p className="font-serif text-sm italic text-or">
              Chapitre {chapitreIndex} sur {CHAPITRES.length}
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <h1
              className="display-tight mt-6 text-cream-light"
              style={{ fontSize: "var(--text-5xl)" }}
            >
              <span className="mr-4 align-baseline" aria-hidden="true">{chapitre.emoji}</span>
              {chapitre.title}
            </h1>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-cream-light/75 sm:text-lg">
              {chapitre.subtitle}
            </p>
          </Reveal>

          {/* Voix du mentor — pas de side-stripe, mise en retrait par typographie */}
          <Reveal delay={0.35}>
            <figure className="mt-12 max-w-[40ch] sm:mt-16">
              <blockquote className="font-serif text-lg italic leading-snug text-or sm:text-xl">
                « {chapitre.mentorIntro} »
              </blockquote>
              <figcaption className="mt-3 text-xs text-cream-light/55">— Le Mentor</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Liste modules sur cream */}
      <main className="mx-auto w-full max-w-screen-md flex-1 px-6 pb-24 pt-16 sm:px-10 sm:pt-20">
        <Reveal delay={0}>
          <p className="text-sm text-aubergine-soft">
            {chapitre.modules.length} étape{chapitre.modules.length > 1 ? "s" : ""} à explorer
            {chapitre.modules.some((m) => m.status !== "available") && (
              <>
                {" "}— certaines arrivent bientôt
              </>
            )}.
          </p>
        </Reveal>

        <ol className="mt-10">
          {chapitre.modules.map((mod, idx) => {
            const isAvailable = mod.status === "available";
            return (
              <li
                key={mod.slug}
                className="border-t border-cream-dark first:border-t-0"
              >
                <Reveal delay={0.1 + idx * 0.06}>
                  <ModuleRow
                    chapitreSlug={chapitre.slug}
                    mod={mod}
                    index={idx}
                    isAvailable={isAvailable}
                  />
                </Reveal>
              </li>
            );
          })}
        </ol>

        <div className="mt-20">
          <Link
            href="/chapitres"
            className="inline-flex items-center gap-2 text-sm text-aubergine-soft underline-offset-4 transition-colors hover:text-or hover:underline"
          >
            <span aria-hidden="true">←</span> Tous les chapitres
          </Link>
        </div>
      </main>
    </>
  );
}

function ModuleRow({
  chapitreSlug,
  mod,
  index,
  isAvailable,
}: {
  chapitreSlug: string;
  mod: { slug: string; title: string; teaser: string; status: string };
  index: number;
  isAvailable: boolean;
}) {
  const inner = (
    <div className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-7 sm:grid-cols-[3rem_1fr_auto] sm:gap-6 sm:py-8">
      <span
        aria-hidden="true"
        className="hanging-numeral select-none"
        style={{ fontSize: "var(--text-2xl)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="min-w-0">
        <h3
          className={`font-serif leading-tight transition-colors duration-300 ${
            isAvailable ? "text-aubergine group-hover:text-or" : "text-aubergine-soft"
          }`}
          style={{
            fontSize: "var(--text-xl)",
            transitionTimingFunction: "var(--ease-out-quart)",
          }}
        >
          {mod.title}
        </h3>
        <p className="mt-2 max-w-[44ch] text-sm leading-relaxed text-aubergine-soft sm:text-base">
          {mod.teaser}
        </p>
      </div>
      {isAvailable ? (
        <span
          aria-hidden="true"
          className="self-center text-lg text-aubergine-soft transition-all duration-300 group-hover:translate-x-1 group-hover:text-or"
          style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
        >
          →
        </span>
      ) : (
        <span className="self-center text-xs text-champetre italic">
          bientôt
        </span>
      )}
    </div>
  );

  if (isAvailable) {
    return (
      <Link
        href={`/chapitres/${chapitreSlug}/${mod.slug}`}
        className="group block"
      >
        {inner}
      </Link>
    );
  }
  return <div className="opacity-70">{inner}</div>;
}
