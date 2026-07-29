"use client";

import { ArrowRight, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/shared/button-link";
import { Stat } from "@/components/shared/stat";
import { company, services, partners } from "@/lib/content";

const HeroScene = dynamic(() => import("@/components/webgl/hero-scene").then((m) => m.HeroScene), {
  ssr: false,
});

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
 * HeroSection — Single-contained hero with static fallback + progressive WebGL.
 *
 * Structure:
 * <section relative overflow-hidden min-h-screen>
 *   <div z-0> Static fallback (SVG + gradients)  </div>
 *   <div z-[1] pointer-events-none> WebGL enhancement (desktop-only) </div>
 *   <div z-10> Hero content (heading, CTAs, stats) </div>
 * </section>
 *
 * The WebGL canvas is clipped to the hero section by overflow-hidden,
 * and never escapes as a page-level absolute sibling.
 */
export function HeroSection({ headline, subcopy }: Partial<HeroContent> = {}) {
  const h = headline ?? defaultHeroContent.headline;
  const s = subcopy ?? defaultHeroContent.subcopy;

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

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-background text-charcoal">
      {/* ── Layer 0: Static decorative fallback (CSS + inline SVG network) ── */}
      <div className="absolute inset-0 z-0 bg-engineering-grid opacity-70" />
      <div className="absolute inset-0 z-0 bg-ambient-glow" />

      {/* ── SVG network fallback: visible immediately, resembles the WebGL composition ── */}
      <div aria-hidden="true" className="hero-svg-fallback absolute inset-0 z-0">
        <svg
          viewBox="0 0 800 600"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full opacity-50"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Ambient radial glow */}
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

          {/* Network nodes */}
          {[
            [120, 80], [200, 180], [340, 60], [500, 120], [620, 50],
            [150, 280], [280, 200], [420, 160], [560, 180], [680, 140],
            [100, 380], [250, 350], [380, 320], [520, 300], [660, 260],
            [160, 480], [300, 440], [440, 420], [580, 400], [700, 380],
            [240, 540], [400, 500], [540, 470], [640, 500], [750, 420],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="#F97316" opacity="0.6" />
          ))}

          {/* Connection lines between nearby nodes */}
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

          {/* Wireframe icosahedron overlay */}
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

      {/* ── Layer 1: WebGL enhancement (desktop-only, post-LCP) ── */}
      {isDesktopCapable && shouldLoad && (
        <div
          className="pointer-events-none absolute inset-0 z-[1] [mask-image:linear-gradient(215deg,black_10%,black_35%,transparent_65%)]"
          aria-hidden="true"
        >
          <HeroScene active={true} density={{}} />
        </div>
      )}

      {/* ── Layer 10: Hero content (heading, CTAs, stats) ── */}
      <Container className="relative z-10 pt-24 pb-8 sm:pt-28 md:pb-10 lg:pb-12">
        {/* ── Headline: immediately visible, no animation hiding ── */}
        <h1 className="max-w-3xl md:max-w-xl text-display-1 leading-[1.02] font-semibold tracking-tight text-balance font-heading">
          {h}
        </h1>

        {/* ── Body paragraph (48px gap from headline) ── */}
        <p className="mt-12 max-w-xl text-lg text-steel">{s}</p>

        {/* ── CTA row (48px gap from body) ── */}
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

          {/* ── Phone number: visually separated with icon circle + divider ── */}
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

        {/* ── Stats row (48px gap from CTA) ── */}
        <div className="mt-10 md:mt-12 grid max-w-2xl grid-cols-3 gap-x-8 gap-y-0 border-t border-border pt-8 md:pt-10 pb-4 lg:gap-x-16">
          <Stat value={`${services.length}`} label="Solution areas" />
          <Stat value={`${partners.length}+`} label="OEM technology partners" />
          <Stat value={`${company.serviceAreas.length}`} label="Locations across India" />
        </div>
      </Container>
    </section>
  );
}
