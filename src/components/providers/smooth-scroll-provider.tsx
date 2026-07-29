"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useCallback } from "react";

/**
 * SmoothScrollProvider — Lenis smooth scrolling, desktop-only.
 *
 * Key design principle: ONE stable DOM structure from the first render.
 * No DOM swap after hydration. Children never remount.
 *
 * Strategy:
 * - On mobile/touch/reduced-motion/data-saver: native scrolling (no Lenis at all).
 * - On capable desktop: import Lenis lazily and attach it to the window scroll.
 *   The wrapper div uses `className="contents"` so it doesn't affect layout.
 * - Lenis is created and destroyed via imperative code (no ReactLenis component),
 *   so the DOM structure stays exactly the same throughout the lifecycle.
 * - Keyboard scrolling (Page Up/Down, Home, End, arrow keys, spacebar) is preserved.
 * - Anchor navigation is preserved.
 * - lenis.resize() is called after route changes and meaningful layout changes.
 * - Lenis is destroyed cleanly on unmount.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenisRef = useRef<{ instance: any; rafId: number } | null>(null);
  const initAttempted = useRef(false);

  const destroyLenis = useCallback(() => {
    if (lenisRef.current) {
      cancelAnimationFrame(lenisRef.current.rafId);
      try {
        lenisRef.current.instance.destroy();
      } catch {
        // Lenis may already be destroyed
      }
      lenisRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Don't re-init if already attempted (even if it failed)
    if (initAttempted.current) return;

    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const hasDataSaver = (navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData ?? false;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // On mobile/touch/reduced-motion/data-saver: native scrolling, no Lenis
    if (isReducedMotion || hasCoarsePointer || !hasFinePointer || hasDataSaver) {
      initAttempted.current = true;
      return;
    }

    initAttempted.current = true;

    // Import Lenis lazily — only on capable desktop
    import("lenis").then((mod) => {
      const Lenis = mod.default;

      const lenis = new Lenis({
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      });

      // Animation loop: drive Lenis with requestAnimationFrame
      function raf(time: number) {
        lenis.raf(time);
        if (lenisRef.current) {
          lenisRef.current.rafId = requestAnimationFrame(raf);
        }
      }

      lenisRef.current = {
        instance: lenis,
        rafId: requestAnimationFrame(raf),
      };
    }).catch(() => {
      // Lenis failed to load — native scrolling continues working
    });

    return destroyLenis;
  }, [destroyLenis]);

  // Resize handler: call lenis.resize() after layout changes
  useEffect(() => {
    if (!wrapperRef.current) return;

    const observer = new ResizeObserver(() => {
      if (lenisRef.current?.instance) {
        try {
          lenisRef.current.instance.resize();
        } catch {
          // Lenis may not be initialised yet
        }
      }
    });

    observer.observe(wrapperRef.current);

    // Periodic resize for late-loaded content (images, dynamic sections)
    const resizeInterval = setInterval(() => {
      if (lenisRef.current?.instance) {
        try {
          lenisRef.current.instance.resize();
        } catch {
          // Ignore
        }
      }
    }, 3000);

    return () => {
      observer.disconnect();
      clearInterval(resizeInterval);
    };
  }, []);

  // Single stable wrapper — DOM structure never changes
  // `className="contents"` makes this div invisible to layout (no box generated)
  return (
    <div ref={wrapperRef} className="contents">
      {children}
    </div>
  );
}
