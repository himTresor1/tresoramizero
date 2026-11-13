"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { MobileMenu } from "./MobileMenu";

export const navLinks = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Nav: desktop 92px tall, four items spread across the
 * 1400px content width, 18px Inter Display 400, white with `mix-blend-mode: exclusion` so it reads
 * dark over light sections and light over dark ones. Under 1200px: 72px tall, 16px wordmark and a
 * 40×40 two-line toggle; the text is plain ink (no blend).
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  // the home nav is white + exclusion (it sits on the photo); inner pages use plain ink
  const home = usePathname() === "/";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* the blend sits on the stacking-context element itself so it composites against the page,
          not against the nav's own transparent box */}
      <nav aria-label="Main" className={`absolute inset-x-0 top-0 z-30 ${home ? "nav-blend text-on-dark" : "nav-plain text-ink"}`}>
        {/* desktop */}
        <div className="nav-desktop hidden h-[92px] items-start justify-between pt-[29px] desktop:flex">
          <Link href="/" className="t-nav nav-link">
            {profile.wordmark}
          </Link>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="t-nav nav-link">
              {l.label}
            </Link>
          ))}
        </div>
        {/* tablet + mobile */}
        <div className="flex h-[72px] items-start justify-between px-[16px] pt-[16px] desktop:hidden">
          <Link href="/" className="nav-wordmark-small tap mt-[6px]" onClick={() => setOpen(false)}>
            {profile.wordmark}
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="nav-toggle"
            data-open={open || undefined}
          >
            <span className="nav-toggle-line" />
            <span className="nav-toggle-line" />
          </button>
        </div>
      </nav>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
