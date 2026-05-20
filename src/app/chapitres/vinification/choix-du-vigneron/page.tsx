import Image from "next/image";
import { AppHeader } from "@/components/AppHeader";
import { AgingPlayground } from "@/components/choix-vigneron/AgingPlayground";
import { DecisionTabs } from "@/components/choix-vigneron/DecisionTabs";
import { ExpandableCard } from "@/components/choix-vigneron/ExpandableCard";
import { getChoixVigneronContent } from "@/lib/content/choix-vigneron";

export const metadata = {
  title: "Les choix du vigneron — Vinification",
  description:
    "Éraflage, extraction, levures, ajustements, élevage, assemblage, mise : 7 décisions qui sculptent le vin.",
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

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-serif text-sm italic text-champetre">
        {title}
      </h4>
      <ul className="mt-1.5 space-y-1 text-sm leading-relaxed text-aubergine [&_strong]:text-or">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            <span aria-hidden="true" className="text-or">•</span>
            <span dangerouslySetInnerHTML={{ __html: it }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ChoixVigneronPage() {
  const c = getChoixVigneronContent();

  return (
    <>
      <AppHeader
        crumbs={[
          { label: "Chapitres", href: "/chapitres" },
          { label: "Vinification", href: "/chapitres/vinification" },
          { label: "Choix du vigneron" },
        ]}
      />
      <main className="mx-auto w-full max-w-screen-sm flex-1 px-5 pb-16 pt-6">
        <p className="font-serif text-sm italic text-champetre">
          Module 2 / 3 — Vinification
        </p>
        <h1 className="mt-2 font-serif text-3xl leading-tight text-aubergine">
          {c.intro.main}
        </h1>
        <p className="mt-3 font-serif text-base italic text-aubergine-soft">
          {c.intro.lead}
        </p>

        {/* ACTE 1 — Éraflage */}
        <section className="mt-10">
          <ActLabel num={1} label="Éraflage ou pas" />
          <h2 className="mt-2 font-serif text-2xl leading-tight text-aubergine">
            {c.destemming.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-aubergine">
            {c.destemming.subtitle.text}{" "}
            <strong className="text-or">{c.destemming.subtitle.bold}</strong>
          </p>

          <div className="mt-5">
            <DecisionTabs
              tabs={[c.destemming.tabs.first, c.destemming.tabs.second].map((tab) => ({
                key: tab.tabName,
                label: tab.tabName,
                content: (
                  <div className="space-y-4 rounded-2xl border border-cream-dark bg-cream-light p-4">
                    <p className="font-serif text-sm text-aubergine-soft">
                      {tab.imageTitle}
                    </p>
                    <ListBlock
                      title={c.destemming.sections.howItWorks}
                      items={tab.howItWorks}
                    />
                    <ListBlock
                      title={c.destemming.sections.typicalResult}
                      items={tab.typicalResults}
                    />
                  </div>
                ),
              }))}
            />
          </div>
        </section>

        {/* ACTE 2 — Extraction */}
        <section className="mt-12">
          <ActLabel num={2} label="L'extraction" />
          <h2 className="mt-2 font-serif text-2xl leading-tight text-aubergine">
            {c.extraction.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-aubergine">
            {c.extraction.intro}
          </p>

          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {c.extraction.levers.map((l) => (
              <li
                key={l.key}
                className="rounded-2xl border border-cream-dark bg-cream-light p-4"
              >
                <h3 className="font-serif text-base text-aubergine">{l.title}</h3>
                <p className="mt-1 text-xs leading-snug text-aubergine-soft">
                  {l.description}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-5 space-y-3">
            {[c.extraction.panel.maceration, c.extraction.panel.fermentation].map(
              (lever) => (
                <div
                  key={lever.title}
                  className="rounded-2xl border border-cream-dark bg-cream-light p-4"
                >
                  <h3 className="font-serif text-sm text-or">{lever.title}</h3>
                  <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                    {lever.variants.map((v) => (
                      <li
                        key={v.key}
                        className="rounded-xl border border-cream-dark bg-cream p-3"
                      >
                        <p className="font-serif text-sm text-aubergine">{v.label}</p>
                        <p className="mt-1 text-xs leading-snug text-aubergine-soft">
                          {v.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            )}
          </div>
        </section>

        {/* ACTE 3 — Levures */}
        <section className="mt-12">
          <ActLabel num={3} label="Le choix des levures" />
          <h2 className="mt-2 font-serif text-2xl leading-tight text-aubergine">
            {c.yeasts.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-aubergine">
            {c.yeasts.intro}
          </p>

          <div className="mt-5">
            <DecisionTabs
              tabs={[c.yeasts.tabs.indigenous, c.yeasts.tabs.selected].map((side) => ({
                key: side.label,
                label: side.label,
                content: (
                  <ul className="space-y-2 rounded-2xl border border-cream-dark bg-cream-light p-4 text-sm">
                    {(
                      [
                        ["aroma", c.yeasts.sections.aroma],
                        ["complexity", c.yeasts.sections.complexity],
                        ["consistency", c.yeasts.sections.consistency],
                        ["expression", c.yeasts.sections.expression],
                      ] as const
                    ).map(([k, label]) => (
                      <li key={k} className="rounded-lg border border-cream-dark bg-cream p-3">
                        <p className="font-serif text-xs italic text-or">
                          {label}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-aubergine">
                          {(side as unknown as Record<string, string>)[k]}
                        </p>
                      </li>
                    ))}
                  </ul>
                ),
              }))}
            />
          </div>

          <div className="mt-4 flex gap-2 rounded-xl border border-or/30 bg-or/[0.06] p-3">
            <span aria-hidden="true" className="text-or">✦</span>
            <p className="text-sm leading-relaxed italic text-aubergine">
              {c.yeasts.didYouKnow}
            </p>
          </div>
        </section>

        {/* ACTE 4 — Ajustements */}
        <section className="mt-12">
          <ActLabel num={4} label="Ajuster, sans trahir" />
          <h2 className="mt-2 font-serif text-2xl leading-tight text-aubergine">
            {c.adjustments.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-aubergine">
            {c.adjustments.intro}
          </p>
          <ul className="mt-5 space-y-3">
            {c.adjustments.items.map((it) => (
              <li key={it.key}>
                <ExpandableCard
                  title={it.title}
                  summary={it.description}
                  detail={it.detail}
                />
              </li>
            ))}
          </ul>
        </section>

        {/* ACTE 5 — Élevage (mini-simulateur) */}
        <section className="mt-12">
          <ActLabel num={5} label="L'élevage" />
          <h2 className="mt-2 font-serif text-2xl leading-tight text-aubergine">
            {c.aging.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-aubergine">{c.aging.intro}</p>

          <div className="mt-5">
            <AgingPlayground
              vessels={c.aging.vessels}
              durations={c.aging.durations}
              samples={c.aging.samples}
            />
          </div>
        </section>

        {/* ACTE 6 — Assemblage */}
        <section className="mt-12">
          <ActLabel num={6} label="Assembler" />
          <h2 className="mt-2 font-serif text-2xl leading-tight text-aubergine">
            {c.blending.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-aubergine">{c.blending.intro}</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {c.blending.approaches.map((a) => (
              <li
                key={a.key}
                className="rounded-2xl border border-cream-dark bg-cream-light p-4"
              >
                <h3 className="font-serif text-base text-aubergine">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-aubergine-soft">
                  {a.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ACTE 7 — Mise en bouteille */}
        <section className="mt-12">
          <ActLabel num={7} label="Mise en bouteille" />
          <h2 className="mt-2 font-serif text-2xl leading-tight text-aubergine">
            {c.bottling.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-aubergine">{c.bottling.intro}</p>

          <ul className="mt-5 space-y-3">
            {c.bottling.decisions.map((d) => (
              <li key={d.key}>
                <ExpandableCard
                  title={d.title}
                  summary={d.description}
                  detail={d.detail}
                />
              </li>
            ))}
          </ul>

          {/* 3 philosophies */}
          <div className="mt-8 rounded-3xl bg-aubergine/[0.06] p-5">
            <p className="font-serif text-sm italic text-champetre">
              Trois philosophies de cave
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {c.bottling.philosophies.map((p) => (
                <li
                  key={p.key}
                  className="rounded-2xl border border-cream-dark bg-cream-light p-4"
                >
                  <h3 className="font-serif text-base text-aubergine">{p.title}</h3>
                  <p className="mt-0.5 text-[11px] italic text-aubergine-soft">
                    {p.subtitle}
                  </p>
                  <ul className="mt-3 space-y-1 text-xs leading-relaxed text-aubergine">
                    {p.values.map((v, i) => (
                      <li key={i} className="flex gap-2">
                        <span aria-hidden="true" className="text-or">•</span>
                        <span>{v}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Outro */}
        <section className="mt-12 rounded-3xl bg-aubergine p-6 text-cream-light">
          <h2 className="font-serif text-2xl leading-tight">{c.finish.title}</h2>
          <p className="mt-2 text-sm leading-relaxed">{c.finish.lead}</p>
          <p className="mt-3 font-serif text-base italic text-or">
            {c.finish.outro}
          </p>
        </section>
      </main>
    </>
  );
}
