"use client";

import { Suspense, lazy, useEffect, useState } from "react";
import type { ReactNode } from "react";

/**
 * ClientIslands — Lightweight client enhancements loaded independently.
 *
 * Each island is:
 * 1. Conditionally loaded based on device capability
 * 2. Deferred past critical rendering where possible
 * 3. Self-contained (no wrapping of server-rendered page content)
 *
 * This ensures the server-rendered HTML is the LCP content,
 * and client JS only enhances interactive behavior.
 */

// ── Desktop-only: custom cursor ──
// Only on pointer:fine devices, never on touch/reduced-motion
const CustomCursorIsland = lazy(() =>
  import("@/components/shared/custom-cursor").then((m) => ({
    default: m.CustomCursor,
  }))
);

// ── Scroll progress bar ──
// Lightweight, uses rAF + CSS, no Framer Motion
const ScrollProgressIsland = lazy(() =>
  import("@/components/shared/scroll-progress").then((m) => ({
    default: m.ScrollProgress,
  }))
);

// ── Back to top ──
const BackToTopIsland = lazy(() =>
  import("@/components/shared/back-to-top").then((m) => ({
    default: m.BackToTop,
  }))
);

// ── WhatsApp button ──
const WhatsAppButtonIsland = lazy(() =>
  import("@/components/shared/whatsapp-button").then((m) => ({
    default: m.WhatsAppButton,
  }))
);

export function ClientIslands() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const hasDataSaver = (navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData ?? false;

    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setIsDesktop(hasFinePointer && !hasDataSaver);

    // Delay client islands past critical rendering
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => setIsReady(true), { timeout: 2000 });
    } else {
      setTimeout(() => setIsReady(true), 1500);
    }
  }, []);

  if (!isReady) return null;

  return (
    <>
      {/* Custom cursor: pointer:fine only */}
      {isDesktop && !prefersReducedMotion && (
        <Suspense fallback={null}>
          <CustomCursorIsland />
        </Suspense>
      )}

      {/* Scroll progress: visible to all non-reduced-motion users */}
      {!prefersReducedMotion && (
        <Suspense fallback={null}>
          <ScrollProgressIsland />
        </Suspense>
      )}

      {/* Back to top */}
      <Suspense fallback={null}>
        <BackToTopIsland />
      </Suspense>

      {/* WhatsApp button */}
      <Suspense fallback={null}>
        <WhatsAppButtonIsland />
      </Suspense>
    </>
  );
}
