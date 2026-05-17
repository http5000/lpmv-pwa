import { AppHeader } from "@/components/AppHeader";
import { VigneScroll } from "@/components/anatomie/VigneScroll";
import { getAnatomieContent } from "@/lib/content/anatomie";

export const metadata = {
  title: "Anatomie de la vigne — Vigne & Viticulture",
  description:
    "Racines, tronc, sarments, feuilles, raisin, bourgeon : suis la sève du sol au fruit.",
};

export default function AnatomiePage() {
  const { title, organesByCycle } = getAnatomieContent();

  return (
    <>
      <AppHeader
        crumbs={[
          { label: "Chapitres", href: "/chapitres" },
          { label: "Vigne", href: "/chapitres/vigne" },
          { label: "Anatomie" },
        ]}
      />
      <main className="mx-auto w-full max-w-screen-sm flex-1 px-5 pb-16 pt-6">
        <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-or">
          Module 1 / 4 — Vigne & Viticulture
        </p>
        <h1 className="mt-2 font-serif text-3xl leading-tight text-aubergine">
          {title}
        </h1>

        {/* Intro */}
        <section className="mt-5 rounded-2xl bg-aubergine/[0.05] p-5">
          <h2 className="font-serif text-lg leading-snug text-aubergine">
            Suis la sève, du sol au fruit
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-aubergine">
            La vigne est une plante simple en apparence,{" "}
            <strong className="text-or">
              mais chaque organe joue un rôle essentiel
            </strong>{" "}
            dans la fabrication du raisin et donc du vin. On la lit ici dans le
            sens naturel de la sève : <em>des racines aux grappes</em>.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-aubergine-soft">
            6 stations, 6 fonctions vitales. Tu peux scroller dans l&rsquo;ordre,
            ou sauter directement à ce qui t&rsquo;intrigue.
          </p>
        </section>

        {/* Mini-sommaire ancré */}
        <nav
          aria-label="Aller à un organe"
          className="mt-5 flex flex-wrap gap-2 text-xs"
        >
          {organesByCycle.map((o) => (
            <a
              key={o.slug}
              href={`#${o.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-cream-dark bg-cream-light px-3 py-1.5 font-serif text-aubergine transition-colors hover:border-or hover:text-or"
            >
              <span aria-hidden="true">{o.emoji}</span>
              {o.title}
            </a>
          ))}
        </nav>

        {/* Parcours vertical des 6 organes */}
        <section className="mt-8">
          <VigneScroll
            organes={organesByCycle.map((o) => ({ ...o }))}
          />
        </section>

        {/* Anchor IDs pour le mini-sommaire — invisibles, placés via CSS scroll-margin */}
        <style>
          {organesByCycle
            .map((o) => `#${o.slug}{scroll-margin-top:140px}`)
            .join("\n")}
        </style>
      </main>
    </>
  );
}
