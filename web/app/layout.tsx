import type { Metadata, Viewport } from "next";
import "./globals.css";
import { profile } from "@/content/profile";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: { default: profile.meta.title, template: `%s · ${profile.fullName}` },
  description: profile.meta.description,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#121111" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/InterDisplay-500-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/InterDisplay-600-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/InterDisplay-400-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <a href="#main" className="t-nav sr-only z-[100] rounded-full bg-ink-deep px-5 py-2.5 text-on-dark focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          Skip to content
        </a>
        <SmoothScroll />
        <Nav />
        <main id="main" className="relative z-[2] bg-page">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
