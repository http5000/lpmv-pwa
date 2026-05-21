import { AppHeader } from "@/components/AppHeader";
import { PremiumGate } from "@/components/PremiumGate";
import { ClimatsGallery } from "@/components/climats/ClimatsGallery";
import { getClimatsContent } from "@/lib/content/climats";

export const metadata = {
  title: "Le climat façonne le vin — Terroir",
  description:
    "13 climats, 13 personnalités de vin. Du Pacifique tropical aux pentes alpines, la météo change tout dans le verre.",
};

export default function ClimatPage() {
  const { title, subtitle, info, climats, families, labels } =
    getClimatsContent();

  return (
    <>
      <AppHeader
        crumbs={[
          { label: "Chapitres", href: "/chapitres" },
          { label: "Terroir", href: "/chapitres/terroir" },
          { label: "Climat" },
        ]}
      />
      <PremiumGate label="Climats du Terroir">
      <main className="mx-auto w-full max-w-screen-sm flex-1 px-5 pb-16 pt-6">
        <p className="font-serif text-sm italic text-champetre">
          Module 2 / 3 — Terroir
        </p>
        <h1 className="mt-2 font-serif text-3xl leading-tight text-aubergine">
          {title}
        </h1>
        <p className="mt-2 font-serif text-lg italic text-aubergine-soft">
          {subtitle}
        </p>

        {/* Le saviez-vous (intro) */}
        <details className="mt-5 rounded-xl bg-cream-light p-4 open:bg-cream-dark/40">
          <summary className="cursor-pointer list-none font-serif text-sm text-or">
            ✦ Le saviez-vous&nbsp;? <span className="text-aubergine-soft underline-offset-4">Lire</span>
          </summary>
          <div className="mt-3 space-y-2 text-sm leading-relaxed text-aubergine">
            <p>
              <strong className="text-or">{info.firstMain}</strong>{" "}
              {info.firstSecond}
            </p>
            <p>{info.second}</p>
            <p>
              {info.thirdMain} <strong className="text-or">{info.thirdBold}</strong>
            </p>
          </div>
        </details>

        {/* Consigne tactile */}
        <p className="mt-7 font-serif text-base italic text-aubergine-soft">
          {`Touche un climat pour observer son influence.`}
        </p>

        <div className="mt-6">
          <ClimatsGallery climats={climats} families={families} labels={labels} />
        </div>

        <div className="mt-12 text-center text-sm text-aubergine-soft">
          {climats.length} climats à explorer
        </div>
      </main>
      </PremiumGate>
    </>
  );
}
