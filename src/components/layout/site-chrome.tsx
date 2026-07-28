import type { ReactNode } from "react";

import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

/**
 * SiteChrome — Page wrapper for the public site.
 *
 * Server-rendered shell: skip-to-content link, grain overlay, navbar, footer, main.
 * SmoothScrollProvider wraps content for Lenis (desktop-only, deferred).
 * Client islands are loaded via ClientIslands component (in layout).
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-deep-blue focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-warm-white"
      >
        Skip to main content
      </a>
      <div className="grain-overlay-fixed" aria-hidden="true" />
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
