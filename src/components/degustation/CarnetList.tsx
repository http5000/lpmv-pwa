"use client";

import Link from "next/link";
import { useState } from "react";
import { Star, Trash2, NotebookPen } from "lucide-react";
import { useCarnet } from "@/lib/storage/carnetSync";
import type { Tasting } from "@/lib/storage/carnet";

/**
 * Carnet de dégustation — liste rythmée façon journal manuscrit.
 * Pas de cartes identiques : chaque dégustation est une entrée séparée par
 * un trait fin, avec un poids typographique fort sur le nom du vin.
 * Voir DESIGN.md §Card discipline.
 */
export function CarnetList() {
  const { tastings, loading, user, remove } = useCarnet();
  const [confirming, setConfirming] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="py-8 text-center text-sm text-aubergine-soft">
        Chargement…
      </div>
    );
  }

  if (tastings.length === 0) {
    return <EmptyState />;
  }

  function handleDelete(id: string) {
    if (confirming === id) {
      remove(id);
      setConfirming(null);
    } else {
      setConfirming(id);
      setTimeout(() => setConfirming((c) => (c === id ? null : c)), 4000);
    }
  }

  return (
    <div>
      <p className="text-xs text-champetre">
        {tastings.length} dégustation{tastings.length > 1 ? "s" : ""}
        {user ? " · synchronisées" : " · sur cet appareil"}
      </p>

      <ol className="mt-8">
        {tastings.map((t) => (
          <li
            key={t.id}
            className="border-t border-cream-dark py-8 first:border-t-0 sm:py-10"
          >
            <TastingEntry
              tasting={t}
              confirming={confirming === t.id}
              onDelete={() => handleDelete(t.id)}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

function TastingEntry({
  tasting: t,
  confirming,
  onDelete,
}: {
  tasting: Tasting;
  confirming: boolean;
  onDelete: () => void;
}) {
  const aromas = (t.nez.aromas ?? []).slice(0, 8).map((a) => a.split(":")[1] ?? a);
  const meta = [t.vintage, t.region].filter(Boolean).join(" · ");

  return (
    <article>
      <div className="flex items-baseline justify-between gap-4">
        <h3
          className="display min-w-0 text-aubergine"
          style={{ fontSize: "var(--text-2xl)" }}
        >
          {t.wineName || "Vin sans nom"}
        </h3>
        <Rating value={t.rating} />
      </div>

      {meta && (
        <p className="mt-2 text-sm text-aubergine-soft">{meta}</p>
      )}

      {aromas.length > 0 && (
        <p className="mt-5 text-sm leading-relaxed text-aubergine">
          <span className="font-serif italic text-champetre">Au nez · </span>
          {aromas.join(", ")}
          {(t.nez.aromas?.length ?? 0) > 8 && (
            <span className="text-aubergine-soft">, et d&rsquo;autres.</span>
          )}
        </p>
      )}

      {t.notes && (
        <blockquote
          className="mt-5 max-w-[60ch] font-serif italic leading-relaxed text-aubergine-soft"
          style={{ fontSize: "var(--text-base)" }}
        >
          « {t.notes} »
        </blockquote>
      )}

      <div className="mt-6 flex items-center justify-between gap-3 text-xs text-champetre">
        <time dateTime={t.createdAt}>
          {new Date(t.createdAt).toLocaleString("fr-FR", {
            dateStyle: "long",
            timeStyle: "short",
          })}
        </time>
        <button
          type="button"
          onClick={onDelete}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 transition-colors duration-200 ${
            confirming
              ? "bg-aubergine text-cream-light"
              : "text-aubergine-soft/70 hover:text-aubergine"
          }`}
          style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
        >
          <Trash2 size={12} />
          {confirming ? "Confirmer la suppression" : "Supprimer"}
        </button>
      </div>
    </article>
  );
}

function Rating({ value }: { value: number }) {
  if (!value) {
    return <span className="shrink-0 text-xs italic text-champetre">non noté</span>;
  }
  return (
    <div className="flex shrink-0 gap-0.5" aria-label={`${value} sur 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={16}
          className={n <= value ? "fill-or text-or" : "text-cream-dark"}
        />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto max-w-[36ch] py-12 text-center sm:py-16">
      <NotebookPen size={32} className="mx-auto text-or" />
      <h3
        className="mt-6 display text-aubergine"
        style={{ fontSize: "var(--text-2xl)" }}
      >
        Pas encore de bouteille.
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-aubergine-soft">
        La première dégustation est la plus difficile : tout est nouveau.
        Le guide est là pour t&rsquo;accompagner mot à mot.
      </p>
      <Link
        href="/chapitres/degustation/guide"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-aubergine px-6 py-3 font-serif text-sm text-cream-light transition-all duration-200 hover:-translate-y-0.5 hover:bg-aubergine-deep active:translate-y-0 active:scale-[0.98]"
        style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
      >
        Commencer une dégustation
      </Link>
    </div>
  );
}
