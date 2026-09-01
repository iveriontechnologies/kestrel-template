import Link from "next/link";

import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Mark only, no wordmark. Used in tight spaces. */
  markOnly?: boolean;
};

/**
 * ─────────────────────────────────────────────────────────────
 *  BUYER: REPLACE THIS.
 *
 *  Swap the <svg> below for your own mark. Keep the 32x32
 *  viewBox and use fill="currentColor" on the outer shape so it
 *  picks up the accent token and themes automatically.
 *
 *  The wordmark text comes from siteConfig.name — you do not
 *  need to edit it here.
 * ─────────────────────────────────────────────────────────────
 */
export function Logo({ className, markOnly = false }: Props) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-md",
        "transition-opacity duration-150 hover:opacity-80",
        // The wordmark is only 29px tall. Same pseudo-element trick as the
        // icon buttons, vertical only — it already spans its own width.
        "relative after:absolute after:inset-x-0 after:-inset-y-2 after:content-[''] lg:after:hidden",
        className,
      )}
      aria-label={`${siteConfig.name} home`}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="32" height="32" rx="8" className="fill-accent" />
        <path
          d="M16 7.5 L24.5 23 L16 18.6 L7.5 23 Z"
          className="fill-accent-contrast"
        />
      </svg>
      {markOnly ? null : (
        <span className="text-[19px] font-semibold tracking-[-0.02em] text-fg">
          {siteConfig.name}
        </span>
      )}
    </Link>
  );
}
