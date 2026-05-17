"use client";

import { motion } from "framer-motion";
import type { Organe } from "@/lib/content/anatomie";

type Props = {
  organes: Organe[]; // déjà triés du sol au fruit
};

/**
 * Parcours narratif vertical de la vigne, du sol au fruit (sens naturel de la sève).
 * Chaque organe est une "station" : numéro, émoji, titre, quote poétique, didYouKnow,
 * contenu détaillé. Les stations sont reliées visuellement par une ligne de sève.
 *
 * Animation : chaque station fade-in en remontant légèrement quand on scrolle dessus
 * (viewport intersection via Framer Motion `whileInView`).
 */
export function VigneScroll({ organes }: Props) {
  return (
    <div className="relative">
      {/* Ligne de "sève" verticale en arrière-plan */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[27px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-or via-aubergine/40 to-or/30"
      />

      <ol className="relative space-y-8">
        {organes.map((organe, idx) => (
          <motion.li
            key={organe.id}
            id={organe.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px 0px" }}
            transition={{ duration: 0.45, delay: 0.05 * idx }}
            className="relative pl-16"
          >
            {/* Pastille numéro */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full border-2 border-or bg-cream-light text-3xl shadow-sm"
            >
              {organe.emoji}
            </span>
            <span className="absolute left-12 top-0 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-aubergine font-serif text-[11px] text-cream-light">
              {organe.cycleOrder}
            </span>

            <div className="rounded-2xl border border-cream-dark bg-cream-light p-5 shadow-sm">
              <h3 className="font-serif text-2xl leading-tight text-aubergine">
                {organe.title}
              </h3>
              <p className="mt-1 font-serif text-base italic text-or">
                « {organe.quote} »
              </p>

              {organe.content.map((para, i) => (
                <p
                  key={i}
                  className="mt-3 text-sm leading-relaxed text-aubergine [&_strong]:font-medium [&_strong]:text-or"
                  dangerouslySetInnerHTML={{ __html: para }}
                />
              ))}

              {/* Le saviez-vous */}
              <div className="mt-4 flex gap-2 rounded-xl border border-or/30 bg-or/[0.06] p-3">
                <span aria-hidden="true" className="text-or">✦</span>
                <p
                  className="text-xs leading-relaxed italic text-aubergine [&_strong]:not-italic [&_strong]:text-or"
                  dangerouslySetInnerHTML={{ __html: organe.didYouKnow }}
                />
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
