/**
 * Shared types for Kestrel.
 *
 * `SiteConfig` is the contract for `site.config.ts` — the single file a buyer
 * edits to rebrand the site's copy. Every user-facing string in the template
 * is reachable from here.
 */

/* ---------- Primitives ---------- */

export type Link = {
  label: string;
  href: string;
};

/**
 * Icons are referenced from config by name, because a buyer editing a config
 * file cannot import a React component. The map that resolves these lives in
 * the component that renders them, typed `Record<IconName, LucideIcon>` so a
 * missing entry is a compile error.
 *
 * Declared here rather than derived from that map to avoid a circular import
 * (config imports types; the component imports config).
 */
export type IconName =
  | "zap"
  | "funnel"
  | "repeat"
  | "play"
  | "bell"
  | "database";

/* ---------- Sections ---------- */

export type Feature = {
  icon: IconName;
  title: string;
  description: string;
  /** Columns spanned in the bento grid at lg and up. Defaults to 1. */
  span?: 1 | 2;
};

export type HowItWorksStep = {
  step: number;
  title: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Initials rendered in a tinted circle. No stock photography ships. */
  avatar: string;
};

export type PricingTier = {
  name: string;
  /** Whole currency units per month. `0` renders as "Free". */
  monthlyPrice: number;
  description: string;
  features: string[];
  cta: Link;
  /** Exactly one tier in the set is highlighted. */
  highlighted: boolean;
};

/**
 * A single comparison cell.
 *
 * `true` renders a check, `false` a dash, and a string renders as text —
 * which is what lets one row say "included" and the next say "10 million".
 */
export type ComparisonValue = boolean | string;

export type ComparisonRow = {
  label: string;
  /** One entry per pricing tier, in the same order as `pricing.tiers`. */
  values: ComparisonValue[];
};

/** A labelled block of comparison rows, e.g. "Usage" or "Security". */
export type ComparisonGroup = {
  title: string;
  rows: ComparisonRow[];
};

/** Eyebrow / heading / lead for a section's opening block. */
export type SectionCopy = {
  eyebrow: string;
  heading: string;
  lead?: string;
};

/**
 * The opening block of a secondary page, plus its metadata strings.
 * `heading` is the page's `h1`, so it is larger than a `SectionCopy` heading.
 */
export type PageCopy = {
  eyebrow?: string;
  heading: string;
  lead?: string;
  /** Browser tab title. Short — `seo.titleTemplate` appends the product name. */
  metaTitle: string;
  metaDescription: string;
};

/** One labelled control in a form. */
export type FormField = {
  label: string;
  placeholder: string;
};

/** The three strings every form needs beyond its fields. */
export type FormCopy = {
  submitLabel: string;
  /** Present participle shown on the button while the action runs. */
  pendingLabel: string;
  successMessage: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FooterColumn = {
  title: string;
  links: Link[];
};

export type SocialLink = {
  platform: "x" | "github" | "linkedin";
  href: string;
};

/* ---------- Config ---------- */

export type SiteConfig = {
  name: string;
  tagline: string;
  /** Canonical origin. No trailing slash. */
  url: string;
  nav: Link[];
  ctas: {
    primary: Link;
    secondary: Link;
  };
  hero: {
    eyebrow?: string;
    headline: string;
    subheadline: string;
    bullets?: string[];
    /** Hero buttons. Separate from nav CTAs — a hero rarely wants "Sign in". */
    primaryCta: Link;
    secondaryCta: Link;
  };
  logoCloud: {
    caption: string;
    /** Inline SVG when LogoCloud knows the name, styled wordmark otherwise. */
    logos: { name: string }[];
  };
  /** Header and metadata copy for each secondary page. */
  pages: {
    pricing: PageCopy;
    blog: PageCopy;
    changelog: PageCopy;
  };
  /** Opening copy for each section. Keeps headings out of components. */
  sections: {
    features: SectionCopy;
    howItWorks: SectionCopy;
    testimonials: SectionCopy;
    pricing: SectionCopy;
    faq: SectionCopy;
    comparison: SectionCopy;
    pricingFaq: SectionCopy;
    contact: SectionCopy;
  };
  features: Feature[];
  howItWorks: HowItWorksStep[];
  testimonials: Testimonial[];
  pricing: {
    /** Percent off when billed annually. Annual price is always derived. */
    annualDiscountPct: number;
    tiers: PricingTier[];
    /** Comparison table on the pricing page. Values are matched to tiers by position. */
    comparison: ComparisonGroup[];
  };
  faq: FaqItem[];
  pricingFaq: FaqItem[];
  forms: {
    newsletter: FormCopy & {
      heading: string;
      description: string;
      email: FormField;
    };
    contact: FormCopy & {
      name: FormField;
      email: FormField;
      company: FormField;
      message: FormField;
    };
  };
  finalCta: {
    headline: string;
    subheadline: string;
    cta: Link;
  };
  notFound: {
    /** The large muted numeral. In config so it can be translated or replaced. */
    code: string;
    heading: string;
    lead: string;
    cta: Link;
    metaTitle: string;
  };
  footer: {
    columns: FooterColumn[];
    social: SocialLink[];
    legal: string;
  };
  seo: {
    /** `%s` is replaced by the page title. */
    titleTemplate: string;
    description: string;
    ogImageAlt: string;
    twitterHandle?: string;
  };
};

/* ---------- Content ---------- */

export type Post = {
  title: string;
  description: string;
  /** ISO `YYYY-MM-DD`. */
  date: string;
  tags: string[];
  draft: boolean;
  /** Derived from the filename. Never present in frontmatter. */
  slug: string;
  content: string;
};

export type ChangelogEntry = {
  title: string;
  description: string;
  date: string;
  /** Semver-ish release label, e.g. `1.4.0`. */
  version: string;
  draft: boolean;
  slug: string;
  content: string;
};
