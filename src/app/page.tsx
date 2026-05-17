import Link from "next/link";

/**
 * Accueil — porte d'entrée narrative.
 * À terme : onboarding "l'apprenti" + bouton "Commencer / Reprendre".
 * En attendant : un seul CTA vers /chapitres.
 */
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <p className="font-serif text-burgundy text-xs uppercase tracking-[0.4em]">
        Le Petit Musée du Vin
      </p>
      <h1 className="mt-8 max-w-md font-serif text-4xl leading-[1.15] text-olive sm:text-5xl">
        Deviens l&rsquo;apprenti d&rsquo;un vigneron imaginaire.
      </h1>
      <p className="mt-6 max-w-sm text-olive-soft">
        Explore le vin comme tu n&rsquo;as jamais osé le faire — sol, climat,
        cycle, vinification, dégustation. Cinq chapitres, mille questions.
      </p>

      <Link
        href="/chapitres"
        className="mt-12 inline-flex items-center justify-center rounded-full bg-burgundy px-8 py-3 font-serif text-base text-parchment shadow-sm transition-transform hover:scale-[1.02] active:scale-95"
      >
        Commencer le voyage
      </Link>

      <div className="mt-16 h-px w-20 bg-earth-soft" />
      <p className="mt-8 max-w-xs text-xs text-earth-soft italic">
        &ldquo;Le sol, la vigne, la saison, le geste. Quatre lectures pour un
        seul verre.&rdquo;
        <br />
        <span className="not-italic">— Le Mentor</span>
      </p>
    </main>
  );
}
