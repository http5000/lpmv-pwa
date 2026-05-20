import Link from "next/link";
import { Cloud, CloudOff } from "lucide-react";

/**
 * Indicateur sync compact, à côté du titre du carnet.
 * Server Component (état SSR depuis cookies session).
 */
export function AuthStatusPill({ email, next }: { email: string | null; next?: string }) {
  if (email) {
    return (
      <Link
        href="/compte"
        className="group inline-flex items-center gap-2 text-xs text-aubergine-soft transition-colors duration-200 hover:text-aubergine"
        style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
      >
        <Cloud size={12} className="text-or" />
        <span>Synchronisé avec <span className="text-aubergine">{email}</span></span>
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
          style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
        >
          →
        </span>
      </Link>
    );
  }
  const href = `/compte${next ? `?next=${encodeURIComponent(next)}` : ""}`;
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-xs text-aubergine-soft transition-colors duration-200 hover:text-aubergine"
      style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
    >
      <CloudOff size={12} />
      <span>Hors-ligne · se connecter pour synchroniser</span>
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-0.5"
        style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
      >
        →
      </span>
    </Link>
  );
}
