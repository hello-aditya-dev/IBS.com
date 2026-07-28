"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Monitor, Lock, Server, Headset, Phone } from "lucide-react";

import { Container } from "@/components/layout/container";
import { type Segment } from "@/lib/content/types";
import { blurMap } from "@/lib/image-blur-map";
import { services, amcService } from "@/lib/content";

export function serviceLabel(slug: string) {
  return [...services, amcService].find((s) => s.slug === slug)?.navLabel ?? slug;
}

/* Map slugs to a lucide icon for the elegant chip tags */
const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "voice-communication": Phone,
  "it-infrastructure": Server,
  "security-solutions": Shield,
  "audio-video-boardroom-solutions": Monitor,
  "call-center-solutions": Headset,
  "software-licenses": Lock,
  "annual-maintenance-service": Shield,
};

const CHALLENGES: Record<string, string[]> = {
  enterprises: [
    "Multi-floor networking with inconsistent cabling",
    "Boardrooms that can\u2019t reliably host video calls",
    "Disconnected phone systems across departments",
  ],
  hotels: [
    "Guest-facing Wi-Fi that resets per stay",
    "Banquet AV any event manager can operate",
    "Property-wide CCTV with audit trails",
  ],
  government: [
    "Compliance-grade surveillance requirements",
    "Secure perimeters with procurement standards",
    "Council-chamber AV for proceedings",
  ],
  residential: [
    "Camera coverage with privacy constraints",
    "App-based control the homeowner actually uses",
    "Dependable Wi-Fi across the property",
  ],
  soho: [
    "Enterprise-grade hardware in a single rack",
    "Support contract without a 24/7 NOC",
    "Licensed productivity tools on a startup budget",
  ],
};

interface IndustryShowcaseProps {
  segment: Segment;
  reversed: boolean;
  index: number;
}

export function IndustryShowcase({ segment, reversed, index }: IndustryShowcaseProps) {
  return (
    <section
      id={segment.slug}
      className={`bg-background scroll-mt-24 py-14 sm:py-20 md:py-24 lg:py-32 ${index % 2 === 1 ? "bg-muted/20" : ""}`}
    >
      <Container>
        <div className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20 ${reversed ? "lg:[direction:rtl]" : ""}`}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:[direction:ltr]"
          >
            <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow duration-500 group-hover:shadow-xl group-hover:shadow-charcoal/[0.06]">
              <Image
                src={`/images/segments/${segment.slug}.jpg`}
                alt={segment.imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="photo-grade object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                placeholder="blur"
                blurDataURL={blurMap[`/images/segments/${segment.slug}.jpg`]}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:[direction:ltr]"
          >
            {/* Number + Title */}
            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-heading font-light text-deep-blue/20 lg:text-6xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="text-2xl font-heading font-semibold tracking-tight text-charcoal lg:text-3xl">
                {segment.title}
              </h2>
            </div>

            <p className="mt-5 text-base leading-relaxed text-steel">{segment.summary}</p>

            {/* Challenges */}
            <div className="mt-8">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-steel">
                Typical challenges
              </h3>
              <ul className="space-y-2">
                {(CHALLENGES[segment.slug] ?? segment.needs).map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-sm text-steel">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-deep-blue" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Service tags with icons */}
            <div className="mt-8">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-steel">
                Solutions we deploy
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {segment.relevantServiceSlugs.map((slug) => {
                  const Icon = SERVICE_ICONS[slug] ?? Shield;
                  return (
                    <span
                      key={slug}
                      className="group/tag inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-steel transition-all duration-300 hover:border-deep-blue/30 hover:bg-deep-blue/[0.04] hover:text-charcoal"
                    >
                      <Icon className="h-3.5 w-3.5 text-deep-blue/60 transition-colors duration-300 group-hover/tag:text-deep-blue" />
                      {serviceLabel(slug)}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-deep-blue transition-colors hover:text-deep-blue-light"
            >
              Explore this industry
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}