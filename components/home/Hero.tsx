import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { DashboardMock } from "@/components/dashboard-mock/DashboardMock";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Link as LinkType } from "@/types";

type Props = {
  eyebrow?: string;
  headline: string;
  subheadline: string;
  bullets?: string[];
  primary: LinkType;
  secondary: LinkType;
};

export function Hero({
  eyebrow,
  headline,
  subheadline,
  bullets,
  primary,
  secondary,
}: Props) {
  return (
    <section className="relative w-full overflow-hidden bg-bg">
      {/* Decorative layers. Both are behind content and inert to AT. */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[720px] hero-glow"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-page px-6 pt-20 pb-16 md:pt-28 md:pb-24 lg:pt-32">
        <div className="flex flex-col items-center text-center">
          {eyebrow ? (
            <span className="inline-flex items-center rounded-full border border-accent-border bg-accent-subtle px-3 py-1 text-xs font-medium text-accent-text">
              {eyebrow}
            </span>
          ) : null}

          <h1
            className={cn(
              "max-w-[820px] text-balance font-semibold text-fg",
              "text-[40px] leading-[1.08] tracking-[-0.03em]",
              "md:text-[56px] md:leading-[1.05] md:tracking-[-0.035em]",
              "lg:text-[64px]",
              eyebrow && "mt-6",
            )}
          >
            {headline}
          </h1>

          <p className="mt-6 max-w-[620px] text-pretty text-[17px] leading-[1.6] text-fg-secondary md:text-[18px]">
            {subheadline}
          </p>

          <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Button
              size="lg"
              className="w-full sm:w-auto"
              render={<Link href={primary.href} />}
            >
              {primary.label}
              <ArrowRight
                className="transition-transform duration-150 group-hover/button:translate-x-0.5"
                aria-hidden="true"
              />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
              render={<Link href={secondary.href} />}
            >
              {secondary.label}
            </Button>
          </div>

          {bullets?.length ? (
            <ul className="mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
              {bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-center gap-2 text-[13px] text-fg-muted"
                >
                  <Check
                    className="h-3.5 w-3.5 text-accent-text"
                    aria-hidden="true"
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="mx-auto mt-16 w-full max-w-[1100px] md:mt-20">
          <DashboardMock />
        </div>
      </div>
    </section>
  );
}
