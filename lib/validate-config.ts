import { siteConfig } from "@/site.config";

/**
 * Development-only sanity checks on site.config.ts.
 *
 * These are invariants TypeScript cannot express — "exactly three tiers",
 * "exactly one highlighted". A buyer editing config could break them silently
 * and get a subtly wrong layout with no error. Warnings name the file and the
 * fix so they are actionable without reading source.
 *
 * Warns rather than throws: a buyer mid-edit should see a broken pricing row,
 * not a blank white screen.
 */
export function validateSiteConfig(): void {
  if (process.env.NODE_ENV === "production") return;

  const warn = (message: string) =>
    console.warn(`[site.config] ${message}`);

  const { tiers, annualDiscountPct, comparison } = siteConfig.pricing;

  if (tiers.length !== 3) {
    warn(
      `pricing.tiers has ${tiers.length} entries. The pricing grid is built for exactly 3 — other counts will leave gaps or overflow the row.`,
    );
  }

  const highlighted = tiers.filter((tier) => tier.highlighted);
  if (highlighted.length !== 1) {
    warn(
      `pricing.tiers has ${highlighted.length} tiers with highlighted: true. Exactly one should be highlighted.`,
    );
  }

  if (annualDiscountPct < 0 || annualDiscountPct >= 100) {
    warn(
      `pricing.annualDiscountPct is ${annualDiscountPct}. It must be between 0 and 99.`,
    );
  }

  for (const group of comparison) {
    for (const row of group.rows) {
      if (row.values.length !== tiers.length) {
        warn(
          `comparison row "${row.label}" under "${group.title}" has ${row.values.length} values but there are ${tiers.length} pricing tiers. Values are matched to tiers by position — a missing one renders as a dash.`,
        );
      }
    }
  }

  if (siteConfig.howItWorks.length !== 3) {
    warn(
      `howItWorks has ${siteConfig.howItWorks.length} steps. The layout is built for exactly 3.`,
    );
  }

  const featureSpan = siteConfig.features.reduce(
    (total, feature) => total + (feature.span ?? 1),
    0,
  );
  if (featureSpan % 3 !== 0) {
    warn(
      `feature spans total ${featureSpan}, which is not a multiple of 3. The bento grid will leave a hole in its last row — adjust a feature's span.`,
    );
  }

  if (siteConfig.url.endsWith("/")) {
    warn("url should not end with a trailing slash.");
  }
}
