import { AppHeader } from "@/components/AppHeader";
import { RoueTerroir } from "@/components/roue/RoueTerroir";
import { countRealCombos, getRoueContent } from "@/lib/content/roue-terroir";

export const metadata = {
  title: "Faites tourner le terroir — Terroir",
  description: "Sol × climat × vigneron : tire au sort et découvre quel vin naît.",
};

export default function RoueTerroirPage() {
  const { title, subtitle, info, modal, soils, climates, managements } =
    getRoueContent();
  const { real, total } = countRealCombos();

  return (
    <>
      <AppHeader
        crumbs={[
          { label: "Chapitres", href: "/chapitres" },
          { label: "Terroir", href: "/chapitres/terroir" },
          { label: "Roue Terroir" },
        ]}
      />
      <main className="mx-auto w-full max-w-screen-sm flex-1 px-5 pb-16 pt-6">
        <p className="font-serif text-sm italic text-champetre">
          Module 3 / 3 — Terroir
        </p>
        <h1 className="mt-2 font-serif text-3xl leading-tight text-aubergine">
          {title}
        </h1>
        <p className="mt-2 font-serif text-lg italic text-aubergine-soft">
          {subtitle}
        </p>

        {/* Intro pédagogique — visible direct */}
        <section className="mt-5 rounded-2xl bg-aubergine/[0.05] p-5">
          <h2 className="font-serif text-lg leading-snug text-aubergine">
            {info.title}
          </h2>
          <p
            className="mt-3 text-sm leading-relaxed text-aubergine [&_strong]:text-or"
            dangerouslySetInnerHTML={{ __html: info.main.first }}
          />
          <p
            className="mt-2 text-sm leading-relaxed text-aubergine [&_strong]:text-or"
            dangerouslySetInnerHTML={{ __html: info.main.second }}
          />
          <p className="mt-2 text-sm leading-relaxed text-aubergine-soft">
            {info.main.third}
          </p>
        </section>

        {/* Règle du jeu */}
        <section className="mt-5 rounded-2xl border border-or/30 bg-or/[0.05] p-4">
          <h2 className="font-serif text-sm font-medium text-aubergine">
            {info.secondary.title}
          </h2>
          <ol className="mt-2 space-y-1 text-sm text-aubergine-soft">
            <li>1. {info.secondary.first}</li>
            <li>2. {info.secondary.second}</li>
            <li className="text-aubergine">3. {info.secondary.third}</li>
          </ol>
        </section>

        {/* La machine à sous */}
        <section className="mt-7">
          <RoueTerroir
            soils={soils}
            climates={climates}
            managements={managements}
            modal={modal}
          />
        </section>

        <p className="mt-8 text-center text-xs text-champetre">
          {total} combinaisons possibles — {real} déjà racontées en détail, les
          autres attendent que tu les tires.
        </p>
      </main>
    </>
  );
}
