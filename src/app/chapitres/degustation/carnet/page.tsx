import Link from "next/link";
import { AppHeader } from "@/components/AppHeader";
import { CarnetList } from "@/components/degustation/CarnetList";
import { AuthStatusPill } from "@/components/account/AuthStatusPill";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Mon carnet de cave — Dégustation",
  description: "Toutes tes dégustations enregistrées, en un seul endroit.",
};

export default async function CarnetPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  const email = data.user?.email ?? null;

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
        <AuthStatusPill email={email} next="/chapitres/degustation/carnet" />

        <section className="mt-6">
          <CarnetList />
        </section>
      </main>
    </>
  );
}
