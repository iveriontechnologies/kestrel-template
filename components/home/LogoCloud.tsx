import type { ReactNode } from "react";

import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  caption: string;
  logos: { name: string }[];
};

/**
 * ─────────────────────────────────────────────────────────────
 *  BUYER: REPLACE THESE.
 *
 *  Company names come from siteConfig.logoCloud.logos. The marks
 *  below are matched by name — add an entry to MARKS for your own
 *  customers, or delete the entry and the name renders as a
 *  wordmark on its own.
 *
 *  These are fictional companies. Do not ship a logo cloud that
 *  implies customers you do not have.
 * ─────────────────────────────────────────────────────────────
 */
const MARKS: Record<string, ReactNode> = {
  Loomstack: (
    <>
      <rect x="3" y="12" width="4" height="9" rx="1" />
      <rect x="10" y="7" width="4" height="14" rx="1" />
      <rect x="17" y="3" width="4" height="18" rx="1" />
    </>
  ),
  Fernwood: (
    <>
      <path d="M12 3 L21 20 H3 Z" />
      <rect x="11" y="14" width="2" height="7" rx="1" />
    </>
  ),
  Trellis: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="13" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="8" rx="2" opacity="0.45" />
      <rect x="3" y="13" width="8" height="8" rx="2" opacity="0.45" />
    </>
  ),
  Northbound: (
    <>
      <path d="M12 3 L20 21 L12 16.5 L4 21 Z" />
    </>
  ),
  Halcyon: (
    <>
      <circle cx="12" cy="12" r="9" opacity="0.35" />
      <circle cx="12" cy="12" r="4.5" />
    </>
  ),
  Meridian: (
    <>
      <circle cx="12" cy="12" r="8.5" opacity="0.35" />
      <rect x="2" y="11" width="20" height="2" rx="1" />
    </>
  ),
};

function LogoMark({ name }: { name: string }) {
  const mark = MARKS[name];

  return (
    // Lifts by colour, not by opacity. At opacity-70 the muted grey composited
    // to #5d5d6a on the subtle background — 3.01:1, which Lighthouse caught
    // and a contrast check reading `color` alone cannot: the computed value is
    // still the passing token.
    <div className="flex items-center justify-center gap-2 text-fg-muted transition-colors duration-150 hover:text-fg-secondary">
      {mark ? (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5 shrink-0"
          aria-hidden="true"
        >
          {mark}
        </svg>
      ) : null}
      <span className="text-[15px] font-semibold tracking-[-0.01em] whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export function LogoCloud({ caption, logos }: Props) {
  return (
    <Section variant="subtle" className="py-12 md:py-14 lg:py-16">
      <Reveal>
        <p className="text-center text-[13px] text-fg-muted">{caption}</p>
      </Reveal>
      <Reveal
        stagger
        className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6"
      >
        {logos.map((logo) => (
          <LogoMark key={logo.name} name={logo.name} />
        ))}
      </Reveal>
    </Section>
  );
}
