import Image from "next/image";
import { AppHeader } from "@/components/AppHeader";
import { PremiumGate } from "@/components/PremiumGate";
import { getBiodynamieContent } from "@/lib/content/biodynamie";

export const metadata = {
  title: "Biodynamie, entre ciel et terre — Vigne & Viticulture",
  description:
    "Principes, gestes, défis et philosophie de la biodynamie en 8 stations.",
};

function ActLabel({ num, label }: { num: number; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-serif text-4xl leading-none text-or/40">
        {String(num).padStart(2, "0")}
      </span>
      <span className="font-serif text-sm italic text-or">
        {label}
      </span>
    </div>
  );
}

function DidYouKnow({ text }: { text: string }) {
  return (
    <div className="mt-5 flex gap-2 rounded-xl border border-or/30 bg-or/[0.06] p-3">
      <span aria-hidden="true" className="text-or">✦</span>
      <p className="text-sm leading-relaxed italic text-aubergine">{text}</p>
    </div>
  );
}

/** Petit barchart visuel pour comparer les rendements 55/40/25 hl/ha. */
function RendementsBar({
  label,
  hl,
  max,
  highlight,
}: {
  label: string;
  hl: number;
  max: number;
  highlight?: boolean;
}) {
  const pct = (hl / max) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span
          className={`font-serif ${
            highlight ? "text-aubergine" : "text-aubergine-soft"
          }`}
        >
          {label}
        </span>
        <span className="font-serif text-or">
          {hl}{" "}
          <span className="text-xs text-aubergine-soft">hl/ha</span>
        </span>
      </div>
      <div className="mt-1 h-3 overflow-hidden rounded-full bg-cream-dark/60">
        <div
          className={`h-full rounded-full ${highlight ? "bg-aubergine" : "bg-or/60"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function BiodynamiePage() {
  const c = getBiodynamieContent();
  const maxYield = 55;

  return (
    <>
      <AppHeader
        crumbs={[
          { label: "Chapitres", href: "/chapitres" },
          { label: "Vigne", href: "/chapitres/vigne" },
          { label: "Biodynamie" },
        ]}
      />
      <PremiumGate label="Biodynamie">
      <main className="mx-auto w-full max-w-screen-sm flex-1 px-5 pb-16 pt-6">
        <p className="font-serif text-sm italic text-champetre">
          Module 4 / 4 — Vigne & Viticulture
        </p>
        <h1 className="mt-2 font-serif text-3xl leading-tight text-aubergine">
          {c.start.title}
        </h1>
        <p className="mt-2 font-serif text-base italic text-aubergine-soft">
          {c.start.info}
        </p>

        {/* HERO image */}
        <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-2xl bg-cream-light">
          <Image
            src="/biodynamie/start/main.png"
            alt=""
            fill
            className="object-contain p-3"
            priority
          />
        </div>

        {/* ACTE 1 — Les principes */}
        <section className="mt-10">
          <ActLabel num={1} label="Les principes" />
          <h2 className="mt-2 font-serif text-2xl leading-tight text-aubergine">
            {c.slide1.title}
          </h2>
          <ol className="mt-4 space-y-3">
            {c.slide1.items.map((it, i) => (
              <li
                key={it.id}
                className="flex gap-3 rounded-2xl border border-cream-dark bg-cream-light p-4"
              >
                <div className="relative h-16 w-16 shrink-0 rounded-xl bg-cream">
                  <Image
                    src={`/biodynamie/slide_1/${i + 1}.png`}
                    alt=""
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div
                  className="min-w-0 text-sm leading-relaxed text-aubergine [&_li]:my-0.5 [&_strong]:text-or [&_ul]:mt-1 [&_ul]:list-disc [&_ul]:pl-5"
                  dangerouslySetInnerHTML={{ __html: it.content ?? "" }}
                />
              </li>
            ))}
          </ol>
          <DidYouKnow text={c.slide1.didYouKnow} />
        </section>

        {/* ACTE 2 — Dans les vignes */}
        <section className="mt-12">
          <ActLabel num={2} label="Au vignoble" />
          <h2 className="mt-2 font-serif text-2xl leading-tight text-aubergine">
            {c.slide2.title}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {c.slide2.items.map((it, i) => (
              <li
                key={it.id}
                className="overflow-hidden rounded-2xl border border-cream-dark bg-cream-light"
              >
                <div className="relative aspect-video bg-cream">
                  <Image
                    src={`/biodynamie/slide_2/${i + 1}.png`}
                    alt=""
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <p className="p-3 text-sm leading-snug text-aubergine">
                  {it.content}
                </p>
              </li>
            ))}
          </ul>
          <DidYouKnow text={c.slide2.didYouKnow} />
        </section>

        {/* ACTE 3 — Dans la cave */}
        <section className="mt-12">
          <ActLabel num={3} label="À la cave" />
          <h2 className="mt-2 font-serif text-2xl leading-tight text-aubergine">
            {c.slide3.title}
          </h2>
          <ul className="mt-4 space-y-3">
            {c.slide3.items.map((it, i) => (
              <li
                key={it.id}
                className="flex gap-3 rounded-2xl border border-cream-dark bg-cream-light p-4"
              >
                <div className="relative h-16 w-16 shrink-0 rounded-xl bg-cream">
                  <Image
                    src={`/biodynamie/slide_3/${i + 1}.png`}
                    alt=""
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <p className="min-w-0 text-sm leading-relaxed text-aubergine">
                  {it.text}
                </p>
              </li>
            ))}
          </ul>
          <DidYouKnow text={c.slide3.didYouKnow} />
        </section>

        {/* ACTE 4 — Les avantages */}
        <section className="mt-12">
          <ActLabel num={4} label="Ce qu'on y gagne" />
          <h2 className="mt-2 font-serif text-2xl leading-tight text-aubergine">
            {c.slide4.title}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {c.slide4.items.map((it, i) => (
              <li
                key={it.id}
                className="flex items-center gap-3 rounded-2xl border border-or/30 bg-or/[0.04] p-4"
              >
                <div className="relative h-14 w-14 shrink-0 rounded-xl bg-cream-light">
                  <Image
                    src={`/biodynamie/slide_4/${i + 1}.png`}
                    alt=""
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <p className="text-sm leading-snug text-aubergine">{it.text}</p>
              </li>
            ))}
          </ul>
          <DidYouKnow text={c.slide4.didYouKnow} />
        </section>

        {/* ACTE 5 — Les défis (avec rendement viz) */}
        <section className="mt-12">
          <ActLabel num={5} label="Le prix à payer" />
          <h2 className="mt-2 font-serif text-2xl leading-tight text-aubergine">
            {c.slide5.title}
          </h2>

          <div className="mt-4 space-y-5">
            {/* Item 1 : rendements — viz */}
            <div className="rounded-2xl border border-cream-dark bg-cream-light p-5">
              <h3 className="font-serif text-base text-aubergine">
                {c.slide5.items[0].title}
              </h3>
              <p className="mt-1 text-xs text-aubergine-soft">
                Rendements moyens par mode de viticulture :
              </p>
              <div className="mt-4 space-y-3">
                <RendementsBar label="Conventionnel" hl={55} max={maxYield} />
                <RendementsBar label="Biologique" hl={40} max={maxYield} />
                <RendementsBar
                  label="Biodynamie"
                  hl={25}
                  max={maxYield}
                  highlight
                />
              </div>
              <p className="mt-3 text-[11px] italic text-aubergine-soft">
                * 1 hl = 133 bouteilles de 75&nbsp;cl
              </p>
            </div>

            {/* Items 2-4 : autres défis */}
            <ul className="grid gap-3 sm:grid-cols-3">
              {c.slide5.items.slice(1).map((it, i) => (
                <li
                  key={it.id}
                  className="overflow-hidden rounded-2xl border border-cream-dark bg-cream-light"
                >
                  <div className="relative aspect-video bg-cream">
                    <Image
                      src={`/biodynamie/slide_5/${i + 2}.png`}
                      alt=""
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-serif text-sm text-aubergine">
                      {it.title}
                    </h3>
                    <p
                      className="mt-1 text-xs leading-snug text-aubergine-soft"
                      dangerouslySetInnerHTML={{ __html: it.content }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <DidYouKnow text={c.slide5.didYouKnow} />
        </section>

        {/* ACTE 6 — Le prix de la rareté */}
        <section className="mt-12">
          <ActLabel num={6} label="Le prix de la rareté" />
          <h2 className="mt-2 font-serif text-2xl leading-tight text-aubergine">
            {c.slide6.title}
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-cream-dark bg-cream-light p-4">
              <h3 className="font-serif text-sm italic text-champetre">
                Côté production
              </h3>
              <ul className="mt-2 space-y-2 text-sm leading-relaxed text-aubergine">
                {c.slide6.left.map((it) => (
                  <li key={it.id} className="flex gap-2">
                    <span aria-hidden="true" className="text-or">•</span>
                    <span>{it.content}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-or/30 bg-or/[0.06] p-4">
              <h3 className="font-serif text-sm italic text-champetre">
                Les deux côtés du miroir
              </h3>
              <ul className="mt-2 space-y-2 text-sm leading-relaxed text-aubergine [&_strong]:text-or">
                {c.slide6.right.map((it) => (
                  <li key={it.id} className="flex gap-2">
                    <span aria-hidden="true" className="text-or">•</span>
                    <span dangerouslySetInnerHTML={{ __html: it.content ?? "" }} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ACTE 7 — Un chemin parmi d'autres */}
        <section className="mt-12">
          <ActLabel num={7} label="Une voie parmi d'autres" />
          <h2 className="mt-2 font-serif text-2xl leading-tight text-aubergine">
            {c.slide7.title}
          </h2>
          <ol className="mt-4 space-y-2">
            {c.slide7.items.map((it, i) => (
              <li
                key={it.id}
                className="flex gap-3 rounded-xl border border-cream-dark bg-cream-light p-3"
              >
                <span className="font-serif text-2xl leading-none text-or/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed text-aubergine">
                  {it.content}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* ACTE 8 — Conclusion */}
        <section className="mt-12 rounded-3xl bg-aubergine/[0.06] p-6">
          <ActLabel num={8} label="Épilogue" />
          <h2 className="mt-2 font-serif text-2xl leading-tight text-aubergine">
            {c.slide8.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-aubergine">
            {c.slide8.info}
          </p>

          <ul className="mt-4 grid grid-cols-3 gap-2 text-center">
            {c.slide8.items.map((it) => (
              <li
                key={it.id}
                className="rounded-xl border border-or/30 bg-cream-light p-3 font-serif text-sm text-aubergine"
              >
                {it.text}
              </li>
            ))}
          </ul>

          <div className="mt-5 space-y-2">
            {c.slide8.bottom.map((it) => (
              <p
                key={it.id}
                className="text-sm leading-relaxed text-aubergine"
              >
                {it.content}
              </p>
            ))}
          </div>
        </section>
      </main>
      </PremiumGate>
    </>
  );
}
