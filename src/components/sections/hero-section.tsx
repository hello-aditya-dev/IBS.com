"use client";

import { HeroShell, defaultHeroContent, type HeroContent } from "@/components/sections/hero-shell";
import { HeroWebGLLoader } from "@/components/webgl/hero-webgl-loader";

// Re-export types and defaults for backward compatibility
export { defaultHeroContent, type HeroContent } from "@/components/sections/hero-shell";

/**
 * HeroSection — Client wrapper around the server-rendered hero shell.
 *
 * The shell (heading, copy, CTAs, stats, static visual) is rendered as
 * plain HTML via HeroShell and is immediately visible before hydration.
 *
 * This client wrapper adds:
 * - The progressive WebGL loader (desktop-only, post-LCP)
 * - A CSS animation that fades the SVG fallback once WebGL is ready
 */
export function HeroSection({ headline, subcopy }: Partial<HeroContent> = {}) {
  return (
    <>
      <HeroShell headline={headline} subcopy={subcopy} />
      <HeroWebGLLoader />
    </>
  );
}
