"use client";

import { AnimatePresence, motion } from "motion/react";
import { variantSpring } from "@/lib/motion";

/**
 * The outlined DM Mono counter beside the service groups (and the About facts): sticky at 96px,
 * flips per block with the variant spring (0.4s, bounce 0.2).
 * `labels` overrides the zero-padded index (the facts show their own figures).
 */
export function StickyNumber({ index, total, labels }: { index: number; total: number; labels?: readonly string[] }) {
  const i = Math.min(index, total - 1);
  const label = labels ? labels[i] : String(i + 1).padStart(2, "0");
  return (
    <div className="services-number" aria-hidden="true">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={label}
          className="t-number services-number-text"
          initial={{ y: 40, opacity: 0.001 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0.001 }}
          transition={variantSpring}
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
