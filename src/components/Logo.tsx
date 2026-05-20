import Image from "next/image";

/**
 * Logo officiel "Le Petit Musée du Vin".
 *
 * Deux fichiers source :
 *  - /logo-lpmv.svg           → tracé blanc (#fff), pour fonds foncés
 *  - /logo-lpmv-aubergine.svg → tracé aubergine (#310e31), pour fonds cream
 *
 * Variantes :
 *  - "bare"      : logo aubergine, sans fond. Le défaut sur cream.
 *  - "aubergine" : logo blanc dans un bloc aubergine (pour drench / hero foncé).
 *  - "or"        : logo blanc dans un bloc or.
 */

type LogoProps = {
  size?: "sm" | "md" | "lg";
  variant?: "bare" | "aubergine" | "or";
  className?: string;
};

const SIZES = {
  sm: { box: "px-3 py-2", w: 130, h: 26 },
  md: { box: "px-4 py-3", w: 160, h: 32 },
  lg: { box: "px-6 py-4", w: 230, h: 46 },
} as const;

export function Logo({ size = "md", variant = "bare", className = "" }: LogoProps) {
  const s = SIZES[size];
  const isBare = variant === "bare";
  const src = isBare ? "/logo-lpmv-aubergine.svg" : "/logo-lpmv.svg";
  const bg = variant === "or" ? "bg-or" : variant === "aubergine" ? "bg-aubergine" : "";

  return (
    <span
      className={`inline-flex items-center justify-center ${isBare ? "" : `rounded-sm ${bg} ${s.box}`} ${className}`}
      aria-label="Le Petit Musée du Vin"
    >
      <Image
        src={src}
        alt=""
        width={s.w}
        height={s.h}
        priority
        className="h-auto w-full max-w-full"
      />
    </span>
  );
}
