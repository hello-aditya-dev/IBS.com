import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import { HeroSection, defaultHeroContent, type HeroContent } from "@/components/sections/hero-section";
import { getContentOverride } from "@/lib/content-overrides";

// Dynamic imports for below-fold sections — loaded on demand
const WhoWeAreSection = dynamic(
  () => import("@/components/sections/who-we-are-section").then((m) => ({ default: m.WhoWeAreSection }))
);
const ServicesGridSection = dynamic(
  () => import("@/components/sections/services-grid-section").then((m) => ({ default: m.ServicesGridSection }))
);
const SegmentsTeaserSection = dynamic(
  () => import("@/components/sections/segments-teaser-section").then((m) => ({ default: m.SegmentsTeaserSection }))
);
const EngineeringProcessSection = dynamic(
  () => import("@/components/sections/engineering-process-section").then((m) => ({ default: m.EngineeringProcessSection }))
);
const PartnerMarqueeSection = dynamic(
  () => import("@/components/sections/partner-marquee-section").then((m) => ({ default: m.PartnerMarqueeSection }))
);
const WhyIbsSection = dynamic(
  () => import("@/components/sections/why-ibs-section").then((m) => ({ default: m.WhyIbsSection }))
);
const CtaSection = dynamic(
  () => import("@/components/sections/cta-section").then((m) => ({ default: m.CtaSection }))
);

export const metadata: Metadata = {
  title: "Communication, AV, Network Infrastructure, Security & IT Solutions",
  description:
    "Insight Business Solutions designs, installs, and supports voice communication, AV boardroom integration, IT network infrastructure, security and surveillance, call center, and software licensing systems across India.",
  keywords: [
    "systems integration",
    "IT infrastructure",
    "voice communication",
    "AV solutions",
    "network security",
    "CCTV",
    "call center",
    "software licensing",
    "boardroom AV",
    "IP-PBX",
    "fire safety",
    "India",
    "PAN India",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Communication, AV, Network Infrastructure, Security & IT Solutions — Insight Business Solutions",
    description:
      "Voice, AV, IT networking, security, call center, and software licensing — designed, installed, and supported by certified engineers across India.",
  },
  twitter: {
    title: "Communication, AV, Network & Security Systems — IBS",
    description:
      "Voice, AV, IT networking, security, call center, and software licensing — designed, installed, and supported by certified engineers across India.",
  },
};

export default async function Home() {
  const hero = await getContentOverride<HeroContent>("home.hero", defaultHeroContent);

  return (
    <>
      <HeroSection headline={hero.headline} subcopy={hero.subcopy} />
      <div className="content-auto"><Suspense fallback={null}><WhoWeAreSection /></Suspense></div>
      <div className="content-auto"><Suspense fallback={null}><ServicesGridSection /></Suspense></div>
      <div className="content-auto"><Suspense fallback={null}><SegmentsTeaserSection /></Suspense></div>
      <div className="content-auto"><Suspense fallback={null}><EngineeringProcessSection /></Suspense></div>
      <div><Suspense fallback={null}><PartnerMarqueeSection /></Suspense></div>
      <div><Suspense fallback={null}><WhyIbsSection /></Suspense></div>
      <div><Suspense fallback={null}><CtaSection /></Suspense></div>
    </>
  );
}
