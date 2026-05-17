import Link from "next/link";
import { notFound } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import { CHAPITRES, getChapitreBySlug } from "@/lib/chapitres";

export async function generateStaticParams() {
  return CHAPITRES.map((c) => ({ chapitre: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapitre: string }>;
}) {
  const { chapitre: slug } = await params;
  const chapitre = getChapitreBySlug(slug);
  if (!chapitre) return {};
  return {
    title: `${chapitre.title} — Le Petit Musée du Vin`,
    description: chapitre.subtitle,
  };
}

export default async function ChapitrePage({
  params,
}: {
  params: Promise<{ chapitre: string }>;
}) {
  const { chapitre: slug } = await params;
  const chapitre = getChapitreBySlug(slug);
  if (!chapitre) notFound();

  return (
    <>
      <AppHeader
        crumbs={[
          { label: "Les chapitres", href: "/chapitres" },
          { label: chapitre.title },
        ]}
      />
      <main className="mx-auto w-full max-w-screen-sm flex-1 px-5 pb-16 pt-6">
        {/* Hero du chapitre */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: `linear-gradient(135deg, ${chapitre.accent}18, transparent)`,
          }}
        >
          <span className="text-4xl" aria-hidden="true">
            {chapitre.emoji}
          </span>
          <p className="mt-3 font-serif text-[10px] uppercase tracking-[0.3em] text-burgundy">
            Chapitre
          </p>
          <h1 className="mt-1 font-serif text-3xl leading-tight text-olive">
            {chapitre.title}
          </h1>
          <p className="mt-2 text-sm text-olive-soft">{chapitre.subtitle}</p>

          {/* Voix du mentor */}
          <blockquote className="mt-5 border-l-2 border-burgundy pl-3 text-sm italic text-olive-soft">
            &ldquo;{chapitre.mentorIntro}&rdquo;
            <footer className="mt-1 text-xs not-italic text-earth-soft">
              — Le Mentor
            </footer>
          </blockquote>
        </div>

        {/* Modules */}
        <h2 className="mt-8 font-serif text-xl text-olive">
          {chapitre.modules.length} étape
          {chapitre.modules.length > 1 ? "s" : ""}
        </h2>
        <ol className="mt-4 flex flex-col gap-3">
          {chapitre.modules.map((mod, idx) => {
            const isAvailable = mod.status === "available";
            const inner = (
              <>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-lg text-earth-soft">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3
                      className={`font-serif text-lg leading-tight ${
                        isAvailable ? "text-olive" : "text-olive-soft"
                      }`}
                    >
                      {mod.title}
                    </h3>
                    <p className="mt-1 text-sm text-olive-soft">{mod.teaser}</p>
                  </div>
                  {isAvailable ? (
                    <span
                      aria-hidden="true"
                      className="self-center text-burgundy"
                    >
                      →
                    </span>
                  ) : (
                    <span className="self-center rounded-full bg-parchment-dark px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-earth-soft">
                      Bientôt
                    </span>
                  )}
                </div>
              </>
            );

            return (
              <li key={mod.slug}>
                {isAvailable ? (
                  <Link
                    href={`/chapitres/${chapitre.slug}/${mod.slug}`}
                    className="group block rounded-xl border border-parchment-dark bg-parchment-light p-4 transition-all hover:border-burgundy hover:shadow-sm active:scale-[0.99]"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className="block rounded-xl border border-dashed border-parchment-dark bg-parchment-light/50 p-4">
                    {inner}
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-12 text-center">
          <Link
            href="/chapitres"
            className="text-sm text-olive-soft underline-offset-4 hover:text-burgundy hover:underline"
          >
            ← Tous les chapitres
          </Link>
        </div>
      </main>
    </>
  );
}
