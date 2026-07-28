"use client";

import {
  Building2,
  Factory,
  GraduationCap,
  Headset,
  HeartPulse,
  Home,
  Hotel,
  Landmark,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { typicalProjects } from "@/lib/content/typical-projects";

const ICON_MAP: Record<string, LucideIcon> = {
  Building2,
  Hotel,
  HeartPulse,
  GraduationCap,
  Landmark,
  Factory,
  Home,
  Headset,
};

export function TypicalProjectsSection() {
  return (
    <section className="bg-secondary/20 py-14 sm:py-20 md:py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Typical Installations"
          title="Environments we equip regularly"
          description="The systems and engineering considerations that come up most often across the environments we work in."
          align="center"
          className="mb-14"
        />

        <RevealGroup
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          stagger={0.07}
        >
          {typicalProjects.map((project) => {
            const Icon = ICON_MAP[project.icon] ?? Building2;
            return (
              <RevealItem key={project.environment}>
                <article className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-deep-blue/25 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-deep-blue/5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-charcoal">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-base font-semibold text-charcoal font-heading">
                    {project.environment}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.systems.map((system) => (
                      <span
                        key={system}
                        className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-medium text-steel"
                      >
                        {system}
                      </span>
                    ))}
                  </div>
                  <p className="mt-auto text-sm leading-relaxed text-steel">
                    {project.considerations}
                  </p>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}