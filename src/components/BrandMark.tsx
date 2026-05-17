import Link from "next/link";

export function BrandMark({ href = "/" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex flex-col items-start gap-0.5 transition-opacity hover:opacity-70"
      aria-label="Retour à l'accueil — Le Petit Musée du Vin"
    >
      <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-burgundy">
        Le Petit Musée
      </span>
      <span className="font-serif text-sm leading-none text-olive">du Vin</span>
    </Link>
  );
}
