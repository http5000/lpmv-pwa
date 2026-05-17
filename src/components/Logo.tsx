/**
 * Logo officiel "Le petit Musée du Vin" — blanc sur fond aubergine.
 * Reproduction typographique du logo de marque (typo serif élégante + bulle sur le i du Vin).
 *
 * TODO : remplacer cette version typographique par un SVG vectorisé exact dès qu'on l'aura.
 * En attendant, la composition CSS approche fidèlement la marque sur écran.
 */

type LogoProps = {
  size?: "sm" | "md" | "lg";
  /** Variante de fond : aubergine (par défaut), or, ou transparent (logo sur fond clair) */
  variant?: "aubergine" | "or" | "ghost";
  className?: string;
};

const SIZES = {
  sm: { box: "px-3 py-2", lePetit: "text-[9px]", musee: "text-base", du: "text-[8px]", vin: "text-base" },
  md: { box: "px-4 py-2.5", lePetit: "text-[11px]", musee: "text-xl", du: "text-[9px]", vin: "text-xl" },
  lg: { box: "px-6 py-4", lePetit: "text-sm", musee: "text-3xl", du: "text-xs", vin: "text-3xl" },
} as const;

const VARIANTS = {
  aubergine: "bg-aubergine text-cream-light",
  or: "bg-or text-cream-light",
  ghost: "bg-transparent text-aubergine",
} as const;

export function Logo({ size = "md", variant = "aubergine", className = "" }: LogoProps) {
  const s = SIZES[size];
  const v = VARIANTS[variant];

  return (
    <span
      className={`inline-flex flex-col items-start leading-none ${v} ${s.box} ${className}`}
      aria-label="Le Petit Musée du Vin"
    >
      <span className={`font-serif italic ${s.lePetit} opacity-90`}>
        Le petit
      </span>
      <span className="flex items-baseline gap-0.5">
        <span className={`font-serif ${s.musee}`}>Musée</span>
        <span className={`font-serif italic ${s.du} translate-y-[-0.15em] opacity-90`}>
          du
        </span>
        <span className={`font-serif ${s.vin} relative`}>
          {/* Bulle/goutte sur le V, signature visuelle du logo */}
          <span
            aria-hidden="true"
            className="absolute -top-[0.35em] left-[0.45em] inline-block h-[0.18em] w-[0.18em] rounded-full bg-current"
          />
          Vin
        </span>
      </span>
    </span>
  );
}
