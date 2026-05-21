import { AppHeader } from "@/components/AppHeader";
import { PremiumGate } from "@/components/PremiumGate";
import { SwipeQuiz } from "@/components/bio-conv/SwipeQuiz";
import { getBioConvContent } from "@/lib/content/bio-conv";

export const metadata = {
  title: "Bio vs Conventionnel — Vigne & Viticulture",
  description: "8 affirmations à classer Vrai ou Faux pour démêler les idées reçues.",
};

export default function BioConvPage() {
  const content = getBioConvContent();

  return (
    <>
      <AppHeader
        crumbs={[
          { label: "Chapitres", href: "/chapitres" },
          { label: "Vigne", href: "/chapitres/vigne" },
          { label: "Bio vs Conventionnel" },
        ]}
      />
      <PremiumGate label="Bio vs Conventionnel">
      <main className="mx-auto w-full max-w-screen-sm flex-1 px-5 pb-16 pt-6">
        <p className="font-serif text-sm italic text-champetre">
          Module 3 / 4 — Vigne & Viticulture
        </p>
        <h1 className="mt-2 font-serif text-3xl leading-tight text-aubergine">
          {content.title}
        </h1>

        <section className="mt-6">
          <SwipeQuiz content={content} />
        </section>
      </main>
      </PremiumGate>
    </>
  );
}
