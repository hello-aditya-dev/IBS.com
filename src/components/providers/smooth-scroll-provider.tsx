"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamic import for Lenis to avoid bundling it in the initial page load
const ReactLenis = dynamic(
  () => import("lenis/react").then((m) => m.ReactLenis),
  { ssr: false }
);

/**
 * SmoothScrollProvider — Lenis smooth scrolling, desktop-only.
 *
 * On mobile, touch devices, reduced-motion, or data-saver connections,
 * native scrolling is used.
 *
 * On supported desktop devices, Lenis is loaded dynamically and
 * initialised after the critical rendering path completes.
 *
 * Children and page content remain server-rendered regardless.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenisReady, setLenisReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobileOrTouch, setIsMobileOrTouch] = useState(true);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const hasDataSaver = (navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData ?? false;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setPrefersReducedMotion(isReducedMotion);
    setIsMobileOrTouch(hasCoarsePointer || !hasFinePointer || hasDataSaver);

    // Only initialise Lenis on capable desktop, not on reduced-motion
    if (!isReducedMotion && !hasCoarsePointer && hasFinePointer && !hasDataSaver) {
      // Initialise after a delay to not compete with critical rendering
      setTimeout(() => setLenisReady(true), 1000);
    }
  }, []);

  // On mobile/touch/reduced-motion: native scrolling
  if (prefersReducedMotion || isMobileOrTouch) {
    return <>{children}</>;
  }

  // Lenis not yet ready — render children natively
  if (!lenisReady) {
    return <>{children}</>;
  }

  // Desktop with Lenis loaded
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
