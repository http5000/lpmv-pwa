"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import type { Sol } from "@/lib/content/sols";
import {
  FranceSilhouette,
  SOL_REGION_POSITIONS,
} from "./FranceSilhouette";

type Props = {
  sols: Sol[];
  /** Labels (origine, climat, …) traduits, passés depuis le server pour i18n future. */
  labels: {
    origin: string;
    climate: string;
    grape_varieties: string;
    profile: string;
  };
};

/**
 * Carte de France interactive : 8 spécimens de sol posés à leur région.
 * Tap un sol → bottom sheet animé avec photo + info condensée + CTA fiche complète.
 */
export function SolsMap({ sols, labels }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = sols.find((s) => s.id === selectedId) ?? null;

  // Fermer la sheet avec Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedId(null);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Empêcher scroll body quand sheet ouverte
  useEffect(() => {
    if (selected) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [selected]);

  return (
    <>
      {/* Conteneur carte — CARRÉ pour matcher le viewBox 100x100 du SVG France.
          Les positions des sols (en %) tombent ainsi exactement sur leur région. */}
      <div className="relative mx-auto aspect-square w-full max-w-[420px]">
        <FranceSilhouette className="absolute inset-0 h-full w-full" />

        {sols.map((sol) => {
          const pos = SOL_REGION_POSITIONS[sol.id];
          if (!pos) return null;
          const isActive = selectedId === sol.id;
          return (
            <motion.button
              key={sol.id}
              type="button"
              onClick={() => setSelectedId(sol.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: Number(sol.id) * 0.07,
                type: "spring",
                stiffness: 280,
                damping: 18,
              }}
              whileHover={{ scale: 1.15, zIndex: 5 }}
              whileTap={{ scale: 0.92 }}
              aria-label={`${sol.shortTitle} — ${pos.region}`}
              aria-pressed={isActive}
            >
              <span
                className={`relative flex h-11 w-11 items-center justify-center rounded-full bg-cream-light p-1 shadow-md transition-all sm:h-12 sm:w-12 ${
                  isActive
                    ? "ring-2 ring-or ring-offset-2 ring-offset-cream"
                    : ""
                }`}
              >
                <Image
                  src={sol.image}
                  alt=""
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                />
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom sheet */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.button
              type="button"
              key="backdrop"
              className="fixed inset-0 z-30 bg-aubergine/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedId(null)}
              aria-label="Fermer"
            />

            {/* Sheet */}
            <motion.aside
              key="sheet"
              role="dialog"
              aria-modal="true"
              aria-labelledby="sheet-title"
              className="fixed inset-x-0 bottom-0 z-40 mx-auto max-h-[85vh] w-full max-w-screen-sm overflow-y-auto rounded-t-3xl bg-cream-light shadow-2xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.5 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 120) setSelectedId(null);
              }}
            >
              {/* Handle drag */}
              <div className="flex justify-center pt-3">
                <span className="h-1.5 w-12 rounded-full bg-cream-dark" />
              </div>

              {/* Close button */}
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream text-aubergine-soft transition-colors hover:bg-cream-dark hover:text-aubergine"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>

              <div className="px-5 pb-8 pt-2">
                {/* Header sheet : photo + titre */}
                <div className="flex items-start gap-4">
                  <div
                    className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl"
                    style={{
                      background: `radial-gradient(circle at 50% 40%, ${selected.color}26, transparent 80%)`,
                    }}
                  >
                    <Image
                      src={selected.image}
                      alt={selected.alt}
                      width={96}
                      height={96}
                      className="h-full w-full object-contain drop-shadow"
                    />
                  </div>
                  <div className="min-w-0 flex-1 pt-1">
                    <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-or">
                      Sol n°{selected.id}
                      {SOL_REGION_POSITIONS[selected.id]?.region && (
                        <>
                          {" • "}
                          <span className="text-aubergine-soft">
                            {SOL_REGION_POSITIONS[selected.id].region}
                          </span>
                        </>
                      )}
                    </p>
                    <h2
                      id="sheet-title"
                      className="mt-1 font-serif text-2xl leading-tight text-aubergine"
                    >
                      {selected.title}
                    </h2>
                  </div>
                </div>

                {/* Blocs d'info compactés */}
                <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <InfoBlock label={labels.origin} value={selected.origin} />
                  <InfoBlock
                    label={labels.grape_varieties}
                    value={selected.grape_varieties}
                  />
                  <InfoBlock
                    label={labels.climate}
                    value={selected.climate}
                    className="col-span-2"
                  />
                </dl>

                {/* Profil de vin — mise en valeur */}
                <div className="mt-5 rounded-2xl bg-aubergine/[0.06] p-4">
                  <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-or">
                    {labels.profile}
                  </p>
                  <ul className="mt-2 space-y-1 text-sm leading-relaxed text-aubergine">
                    {selected.profile.map((p, i) => (
                      <li key={i} className="flex gap-2">
                        <span aria-hidden="true" className="text-or">
                          •
                        </span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA fiche complète */}
                <Link
                  href={`/chapitres/terroir/sols/${selected.slug}`}
                  className="mt-6 flex items-center justify-between rounded-full bg-aubergine px-5 py-3 font-serif text-base text-cream-light shadow-sm transition-transform active:scale-[0.98]"
                >
                  <span>Voir la fiche complète</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function InfoBlock({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-cream-dark bg-cream px-3 py-2.5 ${className}`}
    >
      <dt className="font-serif text-[9px] uppercase tracking-[0.2em] text-champetre">
        {label}
      </dt>
      <dd className="mt-1 text-xs leading-snug text-aubergine">{value}</dd>
    </div>
  );
}
