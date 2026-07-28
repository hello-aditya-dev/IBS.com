import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { services, amcService } from "@/lib/content";

interface RelatedServicesSectionProps {
  currentSlug: string;
}

/**
 * Shows related services, key internal pages, and trust-signal links
 * below the FAQ on each service detail page.
 * Strengthens internal linking without cluttering the page.
 */
export function RelatedServicesSection({ currentSlug }: RelatedServicesSectionProps) {
  const allServices = [...services, amcService];
  const related = allServices.filter((s) => s.slug !== currentSlug).slice(0, 3);

  return (
    <section className="bg-background py-14 sm:py-16 md:py-20 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Related Services */}
          <Reveal direction="up" className="lg:col-span-2">
            <h2 className="mb-6 text-display-3 font-semibold tracking-tight text-charcoal">
              Related Services
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-deep-blue/25 hover:shadow-sm"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-charcoal group-hover:text-deep-blue transition-colors">
                      {s.navLabel}
                    </span>
                    <span className="text-xs text-steel">{s.tagline}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-steel transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </Reveal>

          {/* Key Pages + Trust Signals */}
          <Reveal direction="up" delay={0.1}>
            <h2 className="mb-6 text-display-3 font-semibold tracking-tight text-charcoal">
              Learn More
            </h2>
            <nav aria-label="Related pages" className="flex flex-col gap-3">
              <Link
                href="/who-we-serve"
                className="group flex items-center gap-2 text-sm text-steel hover:text-charcoal transition-colors"
              >
                <ArrowRight className="h-3.5 w-3.5 text-deep-blue/60 group-hover:text-deep-blue" />
                Who We Serve
              </Link>
              <Link
                href="/partners"
                className="group flex items-center gap-2 text-sm text-steel hover:text-charcoal transition-colors"
              >
                <ArrowRight className="h-3.5 w-3.5 text-deep-blue/60 group-hover:text-deep-blue" />
                OEM Partners
              </Link>
              <Link
                href="/quality"
                className="group flex items-center gap-2 text-sm text-steel hover:text-charcoal transition-colors"
              >
                <ArrowRight className="h-3.5 w-3.5 text-deep-blue/60 group-hover:text-deep-blue" />
                Quality &amp; Support
              </Link>
              <Link
                href="/services/annual-maintenance-service"
                className="group flex items-center gap-2 text-sm text-steel hover:text-charcoal transition-colors"
              >
                <ArrowRight className="h-3.5 w-3.5 text-deep-blue/60 group-hover:text-deep-blue" />
                Annual Maintenance Contracts
              </Link>
              <Link
                href="/contact"
                className="group flex items-center gap-2 text-sm text-steel hover:text-charcoal transition-colors"
              >
                <ArrowRight className="h-3.5 w-3.5 text-deep-blue/60 group-hover:text-deep-blue" />
                Contact Our Engineers
              </Link>

              {/* EEAT trust signals — concise, factual */}
              <div className="mt-4 border-t border-border pt-4">
                <ul className="flex flex-col gap-2 text-xs text-steel">
                  <li>Authorized OEM partner for 40+ technology brands</li>
                  <li>Certified engineers for professional installation</li>
                  <li>PAN India deployment with dedicated project teams</li>
                  <li>Long-term AMC with defined SLAs</li>
                </ul>
              </div>
            </nav>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}