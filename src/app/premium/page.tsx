import Link from "next/link";
import { AppHeader } from "@/components/AppHeader";
import { CheckoutForm } from "./CheckoutForm";

export const metadata = {
  title: "Accès complet — Le Petit Musée du Vin",
  description:
    "Débloquez les 5 chapitres, les accords mets & vin et toutes les mini-leçons. Paiement unique, accès à vie.",
};

const INCLUDED = [
  { emoji: "🌍", label: "5 chapitres complets", detail: "Terroir, vigne, cycle, vinification, dégustation" },
  { emoji: "🍽️", label: "Accords mets & vin", detail: "8 familles de plats, 4 grands principes, pièges classiques" },
  { emoji: "🔖", label: "Lire une étiquette", detail: "AOP, Champagne, labels, vigneron vs négociant" },
  { emoji: "📚", label: "Toutes les mini-leçons", detail: "10 leçons approfondies sur le service, la conservation, le vin nature…" },
  { emoji: "📓", label: "Carnet de dégustation cloud", detail: "Inclus et gratuit — synchronisé sur tous vos appareils" },
];

export default function PremiumPage() {
  // Lue côté serveur — jamais exposée côté client
  const paymentLinkUrl =
    process.env.STRIPE_PAYMENT_LINK_URL ?? "#";

  return (
    <>
      <AppHeader
        crumbs={[
          { label: "Accueil", href: "/" },
          { label: "Accès complet" },
        ]}
      />

      <main className="mx-auto w-full max-w-screen-sm flex-1 pb-16">
        {/* ── Hero drenché aubergine ─────────────────────────────── */}
        <div
          className="px-6 pb-10 pt-8 text-center"
          style={{ background: "var(--color-aubergine)" }}
        >
          {/* Icône */}
          <div
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: "rgba(202,154,47,0.15)" }}
          >
            <span className="text-3xl" aria-hidden="true">🍷</span>
          </div>

          <p
            className="font-serif text-sm italic"
            style={{ color: "var(--color-champetre)" }}
          >
            Le Petit Musée du Vin
          </p>

          <h1
            className="mt-2 font-serif text-4xl leading-tight"
            style={{ color: "var(--color-cream-light)" }}
          >
            Accès complet
          </h1>

          <p
            className="mt-3 font-serif text-base italic"
            style={{ color: "var(--color-cream-light)", opacity: 0.7 }}
          >
            « Tout le savoir du musée, dans votre poche. »
          </p>

          {/* Prix */}
          <div className="mt-8">
            <div className="inline-flex flex-col items-center">
              <span
                className="font-serif text-6xl leading-none"
                style={{ color: "var(--color-or)" }}
              >
                19,90&nbsp;€
              </span>
              <span
                className="mt-1 font-serif text-sm italic"
                style={{ color: "var(--color-cream-light)", opacity: 0.55 }}
              >
                paiement unique · accès à vie
              </span>
            </div>

            <p
              className="mt-3 font-serif text-sm italic"
              style={{ color: "var(--color-champetre)" }}
            >
              Avec un code musée : 9,90&nbsp;€
            </p>
          </div>
        </div>

        {/* ── Ce qui est inclus ─────────────────────────────────── */}
        <section className="px-5 pt-8">
          <h2 className="font-serif text-xl text-aubergine">
            Ce qui est inclus
          </h2>
          <ul className="mt-4 space-y-3">
            {INCLUDED.map((item) => (
              <li key={item.label} className="flex gap-4">
                <span className="mt-0.5 shrink-0 text-xl" aria-hidden="true">
                  {item.emoji}
                </span>
                <div>
                  <p className="font-serif text-base text-aubergine">
                    {item.label}
                  </p>
                  <p className="text-sm leading-relaxed text-aubergine-soft">
                    {item.detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Séparateur ────────────────────────────────────────── */}
        <div className="mx-5 mt-8 border-t border-cream-dark" />

        {/* ── Formulaire achat ──────────────────────────────────── */}
        <section className="px-5 pt-8">
          <h2 className="mb-5 font-serif text-xl text-aubergine">
            Débloquer l&rsquo;accès
          </h2>
          <CheckoutForm paymentLinkUrl={paymentLinkUrl} />
        </section>

        {/* ── FAQ minimaliste ───────────────────────────────────── */}
        <section className="mt-10 px-5">
          <h2 className="font-serif text-lg text-aubergine">Questions fréquentes</h2>
          <dl className="mt-4 space-y-4 text-sm">
            {[
              {
                q: "L'accès expire-t-il ?",
                a: "Non. C'est un achat unique, l'accès est permanent.",
              },
              {
                q: "Je peux l'utiliser sur plusieurs appareils ?",
                a: "Oui, connectez-vous avec la même adresse e-mail et retrouvez votre accès sur tous vos appareils.",
              },
              {
                q: "Comment obtenir un code musée ?",
                a: "Les codes sont distribués à l'entrée du Petit Musée du Vin lors de votre visite. Ils offrent 50 % de réduction.",
              },
              {
                q: "Est-ce que le carnet de dégustation est inclus ?",
                a: "Le carnet et le guide de dégustation pas-à-pas sont gratuits pour tous les utilisateurs inscrits.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-cream-dark bg-cream-light p-4">
                <dt className="font-serif text-base text-aubergine">{q}</dt>
                <dd className="mt-1.5 leading-relaxed text-aubergine-soft">{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Retour ────────────────────────────────────────────── */}
        <div className="mt-10 text-center">
          <Link
            href="/chapitres"
            className="text-sm text-aubergine-soft underline-offset-4 hover:text-or hover:underline"
          >
            ← Explorer les chapitres
          </Link>
        </div>
      </main>
    </>
  );
}
