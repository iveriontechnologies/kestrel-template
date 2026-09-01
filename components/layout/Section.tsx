import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  /** Anchor target, e.g. "features" for /#features. */
  id?: string;
  /** Background alternation. Never run two adjacent sections on the same variant. */
  variant?: "default" | "subtle";
  /** Full-bleed background with the inner container still constrained. */
  bleed?: boolean;
  className?: string;
};

/**
 * Every page section is wrapped in this. It owns max width, horizontal
 * padding, and responsive vertical rhythm so no section sets its own —
 * which is what keeps spacing identical down the whole page.
 */
export function Section({
  children,
  id,
  variant = "default",
  bleed = false,
  className,
}: Props) {
  return (
    <section
      id={id}
      className={cn(
        "w-full",
        variant === "subtle" ? "bg-bg-subtle" : "bg-bg",
        bleed && "border-y border-border",
      )}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-page px-6",
          "py-16 md:py-24 lg:py-32",
          className,
        )}
      >
        {children}
      </div>
    </section>
  );
}

type HeaderProps = {
  eyebrow?: string;
  heading: string;
  lead?: string;
  align?: "center" | "left";
};

/**
 * The opening block of every section except the hero and CTA band.
 * Eyebrow, heading, lead — always in that order, always the same spacing.
 */
export function SectionHeader({
  eyebrow,
  heading,
  lead,
  align = "center",
}: HeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start",
      )}
    >
      {eyebrow ? (
        <span className="text-[13px] font-medium uppercase tracking-[0.08em] text-accent-text">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-[28px] md:text-[36px] leading-[1.15] font-semibold tracking-[-0.025em] text-fg">
        {heading}
      </h2>
      {lead ? (
        <p
          className={cn(
            "mt-1 max-w-[560px] text-[18px] leading-[1.6] text-fg-secondary",
            align === "center" && "mx-auto",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
