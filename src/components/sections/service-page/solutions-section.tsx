"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/layout/container";
import { IllustrationFrame } from "@/components/illustrations/illustration-frame";
import { serviceIllustrationMap } from "@/components/illustrations/services";
import { EASE_OUT_EXPO, DURATION } from "@/lib/motion";
import { blurMap } from "@/lib/image-blur-map";
import type { ServicePageData } from "@/lib/content/service-page-data";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface SolutionsSectionProps {
  data: ServicePageData;
  serviceImage?: string;
}

// ---------------------------------------------------------------------------
// Animation helpers
// ---------------------------------------------------------------------------


function slideVariants(direction: "left" | "right", reduced: boolean): Variants {
  const offset = reduced ? 0 : direction === "left" ? 60 : -60;
  return {
    hidden: { opacity: reduced ? 1 : 0, x: offset },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: reduced ? 0 : DURATION.hero,
        ease: EASE_OUT_EXPO,
      },
    },
  };
}

// ---------------------------------------------------------------------------
// Solution image (when serviceImage is provided)
// ---------------------------------------------------------------------------

function SolutionImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-full min-h-[320px] overflow-hidden rounded-3xl bg-muted lg:min-h-[420px]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        placeholder={blurMap[src] ? "blur" : "empty"}
        blurDataURL={blurMap[src]}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Illustration fallback (when serviceImage is NOT provided)
// ---------------------------------------------------------------------------

function SolutionIllustration({ serviceSlug }: { serviceSlug: string }) {
  const Illustration = serviceIllustrationMap[serviceSlug];
  if (!Illustration) return null;
  return (
    <IllustrationFrame className="h-full min-h-[320px] w-full lg:min-h-[420px]">
      <Illustration className="h-2/3 w-2/3" />
    </IllustrationFrame>
  );
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export function SolutionsSection({ data, serviceImage }: SolutionsSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-background py-14 sm:py-20 md:py-24 lg:py-32">
      <Container>
        {/* Section header */}
        <motion.div
          className="mb-10 lg:mb-16 max-w-2xl"
          initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: prefersReducedMotion ? 0 : DURATION.hero, ease: EASE_OUT_EXPO }}
        >
          <span className="mb-4 inline-block text-xs font-semibold tracking-[0.14em] text-steel uppercase">
            What We Deliver
          </span>
          <h2 className="text-display-3 font-semibold tracking-tight text-charcoal text-balance">
            Solutions built for real environments
          </h2>
        </motion.div>

        {/* Solution blocks — alternating editorial layout */}
        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-28">
          {data.solutions.map((solution, i) => {
            const isEven = i % 2 === 0;
            const direction = isEven ? "left" : "right";
            const variants = slideVariants(direction, !!prefersReducedMotion);

            return (
              <motion.article
                key={solution.title}
                className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={variants}
              >
                {/* Visual side — order flips based on index */}
                <div className={`group ${isEven ? "" : "lg:order-2"}`}>
                  {solution.image ? (
                    <SolutionImage
                      src={solution.image}
                      alt={`${solution.title}: ${solution.description.split(".")[0]}`}
                    />
                  ) : serviceImage ? (
                    <SolutionImage
                      src={serviceImage}
                      alt={`${solution.title}: ${solution.description.split(".")[0]}`}
                    />
                  ) : (
                    <SolutionIllustration serviceSlug={data.slug} />
                  )}
                </div>

                {/* Content side */}
                <div className={isEven ? "" : "lg:order-1"}>
                  <h3 className="text-2xl font-heading font-semibold text-charcoal leading-snug">
                    {solution.title}
                  </h3>

                  <p className="mt-4 text-base leading-relaxed text-steel">
                    {solution.description}
                  </p>

                  {/* Benefits */}
                  {solution.benefits.length > 0 && (
                    <ul className="mt-6 flex flex-col gap-2.5" role="list">
                      {solution.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3">
                          <span
                            className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-deep-blue"
                            aria-hidden="true"
                          />
                          <span className="text-sm leading-relaxed text-steel">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Typical deployment */}
                  {solution.typicalDeployment && (
                    <p className="mt-6 text-xs font-medium tracking-wide text-steel uppercase">
                      Typical deployment
                    </p>
                  )}
                  <p className="mt-1 text-sm text-steel">{solution.typicalDeployment}</p>

                  {/* OEM brand pills */}
                  {solution.oemBrands.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {solution.oemBrands.map((brand) => (
                        <span
                          key={brand}
                          className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-charcoal"
                        >
                          {brand}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}