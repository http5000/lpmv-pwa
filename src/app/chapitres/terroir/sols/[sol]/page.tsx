import Link from "next/link";
import { notFound } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import {
  getAllSolSlugs,
  getSolBySlug,
  getSolsContent,
} from "@/lib/content/sols";

export async function generateStaticParams() {
  return getAllSolSlugs().map((sol) => ({ sol }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sol: string }>;
}) {
  const { sol: slug } = await params;
  const sol = getSolBySlug(slug);
  if (!sol) return {};
  return {
    title: `${sol.title} — Sols du Terroir`,
    description: sol.profile.join(" · "),
  };
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-parchment-dark py-4">
      <h2 className="font-serif text-[10px] uppercase tracking-[0.3em] text-burgundy">
        {label}
      </h2>
      <div className="mt-2 text-sm leading-relaxed text-olive">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2">
          <span aria-hidden="true" className="text-burgundy">
            •
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function SolPage({
  params,
}: {
  params: Promise<{ sol: string }>;
}) {
  const { sol: slug } = await params;
  const sol = getSolBySlug(slug);
  if (!sol) notFound();
  const { labels, sols } = getSolsContent();

  // Navigation entre sols (suivant/précédent dans l'ordre du JSON)
  const index = sols.findIndex((s) => s.slug === slug);
  const prev = index > 0 ? sols[index - 1] : null;
  const next = index < sols.length - 1 ? sols[index + 1] : null;

  return (
    <>
      <AppHeader
        crumbs={[
          { label: "Terroir", href: "/chapitres/terroir" },
          { label: "Sols", href: "/chapitres/terroir/sols" },
          { label: sol.shortTitle },
        ]}
      />
      <main className="mx-auto w-full max-w-screen-sm flex-1 pb-16">
        {/* Hero — tampon visuel + titre */}
        <div
          className="relative aspect-[3/2] w-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${sol.color}F0, ${sol.color} 50%, ${sol.color}99 100%)`,
          }}
          role="img"
          aria-label={sol.swatch}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-parchment/85" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span className="rounded-full bg-parchment-light/95 px-3 py-1 font-serif text-[10px] uppercase tracking-[0.3em] text-burgundy">
              Sol n°{sol.id}
            </span>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-olive">
              {sol.title}
            </h1>
          </div>
        </div>

        <article className="px-5 pt-5">
          {/* Identité du sol */}
          <Section label={labels.origin}>{sol.origin}</Section>
          <Section label={labels.texture}>{sol.texture}</Section>
          <Section label={labels.areas}>{sol.areas}</Section>
          <Section label={labels.climate}>{sol.climate}</Section>
          <Section label={labels.grape_varieties}>{sol.grape_varieties}</Section>

          {/* Le profil de vin (mise en valeur) */}
          <section className="my-6 rounded-2xl bg-burgundy/[0.06] p-5">
            <h2 className="font-serif text-[10px] uppercase tracking-[0.3em] text-burgundy">
              {labels.profile}
            </h2>
            <div className="mt-3 text-sm leading-relaxed text-olive">
              <List items={sol.profile} />
            </div>
          </section>

          <Section label={labels.appellations}>{sol.appellations}</Section>

          <Section label={labels.advantages}>
            <List items={sol.advantages} />
          </Section>
          <Section label={labels.constraints}>
            <List items={sol.constraints} />
          </Section>
        </article>

        {/* Navigation entre sols */}
        <nav
          aria-label="Naviguer entre les sols"
          className="mt-8 flex items-stretch gap-2 px-5"
        >
          {prev ? (
            <Link
              href={`/chapitres/terroir/sols/${prev.slug}`}
              className="flex flex-1 flex-col rounded-xl border border-parchment-dark bg-parchment-light p-3 transition-all hover:border-burgundy active:scale-[0.99]"
            >
              <span className="text-[10px] uppercase tracking-wider text-earth-soft">
                ← Précédent
              </span>
              <span className="font-serif text-sm text-olive">
                {prev.shortTitle}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link
              href={`/chapitres/terroir/sols/${next.slug}`}
              className="flex flex-1 flex-col items-end rounded-xl border border-parchment-dark bg-parchment-light p-3 text-right transition-all hover:border-burgundy active:scale-[0.99]"
            >
              <span className="text-[10px] uppercase tracking-wider text-earth-soft">
                Suivant →
              </span>
              <span className="font-serif text-sm text-olive">
                {next.shortTitle}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>

        <div className="mt-10 text-center">
          <Link
            href="/chapitres/terroir/sols"
            className="text-sm text-olive-soft underline-offset-4 hover:text-burgundy hover:underline"
          >
            ← Tous les sols
          </Link>
        </div>
      </main>
    </>
  );
}
