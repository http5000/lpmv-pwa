import { AppHeader } from "@/components/AppHeader";
import { AccordsExplorer } from "@/components/accords/AccordsExplorer";
import { DISH_CATEGORIES, PRINCIPES, TRAPS } from "@/lib/content/accords";

export const metadata = {
  title: "Accords mets & vin — Dégustation",
  description:
    "Quel vin avec quel plat — 4 grands principes, 8 familles de plats, et les pièges classiques.",
};

export default function AccordsPage() {
  return (
    <>
      <AppHeader
        crumbs={[
          { label: "Chapitres", href: "/chapitres" },
          { label: "Dégustation", href: "/chapitres/degustation" },
          { label: "Accords mets & vin" },
        ]}
      />
      <main className="mx-auto w-full max-w-screen-sm flex-1 px-5 pb-16 pt-6">
        <p className="font-serif text-sm italic text-champetre">
          Module 4 / 5 — Dégustation
        </p>
        <h1 className="mt-2 font-serif text-3xl leading-tight text-aubergine">
          Accords mets &amp; vin
        </h1>
        <p className="mt-3 font-serif text-base italic text-aubergine-soft">
          « Le bon accord, c&rsquo;est celui qui sublime le plat
          <strong className="not-italic text-or"> ET</strong> le vin — pas
          celui qui les force à coexister. »
        </p>

        {/* 4 principes */}
        <section className="mt-8">
          <h2 className="font-serif text-xl text-aubergine">
            Les 4 grands principes
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {PRINCIPES.map((p) => (
              <li
                key={p.key}
                className="rounded-2xl border border-cream-dark bg-cream-light p-4"
              >
                <h3 className="font-serif text-base text-aubergine">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-aubergine-soft">
                  {p.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Explorer */}
        <section className="mt-10">
          <h2 className="font-serif text-xl text-aubergine">
            Choisis ta famille de plat
          </h2>
          <p className="mt-1 text-sm text-aubergine-soft">
            Pour chaque plat-exemple, 3 vins suggérés et la raison de l&rsquo;accord.
          </p>
          <div className="mt-5">
            <AccordsExplorer categories={DISH_CATEGORIES} />
          </div>
        </section>

        {/* Pièges */}
        <section className="mt-12 rounded-3xl bg-aubergine/[0.06] p-6">
          <h2 className="font-serif text-xl text-aubergine">
            Les pièges à connaître
          </h2>
          <p className="mt-1 text-sm text-aubergine-soft">
            Les accords qui paraissent évidents mais qui clashent.
          </p>
          <ul className="mt-5 space-y-3">
            {TRAPS.map((t, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-2xl border border-or/30 bg-cream-light p-4"
              >
                <span aria-hidden="true" className="text-or text-lg">⚠</span>
                <div>
                  <h3 className="font-serif text-sm text-aubergine">
                    {t.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-aubergine-soft">
                    {t.explanation}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
