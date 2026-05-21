import Image from "next/image";
import { AppHeader } from "@/components/AppHeader";
import { PremiumGate } from "@/components/PremiumGate";
import { getPhylloxeraContent } from "@/lib/content/phylloxera";

export const metadata = {
  title: "Le cousin d'Amérique — Vigne & Viticulture",
  description:
    "Comment un puceron américain a failli tuer le vin français — et comment l'Amérique l'a sauvé.",
};

function ActLabel({ num, label }: { num: number; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-serif text-4xl leading-none text-or/40">
        {String(num).padStart(2, "0")}
      </span>
      <span className="font-serif text-sm italic text-or">
        Acte {num} — {label}
      </span>
    </div>
  );
}

function DidYouKnow({ html }: { html: string }) {
  return (
    <div className="mt-5 flex gap-2 rounded-xl border border-or/30 bg-or/[0.06] p-3">
      <span aria-hidden="true" className="text-or">✦</span>
      <p
        className="text-sm leading-relaxed italic text-aubergine [&_strong]:not-italic [&_strong]:text-or"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

export default function PhylloxeraPage() {
  const c = getPhylloxeraContent();

  return (
    <>
      <AppHeader
        crumbs={[
          { label: "Chapitres", href: "/chapitres" },
          { label: "Vigne", href: "/chapitres/vigne" },
          { label: "Phylloxéra" },
        ]}
      />
      <PremiumGate label="Le Phylloxera">
      <main className="mx-auto w-full max-w-screen-sm flex-1 px-5 pb-16 pt-6">
        <p className="font-serif text-sm italic text-champetre">
          Module 2 / 4 — Vigne & Viticulture
        </p>
        <h1 className="mt-2 font-serif text-3xl leading-tight text-aubergine">
          {c.start.title}
        </h1>
        <p
          className="mt-3 font-serif text-base italic text-aubergine-soft [&_strong]:not-italic [&_strong]:text-or"
          dangerouslySetInnerHTML={{ __html: c.start.info }}
        />

        {/* ACTE 1 — Le fléau */}
        <section className="mt-10">
          <ActLabel num={1} label="Le fléau invisible" />
          <h2 className="mt-2 font-serif text-2xl leading-tight text-aubergine">
            {c.slide1.title}
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-cream-dark bg-cream-light">
              <div className="aspect-video relative bg-cream">
                <Image
                  src="/phylloxera/slide_1/top.png"
                  alt="Phylloxéra sur les racines"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="p-4">
                <h3 className="font-serif text-sm text-or">{c.slide1.what.title}</h3>
                <p
                  className="mt-2 text-sm leading-relaxed text-aubergine [&_strong]:text-or"
                  dangerouslySetInnerHTML={{ __html: c.slide1.what.content }}
                />
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-cream-dark bg-cream-light">
              <div className="aspect-video relative bg-cream">
                <Image
                  src="/phylloxera/slide_1/bottom.png"
                  alt="Vignoble dévasté"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="p-4">
                <h3 className="font-serif text-sm text-or">{c.slide1.consequence.title}</h3>
                <p
                  className="mt-2 text-sm leading-relaxed text-aubergine [&_strong]:text-or"
                  dangerouslySetInnerHTML={{ __html: c.slide1.consequence.content }}
                />
              </div>
            </div>
          </div>

          <p className="mt-3 text-xs italic text-aubergine-soft">{c.slide1.info}</p>
          <DidYouKnow html={c.slide1.didYouKnow} />
        </section>

        {/* ACTE 2 — Le salut */}
        <section className="mt-12">
          <ActLabel num={2} label="Le salut" />
          <h2 className="mt-2 font-serif text-2xl leading-tight text-aubergine">
            {c.slide2.title}
          </h2>

          <ol className="mt-4 space-y-3">
            {c.slide2.items.map((it, i) => (
              <li key={it.id} className="flex gap-3 rounded-2xl border border-cream-dark bg-cream-light p-4">
                <div className="relative h-16 w-16 shrink-0 rounded-xl bg-cream">
                  <Image
                    src={`/phylloxera/slide_2/${i + 1}.png`}
                    alt=""
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-base text-aubergine">{it.title}</h3>
                  <p
                    className="mt-1 text-sm leading-relaxed text-aubergine [&_em]:text-aubergine-soft [&_strong]:text-or"
                    dangerouslySetInnerHTML={{ __html: it.content }}
                  />
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ACTE 3 — La greffe */}
        <section className="mt-12">
          <ActLabel num={3} label="Le geste qui sauve" />
          <h2 className="mt-2 font-serif text-2xl leading-tight text-aubergine">
            {c.slide3.title}
          </h2>
          <p className="mt-2 text-sm italic text-aubergine-soft">
            Les 5 étapes du geste, à découvrir une à une.
          </p>

          <ol className="mt-4 space-y-3">
            {c.slide3.items.map((step) => (
              <li
                key={step.imgId}
                className="flex flex-col gap-3 rounded-2xl border border-cream-dark bg-cream-light p-4 sm:flex-row sm:items-start"
              >
                <div className="relative h-32 w-full shrink-0 rounded-xl bg-cream sm:h-24 sm:w-24">
                  <Image
                    src={`/phylloxera/slide_3/${step.imgId}.png`}
                    alt=""
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-base text-aubergine">{step.title}</h3>
                  <div
                    className="mt-1 text-sm leading-relaxed text-aubergine [&_li]:my-0.5 [&_strong]:text-or [&_ul]:mt-1 [&_ul]:list-disc [&_ul]:pl-5"
                    dangerouslySetInnerHTML={{ __html: step.content }}
                  />
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ACTE 4 — Autres ennemis */}
        <section className="mt-12">
          <ActLabel num={4} label="Les autres ennemis" />
          <h2 className="mt-2 font-serif text-2xl leading-tight text-aubergine">
            {c.slide4.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-aubergine-soft">
            {c.slide4.info}
          </p>

          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {c.slide4.items.map((mal) => (
              <li
                key={mal.id}
                className="overflow-hidden rounded-2xl border border-cream-dark bg-cream-light"
              >
                <div className="relative aspect-square bg-cream">
                  <Image
                    src={`/phylloxera/slide_4/${mal.imgId}.png`}
                    alt=""
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-serif text-sm text-aubergine">{mal.title}</h3>
                  <p className="mt-1 text-xs leading-snug text-aubergine-soft">
                    {mal.content}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-3 text-xs italic text-aubergine-soft">
            {c.slide4.bottomInfo}
          </p>
          <DidYouKnow html={c.slide4.didYouKnow} />
        </section>

        {/* ACTE 5 — Qui a décidé */}
        <section className="mt-12">
          <ActLabel num={5} label="L'intelligence collective" />
          <h2 className="mt-2 font-serif text-2xl leading-tight text-aubergine">
            {c.slide5.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-aubergine">
            {c.slide5.info}
          </p>

          <ol className="mt-4 space-y-2">
            {c.slide5.items.map((step) => (
              <li
                key={step.number}
                className="flex gap-3 rounded-xl border border-cream-dark bg-cream-light p-3"
              >
                <span className="font-serif text-2xl leading-none text-or/40">
                  {step.number}
                </span>
                <p className="text-sm leading-relaxed text-aubergine">
                  {step.content}
                </p>
              </li>
            ))}
          </ol>

          <p
            className="mt-3 text-sm italic text-aubergine-soft [&_strong]:not-italic [&_strong]:text-or"
            dangerouslySetInnerHTML={{ __html: c.slide5.bottomInfo }}
          />
          <DidYouKnow html={c.slide5.didYouKnow} />
        </section>

        {/* ACTE 6 — Conclusion */}
        <section className="mt-12 rounded-3xl bg-aubergine/[0.06] p-6">
          <ActLabel num={6} label="Épilogue" />
          <h2 className="mt-2 font-serif text-2xl leading-tight text-aubergine">
            {c.slide6.title}
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="relative aspect-square rounded-xl bg-cream-light">
              <Image
                src="/phylloxera/slide_6/top.png"
                alt=""
                fill
                className="object-contain p-2"
              />
            </div>
            <div className="relative aspect-square rounded-xl bg-cream-light sm:col-start-2">
              <Image
                src="/phylloxera/slide_6/center.png"
                alt=""
                fill
                className="object-contain p-2"
              />
            </div>
          </div>

          <div
            className="mt-5 space-y-3 text-sm leading-relaxed text-aubergine [&_p]:my-0 [&_strong]:text-or"
            dangerouslySetInnerHTML={{
              __html: c.slide6.topInfo + c.slide6.centerInfo + c.slide6.bottomInfo,
            }}
          />

          <p className="mt-5 border-t border-or/20 pt-4 font-serif text-base italic text-or">
            « {c.slide6.didYouKnow} »
          </p>
        </section>
      </main>
      </PremiumGate>
    </>
  );
}
