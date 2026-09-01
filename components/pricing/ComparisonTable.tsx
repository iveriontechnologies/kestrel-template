// Pricing page — full plan comparison.

import { Check, Minus } from "lucide-react";

import { Section, SectionHeader } from "@/components/layout/Section";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import type {
  ComparisonGroup,
  ComparisonValue,
  PricingTier,
  SectionCopy,
} from "@/types";

type Props = {
  copy: SectionCopy;
  tiers: PricingTier[];
  groups: ComparisonGroup[];
};

function ComparisonCell({ value }: { value: ComparisonValue }) {
  if (typeof value === "string") {
    return <span className="text-[14px] text-fg">{value}</span>;
  }

  // The icon is decorative; the sr-only text is what a screen reader announces,
  // since "check" and "dash" mean nothing read aloud in a table cell.
  return value ? (
    <>
      <Check className="mx-auto h-4 w-4 text-accent-text" aria-hidden="true" />
      <span className="sr-only">Included</span>
    </>
  ) : (
    <>
      <Minus className="mx-auto h-4 w-4 text-fg-muted" aria-hidden="true" />
      <span className="sr-only">Not included</span>
    </>
  );
}

export function ComparisonTable({ copy, tiers, groups }: Props) {
  return (
    <Section variant="subtle">
      <Reveal>
        <SectionHeader
          eyebrow={copy.eyebrow}
          heading={copy.heading}
          lead={copy.lead}
        />
      </Reveal>

      {/* The table is the one element besides the dashboard mockup allowed to
          scroll horizontally. Shrinking columns to fit a phone makes the values
          unreadable, which defeats the point of a comparison. 640px is chosen
          so the first tier's column still lands inside a 375px viewport —
          a table showing only its own row labels reads as broken. */}
      <Reveal className="mt-12 overflow-hidden rounded-lg border border-border bg-surface">
        <div className="overflow-x-auto">
          {/* table-fixed keeps the three tier columns equal. Auto layout sizes
              them by content, so the longest support label would widen one
              column and make the plans look like different-sized products. */}
          <table className="w-full min-w-[640px] table-fixed text-left">
            <caption className="sr-only">{copy.heading}</caption>

            <thead>
              <tr>
                <th scope="col" className="w-[34%] px-4 py-4 md:px-6">
                  {/* The corner cell stays visually empty — a label here would
                      compete with the tier names for the eye. */}
                  <span className="sr-only">Feature</span>
                </th>
                {tiers.map((tier) => (
                  <th
                    key={tier.name}
                    scope="col"
                    className={cn(
                      "px-4 py-4 text-center text-[15px] font-semibold tracking-[-0.015em] md:px-6",
                      tier.highlighted ? "text-accent-text" : "text-fg",
                    )}
                  >
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>

            {groups.map((group) => (
              <tbody key={group.title} className="divide-y divide-border">
                <tr className="border-t border-border bg-surface-raised">
                  <th
                    scope="colgroup"
                    colSpan={tiers.length + 1}
                    className="px-4 py-2 text-[13px] font-medium text-fg-muted md:px-6"
                  >
                    {group.title}
                  </th>
                </tr>

                {group.rows.map((row) => (
                  <tr key={row.label}>
                    <th
                      scope="row"
                      className="px-4 py-3 text-[14px] font-normal leading-[1.5] text-fg-secondary md:px-6"
                    >
                      {row.label}
                    </th>
                    {/* Mapped over tiers, not over values, so a config edit that
                        drops a value leaves a dash rather than a ragged row. */}
                    {tiers.map((tier, index) => (
                      <td key={tier.name} className="px-4 py-3 text-center md:px-6">
                        <ComparisonCell value={row.values[index] ?? false} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </Reveal>
    </Section>
  );
}
