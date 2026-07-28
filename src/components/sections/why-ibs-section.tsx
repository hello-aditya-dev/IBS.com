import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealItem, RevealGroup } from "@/components/motion/reveal";
import { qualityIllustrationMap, whyUsIllustrationSlug } from "@/components/illustrations/quality";
import { amcService } from "@/lib/content";

export function WhyIbsSection() {
  const highlights = amcService.whyUs.slice(0, 4);

  return (
    <Section bg="ambient" className="bg-secondary/30">
      <Container>
        <SectionHeading
          eyebrow="Why IBS"
          title="Support that doesn't stop at installation"
          description={amcService.intro}
          className="mb-16"
        />

        <RevealGroup className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {highlights.map((item) => {
            const Illustration = qualityIllustrationMap[whyUsIllustrationSlug[item.title]];
            return (
              <RevealItem key={item.title}>
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-charcoal">
                    {Illustration && <Illustration className="h-6 w-6" />}
                  </span>
                  <h3 className="text-base font-semibold text-charcoal font-heading">{item.title}</h3>
                  <p className="text-sm text-steel">{item.description}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}
