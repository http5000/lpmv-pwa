import { AppHeader } from "@/components/AppHeader";
import { LeconsList } from "@/components/lecons/LeconsList";
import { getLeconsContent } from "@/lib/content/lecons";

export const metadata = {
  title: "Mini-leçons — Dégustation",
  description:
    "10 questions courantes sur le vin, expliquées en 90 secondes chacune.",
};

export default function LeconsIndexPage() {
  const { lecons } = getLeconsContent();

  return (
    <>
      <AppHeader
        crumbs={[
          { label: "Chapitres", href: "/chapitres" },
          { label: "Dégustation", href: "/chapitres/degustation" },
          { label: "Mini-leçons" },
        ]}
      />
      <main className="mx-auto w-full max-w-screen-sm flex-1 px-5 pb-16 pt-6">
        <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-or">
          Module 5 / 5 — Dégustation
        </p>
        <h1 className="mt-2 font-serif text-3xl leading-tight text-aubergine">
          Mini-leçons
        </h1>
        <p className="mt-3 font-serif text-base italic text-aubergine-soft">
          Les questions qu&rsquo;on n&rsquo;ose pas poser — chacune en
          90&nbsp;secondes.
        </p>

        <section className="mt-7">
          <LeconsList lecons={lecons} />
        </section>
      </main>
    </>
  );
}
