import { Bell, Database, Funnel, Play, Repeat, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Section, SectionHeader } from "@/components/layout/Section";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import type { Feature, IconName, SectionCopy } from "@/types";

/**
 * Config stores icon names as strings, because a buyer editing site.config.ts
 * cannot import a component. Typing this Record<IconName, …> makes a missing
 * entry a compile error rather than a blank square at runtime.
 */
const ICONS: Record<IconName, LucideIcon> = {
  zap: Zap,
  funnel: Funnel,
  repeat: Repeat,
  play: Play,
  bell: Bell,
  database: Database,
};

function FeatureCard({ icon, title, description, span = 1 }: Feature) {
  // Unknown name falls back rather than crashing a buyer's build.
  const Icon = ICONS[icon] ?? Zap;

  return (
    <article
      className={cn(
        "flex flex-col rounded-lg border border-border bg-surface p-6",
        "transition-colors duration-150 hover:border-border-strong",
        span === 2 && "lg:col-span-2",
      )}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-subtle">
        <Icon className="h-[18px] w-[18px] text-accent-text" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.015em] text-fg">
        {title}
      </h3>
      <p className="mt-2 text-[15px] leading-[1.6] text-fg-secondary">
        {description}
      </p>
    </article>
  );
}

type Props = {
  copy: SectionCopy;
  features: Feature[];
};

export function FeatureGrid({ copy, features }: Props) {
  return (
    <Section id="features">
      <Reveal>
        <SectionHeader
          eyebrow={copy.eyebrow}
          heading={copy.heading}
          lead={copy.lead}
        />
      </Reveal>
      {/* Reveal *is* the grid. A wrapper div around each card would become the
          grid item, and the bento spans on the cards would stop applying. */}
      <Reveal
        stagger
        className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </Reveal>
    </Section>
  );
}
