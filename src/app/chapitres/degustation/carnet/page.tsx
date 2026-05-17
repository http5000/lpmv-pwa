import Link from "next/link";
import { AppHeader } from "@/components/AppHeader";
import { CarnetList } from "@/components/degustation/CarnetList";

export const metadata = {
  title: "Mon carnet de cave — Dégustation",
  description: "Toutes tes dégustations enregistrées, en un seul endroit.",
};

export default function CarnetPage() {
  return (
    <>
      <AppHeader
        crumbs={[
          { label: "Chapitres", href: "/chapitres" },
          { label: "Dégustation", href: "/chapitres/degustation" },
          { label: "Mon carnet" },
        ]}
      />
      <main className="mx-auto w-full max-w-screen-sm flex-1 px-5 pb-16 pt-6">
        <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-or">
          Module 2 / 5 — Dégustation
        </p>
        <div className="mt-2 flex items-baseline justify-between gap-3">
          <h1 className="font-serif text-3xl leading-tight text-aubergine">
            Mon carnet
          </h1>
          <Link
            href="/chapitres/degustation/guide"
            className="rounded-full bg-aubergine px-4 py-2 font-serif text-xs text-cream-light"
          >
            + Nouvelle dégustation
          </Link>
        </div>

        <section className="mt-6">
          <CarnetList />
        </section>
      </main>
    </>
  );
}
