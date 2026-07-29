"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";

import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/shared/button-link";
import { Stat } from "@/components/shared/stat";
import { company, services, partners } from "@/lib/content";

// Re-export types and defaults for backward compatibility
export interface HeroContent {
  headline: string;
  subcopy: string;
}

export const defaultHeroContent: HeroContent = {
  headline: "Systems built around how your business runs.",
  subcopy: company.summary,
};

/**
 * HeroCanvas — dynamic import of the Three.js scene.
 * SSR: false (no canvas on server). Loading state shows a subtle glow placeholder
 * that blends with the gradient background — no layout shift.
 */
const HeroCanvas = dynamic(
  () => import("@/components/webgl/hero-canvas").then((m) => ({ default: m.HeroCanvas })),
  { ssr: false },
);

/**
 * Lightweight reduced-motion detection without importing framer-motion.
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
 * HeroSection — Restored interactive WebGL hero with static SVG fallback.
 *
 * Architecture:
 * <section relative overflow-hidden min-h-screen>
 *   <div z-0> Background grid + ambient glow </div>
 *   <div z-[1] pointer-events-none mask> HeroCanvas (WebGL, viewport-paused) </div>
 *   <div z-[1] pointer-events-none mask (mobile)> Reduced-density HeroCanvas </div>
 *   <div z-0> SVG fallback (fades out after WebGL mounts) </div>
 *   <div z-0> Gradient overlay </div>
 *   <div z-10> Server-rendered hero content </div>
 * </section>
 *
 * The WebGL canvas is clipped to the hero section by overflow-hidden.
 * HeroCanvas uses IntersectionObserver to pause when off-screen.
 * Reduced-motion devices get native scroll and no WebGL animation.
 * Mobile devices get a reduced-density WebGL scene rather than a flat SVG.
 */
export function HeroSection({ headline, subcopy }: Partial<HeroContent> = {}) {
  const h = headline ?? defaultHeroContent.headline;
  const s = subcopy ?? defaultHeroContent.subcopy;

  const prefersReducedMotion = useNativeReducedMotion();
  const [webglMounted, setWebglMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Detect device capabilities for density tuning
  const [isMobile, setIsMobile] = useState(false);
  const [canWebgl, setCanWebgl] = useState(true);

  useEffect(() => {
    // Check for coarse pointer (mobile/touch)
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    setIsMobile(coarsePointer);

    // Quick WebGL capability check — only refuse if the browser cannot
    // create a WebGL context at all. Do NOT refuse based on core count.
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setCanWebgl(gl !== null);
    } catch {
      setCanWebgl(false);
    }
  }, []);

  const handleCanvasReady = useCallback(() => {
    setWebglMounted(true);
  }, []);

  // On reduced-motion: show static fallback only, no WebGL animation
  const showWebgl = canWebgl && !prefersReducedMotion;

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center overflow-hidden bg-background text-charcoal">
      {/* ── Layer 0: Background grid and ambient glow ── */}
      <div className="absolute inset-0 z-0 bg-engineering-grid opacity-70" />
      <div className="absolute inset-0 z-0 bg-ambient-glow" />

      {/* ── Layer 1: Interactive WebGL network (desktop, full density) ── */}
      {showWebgl && !isMobile && (
        <div
          className="pointer-events-none absolute inset-0 z-[1] [mask-image:linear-gradient(215deg,black_10%,black_35%,transparent_65%)]"
          aria-hidden="true"
        >
          <HeroCanvas onReady={handleCanvasReady} />
        </div>
      )}

      {/* ── Layer 1: Reduced-density WebGL on mobile (lighter but still interactive) ── */}
      {showWebgl && isMobile && (
        <div
          className="pointer-events-none absolute inset-0 z-[1] [mask-image:linear-gradient(215deg,black_10%,black_35%,transparent_65%)]"
          aria-hidden="true"
        >
          <HeroCanvas
            density={{
              nodeCount: 28,
              connections: 1,
              particleCount: 60,
              particleOpacity: 0.25,
              lineOpacity: 0.3,
              wireframeOpacity: 0.15,
              rotationSpeed: 0.6,
            }}
            onReady={handleCanvasReady}
          />
        </div>
      )}

      {/* ── SVG fallback: visible until WebGL mounts, then fades out ── */}
      <div
        aria-hidden="true"
        className="hero-svg-fallback absolute inset-0 z-0 transition-opacity duration-700"
        style={{ opacity: webglMounted ? 0 : 1 }}
      >
        <svg
          viewBox="0 0 800 600"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full opacity-50"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="heroGlow1" cx="20%" cy="10%" r="35%">
              <stop offset="0%" stopColor="#EA580C" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="heroGlow2" cx="80%" cy="30%" r="30%">
              <stop offset="0%" stopColor="#FB923C" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#FB923C" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="600" fill="url(#heroGlow1)" />
          <rect width="800" height="600" fill="url(#heroGlow2)" />

          {[
            [120, 80], [200, 180], [340, 60], [500, 120], [620, 50],
            [150, 280], [280, 200], [420, 160], [560, 180], [680, 140],
            [100, 380], [250, 350], [380, 320], [520, 300], [660, 260],
            [160, 480], [300, 440], [440, 420], [580, 400], [700, 380],
            [240, 540], [400, 500], [540, 470], [640, 500], [750, 420],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="#F97316" opacity="0.6" />
          ))}

          {[
            [120, 80, 200, 180], [200, 180, 340, 60], [340, 60, 500, 120],
            [500, 120, 620, 50], [150, 280, 280, 200], [280, 200, 420, 160],
            [420, 160, 560, 180], [560, 180, 680, 140], [100, 380, 250, 350],
            [250, 350, 380, 320], [380, 320, 520, 300], [520, 300, 660, 260],
            [160, 480, 300, 440], [300, 440, 440, 420], [440, 420, 580, 400],
            [580, 400, 700, 380], [200, 180, 280, 200], [280, 200, 250, 350],
            [420, 160, 380, 320], [520, 300, 580, 400],
            [620, 50, 680, 140], [680, 140, 660, 260],
            [240, 540, 400, 500], [400, 500, 540, 470],
            [540, 470, 640, 500], [640, 500, 750, 420],
          ].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FDBA74" strokeWidth="0.8" opacity="0.35" />
          ))}

          <polygon
            points="400,120 560,200 480,360 320,360 240,200"
            fill="none"
            stroke="#FED7AA"
            strokeWidth="0.6"
            opacity="0.2"
          />
          <polygon
            points="400,120 560,200 480,360"
            fill="none"
            stroke="#FED7AA"
            strokeWidth="0.5"
            opacity="0.15"
          />
        </svg>
      </div>

      {/* ── Gradient overlay: ensures text column reads cleanly ── */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-background via-transparent to-background/50" />

      {/* ── Layer 10: Server-rendered hero content (immediately visible, zero JS dependency) ── */}
      <Container className="relative z-10 pt-24 pb-8 sm:pt-28 md:pb-10 lg:pb-12">
        {/* ── Headline: immediately visible, no animation hiding ── */}
        <h1 className="max-w-3xl md:max-w-4xl text-display-1 leading-[1.02] font-semibold tracking-tight text-balance font-heading">
          {h}
        </h1>

        {/* ── Body paragraph ── */}
        <p className="mt-12 max-w-xl text-lg text-steel">{s}</p>

        {/* ── CTA row ── */}
        <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4 md:gap-5">
          <ButtonLink
            href="/contact"
            variant="cta"
            size="xl"
          >
            Talk to us <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink
            href="/services"
            variant="outline"
            size="xl"
            className="border-border bg-transparent text-charcoal hover:bg-secondary"
          >
            Explore services
          </ButtonLink>

          {/* ── Phone number ── */}
          <span className="mx-1 hidden h-8 w-px bg-border md:block" aria-hidden="true" />
          <a
            href={`tel:${company.contact.phones[0].replace(/\s/g, "")}`}
            className="flex items-center gap-2.5 rounded-full border border-border px-4 py-2 text-sm text-steel transition-colors hover:border-steel-light hover:text-charcoal min-h-[44px]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary">
              <Phone className="h-3.5 w-3.5 text-charcoal" />
            </span>
            {company.contact.phones[0]}
          </a>
        </div>

        {/* ── Stats row ── */}
        <div className="mt-10 md:mt-12 grid max-w-2xl grid-cols-3 gap-x-8 gap-y-0 border-t border-border pt-8 md:pt-10 pb-4 lg:gap-x-16">
          <Stat value={`${services.length}`} label="Solution areas" />
          <Stat value={`${partners.length}+`} label="OEM technology partners" />
          <Stat value={`${company.serviceAreas.length}`} label="Locations across India" />
        </div>
      </Container>
    </section>
  );
}
