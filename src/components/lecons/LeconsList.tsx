"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Lecon } from "@/lib/content/lecons";
import { CATEGORY_META } from "@/lib/content/lecons";

type CategoryKey = Lecon["category"] | "all";

type Props = {
  lecons: Lecon[];
};

export function LeconsList({ lecons }: Props) {
  const [filter, setFilter] = useState<CategoryKey>("all");

  const filtered = useMemo(
    () => (filter === "all" ? lecons : lecons.filter((l) => l.category === filter)),
    [lecons, filter],
  );

  const categories = (Object.keys(CATEGORY_META) as Lecon["category"][]).map(
    (k) => ({ key: k, ...CATEGORY_META[k] }),
  );

  return (
    <>
      {/* Filtre catégorie */}
      <div className="-mx-5 overflow-x-auto">
        <ul className="flex gap-2 px-5 pb-1">
          <li>
            <FilterChip
              active={filter === "all"}
              onClick={() => setFilter("all")}
              label="Toutes"
            />
          </li>
          {categories.map((c) => (
            <li key={c.key}>
              <FilterChip
                active={filter === c.key}
                onClick={() => setFilter(c.key)}
                label={c.label}
                emoji={c.emoji}
                color={c.color}
              />
            </li>
          ))}
        </ul>
      </div>

      <ul className="mt-5 space-y-3">
        {filtered.map((l, idx) => {
          const cat = CATEGORY_META[l.category];
          return (
            <motion.li
              key={l.slug}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.03 }}
            >
              <Link
                href={`/chapitres/degustation/lecons/${l.slug}`}
                className="group block rounded-2xl border border-cream-dark bg-cream-light p-4 transition-all hover:border-or hover:shadow-sm active:scale-[0.99]"
                style={{ borderLeftWidth: 4, borderLeftColor: cat.color }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl" aria-hidden="true">
                    {l.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className="font-serif text-[10px] uppercase tracking-[0.25em]"
                      style={{ color: cat.color }}
                    >
                      {cat.emoji} {cat.label}
                    </p>
                    <h3 className="mt-1 font-serif text-base leading-tight text-aubergine group-hover:text-or">
                      {l.title}
                    </h3>
                    <p className="mt-1 text-xs italic leading-snug text-aubergine-soft">
                      {l.hook}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="self-center text-aubergine-soft transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  emoji,
  color,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  emoji?: string;
  color?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all"
      style={{
        borderColor: active ? color ?? "var(--color-aubergine)" : "var(--color-cream-dark)",
        background: active
          ? color
            ? `${color}20`
            : "var(--color-aubergine)"
          : "var(--color-cream-light)",
        color: active && !color ? "var(--color-cream-light)" : "var(--color-aubergine)",
      }}
    >
      {emoji && <span>{emoji}</span>}
      <span className="font-serif">{label}</span>
    </button>
  );
}
