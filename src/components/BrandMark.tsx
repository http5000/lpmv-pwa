import Link from "next/link";
import { Logo } from "./Logo";

/**
 * BrandMark = le logo cliquable qui ramène à l'accueil.
 * Wrap juste le composant Logo officiel dans un lien.
 */
export function BrandMark({
  href = "/",
  size = "sm",
  variant = "bare",
}: {
  href?: string;
  size?: "sm" | "md" | "lg";
  variant?: "bare" | "aubergine" | "or";
}) {
  return (
    <Link
      href={href}
      className="inline-flex transition-opacity hover:opacity-80"
      aria-label="Retour à l'accueil — Le Petit Musée du Vin"
    >
      <Logo size={size} variant={variant} />
    </Link>
  );
}
