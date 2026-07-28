"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/webgl/hero-scene").then((m) => m.HeroScene), {
  ssr: false,
});

/**
 * Lightweight reduced-motion detection without importing framer-motion.
 * This avoids pulling the entire Framer Motion library into the initial
 * bundle just for this one hook.
 */
function useNativeReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

/**
 * HeroWebGLLoader — Progressive enhancement for the hero background.
 *
 * Strategy:
 * - On mobile, touch devices, reduced-motion, or data-saver: never load WebGL.
 * - On capable desktop devices (pointer: fine, adequate hardware concurrency):
 *   load WebGL after the critical content has painted.
 * - Uses requestIdleCallback (with setTimeout fallback) to defer loading.
 * - The SVG fallback remains visible until WebGL mounts.
 */
export function HeroWebGLLoader() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isDesktopCapable, setIsDesktopCapable] = useState(false);
  const prefersReducedMotion = useNativeReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const hasDataSaver = (navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData ?? false;
    const concurrency = navigator.hardwareConcurrency ?? 0;
    const isLowPower = concurrency > 0 && concurrency <= 4;

    const capable = hasFinePointer && !isTouchDevice && !hasDataSaver && !isLowPower;

    if (!capable) return;

    setIsDesktopCapable(true);

    const minDelay = 1500;

    if ("requestIdleCallback" in window) {
      requestIdleCallback(
        () => {
          setTimeout(() => setShouldLoad(true), 200);
        },
        { timeout: minDelay },
      );
    } else {
      setTimeout(() => setShouldLoad(true), minDelay);
    }
  }, [prefersReducedMotion]);

  if (!isDesktopCapable || !shouldLoad) return null;

  return (
    <div
      className="absolute inset-0 [mask-image:linear-gradient(215deg,black_10%,black_35%,transparent_65%)]"
      aria-hidden="true"
    >
      <HeroScene active={true} density={{}} />
    </div>
  );
}
