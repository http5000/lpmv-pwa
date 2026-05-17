import Link from "next/link";
import { notFound } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import {
  CATEGORY_META,
  LECONS,
  getLeconBySlug,
} from "@/lib/content/lecons";

export async function generateStaticParams() {
  return LECONS.map((l) => ({ lecon: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lecon: string }>;
}) {
  const { lecon: slug } = await params;
  const l = getLeconBySlug(slug);
  if (!l) return {};
  return { title: `${l.title} — Mini-leçon`, description: l.hook };
}

export default async function LeconPage({
  params,
}: {
  params: Promise<{ lecon: string }>;
}) {
  const { lecon: slug } = await params;
  const l = getLeconBySlug(slug);
  if (!l) notFound();
  const cat = CATEGORY_META[l.category];

  // Prev/next dans la même catégorie ? Plus simple : prev/next dans toutes les leçons
  const index = LECONS.findIndex((x) => x.slug === slug);
  const prev = index > 0 ? LECONS[index - 1] : null;
  const next = index < LECONS.length - 1 ? LECONS[index + 1] : null;

  return (
    <>
      <AppHeader
        crumbs={[
          { label: "Chapitres", href: "/chapitres" },
          { label: "Dégustation", href: "/chapitres/degustation" },
          { label: "Mini-leçons", href: "/chapitres/degustation/lecons" },
          { label: l.title },
        ]}
      />
      <main className="mx-auto w-full max-w-screen-sm flex-1 px-5 pb-16 pt-6">
        {/* Hero */}
        <div
          className="rounded-3xl p-6 text-center"
          style={{ background: `linear-gradient(160deg, ${cat.color}33, ${cat.color}08)` }}
        >
          <p
            className="font-serif text-[10px] uppercase tracking-[0.4em]"
            style={{ color: cat.color }}
          >
            {cat.emoji} {cat.label}
          </p>
          <div className="mt-3 text-5xl" aria-hidden="true">
            {l.emoji}
          </div>
          <h1 className="mt-3 font-serif text-3xl leading-tight text-aubergine">
            {l.title}
          </h1>
          <p className="mt-2 font-serif text-base italic text-aubergine-soft">
            {l.hook}
          </p>
        </div>

        {/* Sections */}
        <article className="mt-8 space-y-5">
          {l.sections.map((s, i) => (
            <section
              key={i}
              className="rounded-2xl border border-cream-dark bg-cream-light p-4"
            >
              <h2 className="font-serif text-base text-aubergine">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-aubergine">
                {s.body}
              </p>
            </section>
          ))}
        </article>

        {/* Takeaway */}
        <section
          className="mt-8 rounded-2xl border-l-4 bg-aubergine/[0.06] p-5"
          style={{ borderLeftColor: cat.color }}
        >
          <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-or">
            À retenir
          </p>
          <p className="mt-2 font-serif text-base leading-relaxed text-aubergine">
            {l.takeaway}
          </p>
        </section>

        {/* Nav prev/next */}
        <nav className="mt-10 flex items-stretch gap-2">
          {prev ? (
            <Link
              href={`/chapitres/degustation/lecons/${prev.slug}`}
              className="flex flex-1 items-center gap-3 rounded-xl border border-cream-dark bg-cream-light p-3 transition-all hover:border-or active:scale-[0.99]"
            >
              <span className="text-2xl">{prev.emoji}</span>
              <div className="min-w-0">
                <span className="block text-[10px] uppercase tracking-wider text-champetre">
                  ← Précédent
                </span>
                <span className="truncate font-serif text-sm text-aubergine">
                  {prev.title}
                </span>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link
              href={`/chapitres/degustation/lecons/${next.slug}`}
              className="flex flex-1 items-center justify-end gap-3 rounded-xl border border-cream-dark bg-cream-light p-3 text-right transition-all hover:border-or active:scale-[0.99]"
            >
              <div className="min-w-0">
                <span className="block text-[10px] uppercase tracking-wider text-champetre">
                  Suivant →
                </span>
                <span className="truncate font-serif text-sm text-aubergine">
                  {next.title}
                </span>
              </div>
              <span className="text-2xl">{next.emoji}</span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>

        <div className="mt-8 text-center">
          <Link
            href="/chapitres/degustation/lecons"
            className="text-sm text-aubergine-soft underline-offset-4 hover:text-or hover:underline"
          >
            ← Toutes les mini-leçons
          </Link>
        </div>
      </main>
    </>
  );
}
