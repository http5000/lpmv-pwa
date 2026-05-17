import Image from "next/image";

/**
 * Logo officiel "Le petit Musée du Vin" — SVG vectorisé fourni par le musée.
 * Le SVG est blanc (fill: #fff), on l'affiche donc sur fond aubergine ou or.
 *
 * Source : /public/logo-lpmv.svg, extrait de LPMV-content-empty/content/assets/logo.svg
 */

type LogoProps = {
  size?: "sm" | "md" | "lg";
  /** Variante de fond : aubergine (par défaut) ou or moutarde */
  variant?: "aubergine" | "or";
  className?: string;
};

const SIZES = {
  sm: { box: "px-3 py-2", w: 110, h: 22 },
  md: { box: "px-4 py-3", w: 150, h: 30 },
  lg: { box: "px-6 py-4", w: 220, h: 44 },
} as const;

const VARIANTS = {
  aubergine: "bg-aubergine",
  or: "bg-or",
} as const;

export function Logo({
  size = "md",
  variant = "aubergine",
  className = "",
}: LogoProps) {
  const s = SIZES[size];
  const v = VARIANTS[variant];

  return (
    <span
      className={`inline-flex items-center justify-center rounded-sm ${v} ${s.box} ${className}`}
      aria-label="Le Petit Musée du Vin"
    >
      <Image
        src="/logo-lpmv.svg"
        alt=""
        width={s.w}
        height={s.h}
        priority
        className="h-auto w-full max-w-full"
      />
    </span>
  );
}
