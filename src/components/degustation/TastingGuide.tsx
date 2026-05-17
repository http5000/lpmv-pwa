"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Save,
  Star,
} from "lucide-react";
import {
  ACIDITE,
  ALCOOL,
  AROMA_FAMILIES,
  ATTAQUE,
  BRILLANCE,
  COLORS_PRIMARY,
  COLOR_NUANCES_EXTENDED,
  CORPS,
  FINALE,
  INTENSITE,
  LARMES,
  STEPS,
  STEP_META,
  SUCROSITE,
  TANINS,
  type StepKey,
} from "@/lib/content/degustation";
import { saveTasting, type Tasting } from "@/lib/storage/carnet";

type TastingDraft = Omit<Tasting, "id" | "createdAt">;

const EMPTY: TastingDraft = {
  wineName: "",
  vintage: "",
  region: "",
  rating: 0,
  oeil: { nuances: [] },
  nez: { aromas: [] },
  bouche: { retroAromas: [] },
  notes: "",
};

export function TastingGuide() {
  const [step, setStep] = useState<StepKey>("oeil");
  const [draft, setDraft] = useState<TastingDraft>(EMPTY);
  const [saved, setSaved] = useState<Tasting | null>(null);

  const stepIndex = STEPS.indexOf(step);
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === STEPS.length - 1;

  function update<K extends keyof TastingDraft>(key: K, value: TastingDraft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function updateNested<K extends "oeil" | "nez" | "bouche">(
    key: K,
    patch: Partial<TastingDraft[K]>,
  ) {
    setDraft((d) => ({ ...d, [key]: { ...d[key], ...patch } }));
  }

  function next() {
    if (isLast) return;
    setStep(STEPS[stepIndex + 1]);
  }
  function prev() {
    if (isFirst) return;
    setStep(STEPS[stepIndex - 1]);
  }

  function persist() {
    const t = saveTasting(draft);
    setSaved(t);
  }

  function reset() {
    setDraft(EMPTY);
    setStep("oeil");
    setSaved(null);
  }

  // Écran de confirmation après enregistrement
  if (saved) {
    return (
      <div className="rounded-3xl bg-aubergine/[0.06] p-6 text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-or text-cream-light">
          ✓
        </span>
        <h2 className="mt-4 font-serif text-2xl text-aubergine">
          Enregistré dans ton carnet
        </h2>
        <p className="mt-2 text-sm text-aubergine-soft">
          {saved.wineName || "Vin sans nom"}
          {saved.vintage ? ` — ${saved.vintage}` : ""} ·{" "}
          {saved.rating > 0 ? `${saved.rating}/5` : "non noté"}
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link
            href="/chapitres/degustation/carnet"
            className="rounded-full bg-aubergine px-5 py-3 font-serif text-sm text-cream-light"
          >
            Voir mon carnet
          </Link>
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-aubergine px-5 py-3 font-serif text-sm text-aubergine"
          >
            Déguster un autre vin
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Stepper */}
      <ol className="mb-6 flex items-center justify-between">
        {STEPS.map((s) => {
          const meta = STEP_META[s];
          const isCurrent = s === step;
          const isDone = STEPS.indexOf(s) < stepIndex;
          return (
            <li key={s} className="flex flex-1 items-center">
              <button
                type="button"
                onClick={() => setStep(s)}
                className={`flex flex-col items-center gap-1 transition-opacity ${
                  isCurrent ? "opacity-100" : isDone ? "opacity-90" : "opacity-50"
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition-colors ${
                    isCurrent
                      ? "bg-aubergine text-cream-light"
                      : isDone
                      ? "bg-or/30 text-aubergine"
                      : "bg-cream-dark text-aubergine-soft"
                  }`}
                  aria-hidden="true"
                >
                  {meta.emoji}
                </span>
                <span
                  className={`font-serif text-[10px] uppercase tracking-wider ${
                    isCurrent ? "text-aubergine" : "text-aubergine-soft"
                  }`}
                >
                  {meta.label}
                </span>
              </button>
              {s !== "verdict" && (
                <div
                  className={`mx-1 h-px flex-1 ${
                    isDone ? "bg-or" : "bg-cream-dark"
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>

      {/* Helper */}
      <p className="mb-4 text-center font-serif text-base italic text-aubergine-soft">
        {STEP_META[step].helper}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {step === "oeil" && (
            <OeilStep
              draft={draft}
              onChange={(patch) => updateNested("oeil", patch)}
            />
          )}
          {step === "nez" && (
            <NezStep
              draft={draft}
              onChange={(patch) => updateNested("nez", patch)}
            />
          )}
          {step === "bouche" && (
            <BoucheStep
              draft={draft}
              onChange={(patch) => updateNested("bouche", patch)}
            />
          )}
          {step === "verdict" && (
            <VerdictStep
              draft={draft}
              onChange={update}
              onSave={persist}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Nav prev/next */}
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={prev}
          disabled={isFirst}
          className="flex flex-1 items-center justify-center gap-1 rounded-full border border-cream-dark bg-cream-light px-4 py-3 font-serif text-sm text-aubergine transition-opacity disabled:opacity-30"
        >
          <ChevronLeft size={16} />
          Précédent
        </button>
        {!isLast && (
          <button
            type="button"
            onClick={next}
            className="flex flex-1 items-center justify-center gap-1 rounded-full bg-aubergine px-4 py-3 font-serif text-sm text-cream-light"
          >
            Suivant
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </>
  );
}

// ---------- ŒIL ----------
function OeilStep({
  draft,
  onChange,
}: {
  draft: TastingDraft;
  onChange: (patch: Partial<TastingDraft["oeil"]>) => void;
}) {
  const [showExtended, setShowExtended] = useState(false);
  return (
    <div className="space-y-6">
      <Field label="Couleur dominante">
        <div className="grid grid-cols-5 gap-2">
          {COLORS_PRIMARY.map((c) => {
            const active = draft.oeil.color === c.key;
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => onChange({ color: c.key })}
                aria-pressed={active}
                className={`flex flex-col items-center gap-1 rounded-xl border p-2 transition-all ${
                  active
                    ? "border-aubergine bg-aubergine/[0.05] scale-[1.02]"
                    : "border-cream-dark bg-cream-light hover:border-or"
                }`}
              >
                <span
                  className="h-7 w-7 rounded-full border border-aubergine/20"
                  style={{ background: c.swatch }}
                  aria-hidden="true"
                />
                <span className="text-center font-serif text-[10px] leading-tight text-aubergine">
                  {c.label}
                </span>
              </button>
            );
          })}
        </div>
      </Field>

      <Field label="Intensité">
        <ChipGroup
          options={INTENSITE}
          selected={draft.oeil.intensity}
          onSelect={(v) => onChange({ intensity: v })}
        />
      </Field>

      <Field label="Brillance / Limpidité">
        <ChipGroup
          options={BRILLANCE}
          selected={draft.oeil.brilliance}
          onSelect={(v) => onChange({ brilliance: v })}
        />
      </Field>

      <ExpandToggle
        open={showExtended}
        onToggle={() => setShowExtended((s) => !s)}
        label="Affiner — reflets & larmes"
      >
        <Field label="Reflets perçus (plusieurs choix possibles)">
          <ChipGroupMulti
            options={COLOR_NUANCES_EXTENDED.map((n) => ({ key: n, label: n }))}
            selected={draft.oeil.nuances ?? []}
            onToggle={(v) => {
              const cur = draft.oeil.nuances ?? [];
              onChange({
                nuances: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v],
              });
            }}
          />
        </Field>
        <Field label="Larmes / jambes">
          <ChipGroup
            options={LARMES}
            selected={draft.oeil.larmes}
            onSelect={(v) => onChange({ larmes: v })}
          />
        </Field>
      </ExpandToggle>
    </div>
  );
}

// ---------- NEZ ----------
function NezStep({
  draft,
  onChange,
}: {
  draft: TastingDraft;
  onChange: (patch: Partial<TastingDraft["nez"]>) => void;
}) {
  return (
    <div className="space-y-6">
      <Field label="Intensité du nez">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => {
            const active = (draft.nez.intensity ?? 0) >= n;
            return (
              <button
                key={n}
                type="button"
                onClick={() => onChange({ intensity: n })}
                aria-label={`Intensité ${n} sur 5`}
                className="flex-1"
              >
                <span
                  className={`block h-3 rounded-full transition-colors ${
                    active ? "bg-aubergine" : "bg-cream-dark"
                  }`}
                />
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-center text-xs text-aubergine-soft">
          {draft.nez.intensity
            ? ["", "Discret", "Léger", "Moyen", "Expressif", "Puissant"][draft.nez.intensity]
            : "Tape une note d'intensité"}
        </p>
      </Field>

      <Field label="Arômes perçus">
        <p className="mb-2 text-xs italic text-aubergine-soft">
          Ouvre les familles que tu reconnais, puis sélectionne les arômes. « + » pour
          aller plus loin.
        </p>
        <div className="space-y-2">
          {AROMA_FAMILIES.map((family) => (
            <AromaFamily
              key={family.key}
              family={family}
              selected={draft.nez.aromas ?? []}
              onToggle={(aroma) => {
                const cur = draft.nez.aromas ?? [];
                onChange({
                  aromas: cur.includes(aroma)
                    ? cur.filter((a) => a !== aroma)
                    : [...cur, aroma],
                });
              }}
            />
          ))}
        </div>
      </Field>
    </div>
  );
}

function AromaFamily({
  family,
  selected,
  onToggle,
}: {
  family: (typeof AROMA_FAMILIES)[number];
  selected: string[];
  onToggle: (aroma: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [showExtended, setShowExtended] = useState(false);
  const countInFamily = selected.filter((s) =>
    [...family.primary, ...family.extended].some(
      (a) => `${family.key}:${a}` === s,
    ),
  ).length;

  return (
    <div className="overflow-hidden rounded-2xl border border-cream-dark bg-cream-light">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
        style={{ borderLeft: `4px solid ${family.accent}` }}
      >
        <span className="text-xl" aria-hidden="true">
          {family.emoji}
        </span>
        <span className="flex-1 font-serif text-base text-aubergine">
          {family.label}
        </span>
        {countInFamily > 0 && (
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-medium text-cream-light"
            style={{ background: family.accent }}
          >
            {countInFamily}
          </span>
        )}
        <ChevronDown
          size={16}
          className={`text-aubergine-soft transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-cream-dark px-4 pb-3 pt-3">
              <AromaChips
                aromas={family.primary}
                familyKey={family.key}
                selected={selected}
                onToggle={onToggle}
                accent={family.accent}
              />
              <button
                type="button"
                onClick={() => setShowExtended((s) => !s)}
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-aubergine-soft underline-offset-4 hover:underline"
              >
                <Plus size={14} />
                {showExtended ? "Moins" : "Plus de descripteurs"}
              </button>
              {showExtended && (
                <div className="mt-3">
                  <AromaChips
                    aromas={family.extended}
                    familyKey={family.key}
                    selected={selected}
                    onToggle={onToggle}
                    accent={family.accent}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AromaChips({
  aromas,
  familyKey,
  selected,
  onToggle,
  accent,
}: {
  aromas: string[];
  familyKey: string;
  selected: string[];
  onToggle: (key: string) => void;
  accent: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {aromas.map((a) => {
        const key = `${familyKey}:${a}`;
        const active = selected.includes(key);
        return (
          <button
            key={a}
            type="button"
            onClick={() => onToggle(key)}
            aria-pressed={active}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
              active
                ? "border-transparent text-cream-light"
                : "border-cream-dark bg-cream text-aubergine hover:border-or"
            }`}
            style={active ? { background: accent } : undefined}
          >
            {a}
          </button>
        );
      })}
    </div>
  );
}

// ---------- BOUCHE ----------
function BoucheStep({
  draft,
  onChange,
}: {
  draft: TastingDraft;
  onChange: (patch: Partial<TastingDraft["bouche"]>) => void;
}) {
  const [showRetro, setShowRetro] = useState(false);
  return (
    <div className="space-y-6">
      <Field label="Attaque">
        <ChipGroup
          options={ATTAQUE}
          selected={draft.bouche.attaque}
          onSelect={(v) => onChange({ attaque: v })}
        />
      </Field>
      <Field label="Corps">
        <ChipGroup
          options={CORPS}
          selected={draft.bouche.corps}
          onSelect={(v) => onChange({ corps: v })}
        />
      </Field>
      <Field label="Acidité">
        <ChipGroup
          options={ACIDITE}
          selected={draft.bouche.acidite}
          onSelect={(v) => onChange({ acidite: v })}
        />
      </Field>
      <Field label="Tanins (rouges)">
        <ChipGroup
          options={TANINS}
          selected={draft.bouche.tanins}
          onSelect={(v) => onChange({ tanins: v })}
        />
      </Field>
      <Field label="Sucrosité">
        <ChipGroup
          options={SUCROSITE}
          selected={draft.bouche.sucrosite}
          onSelect={(v) => onChange({ sucrosite: v })}
        />
      </Field>
      <Field label="Alcool">
        <ChipGroup
          options={ALCOOL}
          selected={draft.bouche.alcool}
          onSelect={(v) => onChange({ alcool: v })}
        />
      </Field>
      <Field label="Finale">
        <ChipGroup
          options={FINALE}
          selected={draft.bouche.finale}
          onSelect={(v) => onChange({ finale: v })}
        />
      </Field>

      <ExpandToggle
        open={showRetro}
        onToggle={() => setShowRetro((s) => !s)}
        label="Arômes en rétro-olfaction (optionnel)"
      >
        <p className="text-xs italic text-aubergine-soft">
          Quels arômes perçois-tu après avoir avalé ?
        </p>
        <div className="mt-3 space-y-2">
          {AROMA_FAMILIES.slice(0, 6).map((family) => (
            <AromaFamily
              key={family.key}
              family={family}
              selected={draft.bouche.retroAromas ?? []}
              onToggle={(aroma) => {
                const cur = draft.bouche.retroAromas ?? [];
                onChange({
                  retroAromas: cur.includes(aroma)
                    ? cur.filter((a) => a !== aroma)
                    : [...cur, aroma],
                });
              }}
            />
          ))}
        </div>
      </ExpandToggle>
    </div>
  );
}

// ---------- VERDICT ----------
function VerdictStep({
  draft,
  onChange,
  onSave,
}: {
  draft: TastingDraft;
  onChange: <K extends keyof TastingDraft>(key: K, value: TastingDraft[K]) => void;
  onSave: () => void;
}) {
  return (
    <div className="space-y-5">
      <Field label="Nom du vin">
        <input
          type="text"
          value={draft.wineName}
          onChange={(e) => onChange("wineName", e.target.value)}
          placeholder="Ex. : Chablis 1er Cru Vaillons"
          className="w-full rounded-xl border border-cream-dark bg-cream-light px-3 py-2.5 text-sm text-aubergine placeholder:text-aubergine-soft focus:border-or focus:outline-none"
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Millésime">
          <input
            type="text"
            value={draft.vintage}
            onChange={(e) => onChange("vintage", e.target.value)}
            placeholder="2021"
            className="w-full rounded-xl border border-cream-dark bg-cream-light px-3 py-2.5 text-sm text-aubergine placeholder:text-aubergine-soft focus:border-or focus:outline-none"
          />
        </Field>
        <Field label="Région ou appellation">
          <input
            type="text"
            value={draft.region}
            onChange={(e) => onChange("region", e.target.value)}
            placeholder="Bourgogne"
            className="w-full rounded-xl border border-cream-dark bg-cream-light px-3 py-2.5 text-sm text-aubergine placeholder:text-aubergine-soft focus:border-or focus:outline-none"
          />
        </Field>
      </div>
      <Field label="Ton ressenti général">
        <div className="flex justify-center gap-1.5">
          {[1, 2, 3, 4, 5].map((n) => {
            const active = draft.rating >= n;
            return (
              <button
                key={n}
                type="button"
                onClick={() => onChange("rating", n)}
                aria-label={`${n} sur 5`}
                className="transition-transform active:scale-90"
              >
                <Star
                  size={36}
                  className={active ? "fill-or text-or" : "text-cream-dark"}
                />
              </button>
            );
          })}
        </div>
      </Field>
      <Field label="Notes libres">
        <textarea
          value={draft.notes}
          onChange={(e) => onChange("notes", e.target.value)}
          rows={4}
          placeholder="Une émotion, un contexte, un accord à se rappeler…"
          className="w-full resize-none rounded-xl border border-cream-dark bg-cream-light px-3 py-2.5 text-sm text-aubergine placeholder:text-aubergine-soft focus:border-or focus:outline-none"
        />
      </Field>

      <button
        type="button"
        onClick={onSave}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-aubergine px-6 py-4 font-serif text-lg text-cream-light shadow-md transition-transform active:scale-[0.97]"
      >
        <Save size={18} />
        Enregistrer dans mon carnet
      </button>
      <p className="text-center text-xs text-aubergine-soft">
        Sauvegarde locale, sur ton appareil. Tu peux retrouver toutes tes
        dégustations à tout moment.
      </p>
    </div>
  );
}

// ---------- Helpers UI ----------

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 font-serif text-[10px] uppercase tracking-[0.3em] text-or">
        {label}
      </p>
      {children}
    </div>
  );
}

function ChipGroup({
  options,
  selected,
  onSelect,
}: {
  options: { key: string; label: string; description?: string }[];
  selected: string | undefined;
  onSelect: (key: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = selected === o.key;
        return (
          <button
            key={o.key}
            type="button"
            onClick={() => onSelect(o.key)}
            aria-pressed={active}
            title={o.description}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${
              active
                ? "border-aubergine bg-aubergine text-cream-light"
                : "border-cream-dark bg-cream-light text-aubergine hover:border-or"
            }`}
          >
            {o.label}
            {o.description && (
              <span className="ml-1 text-[10px] opacity-75">
                {o.description}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function ChipGroupMulti({
  options,
  selected,
  onToggle,
}: {
  options: { key: string; label: string }[];
  selected: string[];
  onToggle: (key: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = selected.includes(o.key);
        return (
          <button
            key={o.key}
            type="button"
            onClick={() => onToggle(o.key)}
            aria-pressed={active}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${
              active
                ? "border-aubergine bg-aubergine text-cream-light"
                : "border-cream-dark bg-cream-light text-aubergine hover:border-or"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function ExpandToggle({
  open,
  onToggle,
  label,
  children,
}: {
  open: boolean;
  onToggle: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-or/40 bg-or/[0.04] p-4">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 text-left"
      >
        <span className="font-serif text-sm text-or">{label}</span>
        <ChevronDown
          size={16}
          className={`text-or transition-transform ${open ? "rotate-180" : ""}`}
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
            <div className="mt-3 space-y-4 border-t border-or/20 pt-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
