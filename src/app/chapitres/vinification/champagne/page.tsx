import Image from "next/image";
import { AppHeader } from "@/components/AppHeader";
import { PremiumGate } from "@/components/PremiumGate";
import { getChampagneContent } from "@/lib/content/champagne";

export const metadata = {
  title: "Assemble ton Champagne — Vinification",
  description:
    "Cépages, assemblage, familles, dosage et méthode champenoise : entre dans la cave du chef de cave.",
};

function ActLabel({ num, label }: { num: number; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-serif text-4xl leading-none text-or/40">
        {String(num).padStart(2, "0")}
      </span>
      <span className="font-serif text-sm italic text-or">
        {label}
      </span>
    </div>
  );
}

export default function ChampagnePage() {
  const c = getChampagneContent();

  return (
    <>
      <AppHeader
        crumbs={[
          { label: "Chapitres", href: "/chapitres" },
          { label: "Vinification", href: "/chapitres/vinification" },
          { label: "Champagne" },
        ]}
      />
      <PremiumGate label="Vinification Champagne">
      <main className="mx-auto w-full max-w-screen-sm flex-1 px-5 pb-16 pt-6">
        <p className="font-serif text-sm italic text-champetre">
          Module 3 / 3 — Vinification
        </p>
        <h1 className="mt-2 font-serif text-3xl leading-tight text-aubergine">
          {c.title}
        </h1>
        <p className="mt-3 whitespace-pre-line font-serif text-base italic text-aubergine-soft">
          {c.intro}
        </p>

        {/* Hero */}
        <div className="relative mt-5 aspect-video w-full overflow-hidden rounded-2xl bg-cream-light">
          <Image
            src="/champagne/start/main.png"
            alt=""
            fill
            className="object-contain p-3"
            priority
          />
        </div>

        {/* ACTE 1 — Cépages */}
        <section className="mt-10">
          <ActLabel num={1} label="Les 3 cépages rois" />
          <h2 className="mt-2 font-serif text-2xl leading-tight text-aubergine">
            {c.cepagesIntro.title}
          </h2>
          <p className="mt-2 text-sm text-aubergine">{c.cepagesIntro.subtitle}</p>

          <ul className="mt-5 space-y-4">
            {c.cepages.map((cep, idx) => (
              <li
                key={cep.id}
                className="rounded-2xl border border-cream-dark bg-cream-light p-4"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-serif text-xl text-aubergine">{cep.label}</h3>
                  <span className="font-serif text-xs italic text-champetre">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-1 text-xs italic text-aubergine-soft">
                  {cep.details}
                </p>
                <ul className="mt-3 grid gap-1.5 text-sm leading-relaxed text-aubergine sm:grid-cols-3">
                  {cep.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <span aria-hidden="true" className="text-or">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          {/* Cépages rares */}
          <div className="mt-5 rounded-2xl border border-dashed border-or/40 bg-or/[0.05] p-4">
            <h3 className="font-serif text-sm text-aubergine">
              Cépages rares & oubliés
            </h3>
            <p className="mt-1 text-xs italic text-aubergine-soft">
              {c.cepagesRares.intro}
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {c.cepagesRares.items.map((it, i) => (
                <li
                  key={i}
                  className="rounded-full bg-cream-light px-3 py-1 font-serif text-xs text-aubergine"
                >
                  {it}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-aubergine-soft">{c.cepagesRares.outro}</p>
          </div>
        </section>

        {/* ACTE 2 — Assemblage */}
        <section className="mt-12">
          <ActLabel num={2} label="L'art de l'assemblage" />
          <h2 className="mt-2 font-serif text-2xl leading-tight text-aubergine">
            {c.assemblage.title}
          </h2>
          <p className="mt-2 text-sm text-aubergine">{c.assemblage.subtitle}</p>

          {/* Une équation à 3 inconnues */}
          <div className="mt-5 rounded-2xl border border-cream-dark bg-cream-light p-4">
            <p className="font-serif text-sm italic text-champetre">
              Une équation à trois inconnues
            </p>
            <ul className="mt-3 grid grid-cols-3 gap-2 text-center">
              {c.assemblage.inputs.topItems.map((it, i) => (
                <li
                  key={i}
                  className="rounded-xl bg-aubergine/[0.06] p-3 font-serif text-sm text-aubergine"
                >
                  {it}
                </li>
              ))}
            </ul>
          </div>

          {/* Signature des villages */}
          <div className="mt-3 rounded-2xl bg-aubergine/[0.05] p-4">
            <p className="font-serif text-sm italic text-champetre">
              Chaque village a sa signature
            </p>
            <ul className="mt-3 space-y-2">
              {c.assemblage.inputs.villages.map((v, i) => (
                <li
                  key={i}
                  className="flex items-baseline justify-between rounded-xl border border-cream-dark bg-cream-light px-3 py-2"
                >
                  <span className="font-serif text-sm text-aubergine">{v.name}</span>
                  <span className="text-xs italic text-aubergine-soft">{v.type}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vins de réserve */}
          <div className="mt-3 rounded-2xl border border-or/30 bg-or/[0.06] p-4">
            <p className="font-serif text-sm italic text-champetre">
              Le trésor des caves — les vins de réserve
            </p>
            <ul className="mt-3 space-y-2">
              {c.assemblage.inputs.reserveItems.map((it, i) => (
                <li key={i} className="text-sm leading-relaxed text-aubergine">
                  <span className="font-serif text-aubergine">{it.label}</span>{" "}
                  — <span className="text-aubergine-soft">{it.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ACTE 3 — Familles */}
        <section className="mt-12">
          <ActLabel num={3} label="Les familles de Champagne" />
          <h2 className="mt-2 font-serif text-2xl leading-tight text-aubergine">
            {c.familles.title}
          </h2>

          {/* Millésime */}
          <div className="mt-5 rounded-2xl bg-aubergine/[0.05] p-4">
            <p
              className="text-sm leading-relaxed text-aubergine [&_strong]:text-or"
              dangerouslySetInnerHTML={{ __html: c.familles.millesimeIntro }}
            />
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {c.familles.millesimeExamples.map((ex, i) => (
                <li
                  key={i}
                  className="rounded-xl border border-cream-dark bg-cream-light p-3"
                >
                  <p className="font-serif text-sm text-aubergine">{ex.label}</p>
                  <p className="mt-1 text-xs text-aubergine-soft">{ex.text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Familles à lire sur l'étiquette */}
          <h3 className="mt-6 font-serif text-base text-aubergine">
            Savoir lire l&rsquo;étiquette
          </h3>
          <ul className="mt-3 space-y-2">
            {c.familles.families.map((f, i) => (
              <li
                key={i}
                className="rounded-xl border border-cream-dark bg-cream-light p-3"
              >
                <p className="font-serif text-sm text-aubergine">{f.label}</p>
                <p className="mt-1 text-xs leading-snug text-aubergine-soft">
                  {f.info}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ACTE 4 — Chef de Cave */}
        <section className="mt-12">
          <ActLabel num={4} label="Le chef de cave" />
          <h2 className="mt-2 font-serif text-2xl leading-tight text-aubergine">
            {c.chefDeCave.title}
          </h2>

          <div className="mt-4 rounded-2xl border border-cream-dark bg-cream-light p-4">
            <p className="font-serif text-sm italic text-champetre">
              Sa mission sacrée
            </p>
            <div
              className="prose prose-sm mt-2 max-w-none text-sm leading-relaxed text-aubergine [&_li]:my-0.5 [&_ul]:list-disc [&_ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: c.chefDeCave.mission }}
            />
          </div>

          {/* Dosage scale */}
          <div className="mt-4 rounded-2xl bg-aubergine/[0.05] p-4">
            <p className="font-serif text-sm italic text-champetre">
              L&rsquo;échelle du sucre — le dosage
            </p>
            <p className="mt-2 text-sm leading-relaxed text-aubergine">
              {c.chefDeCave.dosage}
            </p>
            <ul className="mt-4 space-y-1.5">
              {c.chefDeCave.dosageScale.map((d, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[1fr_auto_1fr] items-baseline gap-3 rounded-xl border border-cream-dark bg-cream-light px-3 py-2 text-sm"
                >
                  <span className="font-serif text-aubergine">{d.label}</span>
                  <span className="font-serif text-xs text-or">{d.sugar} g/L</span>
                  <span className="text-right text-xs italic text-aubergine-soft">
                    {d.taste}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ACTE 5 — Méthode Champenoise */}
        <section className="mt-12">
          <ActLabel num={5} label="La méthode champenoise" />
          <h2 className="mt-2 font-serif text-2xl leading-tight text-aubergine">
            {c.methode.title}
          </h2>

          <ol className="relative mt-5 space-y-3">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[19px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-or via-aubergine/40 to-or/30"
            />
            {c.methode.steps.map((step) => (
              <li key={step.id} className="relative pl-12">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border-2 border-or bg-cream-light font-serif text-sm text-or shadow-sm"
                >
                  {step.id}
                </span>
                <div className="rounded-2xl border border-cream-dark bg-cream-light p-4">
                  <h3 className="font-serif text-base text-aubergine">
                    {step.label}
                  </h3>
                  <p
                    className="mt-1 text-sm leading-relaxed text-aubergine [&_strong]:text-or"
                    dangerouslySetInnerHTML={{ __html: step.content }}
                  />
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Game v2 teaser */}
        <section className="mt-12 rounded-3xl border-2 border-dashed border-or/40 bg-or/[0.04] p-6 text-center">
          <p className="font-serif text-sm italic text-or">
            Bientôt — Chef de Cave (jeu)
          </p>
          <h2 className="mt-2 font-serif text-2xl leading-tight text-aubergine">
            Compose ta cuvée en 6 doses
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-aubergine-soft">
            Tu pourras assembler 6 doses de vins clairs (Chardonnay, Pinot Noir,
            Meunier), suivre la prise de mousse, choisir ton dosage et découvrir
            le style du Champagne que tu as créé.
          </p>
        </section>
      </main>
      </PremiumGate>
    </>
  );
}
