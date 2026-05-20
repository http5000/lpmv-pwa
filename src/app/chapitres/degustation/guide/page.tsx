import { AppHeader } from "@/components/AppHeader";
import { TastingGuide } from "@/components/degustation/TastingGuide";

export const metadata = {
  title: "Apprendre à déguster — Dégustation",
  description:
    "Œil, nez, bouche : la méthode complète pour mettre des mots sur ce que tu goûtes.",
};

export default function GuidePage() {
  return (
    <>
      <AppHeader
        crumbs={[
          { label: "Chapitres", href: "/chapitres" },
          { label: "Dégustation", href: "/chapitres/degustation" },
          { label: "Apprendre à déguster" },
        ]}
      />
      <main className="mx-auto w-full max-w-screen-sm flex-1 px-5 pb-16 pt-6">
        <p className="font-serif text-sm italic text-champetre">
          Module 1 / 5 — Dégustation
        </p>
        <h1 className="mt-2 font-serif text-3xl leading-tight text-aubergine">
          Apprendre à déguster
        </h1>

        <section className="mt-5 rounded-2xl bg-aubergine/[0.05] p-5">
          <h2 className="font-serif text-lg leading-snug text-aubergine">
            La méthode tient en 3 gestes — l&rsquo;œil, le nez, la bouche.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-aubergine">
            À chaque étape, on te propose un petit panel de mots simples pour
            décrire ce que tu perçois. Le <strong className="text-or">«&nbsp;+&nbsp;»</strong>{" "}
            ouvre un vocabulaire plus précis si tu veux affiner.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-aubergine-soft">
            À la fin, tu enregistres ton ressenti dans ton carnet. Pas besoin
            d&rsquo;avoir le bon mot — il faut juste avoir tes mots.
          </p>
        </section>

        <section className="mt-8">
          <TastingGuide />
        </section>
      </main>
    </>
  );
}
