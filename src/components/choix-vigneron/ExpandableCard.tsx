"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type Props = {
  title: string;
  summary: string;
  detail: string;
  iconSrc?: string;
};

/**
 * Carte de décision avec contenu approfondi pliable.
 */
export function ExpandableCard({ title, summary, detail }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <article className="rounded-2xl border border-cream-dark bg-cream-light p-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-start gap-3 text-left"
      >
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-base text-aubergine">{title}</h3>
          <p className="mt-1 text-sm text-aubergine-soft">{summary}</p>
        </div>
        <ChevronDown
          size={18}
          className={`shrink-0 text-or transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <p className="mt-3 border-t border-cream-dark pt-3 text-sm leading-relaxed text-aubergine">
              {detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
