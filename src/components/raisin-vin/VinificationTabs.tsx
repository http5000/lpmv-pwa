"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Path, Step, WineType } from "@/lib/content/raisin-vin";

type Props = {
  paths: Path[];
};

/**
 * 4 onglets (Rouge / Blanc / Rosé / Orange) → timeline verticale d'étapes.
 * Chaque étape : carte avec image, titre, résumé, et "Approfondir" qui révèle
 * details + didYouKnow.
 */
export function VinificationTabs({ paths }: Props) {
  const [active, setActive] = useState<WineType>("red");
  const activePath = paths.find((p) => p.key === active) ?? paths[0];

  return (
    <>
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Type de vin"
        className="sticky top-[110px] z-10 -mx-5 mb-5 grid grid-cols-4 gap-1 border-b border-cream-dark bg-cream/95 px-5 pb-2 pt-1 backdrop-blur"
      >
        {paths.map((p) => {
          const isActive = p.key === active;
          return (
            <button
              key={p.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(p.key)}
              className="relative flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-center transition-colors"
              style={isActive ? { background: `${p.accent}18` } : undefined}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: p.accent }}
                aria-hidden="true"
              />
              <span
                className={`font-serif text-xs leading-tight ${
                  isActive ? "text-aubergine" : "text-aubergine-soft"
                }`}
              >
                {p.label.replace(/^Vin\s+/i, "")}
              </span>
              {isActive && (
                <motion.span
                  layoutId="active-tab-underline"
                  className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                  style={{ background: p.accent }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tagline */}
      <p
        className="text-center font-serif text-base italic"
        style={{ color: activePath.accent }}
      >
        {activePath.tagline}
      </p>

      {/* Timeline */}
      <AnimatePresence mode="wait">
        <motion.ol
          key={activePath.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative mt-6 space-y-3"
        >
          {/* Ligne verticale de connexion */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[27px] top-6 bottom-6 w-0.5"
            style={{
              background: `linear-gradient(to bottom, ${activePath.accent}80, ${activePath.accent}20)`,
            }}
          />

          {activePath.steps.map((step, idx) => (
            <StepCard
              key={step.id}
              step={step}
              num={idx + 1}
              total={activePath.steps.length}
              accent={activePath.accent}
            />
          ))}
        </motion.ol>
      </AnimatePresence>
    </>
  );
}

function StepCard({
  step,
  num,
  total,
  accent,
}: {
  step: Step;
  num: number;
  total: number;
  accent: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <li className="relative pl-16">
      {/* Pastille numéro */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full border-2 bg-cream-light shadow-sm"
        style={{ borderColor: accent }}
      >
        <span className="font-serif text-lg" style={{ color: accent }}>
          {num}
        </span>
      </span>

      <div
        className="overflow-hidden rounded-2xl border bg-cream-light"
        style={{ borderColor: `${accent}30` }}
      >
        {/* Image étape */}
        <div className="relative aspect-[5/3] w-full bg-cream">
          <Image
            src={step.image}
            alt=""
            fill
            sizes="(max-width: 768px) 90vw, 500px"
            className="object-contain p-2"
          />
        </div>

        <div className="p-4">
          <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-champetre">
            Étape {num} / {total}
          </p>
          <h3 className="mt-1 font-serif text-xl leading-tight text-aubergine">
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-aubergine">
            {step.text}
          </p>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="mt-3 inline-flex items-center gap-1 text-xs font-medium underline-offset-4 hover:underline"
            style={{ color: accent }}
            aria-expanded={open}
          >
            {open ? "Replier" : "Approfondir"}
            <ChevronDown
              size={14}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-3 space-y-3 border-t border-cream-dark pt-3">
                  <p className="text-sm leading-relaxed text-aubergine">
                    {step.details}
                  </p>
                  <div className="flex gap-2 rounded-xl border border-or/30 bg-or/[0.06] p-3">
                    <span aria-hidden="true" className="text-or">✦</span>
                    <p className="text-xs leading-relaxed italic text-aubergine">
                      {step.didYouKnow}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </li>
  );
}
