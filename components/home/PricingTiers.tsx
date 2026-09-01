"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

import { Section, SectionHeader } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import type { PricingTier, SectionCopy } from "@/types";

type Props = {
  copy: SectionCopy;
  tiers: PricingTier[];
  annualDiscountPct: number;
  /** Rendered without the Section wrapper when embedded in the pricing page. */
  bare?: boolean;
};

function formatPrice(value: number): string {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

function TierCard({
  tier,
  annual,
  annualDiscountPct,
  headingLevel,
}: {
  tier: PricingTier;
  annual: boolean;
  annualDiscountPct: number;
  /** `h2` when nothing above supplies one — see the `bare` prop below. */
  headingLevel: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const free = tier.monthlyPrice === 0;
  const multiplier = 1 - annualDiscountPct / 100;

  // Annual price is always derived, never stored. See architecture.md.
  const perMonth = annual ? tier.monthlyPrice * multiplier : tier.monthlyPrice;
  const annualTotal = tier.monthlyPrice * 12 * multiplier;

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-lg border bg-surface p-6",
        tier.highlighted
          ? "border-accent-border"
          : "border-border",
      )}
    >
      {tier.highlighted ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-accent-border bg-accent-subtle px-3 py-1 text-[11px] font-medium text-accent-text">
          Most popular
        </span>
      ) : null}

      <div
        className={cn(
          "-m-6 mb-0 rounded-t-lg p-6",
          tier.highlighted && "bg-accent-subtle",
        )}
      >
        <Heading className="text-[17px] font-semibold tracking-[-0.015em] text-fg">
          {tier.name}
        </Heading>
        <p className="mt-1 text-[14px] leading-[1.5] text-fg-secondary">
          {tier.description}
        </p>

        <div className="mt-5 flex items-start gap-1">
          {free ? (
            <span className="text-[44px] font-semibold leading-none tracking-[-0.03em] text-fg">
              Free
            </span>
          ) : (
            <>
              <span className="mt-1 text-[24px] font-semibold leading-none text-fg">
                $
              </span>
              <span
                // Remounting on toggle lets the fade replay. 150ms per ui-rules.
                key={annual ? "annual" : "monthly"}
                className="text-[44px] font-semibold leading-none tracking-[-0.03em] text-fg animate-in fade-in duration-150"
              >
                {formatPrice(perMonth).replace("$", "")}
              </span>
              <span className="mt-4 text-[14px] text-fg-muted">/mo</span>
            </>
          )}
        </div>

        <p className="mt-2 h-4 text-[13px] text-fg-muted">
          {!free && annual ? `${formatPrice(annualTotal)} billed annually` : ""}
        </p>
      </div>

      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-accent-text"
              aria-hidden="true"
            />
            <span className="text-[14px] leading-[1.5] text-fg-secondary">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Button
        size="lg"
        variant={tier.highlighted ? "default" : "outline"}
        className="mt-6 w-full"
        render={<Link href={tier.cta.href} />}
      >
        {tier.cta.label}
      </Button>
    </div>
  );
}

export function PricingTiers({
  copy,
  tiers,
  annualDiscountPct,
  bare = false,
}: Props) {
  const [annual, setAnnual] = useState(false);

  const content = (
    <>
      {bare ? null : (
        <Reveal>
          <SectionHeader
            eyebrow={copy.eyebrow}
            heading={copy.heading}
            lead={copy.lead}
          />
        </Reveal>
      )}

      <Reveal className="mt-10 flex items-center justify-center gap-3">
        <span
          className={cn(
            "text-[14px] transition-colors duration-150",
            annual ? "text-fg-muted" : "font-medium text-fg",
          )}
        >
          Monthly
        </span>
        <Switch
          checked={annual}
          onCheckedChange={setAnnual}
          aria-label="Bill annually"
        />
        <span
          className={cn(
            "text-[14px] transition-colors duration-150",
            annual ? "font-medium text-fg" : "text-fg-muted",
          )}
        >
          Annual
        </span>
        <span className="rounded-full border border-accent-border bg-accent-subtle px-2 py-0.5 text-[11px] font-medium text-accent-text">
          Save {annualDiscountPct}%
        </span>
      </Reveal>

      <Reveal
        stagger
        className="mt-10 grid grid-cols-1 gap-6 pt-3 md:grid-cols-3"
      >
        {tiers.map((tier) => (
          <TierCard
            key={tier.name}
            tier={tier}
            annual={annual}
            annualDiscountPct={annualDiscountPct}
            // Bare means the caller supplied the page heading and this
            // component renders no h2 of its own, so the cards step up a level
            // rather than leaving an h1 -> h3 gap.
            headingLevel={bare ? "h2" : "h3"}
          />
        ))}
      </Reveal>
    </>
  );

  if (bare) return content;

  return (
    <Section id="pricing" variant="subtle">
      {content}
    </Section>
  );
}
