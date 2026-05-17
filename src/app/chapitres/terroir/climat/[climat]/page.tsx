import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import {
  getAllClimatSlugs,
  getClimatBySlug,
  getClimatsContent,
} from "@/lib/content/climats";

export async function generateStaticParams() {
  return getAllClimatSlugs().map((climat) => ({ climat }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ climat: string }>;
}) {
  const { climat: slug } = await params;
  const c = getClimatBySlug(slug);
  if (!c) return {};
  return {
    title: `${c.title} — Climats du Terroir`,
    description: c.subtitle,
  };
}

function Block({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-cream-dark bg-cream-light p-4 ${className}`}
    >
      <h2 className="font-serif text-[10px] uppercase tracking-[0.3em] text-or">
        {label}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-aubergine">{value}</p>
    </section>
  );
}

export default async function ClimatPage({
  params,
}: {
  params: Promise<{ climat: string }>;
}) {
  const { climat: slug } = await params;
  const c = getClimatBySlug(slug);
  if (!c) notFound();
  const { climats, labels } = getClimatsContent();

  const index = climats.findIndex((x) => x.slug === slug);
  const prev = index > 0 ? climats[index - 1] : null;
  const next = index < climats.length - 1 ? climats[index + 1] : null;

  return (
    <>
      <AppHeader
        crumbs={[
          { label: "Terroir", href: "/chapitres/terroir" },
          { label: "Climat", href: "/chapitres/terroir/climat" },
          { label: c.title.replace(/^Climat\s+/i, "") },
        ]}
      />
      <main className="mx-auto w-full max-w-screen-sm flex-1 pb-16">
        {/* Hero */}
        <div
          className="relative flex aspect-[16/10] w-full items-center justify-center"
          style={{
            background: `linear-gradient(180deg, ${c.accent}33, ${c.accent}0A)`,
          }}
        >
          <Image
            src={c.image}
            alt={c.alt}
            width={500}
            height={350}
            priority
            className="max-h-full w-auto object-contain p-6"
          />
        </div>

        <div className="px-5 pt-6">
          <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-or">
            Climat
          </p>
          <h1 className="mt-2 font-serif text-3xl leading-tight text-aubergine">
            {c.title}
          </h1>
          <p className="mt-2 font-serif text-base italic text-aubergine-soft">
            {c.subtitle}
          </p>
        </div>

        <article className="space-y-3 px-5 pt-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Block label={labels.growth} value={c.growth} />
            <Block label={labels.ripening} value={c.ripening} />
          </div>
          <Block
            label={labels.style}
            value={c.style}
            className="bg-aubergine/[0.06]"
          />
          <Block
            label={labels.fruity}
            value={c.fruity}
            className="border-or/30 bg-or/[0.06]"
          />
        </article>

        {/* Nav prev/next */}
        <nav
          aria-label="Naviguer entre les climats"
          className="mt-8 flex items-stretch gap-2 px-5"
        >
          {prev ? (
            <Link
              href={`/chapitres/terroir/climat/${prev.slug}`}
              className="flex flex-1 flex-col rounded-xl border border-cream-dark bg-cream-light p-3 transition-all hover:border-or active:scale-[0.99]"
            >
              <span className="text-[10px] uppercase tracking-wider text-champetre">
                ← Précédent
              </span>
              <span className="truncate font-serif text-sm text-aubergine">
                {prev.title.replace(/^Climat\s+/i, "")}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link
              href={`/chapitres/terroir/climat/${next.slug}`}
              className="flex flex-1 flex-col items-end rounded-xl border border-cream-dark bg-cream-light p-3 text-right transition-all hover:border-or active:scale-[0.99]"
            >
              <span className="text-[10px] uppercase tracking-wider text-champetre">
                Suivant →
              </span>
              <span className="truncate font-serif text-sm text-aubergine">
                {next.title.replace(/^Climat\s+/i, "")}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>

        <div className="mt-10 text-center">
          <Link
            href="/chapitres/terroir/climat"
            className="text-sm text-aubergine-soft underline-offset-4 hover:text-or hover:underline"
          >
            ← Tous les climats
          </Link>
        </div>
      </main>
    </>
  );
}
