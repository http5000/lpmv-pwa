import Link from "next/link";
import { AppHeader } from "@/components/AppHeader";
import { CHAPITRES } from "@/lib/chapitres";

export const metadata = {
  title: "Les chapitres — Le Petit Musée du Vin",
};

/**
 * Liste des 5 chapitres narratifs du parcours.
 * Sur mobile : empilement vertical de grandes cartes tactiles.
 */
export default function ChapitresPage() {
  return (
    <>
      <AppHeader crumbs={[{ label: "Les chapitres" }]} />
      <main className="mx-auto w-full max-w-screen-sm flex-1 px-5 pb-16 pt-6">
        <p className="font-serif text-xs uppercase tracking-[0.3em] text-burgundy">
          Le parcours
        </p>
        <h1 className="mt-2 font-serif text-3xl leading-tight text-olive">
          Cinq chapitres pour comprendre un verre
        </h1>
        <p className="mt-3 text-sm text-olive-soft">
          Le chemin suggéré va du sol jusqu&rsquo;à ta gorgée. Mais tu peux
          piocher où tu veux, quand tu veux.
        </p>

        <ol className="mt-8 flex flex-col gap-3">
          {CHAPITRES.map((chapitre, idx) => {
            const moduleCount = chapitre.modules.length;
            const available = chapitre.modules.filter(
              (m) => m.status === "available",
            ).length;
            return (
              <li key={chapitre.slug}>
                <Link
                  href={`/chapitres/${chapitre.slug}`}
                  className="group block rounded-2xl border border-parchment-dark bg-parchment-light p-5 transition-all hover:border-burgundy hover:shadow-sm active:scale-[0.99]"
                  style={{ borderLeftWidth: 4, borderLeftColor: chapitre.accent }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="text-3xl"
                      aria-hidden="true"
                    >
                      {chapitre.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-earth-soft">
                        Chapitre {idx + 1}
                      </p>
                      <h2 className="mt-1 font-serif text-xl text-olive group-hover:text-burgundy">
                        {chapitre.title}
                      </h2>
                      <p className="mt-1 text-sm text-olive-soft">
                        {chapitre.subtitle}
                      </p>
                      <p className="mt-3 text-xs text-earth-soft">
                        {available} / {moduleCount} module
                        {moduleCount > 1 ? "s" : ""} disponible
                        {available > 1 ? "s" : ""}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="self-center text-olive-soft transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </main>
    </>
  );
}
