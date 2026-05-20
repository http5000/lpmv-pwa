import Image from "next/image";
import { AppHeader } from "@/components/AppHeader";
import { VinificationTabs } from "@/components/raisin-vin/VinificationTabs";
import { getRaisinVinContent } from "@/lib/content/raisin-vin";

export const metadata = {
  title: "Du raisin au vin — Vinification",
  description:
    "Rouge, blanc, rosé, orange : 4 chemins de vinification à partir du même fruit.",
};

export default function RaisinVinPage() {
  const { start, paths } = getRaisinVinContent();

  return (
    <>
      <AppHeader
        crumbs={[
          { label: "Chapitres", href: "/chapitres" },
          { label: "Vinification", href: "/chapitres/vinification" },
          { label: "Du raisin au vin" },
        ]}
      />
      <main className="mx-auto w-full max-w-screen-sm flex-1 px-5 pb-16 pt-6">
        <p className="font-serif text-sm italic text-champetre">
          Module 1 / 3 — Vinification
        </p>
        <h1 className="mt-2 font-serif text-3xl leading-tight text-aubergine">
          {start.title}
        </h1>

        {/* Hero illustration */}
        <div className="relative mt-5 aspect-video w-full overflow-hidden rounded-2xl bg-cream-light">
          <Image
            src="/raisin-vin/start/main.png"
            alt=""
            fill
            className="object-contain p-3"
            priority
          />
        </div>

        {/* Intro */}
        <section className="mt-5 rounded-2xl bg-aubergine/[0.05] p-5">
          <div
            className="prose prose-sm max-w-none text-sm leading-relaxed text-aubergine [&_p]:my-2 [&_strong]:text-or"
            dangerouslySetInnerHTML={{ __html: start.content }}
          />
        </section>

        {/* Tabs Rouge/Blanc/Rosé/Orange */}
        <section className="mt-8">
          <VinificationTabs paths={paths} />
        </section>
      </main>
    </>
  );
}
