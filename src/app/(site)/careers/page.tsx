import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, Clock, GraduationCap, Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SplitText } from "@/components/motion/split-text";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/shared/button-link";
import { CareerForm } from "@/components/sections/career-form";
import { SecondaryHeroNetwork } from "@/components/webgl/secondary-hero-network";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-jsonld";
import { CollectionPageJsonLd } from "@/components/seo/collection-page-jsonld";
import { company, openPositions, careerBenefits, hiringProcess } from "@/lib/content";

export const metadata: Metadata = {
  title: "Careers — Join the IBS Engineering Team",
  description:
    "Open roles at Insight Business Solutions: field service engineers, AV installation engineers, network engineers, sales engineers, AMC coordinators, and interns. Apply online.",
  keywords: [
    "engineering jobs India",
    "AV engineer",
    "network engineer",
    "field service engineer",
    "sales engineer",
    "IT jobs India",
    "systems integrator careers",
    "AMC coordinator",
    "internship",
    "technology jobs",
  ],
  alternates: { canonical: "/careers" },
  openGraph: {
    url: "/careers",
    title: "Careers — Join the IBS Engineering Team",
    description:
      "Open roles at Insight Business Solutions: field service engineers, AV installation engineers, network engineers, sales engineers, AMC coordinators, and interns. Nationwide deployment across India.",
  },
  twitter: {
    title: "Engineering Careers at IBS — Hiring Now",
    description:
      "Open roles at Insight Business Solutions: field service engineers, AV installation engineers, network engineers, sales engineers, AMC coordinators, and interns. Apply online for engineering positions across India.",
  },
};

export default function CareersPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }]} />
      <CollectionPageJsonLd
        name="Careers"
        path="/careers"
        description="Open roles at Insight Business Solutions across India."
        items={openPositions.map((p) => ({ name: p.title, path: `/careers#${p.slug}` }))}
      />

      {/* Hero — concise, no overclaiming. We're hiring for specific roles
          and the page leads with that fact rather than generic "join our
          family" copy. */}
      <Section bg="ambient" className="relative overflow-hidden bg-background pt-28 sm:pt-32 md:pt-32 lg:pt-40 pb-14 sm:pb-16 md:pb-20 lg:pb-24">
        <SecondaryHeroNetwork />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        <Container className="relative z-10">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-steel uppercase">
            Careers
          </span>
          <SplitText
            as="h1"
            text="We're hiring engineers who want to own installations end-to-end."
            className="max-w-4xl text-display-2 leading-[1.05] font-semibold tracking-tight text-charcoal text-balance"
          />
          <Reveal direction="up" delay={0.2}>
            <p className="mt-8 max-w-xl md:max-w-2xl text-lg text-steel">
              We are an engineering-led systems integrator, and our project
              pipeline across India is growing. We hire engineers who want to design, install,
              and maintain communication, AV, IT, and security systems — not just hand off to
              someone else after the install.
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink href="#open-positions" variant="cta" size="xl" data-cursor-hover>
                See open positions <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href="#apply"
                variant="outline"
                size="xl"
                className="border-border bg-transparent text-charcoal hover:bg-secondary"
                data-cursor-hover
              >
                Apply now
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Why join IBS — six concrete, defensible reasons that distinguish
          us from large IT services firms. */}
      <Section bg="grid">
        <Container>
          <Reveal direction="up" className="mb-14 max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-steel uppercase">
              Why IBS
            </span>
            <h2 className="text-display-3 font-semibold tracking-tight text-charcoal text-balance">
              A small engineering team that ships real work.
            </h2>
            <p className="mt-4 text-lg text-steel">
              The pitch is simple: real engineering, real ownership, real outcomes. Not a 500-person
              pyramid where you spend your first year writing documentation.
            </p>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {careerBenefits.map((item) => (
              <RevealItem key={item.title}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-base font-semibold text-charcoal font-heading">{item.title}</h3>
                  <p className="text-sm text-steel">{item.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Open positions — every role listed here is a real role we are
          actively hiring for. Each card has the structured facts a
          candidate cares about: department, location, experience, type. */}
      <Section bg="ambient" className="bg-secondary/30">
        <Container>
          <Reveal direction="up" className="mb-12 max-w-2xl">
            <span
              id="open-positions"
              className="mb-4 inline-flex scroll-mt-32 items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-steel uppercase"
            >
              Open positions
            </span>
            <h2 className="text-display-3 font-semibold tracking-tight text-charcoal text-balance">
              {openPositions.length} active roles across engineering, sales, and operations.
            </h2>
            <p className="mt-4 text-lg text-steel">
              Don&apos;t see a fit? Apply with a general application at the bottom of the page — we
              are always interested in strong engineers, even outside an open requisition.
            </p>
          </Reveal>

          <RevealGroup className="flex flex-col gap-6" stagger={0.06}>
            {openPositions.map((position) => (
              <RevealItem key={position.slug}>
                <article
                  id={position.slug}
                  className="scroll-mt-32 rounded-3xl border border-border bg-card p-7 transition-colors hover:border-deep-blue/30 sm:p-9"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold tracking-tight text-charcoal font-heading sm:text-2xl">
                        {position.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-base text-steel">{position.summary}</p>

                      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-steel">
                        <span className="inline-flex items-center gap-1.5">
                          <Briefcase className="h-3.5 w-3.5 text-deep-blue" />
                          {position.department}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-deep-blue" />
                          {position.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-deep-blue" />
                          {position.experience}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <GraduationCap className="h-3.5 w-3.5 text-deep-blue" />
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <ButtonLink
                      href={`#apply`}
                      variant="outline"
                      size="sm"
                      className="shrink-0 rounded-full"
                      data-cursor-hover
                    >
                      Apply <ArrowRight className="h-3.5 w-3.5" />
                    </ButtonLink>
                  </div>

                  <div className="mt-7 grid grid-cols-1 gap-8 border-t border-border pt-7 md:grid-cols-2">
                    <div>
                      <h4 className="mb-3 text-xs font-semibold tracking-[0.14em] text-steel uppercase">
                        What you&apos;ll do
                      </h4>
                      <ul className="flex flex-col gap-2">
                        {position.responsibilities.map((item) => (
                          <li key={item} className="flex gap-2 text-sm text-steel">
                            <span
                              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-deep-blue"
                              aria-hidden
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-3 text-xs font-semibold tracking-[0.14em] text-steel uppercase">
                        What we&apos;re looking for
                      </h4>
                      <ul className="flex flex-col gap-2">
                        {position.requirements.map((item) => (
                          <li key={item} className="flex gap-2 text-sm text-steel">
                            <span
                              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-deep-blue"
                              aria-hidden
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Hiring process — telling candidates what to expect reduces
          no-shows and "what's next?" anxiety. */}
      <Section bg="grid">
        <Container>
          <Reveal direction="up" className="mb-12 text-center">
            <h2 className="text-display-3 font-semibold tracking-tight text-charcoal text-balance">
              What happens after you apply
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-steel">
              We respect your time. Here&apos;s the exact process every application goes through —
              no black holes.
            </p>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {hiringProcess.map((step) => (
              <RevealItem key={step.step}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6">
                  <span className="text-3xl font-bold tracking-tight text-deep-blue/30 font-heading">
                    {step.step}
                  </span>
                  <h3 className="text-base font-semibold text-charcoal font-heading">{step.title}</h3>
                  <p className="text-sm text-steel">{step.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Apply form + direct contact sidebar. Mirrors the contact page
          layout so the visual rhythm matches across the site. */}
      <Section bg="ambient" className="bg-background" id="apply">
        <Container>
          <Reveal direction="up" className="mb-12 max-w-2xl scroll-mt-32">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-steel uppercase">
              Apply now
            </span>
            <h2 className="text-display-3 font-semibold tracking-tight text-charcoal text-balance">
              Submit your application
            </h2>
            <p className="mt-4 text-lg text-steel">
              Fill out the form below — it takes about 5 minutes. If you have a resume ready, upload
              it to Google Drive or Dropbox and paste the link. We review every application within 5
              working days.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
            <Reveal direction="up" className="md:col-span-3">
              <CareerForm />
            </Reveal>

            <Reveal direction="up" delay={0.15} className="flex flex-col gap-6 md:col-span-2">
              <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 md:p-8">
                <h3 className="text-sm font-semibold tracking-[0.1em] text-steel uppercase">
                  Prefer to reach us directly?
                </h3>
                <p className="mt-3 text-sm text-steel">
                  You can also email your resume and a short note to the address below, or call us
                  during business hours (Mon–Sat, 10:00–18:00 IST).
                </p>
                <ul className="mt-5 flex flex-col gap-4 text-sm">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-deep-blue" />
                    <span className="text-charcoal">{company.contact.address}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-deep-blue" />
                    <span className="flex flex-col text-charcoal">
                      {company.contact.phones.map((p) => (
                        <a
                          key={p}
                          href={`tel:${p.replace(/\s/g, "")}`}
                          className="hover:text-deep-blue"
                        >
                          {p}
                        </a>
                      ))}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="h-4 w-4 shrink-0 text-deep-blue" />
                    <a
                      href={`mailto:${company.contact.email}`}
                      className="text-charcoal hover:text-deep-blue"
                    >
                      {company.contact.email}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 md:p-8">
                <h3 className="text-sm font-semibold tracking-[0.1em] text-steel uppercase">
                  Not ready to apply yet?
                </h3>
                <p className="mt-3 text-sm text-steel">
                  Learn more about who we are and the work we do before you decide.
                </p>
                <div className="mt-5 flex flex-col gap-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-deep-blue hover:text-deep-blue/80"
                    data-cursor-hover
                  >
                    About Insight Business Solutions <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-deep-blue hover:text-deep-blue/80"
                    data-cursor-hover
                  >
                    What we install & support <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/partners"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-deep-blue hover:text-deep-blue/80"
                    data-cursor-hover
                  >
                    OEM brands we work with <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
