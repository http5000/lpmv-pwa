import Link from "next/link";
import { AppHeader } from "@/components/AppHeader";
import { getSolsContent } from "@/lib/content/sols";

export const metadata = {
  title: "Voyage au cœur des sols — Terroir",
  description: "Volcanique, craie, schiste… 8 sols, 8 personnalités de vin.",
};

export default function SolsPage() {
  const { title, didYouKnow, sols } = getSolsContent();

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

        {/* Le saviez-vous (intro) */}
        <details className="mt-5 rounded-xl bg-cream-light p-4 open:bg-cream-dark/40">
          <summary className="cursor-pointer list-none font-serif text-sm text-or">
            ✦ Le saviez-vous&nbsp;? <span className="text-aubergine-soft underline-offset-4">Lire</span>
          </summary>
          <div
            className="prose prose-sm mt-3 max-w-none text-sm leading-relaxed text-aubergine [&_h2]:mt-0 [&_h2]:font-serif [&_h2]:text-base [&_h2]:text-aubergine [&_li]:my-0.5 [&_p]:my-2 [&_strong]:text-or"
            dangerouslySetInnerHTML={{ __html: didYouKnow }}
          />
        </details>

        {/* Consigne tactile */}
        <p className="mt-7 font-serif text-base italic text-aubergine-soft">
          Touche un sol pour en sentir l&rsquo;influence.
        </p>

        {/* Grille des sols */}
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {sols.map((sol) => (
            <li key={sol.id}>
              <Link
                href={`/chapitres/terroir/sols/${sol.slug}`}
                className="group flex aspect-square flex-col items-stretch overflow-hidden rounded-xl border border-cream-dark bg-cream-light transition-all hover:border-or active:scale-[0.98]"
              >
                {/* Tampon de couleur (placeholder photo réelle plus tard) */}
                <div
                  className="relative flex-1"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, ${sol.color}E6, ${sol.color} 55%, ${sol.color}AA)`,
                  }}
                  role="img"
                  aria-label={sol.swatch}
                >
                  <span
                    aria-hidden="true"
                    className="absolute right-2 top-2 rounded-full bg-cream-light/90 px-1.5 py-0.5 font-serif text-[10px] text-champetre"
                  >
                    {sol.id}
                  </span>
                </div>
                <div className="px-2.5 py-2">
                  <p className="font-serif text-sm leading-tight text-aubergine group-hover:text-or">
                    {sol.shortTitle}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

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
