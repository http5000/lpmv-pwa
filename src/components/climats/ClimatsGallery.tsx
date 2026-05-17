"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import type { Climat, ClimatFamily } from "@/lib/content/climats";

type Props = {
  climats: Climat[];
  families: { key: ClimatFamily; label: string; description: string }[];
  labels: { growth: string; ripening: string; style: string; fruity: string };
};

/**
 * Galerie des 13 climats, groupés par famille (tempérés / chauds / froids / singuliers).
 * Tap → bottom sheet avec les 4 dimensions (croissance, maturation, style, aromatique).
 *
 * Pas de carte ici (les climats sont des "types" pas des lieux) — c'est volontairement différent
 * de la mécanique Sols pour ne pas lasser, tout en gardant la cohérence du bottom sheet.
 */
export function ClimatsGallery({ climats, families, labels }: Props) {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const selected = climats.find((c) => c.key === selectedKey) ?? null;

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedKey(null);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

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
      <div className="flex flex-col gap-8">
        {families.map((family) => {
          const items = climats.filter((c) => c.family === family.key);
          return (
            <section key={family.key}>
              <header className="mb-3">
                <h2 className="font-serif text-lg text-aubergine">
                  {family.label}
                  <span className="ml-2 text-xs font-normal text-champetre">
                    {items.length}
                  </span>
                </h2>
                <p className="text-xs italic text-aubergine-soft">
                  {family.description}
                </p>
              </header>

              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {items.map((c, idx) => {
                  const isActive = selectedKey === c.key;
                  return (
                    <li key={c.key}>
                      <motion.button
                        type="button"
                        onClick={() => setSelectedKey(c.key)}
                        className={`group flex w-full flex-col overflow-hidden rounded-2xl border bg-cream-light text-left transition-all active:scale-[0.98] ${
                          isActive
                            ? "border-or shadow-md"
                            : "border-cream-dark hover:border-or hover:shadow-sm"
                        }`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.04, duration: 0.25 }}
                        aria-pressed={isActive}
                      >
                        <div
                          className="relative aspect-[5/4] w-full overflow-hidden"
                          style={{
                            background: `linear-gradient(135deg, ${c.accent}26, ${c.accent}08)`,
                          }}
                        >
                          <Image
                            src={c.image}
                            alt={c.alt}
                            fill
                            sizes="(max-width: 768px) 50vw, 33vw"
                            className="object-contain p-2 transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="p-3">
                          <p className="font-serif text-sm leading-tight text-aubergine group-hover:text-or">
                            {c.title.replace(/^Climat\s+/i, "")}
                          </p>
                          <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-aubergine-soft">
                            {c.subtitle}
                          </p>
                        </div>
                      </motion.button>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      {/* Bottom sheet */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.button
              type="button"
              key="backdrop"
              className="fixed inset-0 z-30 bg-aubergine/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedKey(null)}
              aria-label="Fermer"
            />
            <motion.aside
              key="sheet"
              role="dialog"
              aria-modal="true"
              aria-labelledby="climat-sheet-title"
              className="fixed inset-x-0 bottom-0 z-40 mx-auto max-h-[88vh] w-full max-w-screen-sm overflow-y-auto rounded-t-3xl bg-cream-light shadow-2xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.5 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 120) setSelectedKey(null);
              }}
            >
              <div className="flex justify-center pt-3">
                <span className="h-1.5 w-12 rounded-full bg-cream-dark" />
              </div>
              <button
                type="button"
                onClick={() => setSelectedKey(null)}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream text-aubergine-soft hover:bg-cream-dark hover:text-aubergine"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>

              <div className="px-5 pb-8 pt-2">
                {/* Illustration full-width */}
                <div
                  className="relative -mx-5 aspect-[16/9] overflow-hidden"
                  style={{
                    background: `linear-gradient(180deg, ${selected.accent}33, ${selected.accent}0A)`,
                  }}
                >
                  <Image
                    src={selected.image}
                    alt={selected.alt}
                    fill
                    sizes="100vw"
                    className="object-contain p-4"
                    priority
                  />
                </div>

                <div className="mt-5">
                  <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-or">
                    Climat
                  </p>
                  <h2
                    id="climat-sheet-title"
                    className="mt-1 font-serif text-2xl leading-tight text-aubergine"
                  >
                    {selected.title}
                  </h2>
                  <p className="mt-1 text-sm italic text-aubergine-soft">
                    {selected.subtitle}
                  </p>
                </div>

                {/* 4 dimensions sensorielles */}
                <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <Block label={labels.growth} value={selected.growth} />
                  <Block label={labels.ripening} value={selected.ripening} />
                </dl>

                <div className="mt-5 rounded-2xl bg-aubergine/[0.06] p-4">
                  <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-or">
                    {labels.style}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-aubergine">
                    {selected.style}
                  </p>
                </div>

                <div className="mt-3 rounded-2xl border border-or/30 bg-or/[0.06] p-4">
                  <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-or">
                    {labels.fruity}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-aubergine">
                    {selected.fruity}
                  </p>
                </div>

                {/* CTA fiche détaillée */}
                <Link
                  href={`/chapitres/terroir/climat/${selected.slug}`}
                  className="mt-6 flex items-center justify-between rounded-full bg-aubergine px-5 py-3 font-serif text-base text-cream-light shadow-sm transition-transform active:scale-[0.98]"
                >
                  <span>Voir plus en détail</span>
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

function Block({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-cream-dark bg-cream px-3 py-2.5">
      <dt className="font-serif text-[9px] uppercase tracking-[0.2em] text-champetre">
        {label}
      </dt>
      <dd className="mt-1 text-xs leading-snug text-aubergine">{value}</dd>
    </div>
  );
}
