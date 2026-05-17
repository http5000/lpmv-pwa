"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { DishCategory } from "@/lib/content/accords";

type Props = {
  categories: DishCategory[];
};

/**
 * Sélecteur de catégorie de plat → liste de plats-exemples + vins suggérés
 * + justification.
 */
export function AccordsExplorer({ categories }: Props) {
  const [activeKey, setActiveKey] = useState(categories[0]?.key ?? "");
  const active = categories.find((c) => c.key === activeKey) ?? categories[0];

  return (
    <div>
      {/* Tabs catégorie — scroll horizontal */}
      <div
        role="tablist"
        aria-label="Catégorie de plat"
        className="-mx-5 overflow-x-auto"
      >
        <ul className="flex gap-2 px-5 pb-2">
          {categories.map((c) => {
            const isActive = c.key === activeKey;
            return (
              <li key={c.key} className="shrink-0">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveKey(c.key)}
                  className="flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all"
                  style={{
                    borderColor: isActive ? c.accent : "var(--color-cream-dark)",
                    background: isActive ? `${c.accent}18` : "var(--color-cream-light)",
                  }}
                >
                  <span className="text-base" aria-hidden="true">
                    {c.emoji}
                  </span>
                  <span
                    className={`font-serif ${
                      isActive ? "text-aubergine" : "text-aubergine-soft"
                    }`}
                  >
                    {c.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.key}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="mt-6 space-y-4"
        >
          {active.pairings.map((p, i) => (
            <PairingCard key={i} pairing={p} accent={active.accent} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function PairingCard({
  pairing,
  accent,
}: {
  pairing: DishCategory["pairings"][number];
  accent: string;
}) {
  const [showReason, setShowReason] = useState(false);
  return (
    <article
      className="overflow-hidden rounded-2xl border bg-cream-light"
      style={{ borderColor: `${accent}40` }}
    >
      <header className="p-4">
        <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-or">
          Plat
        </p>
        <h3 className="mt-1 font-serif text-lg leading-tight text-aubergine">
          {pairing.dish}
        </h3>
      </header>

      <div className="border-t border-cream-dark px-4 py-3">
        <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-or">
          Vins suggérés
        </p>
        <ol className="mt-2 space-y-2">
          {pairing.wines.map((w, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl bg-cream p-3"
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-serif text-xs"
                style={{ background: `${accent}33`, color: accent }}
              >
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="font-serif text-sm text-aubergine">{w.name}</p>
                <p className="text-xs italic text-aubergine-soft">{w.style}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <button
        type="button"
        onClick={() => setShowReason((s) => !s)}
        aria-expanded={showReason}
        className="flex w-full items-center justify-between border-t border-cream-dark px-4 py-3 text-left transition-colors hover:bg-cream"
      >
        <span className="font-serif text-sm" style={{ color: accent }}>
          Pourquoi ça marche
        </span>
        <ChevronDown
          size={16}
          className="transition-transform"
          style={{
            color: accent,
            transform: showReason ? "rotate(180deg)" : undefined,
          }}
        />
      </button>
      <AnimatePresence initial={false}>
        {showReason && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <p
              className="border-t px-4 py-3 text-sm leading-relaxed text-aubergine"
              style={{ borderColor: `${accent}30`, background: `${accent}08` }}
            >
              {pairing.reason}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
