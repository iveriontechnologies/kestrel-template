import { Section, SectionHeader } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import type { HowItWorksStep, SectionCopy } from "@/types";

type Props = {
  copy: SectionCopy;
  steps: HowItWorksStep[];
};

export function HowItWorks({ copy, steps }: Props) {
  return (
    <Section variant="subtle">
      <Reveal>
        <SectionHeader
          eyebrow={copy.eyebrow}
          heading={copy.heading}
          lead={copy.lead}
        />
      </Reveal>

      <div className="relative mt-12">
        {/* Connecting rule behind the numerals. Inset by half a column at each
            end so it runs between the badges rather than off the edges. */}
        <div
          className="pointer-events-none absolute inset-x-[16.667%] top-5 hidden h-px bg-border md:block"
          aria-hidden="true"
        />

        {/* Renders as the ol itself — a div between ol and li is invalid. */}
        <Reveal
          as="ol"
          stagger
          className="relative grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8"
        >
          {steps.map((step) => (
            <li key={step.step} className="flex flex-col md:items-center">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-[15px] font-semibold text-accent-text"
                aria-hidden="true"
              >
                {step.step}
              </span>
              <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.015em] text-fg md:text-center">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[340px] text-[15px] leading-[1.6] text-fg-secondary md:text-center">
                {step.description}
              </p>
            </li>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
