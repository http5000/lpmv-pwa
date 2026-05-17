import { AppHeader } from "@/components/AppHeader";
import { EtiquetteInteractive } from "@/components/etiquette/EtiquetteInteractive";
import { ZOOMS } from "@/lib/content/etiquette";

export const metadata = {
  title: "Lire une étiquette — Dégustation",
  description:
    "AOP, millésime, mentions Champagne, labels — décrypte une étiquette de vin sans te tromper.",
};

export default function EtiquettePage() {
  return (
    <>
      <AppHeader
        crumbs={[
          { label: "Chapitres", href: "/chapitres" },
          { label: "Dégustation", href: "/chapitres/degustation" },
          { label: "Lire une étiquette" },
        ]}
      />
      <main className="mx-auto w-full max-w-screen-sm flex-1 px-5 pb-16 pt-6">
        <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-or">
          Module 3 / 5 — Dégustation
        </p>
        <h1 className="mt-2 font-serif text-3xl leading-tight text-aubergine">
          Lire une étiquette
        </h1>

        <section className="mt-5 rounded-2xl bg-aubergine/[0.05] p-5">
          <p className="text-sm leading-relaxed text-aubergine">
            Une étiquette de vin condense l&rsquo;essentiel en quelques lignes :
            <strong className="text-or"> d&rsquo;où vient ce vin</strong>,
            <strong className="text-or"> qui l&rsquo;a fait</strong>, et
            <strong className="text-or"> selon quelles règles</strong>. Voici
            une étiquette type — touche les <span className="text-or">+</span>{" "}
            pour découvrir chaque mention.
          </p>
        </section>

        <section className="mt-8">
          <EtiquetteInteractive />
        </section>

        {/* Zooms thématiques */}
        <section className="mt-12 space-y-8">
          {ZOOMS.map((zoom) => (
            <article key={zoom.key}>
              <h2 className="font-serif text-2xl leading-tight text-aubergine">
                {zoom.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-aubergine-soft">
                {zoom.intro}
              </p>
              <ul className="mt-4 space-y-3">
                {zoom.items.map((it, i) => (
                  <li
                    key={i}
                    className="rounded-2xl border border-cream-dark bg-cream-light p-4"
                  >
                    <h3 className="font-serif text-sm text-or">{it.label}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-aubergine">
                      {it.description}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
