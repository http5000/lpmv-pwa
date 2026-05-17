"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type Vessel = { key: string; title: string; description: string; icon: string };
type Duration = { key: "short" | "long"; title: string; description: string };
type Sample = { vessel: string; duration: string; verdict: string; example: string };

type Props = {
  vessels: Vessel[];
  durations: Duration[];
  samples: Sample[];
};

/**
 * Mini-simulateur d'élevage : sélection contenant + durée → verdict.
 * Réutilise les samples préchargés du JSON musée (vessel_duration → verdict).
 */
export function AgingPlayground({ vessels, durations, samples }: Props) {
  const [vessel, setVessel] = useState(vessels[0]?.key ?? "stainless");
  const [duration, setDuration] = useState<"short" | "long">("short");

  const sample = useMemo(
    () => samples.find((s) => s.vessel === vessel && s.duration === duration),
    [samples, vessel, duration],
  );

  return (
    <div className="rounded-3xl border border-cream-dark bg-cream-light p-5">
      <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-or">
        Le choix du contenant
      </p>
      <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {vessels.map((v) => {
          const isActive = v.key === vessel;
          return (
            <li key={v.key}>
              <button
                type="button"
                onClick={() => setVessel(v.key)}
                className={`flex w-full flex-col items-center gap-1 rounded-xl border p-2 text-center transition-all active:scale-[0.97] ${
                  isActive
                    ? "border-aubergine bg-aubergine/[0.05]"
                    : "border-cream-dark bg-cream hover:border-or"
                }`}
                aria-pressed={isActive}
              >
                <div className="relative h-12 w-12">
                  <Image
                    src={v.icon}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="48px"
                  />
                </div>
                <span className="font-serif text-[11px] leading-tight text-aubergine">
                  {v.title}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 font-serif text-[10px] uppercase tracking-[0.3em] text-or">
        Le facteur temps
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {durations.map((d) => {
          const isActive = d.key === duration;
          return (
            <button
              key={d.key}
              type="button"
              onClick={() => setDuration(d.key)}
              className={`rounded-xl border p-3 text-left transition-all active:scale-[0.98] ${
                isActive
                  ? "border-aubergine bg-aubergine/[0.05]"
                  : "border-cream-dark bg-cream hover:border-or"
              }`}
              aria-pressed={isActive}
            >
              <p className="font-serif text-sm text-aubergine">{d.title}</p>
              <p className="mt-1 text-xs text-aubergine-soft">{d.description}</p>
            </button>
          );
        })}
      </div>

      {/* Verdict */}
      <motion.div
        key={`${vessel}-${duration}`}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="mt-5 rounded-2xl border border-or/30 bg-or/[0.06] p-4"
      >
        <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-or">
          Verdict de la cave
        </p>
        {sample ? (
          <>
            <p className="mt-2 text-sm leading-relaxed text-aubergine">
              {sample.verdict}
            </p>
            <p className="mt-2 text-xs italic text-aubergine-soft">
              Exemple : {sample.example}
            </p>
          </>
        ) : (
          <p className="mt-2 text-sm italic text-aubergine-soft">
            Cette combinaison se rencontre rarement en vrai — explore-en une autre.
          </p>
        )}
      </motion.div>
    </div>
  );
}
