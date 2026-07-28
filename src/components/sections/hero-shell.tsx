/**
 * HeroShell — Server-rendered hero content that is immediately visible.
 *
 * The heading, paragraph, CTAs, phone link, and statistics are rendered as
 * plain HTML with zero JavaScript dependency.  A CSS-driven decorative
 * fallback (SVG network + gradients) provides the visual background so the
 * hero looks premium before any client code hydrates.
 *
 * A small client-side enhancement (`HeroWebGlLoader`) progressively upgrades
 * the background to the full Three.js network on capable desktop devices only,
 * after the critical content has painted.
 */

import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/shared/button-link";
import { Stat } from "@/components/shared/stat";
import { company, services, partners } from "@/lib/content";

export interface HeroContent {
  headline: string;
  subcopy: string;
}

export const defaultHeroContent: HeroContent = {
  headline: "Systems built around how your business runs.",
  subcopy: company.summary,
};

export function HeroShell({ headline, subcopy }: Partial<HeroContent> = {}) {
  const h = headline ?? defaultHeroContent.headline;
  const s = subcopy ?? defaultHeroContent.subcopy;

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-background text-charcoal">
      {/* ── Static decorative fallback (CSS + inline SVG network) ── */}
      <div className="absolute inset-0 bg-engineering-grid opacity-70" />
      <div className="absolute inset-0 bg-ambient-glow" />

      {/* ── SVG network fallback: visible immediately, resembles the WebGL composition ── */}
      <div aria-hidden="true" className="hero-svg-fallback absolute inset-0">
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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />

      <Container className="relative z-10 pt-24 pb-8 sm:pt-28 md:pb-10 lg:pb-12">
        {/* ── Headline: immediately visible, no animation hiding ── */}
        <h1 className="max-w-3xl md:max-w-4xl text-display-1 leading-[1.02] font-semibold tracking-tight text-balance font-heading">
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
