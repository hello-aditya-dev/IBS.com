"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { ServiceVisual } from "@/components/shared/service-visual";
import { ButtonLink } from "@/components/shared/button-link";
import { EASE_OUT_EXPO, DURATION } from "@/lib/motion";
import type { Service } from "@/lib/content";
import type { ServicePageData } from "@/lib/content/service-page-data";

interface HeroSectionProps {
  service: Service;
  data: ServicePageData;
}

const trustBadges = [
  { label: "15+ Years" },
  { label: "Pan India" },
  { label: "46+ OEM Partners" },
];

export function HeroSection({ service, data }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  const duration = prefersReducedMotion ? 0 : DURATION.hero;
  const ease = EASE_OUT_EXPO;

  return (
    <section
      ref={sectionRef}
      className="relative bg-background pt-24 pb-14 sm:pt-28 md:pt-32 md:pb-20 lg:pt-44 lg:pb-32"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-ambient-glow" />

      <Container>
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-2 lg:gap-20">
          {/* Left: headline + copy */}
          <div>
            {/* Pill badge */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration * 0.75, ease, delay: prefersReducedMotion ? 0 : 0 }}
              className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-steel uppercase"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-deep-blue" />
              {service.tagline}
            </motion.span>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration, ease, delay: prefersReducedMotion ? 0 : 0.1 }}
              className="max-w-md md:max-w-xl text-[clamp(2rem,4.5vw,4rem)] font-heading font-semibold leading-[1.08] tracking-tight text-charcoal"
            >
              {data.heroHeadline}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration * 0.75, ease, delay: prefersReducedMotion ? 0 : 0.25 }}
              className="mt-6 md:mt-8 max-w-md md:max-w-xl text-base md:text-lg leading-relaxed text-steel"
            >
              {data.heroSubheadline}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: duration * 0.7, ease, delay: prefersReducedMotion ? 0 : 0.4 }}
              className="mt-8 md:mt-10 flex flex-wrap items-center gap-3"
            >
              <ButtonLink href="/contact" variant="cta" size="xl">
                {data.heroPrimaryCta}
                <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline" size="xl">
                {data.heroSecondaryCta}
              </ButtonLink>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: duration * 0.6, delay: prefersReducedMotion ? 0 : 0.55 }}
              className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2"
            >
              {trustBadges.map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-steel"
                >
                  <span className="h-1 w-1 rounded-full bg-steel/40" />
                  {badge.label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: service visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: duration * 1.1, ease, delay: prefersReducedMotion ? 0 : 0.2 }}
          >
            <ServiceVisual
              service={service}
              className="h-64 md:h-80 lg:h-[420px] w-full rounded-3xl"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}