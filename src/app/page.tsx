/**
 * Page d'accueil temporaire — prouve juste que l'app tourne et que la charte est en place.
 * Sera remplacée par la Carte du Domaine (cf. plan §2 du concept).
 */
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <p className="font-serif text-burgundy text-sm uppercase tracking-[0.3em]">
        Le Petit Musée du Vin
      </p>
      <h1 className="mt-6 max-w-xl font-serif text-5xl leading-tight text-olive sm:text-6xl">
        Bientôt, tu deviendras l&rsquo;apprenti d&rsquo;un vigneron imaginaire.
      </h1>
      <p className="mt-8 max-w-md text-olive-soft">
        Application compagnon en construction. Reviens bientôt — le mentor
        prépare son domaine.
      </p>
      <div className="mt-12 h-px w-24 bg-earth-soft" />
      <p className="mt-12 text-xs text-earth-soft">
        v0 — scaffold du {new Date().toISOString().slice(0, 10)}
      </p>
    </main>
  );
}
