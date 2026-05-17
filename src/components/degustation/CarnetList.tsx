"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Star, Trash2, NotebookPen } from "lucide-react";
import { listTastings, deleteTasting, type Tasting } from "@/lib/storage/carnet";

export function CarnetList() {
  const [tastings, setTastings] = useState<Tasting[] | null>(null);
  const [confirming, setConfirming] = useState<string | null>(null);

  useEffect(() => {
    setTastings(listTastings());
  }, []);

  if (tastings === null) {
    return (
      <div className="rounded-2xl border border-cream-dark bg-cream-light p-6 text-center text-sm text-aubergine-soft">
        Chargement…
      </div>
    );
  }

  if (tastings.length === 0) {
    return (
      <div className="rounded-3xl bg-aubergine/[0.06] p-8 text-center">
        <NotebookPen size={32} className="mx-auto text-or" />
        <h2 className="mt-4 font-serif text-xl text-aubergine">
          Ton carnet est encore vide
        </h2>
        <p className="mt-2 text-sm text-aubergine-soft">
          Chaque vin que tu déguste avec le guide vient s&rsquo;y poser. Au fil
          du temps, tu verras émerger ton palais.
        </p>
        <Link
          href="/chapitres/degustation/guide"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-aubergine px-5 py-3 font-serif text-sm text-cream-light"
        >
          Commencer une dégustation
        </Link>
      </div>
    );
  }

  function handleDelete(id: string) {
    if (confirming === id) {
      deleteTasting(id);
      setTastings(listTastings());
      setConfirming(null);
    } else {
      setConfirming(id);
      // auto-cancel confirm after 4 sec
      setTimeout(() => setConfirming((c) => (c === id ? null : c)), 4000);
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-aubergine-soft">
        {tastings.length} dégustation{tastings.length > 1 ? "s" : ""} enregistrée
        {tastings.length > 1 ? "s" : ""} sur ton appareil.
      </p>
      <ul className="space-y-3">
        {tastings.map((t) => (
          <li
            key={t.id}
            className="rounded-2xl border border-cream-dark bg-cream-light p-4"
          >
            <div className="flex items-baseline justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-serif text-base text-aubergine">
                  {t.wineName || "Vin sans nom"}
                </h3>
                <p className="mt-0.5 text-xs text-aubergine-soft">
                  {[t.vintage, t.region].filter(Boolean).join(" · ") ||
                    new Date(t.createdAt).toLocaleDateString("fr-FR")}
                </p>
              </div>
              <Rating value={t.rating} />
            </div>

            {(t.nez.aromas?.length ?? 0) > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {t.nez.aromas!.slice(0, 6).map((a) => (
                  <span
                    key={a}
                    className="rounded-full bg-or/15 px-2 py-0.5 text-[10px] font-medium text-aubergine"
                  >
                    {a.split(":")[1] ?? a}
                  </span>
                ))}
                {t.nez.aromas!.length > 6 && (
                  <span className="text-[10px] text-aubergine-soft">
                    +{t.nez.aromas!.length - 6}
                  </span>
                )}
              </div>
            )}

            {t.notes && (
              <p className="mt-3 text-xs italic leading-relaxed text-aubergine-soft">
                « {t.notes} »
              </p>
            )}

            <div className="mt-3 flex items-center justify-between gap-2 border-t border-cream-dark pt-2">
              <span className="text-[10px] text-aubergine-soft">
                {new Date(t.createdAt).toLocaleString("fr-FR", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </span>
              <button
                type="button"
                onClick={() => handleDelete(t.id)}
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] transition-colors ${
                  confirming === t.id
                    ? "bg-aubergine text-cream-light"
                    : "text-aubergine-soft hover:text-aubergine"
                }`}
              >
                <Trash2 size={11} />
                {confirming === t.id ? "Confirmer la suppression" : "Supprimer"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Rating({ value }: { value: number }) {
  if (!value) return <span className="text-[10px] text-aubergine-soft">non noté</span>;
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={14}
          className={n <= value ? "fill-or text-or" : "text-cream-dark"}
        />
      ))}
    </div>
  );
}
