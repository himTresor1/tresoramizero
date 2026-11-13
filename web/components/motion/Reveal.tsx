"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { HIDDEN, reveal } from "@/lib/motion";

type Props = HTMLMotionProps<"div"> & {
  /** Start scale (services groups and project cards start at 0.9). */
  fromScale?: number;
  /** Start y offset in px. */
  fromY?: number;
  delay?: number;
  /** Portion of the element that must be in view before it reveals. */
  amount?: number;
  once?: boolean;
  as?: "div" | "li" | "section";
};

/**
 * Entrance reveal with the site's standard timing (650ms, no-bounce spring) and an
 * opacity 0.001 start. Uses whileInView so it also works under Lenis.
 */
export function Reveal({ fromScale = 1, fromY = 0, delay = 0, amount = 0.2, once = true, as = "div", style, children, ...rest }: Props) {
  const Tag = as === "li" ? motion.li : as === "section" ? motion.section : motion.div;
  return (
    <Tag
      initial={{ opacity: HIDDEN, scale: fromScale, y: fromY }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ ...reveal, delay }}
      style={{ willChange: "transform, opacity", ...style }}
      {...(rest as HTMLMotionProps<"div"> & HTMLMotionProps<"li"> & HTMLMotionProps<"section">)}
    >
      {children}
    </Tag>
  );
}
