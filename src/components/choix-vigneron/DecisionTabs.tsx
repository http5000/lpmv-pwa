"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Tab = {
  key: string;
  label: string;
  content: React.ReactNode;
};

type Props = {
  tabs: Tab[];
  /** Couleur d'accent du composant. */
  accent?: string;
};

/**
 * Comparator générique à onglets. Sert pour Éraflage (2 options), Levures (2 options),
 * et toute autre décision binaire ou ternaire du vigneron.
 */
export function DecisionTabs({ tabs, accent = "#7A1F2B" }: Props) {
  const [activeKey, setActiveKey] = useState(tabs[0]?.key ?? "");
  const active = tabs.find((t) => t.key === activeKey) ?? tabs[0];
  if (!active) return null;

  return (
    <div>
      <div
        role="tablist"
        className="grid gap-1 rounded-full border border-cream-dark bg-cream-light p-1"
        style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
      >
        {tabs.map((t) => {
          const isActive = t.key === activeKey;
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveKey(t.key)}
              className={`relative rounded-full px-3 py-2 font-serif text-sm transition-colors ${
                isActive ? "text-cream-light" : "text-aubergine-soft hover:text-aubergine"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId={`tab-bg-${tabs.map((x) => x.key).join("-")}`}
                  className="absolute inset-0 rounded-full"
                  style={{ background: accent }}
                  transition={{ type: "spring", stiffness: 350, damping: 32 }}
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeKey}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-4"
        >
          {active.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
