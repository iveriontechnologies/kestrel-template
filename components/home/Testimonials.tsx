import { Section, SectionHeader } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import type { SectionCopy, Testimonial } from "@/types";

type Props = {
  copy: SectionCopy;
  testimonials: Testimonial[];
};

function TestimonialCard({ quote, name, role, company, avatar }: Testimonial) {
  return (
    <figure className="flex flex-col rounded-lg border border-border bg-surface p-6">
      <blockquote className="flex-1 text-[15px] leading-[1.65] text-fg">
        {quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        {/* Initials rather than stock photography — a bought portrait in a
            template implies a customer the buyer does not have. */}
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-subtle text-[12px] font-medium text-accent-text"
          aria-hidden="true"
        >
          {avatar}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[14px] font-medium text-fg">{name}</p>
          <p className="truncate text-[13px] text-fg-muted">
            {role}, {company}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials({ copy, testimonials }: Props) {
  return (
    <Section>
      <Reveal>
        <SectionHeader
          eyebrow={copy.eyebrow}
          heading={copy.heading}
          lead={copy.lead}
        />
      </Reveal>
      <Reveal stagger className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.name} {...testimonial} />
        ))}
      </Reveal>
    </Section>
  );
}
