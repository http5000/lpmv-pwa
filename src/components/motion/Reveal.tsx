"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Reveal — bloc qui fait fade-up à l'apparition, courbe ease-out-quart unique.
 *
 * Usage en groupe : enchaîner plusieurs <Reveal delay={0.0|0.08|0.16}> pour
 * un stagger cohérent (cf DESIGN.md §Motion). Si l'utilisateur a
 * `prefers-reduced-motion: reduce`, le contenu apparaît directement.
 */
const EASE_OUT_QUART = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 12,
  as = "div",
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "article" | "header" | "p" | "h1" | "h2";
  className?: string;
}) {
  const prefersReduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (prefersReduced) {
    const StaticTag = as as keyof React.JSX.IntrinsicElements;
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT_QUART, delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
