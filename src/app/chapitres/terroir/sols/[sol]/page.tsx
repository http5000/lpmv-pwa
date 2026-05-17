import Image from "next/image";
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
  iconSrc,
  label,
  children,
}: {
  iconSrc: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-cream-dark py-5">
      <div className="flex items-center gap-2">
        <Image src={iconSrc} alt="" width={28} height={28} className="h-7 w-7" />
        <h2 className="font-serif text-[10px] uppercase tracking-[0.3em] text-or">
          {label}
        </h2>
      </div>
      <div className="mt-2 pl-9 text-sm leading-relaxed text-aubergine">
        {children}
      </div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2">
          <span aria-hidden="true" className="text-or">
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
  const { labels, icons, sols } = getSolsContent();

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
        {/* Hero — image détourée du sol sur fond doux */}
        <div
          className="relative flex aspect-[4/3] w-full items-center justify-center px-6"
          style={{
            background: `radial-gradient(circle at 50% 40%, ${sol.color}1A, transparent 70%)`,
          }}
        >
          <Image
            src={sol.imageFull}
            alt={sol.alt}
            width={500}
            height={400}
            priority
            className="max-h-full w-auto object-contain drop-shadow-lg"
          />
        </div>

        <div className="px-5 pt-6">
          <span className="rounded-full bg-aubergine/[0.08] px-3 py-1 font-serif text-[10px] uppercase tracking-[0.3em] text-aubergine">
            Sol n°{sol.id}
          </span>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-aubergine">
            {sol.title}
          </h1>
        </div>

        <article className="px-5 pt-4">
          {/* Identité du sol */}
          <Section iconSrc={icons.origin} label={labels.origin}>
            {sol.origin}
          </Section>
          <Section iconSrc={icons.texture} label={labels.texture}>
            {sol.texture}
          </Section>
          <Section iconSrc={icons.areas} label={labels.areas}>
            {sol.areas}
          </Section>
          <Section iconSrc={icons.climate} label={labels.climate}>
            {sol.climate}
          </Section>
          <Section iconSrc={icons.grape_varieties} label={labels.grape_varieties}>
            {sol.grape_varieties}
          </Section>

          {/* Le profil de vin (mise en valeur) */}
          <section className="my-6 rounded-2xl bg-aubergine/[0.06] p-5">
            <div className="flex items-center gap-2">
              <Image
                src={icons.profile}
                alt=""
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <h2 className="font-serif text-[10px] uppercase tracking-[0.3em] text-or">
                {labels.profile}
              </h2>
            </div>
            <div className="mt-3 text-sm leading-relaxed text-aubergine">
              <List items={sol.profile} />
            </div>
          </section>

          <Section iconSrc={icons.appellations} label={labels.appellations}>
            {sol.appellations}
          </Section>

          <Section iconSrc={icons.advantages} label={labels.advantages}>
            <List items={sol.advantages} />
          </Section>
          <Section iconSrc={icons.constraints} label={labels.constraints}>
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
              className="flex flex-1 items-center gap-3 rounded-xl border border-cream-dark bg-cream-light p-3 transition-all hover:border-or active:scale-[0.99]"
            >
              <Image
                src={prev.image}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 object-contain"
              />
              <div className="flex min-w-0 flex-col">
                <span className="text-[10px] uppercase tracking-wider text-champetre">
                  ← Précédent
                </span>
                <span className="truncate font-serif text-sm text-aubergine">
                  {prev.shortTitle}
                </span>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link
              href={`/chapitres/terroir/sols/${next.slug}`}
              className="flex flex-1 items-center justify-end gap-3 rounded-xl border border-cream-dark bg-cream-light p-3 text-right transition-all hover:border-or active:scale-[0.99]"
            >
              <div className="flex min-w-0 flex-col">
                <span className="text-[10px] uppercase tracking-wider text-champetre">
                  Suivant →
                </span>
                <span className="truncate font-serif text-sm text-aubergine">
                  {next.shortTitle}
                </span>
              </div>
              <Image
                src={next.image}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 object-contain"
              />
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>

        <div className="mt-10 text-center">
          <Link
            href="/chapitres/terroir/sols"
            className="text-sm text-aubergine-soft underline-offset-4 hover:text-or hover:underline"
          >
            ← Tous les sols
          </Link>
        </div>
      </main>
    </>
  );
}
