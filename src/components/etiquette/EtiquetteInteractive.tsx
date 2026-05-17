"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ETIQUETTE_HOTSPOTS, type Hotspot } from "@/lib/content/etiquette";

/**
 * Étiquette générique illustrée avec 7 hotspots tappables.
 * Pas de visuel produit réel — un dessin SVG d'étiquette générique pour
 * éviter toute confusion avec un producteur identifiable.
 */
export function EtiquetteInteractive() {
  const [active, setActive] = useState<Hotspot | null>(null);

  return (
    <div>
      {/* Étiquette générique en SVG */}
      <div className="relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-2xl border border-cream-dark bg-cream-light shadow-lg">
        <EtiquetteSVG />

        {/* Hotspots cliquables */}
        {ETIQUETTE_HOTSPOTS.map((h) => (
          <button
            key={h.key}
            type="button"
            onClick={() => setActive(h)}
            aria-label={h.label}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
          >
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-or bg-cream-light/90 font-serif text-xs text-or shadow-md transition-all ${
                active?.key === h.key
                  ? "scale-125"
                  : "animate-pulse group-hover:scale-110"
              }`}
            >
              +
            </span>
          </button>
        ))}
      </div>

      <p className="mt-3 text-center text-xs italic text-aubergine-soft">
        Touche chaque <span className="font-serif text-or">+</span> pour décoder
        la mention.
      </p>

      {/* Modal détail */}
      <AnimatePresence>
        {active && (
          <>
            <motion.button
              type="button"
              key="backdrop"
              className="fixed inset-0 z-30 bg-aubergine/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActive(null)}
              aria-label="Fermer"
            />
            <motion.aside
              key="sheet"
              role="dialog"
              aria-modal="true"
              className="fixed inset-x-0 bottom-0 z-40 mx-auto max-h-[80vh] w-full max-w-screen-sm overflow-y-auto rounded-t-3xl bg-cream-light shadow-2xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
            >
              <div className="flex justify-center pt-3">
                <span className="h-1.5 w-12 rounded-full bg-cream-dark" />
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream text-aubergine-soft hover:bg-cream-dark hover:text-aubergine"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>
              <div className="px-5 pb-8 pt-4">
                <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-or">
                  Mention
                </p>
                <h2 className="mt-1 font-serif text-2xl leading-tight text-aubergine">
                  {active.label}
                </h2>
                <p className="mt-2 font-serif text-base italic text-or">
                  {active.tldr}
                </p>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-aubergine">
                  {active.detail.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function EtiquetteSVG() {
  return (
    <svg
      viewBox="0 0 300 400"
      className="absolute inset-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Fond papier */}
      <rect width="300" height="400" fill="#FDFAF2" />

      {/* Bordure double */}
      <rect
        x="14"
        y="14"
        width="272"
        height="372"
        fill="none"
        stroke="#310E31"
        strokeOpacity="0.3"
        strokeWidth="0.8"
      />
      <rect
        x="20"
        y="20"
        width="260"
        height="360"
        fill="none"
        stroke="#310E31"
        strokeOpacity="0.2"
        strokeWidth="0.4"
      />

      {/* Sceau / blason en haut */}
      <circle
        cx="150"
        cy="64"
        r="22"
        fill="none"
        stroke="#CA9A2F"
        strokeWidth="1.2"
      />
      <text
        x="150"
        y="69"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="12"
        fill="#7A1F2B"
        fontStyle="italic"
      >
        Domaine
      </text>

      {/* Lignes pour appellation */}
      <text
        x="150"
        y="100"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="11"
        fill="#310E31"
        letterSpacing="2"
      >
        APPELLATION D&apos;ORIGINE
      </text>
      <text
        x="150"
        y="118"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="9"
        fill="#310E31"
        opacity="0.7"
        letterSpacing="3"
      >
        CONTRÔLÉE
      </text>

      {/* Millésime */}
      <text
        x="150"
        y="160"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="30"
        fill="#7A1F2B"
        fontStyle="italic"
      >
        2021
      </text>

      {/* Nom cuvée */}
      <text
        x="150"
        y="210"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="22"
        fill="#310E31"
      >
        Cuvée Émeraude
      </text>

      {/* Producteur */}
      <text
        x="150"
        y="260"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="10"
        fill="#310E31"
        opacity="0.7"
        letterSpacing="1"
      >
        Mis en bouteille au domaine
      </text>
      <text
        x="150"
        y="276"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="9"
        fill="#310E31"
        opacity="0.6"
      >
        par les Vignerons Imaginaires — FR-12345
      </text>

      {/* Pied : degré et contenance */}
      <text
        x="50"
        y="332"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="14"
        fill="#310E31"
      >
        13 % vol.
      </text>
      <text
        x="250"
        y="332"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="14"
        fill="#310E31"
      >
        75 cl
      </text>

      {/* Sulfites */}
      <text
        x="150"
        y="370"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="7"
        fill="#310E31"
        opacity="0.6"
        letterSpacing="1"
      >
        CONTIENT DES SULFITES — L&apos;ABUS D&apos;ALCOOL EST DANGEREUX
      </text>
    </svg>
  );
}
