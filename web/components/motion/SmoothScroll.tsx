"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { setLenis } from "@/lib/scroll";

/**
 * Lenis smooth scrolling. Runs as a side effect beside the page
 * rather than as a provider so hydration is never forced client-side (lesson from ist-legal-landing).
 * On a path change the scroll resets to the top (or to a #hash target).
 */
export function SmoothScroll() {
  const ref = useRef<Lenis | null>(null);
  const path = usePathname();

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, autoRaf: true });
    ref.current = lenis;
    setLenis(lenis);
    // exposed on window so scripted checks can drive the page through Lenis like a user would
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    return () => {
      setLenis(null);
      ref.current = null;
      lenis.destroy();
    };
  }, []);

  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const lenis = ref.current;
    const hash = window.location.hash;
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        requestAnimationFrame(() => lenis?.scrollTo(el, { immediate: true, force: true }));
        return;
      }
    }
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [path]);

  return null;
}
