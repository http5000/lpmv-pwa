import Link from "next/link";
import { Cloud, CloudOff, ChevronRight } from "lucide-react";

/**
 * Pill compact en haut du carnet : signale l'état de sync vs cloud.
 * Server Component — la version "user" est rendue au SSR depuis le proxy de session.
 */
export function AuthStatusPill({ email, next }: { email: string | null; next?: string }) {
  if (email) {
    return (
      <Link
        href="/compte"
        className="mt-3 inline-flex items-center gap-2 rounded-full bg-or/15 px-3 py-1.5 text-[11px] text-aubergine transition-colors hover:bg-or/25"
      >
        <Cloud size={12} className="text-or" />
        <span className="truncate max-w-[180px]">Synchronisé · {email}</span>
        <ChevronRight size={11} className="text-aubergine-soft" />
      </Link>
    );
  }
  const href = `/compte${next ? `?next=${encodeURIComponent(next)}` : ""}`;
  return (
    <Link
      href={href}
      className="mt-3 inline-flex items-center gap-2 rounded-full bg-cream-dark/40 px-3 py-1.5 text-[11px] text-aubergine-soft transition-colors hover:bg-cream-dark/70 hover:text-aubergine"
    >
      <CloudOff size={12} />
      Se connecter pour synchroniser
      <ChevronRight size={11} />
    </Link>
  );
}
