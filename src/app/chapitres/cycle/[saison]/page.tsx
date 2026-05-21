import Link from "next/link";
import { notFound } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import { PremiumGate } from "@/components/PremiumGate";
import { SAISONS, getSaisonBySlug } from "@/lib/content/saisons";

export async function generateStaticParams() {
  return SAISONS.map((s) => ({ saison: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ saison: string }>;
}) {
  const { saison: slug } = await params;
  const s = getSaisonBySlug(slug);
  if (!s) return {};
  return {
    title: `${s.name} — ${s.period} | Cycle de la vigne`,
    description: s.tagline,
  };
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-serif text-sm italic text-champetre">{children}</p>
  );
}

export default async function SaisonPage({
  params,
}: {
  params: Promise<{ saison: string }>;
}) {
  const { saison: slug } = await params;
  const s = getSaisonBySlug(slug);
  if (!s) notFound();

  const index = SAISONS.findIndex((x) => x.slug === slug);
  const prev = index > 0 ? SAISONS[index - 1] : null;
  const next = index < SAISONS.length - 1 ? SAISONS[index + 1] : null;

  return (
    <>
      <AppHeader
        crumbs={[
          { label: "Chapitres", href: "/chapitres" },
          { label: "Cycle de la vigne", href: "/chapitres/cycle" },
          { label: s.name },
        ]}
      />
      <PremiumGate label="Cycle de la Vigne">
      <main className="mx-auto w-full max-w-screen-sm flex-1 px-5 pb-16 pt-6">
        {/* Hero coloré */}
        <div
          className="rounded-3xl p-6 text-center"
          style={{
            background: `linear-gradient(160deg, ${s.accent}33, ${s.accent}08)`,
          }}
        >
          <p className="font-serif text-sm italic text-or">
            Saison {s.order} / 4 · {s.period}
          </p>
          <div className="mt-4 text-6xl" aria-hidden="true">
            {s.emoji}
          </div>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-aubergine">
            {s.name}
          </h1>
          <p className="mt-3 font-serif text-base italic text-aubergine-soft">
            {s.tagline}
          </p>
        </div>

        {/* Bloc 1 : ce que fait la vigne */}
        <section className="mt-10">
          <SectionLabel>Côté vigne</SectionLabel>
          <h3 className="mt-1 font-serif text-2xl leading-tight text-aubergine">
            {s.vine.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-aubergine">
            {s.vine.description}
          </p>
        </section>

        {/* Bloc 2 : ce que fait le vigneron */}
        <section className="mt-10">
          <SectionLabel>Côté vigneron</SectionLabel>
          <h3 className="mt-1 font-serif text-2xl leading-tight text-aubergine">
            {s.vigneron.title}
          </h3>
          <ul className="mt-4 space-y-3">
            {s.vigneron.tasks.map((task, i) => (
              <li
                key={i}
                className="rounded-2xl border border-cream-dark bg-cream-light p-4"
              >
                <h4 className="font-serif text-base text-aubergine">
                  {task.title}
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-aubergine-soft">
                  {task.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Bloc 3 : focus */}
        <section className="mt-10 rounded-2xl bg-aubergine/[0.06] p-5">
          <SectionLabel>Zoom du mois</SectionLabel>
          <h3 className="mt-1 font-serif text-xl leading-tight text-aubergine">
            {s.focus.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-aubergine">
            {s.focus.description}
          </p>
        </section>

        {/* Bloc 4 : menaces */}
        <section className="mt-10">
          <SectionLabel>Côté risques</SectionLabel>
          <h3 className="mt-1 font-serif text-xl leading-tight text-aubergine">
            {s.threats.title}
          </h3>
          <ul className="mt-3 space-y-2">
            {s.threats.items.map((t, i) => (
              <li
                key={i}
                className="flex gap-2 rounded-xl border border-cream-dark bg-cream-light px-3 py-2 text-sm leading-snug text-aubergine"
              >
                <span aria-hidden="true" className="text-or">⚠</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Did you know */}
        <section className="mt-10 flex gap-2 rounded-xl border border-or/30 bg-or/[0.06] p-4">
          <span aria-hidden="true" className="text-or">✦</span>
          <p className="text-sm leading-relaxed italic text-aubergine">
            {s.didYouKnow}
          </p>
        </section>

        {/* Navigation entre saisons */}
        <nav
          aria-label="Naviguer entre les saisons"
          className="mt-10 flex items-stretch gap-2"
        >
          {prev ? (
            <Link
              href={`/chapitres/cycle/${prev.slug}`}
              className="flex flex-1 items-center gap-3 rounded-xl border border-cream-dark bg-cream-light p-3 transition-all hover:border-or active:scale-[0.99]"
            >
              <span className="text-2xl">{prev.emoji}</span>
              <div className="flex min-w-0 flex-col">
                <span className="font-serif text-xs italic text-champetre">
                  ← Saison précédente
                </span>
                <span className="font-serif text-sm text-aubergine">
                  {prev.name}
                </span>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link
              href={`/chapitres/cycle/${next.slug}`}
              className="flex flex-1 items-center justify-end gap-3 rounded-xl border border-cream-dark bg-cream-light p-3 text-right transition-all hover:border-or active:scale-[0.99]"
            >
              <div className="flex min-w-0 flex-col">
                <span className="font-serif text-xs italic text-champetre">
                  Saison suivante →
                </span>
                <span className="font-serif text-sm text-aubergine">
                  {next.name}
                </span>
              </div>
              <span className="text-2xl">{next.emoji}</span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>

        <div className="mt-10 text-center">
          <Link
            href="/chapitres/cycle"
            className="text-sm text-aubergine-soft underline-offset-4 hover:text-or hover:underline"
          >
            ← Le cycle complet
          </Link>
        </div>
      </main>
      </PremiumGate>
    </>
  );
}
