"use client";

import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, RotateCcw, X } from "lucide-react";
import type {
  ClimateKey,
  ManagementKey,
  ReelItem,
  ReelResult,
  SoilKey,
} from "@/lib/content/roue-terroir";
import { lookupCombo } from "@/lib/content/roue-terroir";

type Props = {
  soils: ReelItem<SoilKey>[];
  climates: ReelItem<ClimateKey>[];
  managements: ReelItem<ManagementKey>[];
  modal: {
    win: { title: string; message: string };
    examples: string;
    profile: {
      title: string;
      acidity: string;
      alcohol: string;
      texture: string;
      aromas: string;
    };
    grapeVarieties: { title: string };
  };
};

type ReelKind = "soil" | "climate" | "management";

const SPIN_DURATION_MS = 1500;

/**
 * 3 rouleaux verticaux (sol / climat / vigneron).
 * Bouton "Tourner" → animation cascade qui s'arrête sur des items aléatoires,
 * puis révèle la carte du vin créé.
 */
export function RoueTerroir({ soils, climates, managements, modal }: Props) {
  const [spinning, setSpinning] = useState<Record<ReelKind, boolean>>({
    soil: false,
    climate: false,
    management: false,
  });
  const [picked, setPicked] = useState<{
    soil: ReelItem<SoilKey> | null;
    climate: ReelItem<ClimateKey> | null;
    management: ReelItem<ManagementKey> | null;
  }>({ soil: null, climate: null, management: null });
  const [result, setResult] = useState<ReelResult | null>(null);
  const [spinCount, setSpinCount] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const allReady = picked.soil && picked.climate && picked.management;
  const anySpinning = spinning.soil || spinning.climate || spinning.management;

  const spin = useCallback(() => {
    // Reset
    setResult(null);
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
    setSpinning({ soil: true, climate: true, management: true });

    // Pick random targets
    const targetSoil = soils[Math.floor(Math.random() * soils.length)];
    const targetClimate = climates[Math.floor(Math.random() * climates.length)];
    const targetMgmt = managements[Math.floor(Math.random() * managements.length)];

    // Stop reels in cascade for satisfaction
    timers.current.push(
      setTimeout(() => {
        setPicked((p) => ({ ...p, soil: targetSoil }));
        setSpinning((s) => ({ ...s, soil: false }));
      }, SPIN_DURATION_MS),
    );
    timers.current.push(
      setTimeout(() => {
        setPicked((p) => ({ ...p, climate: targetClimate }));
        setSpinning((s) => ({ ...s, climate: false }));
      }, SPIN_DURATION_MS + 350),
    );
    timers.current.push(
      setTimeout(() => {
        setPicked((p) => ({ ...p, management: targetMgmt }));
        setSpinning((s) => ({ ...s, management: false }));
        // Compute result after the last reel stops
        const combo = lookupCombo(targetSoil.key, targetClimate.key, targetMgmt.key);
        if (combo) setResult(combo);
        setSpinCount((c) => c + 1);
      }, SPIN_DURATION_MS + 750),
    );
  }, [soils, climates, managements]);

  return (
    <>
      <div className="rounded-3xl border border-cream-dark bg-cream-light p-4 shadow-sm">
        <Reel
          label="Sol"
          items={soils}
          spinning={spinning.soil}
          picked={picked.soil}
          accent="#7A5230"
          kind="soil"
        />
        <Reel
          label="Climat"
          items={climates}
          spinning={spinning.climate}
          picked={picked.climate}
          accent="#94a3c2"
          kind="climate"
        />
        <Reel
          label="Savoir-faire"
          items={managements}
          spinning={spinning.management}
          picked={picked.management}
          accent="#7A1F2B"
          kind="management"
        />

        <button
          type="button"
          onClick={spin}
          disabled={anySpinning}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-aubergine px-6 py-4 font-serif text-lg text-cream-light shadow-md transition-all active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {anySpinning ? (
            <>
              <Sparkles className="h-5 w-5 animate-pulse" />
              Le terroir se révèle…
            </>
          ) : spinCount === 0 ? (
            <>
              <Sparkles className="h-5 w-5" />
              Faire tourner
            </>
          ) : (
            <>
              <RotateCcw className="h-5 w-5" />
              Re-tirer un terroir
            </>
          )}
        </button>

        {spinCount > 0 && (
          <p className="mt-3 text-center text-xs text-champetre">
            {spinCount} terroir{spinCount > 1 ? "s" : ""} créé{spinCount > 1 ? "s" : ""} ·{" "}
            {soils.length * climates.length * managements.length} combinaisons possibles
          </p>
        )}
      </div>

      {/* Modal de résultat */}
      <AnimatePresence>
        {result && allReady && (
          <ResultModal
            result={result}
            modal={modal}
            onClose={() => setResult(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function Reel<K extends string>({
  label,
  items,
  spinning,
  picked,
  accent,
  kind,
}: {
  label: string;
  items: ReelItem<K>[];
  spinning: boolean;
  picked: ReelItem<K> | null;
  accent: string;
  kind: ReelKind;
}) {
  // Build a long strip of items for the spin animation
  const strip = useMemo(() => {
    const repeated: ReelItem<K>[] = [];
    for (let i = 0; i < 6; i++) repeated.push(...items);
    return repeated;
  }, [items]);

  return (
    <div className="mb-3 flex items-center gap-3 last:mb-0">
      <p
        className="w-16 shrink-0 font-serif text-[10px] uppercase tracking-[0.25em]"
        style={{ color: accent }}
      >
        {label}
      </p>
      <div
        className="relative h-20 flex-1 overflow-hidden rounded-2xl border bg-cream"
        style={{ borderColor: `${accent}40` }}
      >
        {/* Pointeur central */}
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 border-y"
          style={{ borderColor: `${accent}80`, height: "60px" }}
          aria-hidden="true"
        />

        {spinning ? (
          <motion.div
            key={`spin-${kind}`}
            className="flex flex-col"
            initial={{ y: 0 }}
            animate={{ y: `-${(strip.length - 1) * 80}px` }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            {strip.map((it, i) => (
              <ReelCell key={`${it.key}-${i}`} item={it} />
            ))}
          </motion.div>
        ) : picked ? (
          <motion.div
            key={`picked-${picked.key}`}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="flex h-full items-center justify-center"
          >
            <ReelCell item={picked} isPicked accent={accent} />
          </motion.div>
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-aubergine-soft">
            <span className="text-2xl opacity-30">—</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ReelCell({
  item,
  isPicked = false,
  accent,
}: {
  item: ReelItem<string>;
  isPicked?: boolean;
  accent?: string;
}) {
  return (
    <div
      className="flex h-20 items-center gap-3 px-3"
      style={isPicked && accent ? { background: `${accent}10` } : undefined}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center">
        <Image
          src={item.icon}
          alt=""
          width={48}
          height={48}
          className="h-full w-full object-contain"
        />
      </div>
      <p
        className={`flex-1 truncate font-serif text-sm ${
          isPicked ? "text-aubergine" : "text-aubergine-soft"
        }`}
      >
        {item.label}
      </p>
    </div>
  );
}

function ResultModal({
  result,
  modal,
  onClose,
}: {
  result: ReelResult;
  modal: Props["modal"];
  onClose: () => void;
}) {
  return (
    <>
      <motion.button
        type="button"
        key="backdrop"
        className="fixed inset-0 z-30 bg-aubergine/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        aria-label="Fermer"
      />
      <motion.aside
        key="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="result-title"
        className="fixed inset-x-0 bottom-0 z-40 mx-auto max-h-[90vh] w-full max-w-screen-sm overflow-y-auto rounded-t-3xl bg-cream-light shadow-2xl"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 280, damping: 30 }}
      >
        <div className="flex justify-center pt-3">
          <span className="h-1.5 w-12 rounded-full bg-cream-dark" />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-cream text-aubergine-soft hover:bg-cream-dark hover:text-aubergine"
          aria-label="Fermer"
        >
          <X size={18} />
        </button>

        <div className="px-5 pb-8 pt-4">
          <p className="text-center font-serif text-[10px] uppercase tracking-[0.4em] text-or">
            ✦ {modal.win.title} ✦
          </p>
          <h2
            id="result-title"
            className="mt-2 text-center font-serif text-2xl leading-tight text-aubergine"
          >
            {modal.win.message}
          </h2>

          {/* Les 3 ingrédients */}
          <div className="mt-5 flex items-center justify-around rounded-2xl bg-aubergine/[0.05] p-4">
            <Pill item={result.soil} accent="#7A5230" />
            <span className="text-or" aria-hidden="true">×</span>
            <Pill item={result.climate} accent="#94a3c2" />
            <span className="text-or" aria-hidden="true">×</span>
            <Pill item={result.management} accent="#7A1F2B" />
          </div>

          {/* Description du vin */}
          <p
            className={`mt-5 text-sm leading-relaxed ${
              result.isTbd ? "italic text-aubergine-soft" : "text-aubergine"
            }`}
          >
            {result.description}
          </p>

          {/* Profil */}
          {!result.isTbd && (
            <>
              <h3 className="mt-5 font-serif text-[10px] uppercase tracking-[0.3em] text-or">
                {modal.profile.title}
              </h3>
              <dl className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <ProfileLine label={modal.profile.acidity} value={result.acidity} />
                <ProfileLine label={modal.profile.alcohol} value={result.alcohol} />
                <ProfileLine
                  label={modal.profile.texture}
                  value={result.texture}
                  className="col-span-2"
                />
                <ProfileLine
                  label={modal.profile.aromas}
                  value={result.aromas}
                  className="col-span-2"
                />
              </dl>
            </>
          )}

          {/* Cépages possibles pour ce sol */}
          <div className="mt-5 rounded-2xl border border-or/30 bg-or/[0.06] p-4">
            <h3 className="font-serif text-[10px] uppercase tracking-[0.3em] text-or">
              {modal.grapeVarieties.title} typiques sur ce sol
            </h3>
            <p className="mt-2 text-sm text-aubergine">{result.grapeVarieties}</p>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

function Pill({ item, accent }: { item: ReelItem<string>; accent: string }) {
  return (
    <div className="flex flex-1 flex-col items-center text-center">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full p-1.5"
        style={{ background: `${accent}18` }}
      >
        <Image src={item.icon} alt="" width={40} height={40} className="h-full w-full object-contain" />
      </div>
      <p className="mt-1 line-clamp-2 font-serif text-[10px] leading-tight text-aubergine">
        {item.label}
      </p>
    </div>
  );
}

function ProfileLine({
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
      className={`rounded-xl border border-cream-dark bg-cream px-3 py-2 ${className}`}
    >
      <dt className="font-serif text-[9px] uppercase tracking-[0.2em] text-champetre">
        {label}
      </dt>
      <dd className="mt-0.5 text-xs leading-snug text-aubergine">{value}</dd>
    </div>
  );
}
