import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import type { Link as LinkType } from "@/types";

type Props = {
  headline: string;
  subheadline: string;
  cta: LinkType;
};

/**
 * Full-bleed closing band. Like the hero, this does not use `Section` — it
 * needs an edge-to-edge background layer.
 *
 * Carries the grid but deliberately no glow: the design allows exactly one glow
 * per page, and the hero owns it. Two competing glows read as a mistake.
 */
export function FinalCta({ headline, subheadline, cta }: Props) {
  return (
    <section className="relative w-full overflow-hidden border-y border-border bg-bg-subtle">
      <div
        className="pointer-events-none absolute inset-0 bg-grid"
        aria-hidden="true"
      />

      <Reveal className="relative mx-auto flex w-full max-w-page flex-col items-center px-6 py-20 text-center md:py-24">
        <h2 className="max-w-[720px] text-balance text-[30px] font-semibold leading-[1.15] tracking-[-0.03em] text-fg md:text-[40px]">
          {headline}
        </h2>
        <p className="mt-4 max-w-[520px] text-pretty text-[17px] leading-[1.6] text-fg-secondary">
          {subheadline}
        </p>
        <Button
          size="lg"
          className="mt-8 w-full sm:w-auto"
          render={<Link href={cta.href} />}
        >
          {cta.label}
          <ArrowRight
            className="transition-transform duration-150 group-hover/button:translate-x-0.5"
            aria-hidden="true"
          />
        </Button>
      </Reveal>
    </section>
  );
}
