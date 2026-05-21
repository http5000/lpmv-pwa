"use client";

import Link from "next/link";
import { Cloud, CloudOff } from "lucide-react";
import { useSession } from "@/lib/auth/useSession";

/**
 * Indicateur sync compact, à côté du titre du carnet.
 * Client Component — lit la session via useSession (compatible static export Capacitor).
 */
export function AuthStatusPill({ next }: { next?: string }) {
  const { user, loading } = useSession();

  // Pendant le chargement : placeholder discret pour éviter le layout shift
  if (loading) {
    return (
      <span className="inline-flex items-center gap-2 text-xs text-aubergine-soft/40">
        <Cloud size={12} />
        <span className="h-3 w-32 animate-pulse rounded bg-aubergine/10" />
      </span>
    );
  }

  if (user?.email) {
    return (
      <Link
        href="/compte"
        className="group inline-flex items-center gap-2 text-xs text-aubergine-soft transition-colors duration-200 hover:text-aubergine"
        style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
      >
        <Cloud size={12} className="text-or" />
        <span>
          Synchronisé avec <span className="text-aubergine">{user.email}</span>
        </span>
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
