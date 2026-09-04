import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** The three tiers every layout in the template is designed around. */
export const BREAKPOINTS = { mobile: 768, tablet: 1024 } as const;

/** Motion timings. Only these two durations exist in the design. */
export const REVEAL_DURATION_MS = 500;
export const HOVER_DURATION_MS = 150;

/** Stagger for grouped reveals. Beyond the cap, reveal as one block. */
export const STAGGER_STEP_MS = 60;
export const MAX_STAGGER_ITEMS = 6;

/** Fraction of an element that must be in view before it reveals. */
export const REVEAL_THRESHOLD = 0.15;

/** Words per minute used to derive a post's read time. */
export const READING_WPM = 200;

/**
 * Read time in whole minutes, derived from the body rather than stored in
 * frontmatter — a hand-maintained number goes stale the first time someone
 * edits a post and forgets to update it. Always at least 1.
 */
export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / READING_WPM));
}

/**
 * Formats an ISO `YYYY-MM-DD` date for display.
 *
 * Locale and time zone are both pinned: the date is rendered on the server and
 * again on the client, and letting either drift produces a hydration mismatch
 * or a post dated a day early for readers west of UTC.
 */
export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
