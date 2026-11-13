"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { navLinks } from "./Nav";
import { reveal } from "@/lib/motion";

/**
 * Menu under 1200px, measured on the template at 390: the nav grows to 250px, its background
 * becomes ink-deep, the toggle turns into an X (two 18×18 lines at ±45°) and the three links sit at
 * x=16, y=85/139/193 (54px pitch), 16px/22.4 Inter Display 400, white. The page is not locked.
 */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          className="absolute inset-x-0 top-0 z-20 overflow-hidden bg-page-deep desktop:hidden"
          initial={{ height: 72 }}
          animate={{ height: 250 }}
          exit={{ height: 72, transition: { ...reveal, duration: 0.4 } }}
          transition={reveal}
        >
          <ul className="absolute left-[16px] top-[85px] flex flex-col gap-[32px]">
            {navLinks.map((l, i) => (
              <motion.li
                key={l.href}
                initial={{ opacity: 0.001, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...reveal, delay: 0.06 * i }}
              >
                <Link href={l.href} onClick={onClose} className="nav-wordmark-small block text-on-dark">
                  {l.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
