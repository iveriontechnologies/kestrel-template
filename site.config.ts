import type { SiteConfig } from "@/types";

/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE FIRST.
 *
 *  Every user-facing string on the site lives here. Replace the
 *  Kestrel content below with your own and the whole site
 *  rebrands — no component files need to be opened.
 *
 *  For colors, type, and spacing, edit app/globals.css instead.
 * ─────────────────────────────────────────────────────────────
 */
export const siteConfig: SiteConfig = {
  name: "Kestrel",
  tagline: "Product analytics for teams that ship",
  url: "https://kestrel.example.com",

  nav: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Changelog", href: "/changelog" },
  ],

  ctas: {
    primary: { label: "Start free", href: "#" },
    secondary: { label: "Sign in", href: "#" },
  },

  hero: {
    eyebrow: "Product analytics",
    headline: "Know what your product is actually doing",
    subheadline:
      "Kestrel turns raw events into answers about adoption, activation, and retention. No data team, no warehouse, no six-week rollout.",
    bullets: [
      "Free up to 10k events",
      "Installs in five minutes",
      "SOC 2 Type II",
    ],
    primaryCta: { label: "Start free", href: "#" },
    secondaryCta: { label: "Book a demo", href: "#" },
  },

  logoCloud: {
    caption: "Trusted by product teams at",
    logos: [
      { name: "Loomstack" },
      { name: "Fernwood" },
      { name: "Trellis" },
      { name: "Northbound" },
      { name: "Halcyon" },
      { name: "Meridian" },
    ],
  },

  pages: {
    pricing: {
      eyebrow: "Pricing",
      heading: "Pay for what you measure, nothing else",
      lead: "Every plan includes autocapture, funnels, retention, and full data export. Upgrade when your volume says so, not when a salesperson does.",
      metaTitle: "Pricing",
      metaDescription:
        "Kestrel pricing — start free on 10,000 events a month, then scale. Funnels, retention, and full data export on every plan.",
    },
    blog: {
      eyebrow: "Blog",
      heading: "Notes on measuring a product",
      lead: "What we have learned building analytics, and what we keep watching teams get wrong. No growth-hacking listicles.",
      metaTitle: "Blog",
      metaDescription:
        "Writing on product analytics from the Kestrel team — instrumentation, funnels, retention, and the decisions they are supposed to inform.",
    },
    changelog: {
      eyebrow: "Changelog",
      heading: "What shipped, and when",
      lead: "Every release, newest first. Breaking changes are called out in the entry rather than buried in a migration note.",
      metaTitle: "Changelog",
      metaDescription:
        "Release notes for Kestrel — new features, fixes, and breaking changes, newest first.",
    },
  },

  sections: {
    features: {
      eyebrow: "Features",
      heading: "Everything you need to answer the question",
      lead: "Not a warehouse of raw events. The specific tools product teams reach for when something ships and nobody can say whether it worked.",
    },
    howItWorks: {
      eyebrow: "How it works",
      heading: "Answers in three steps, not three sprints",
      lead: "Most analytics rollouts stall before the first question gets answered. This one does not.",
    },
    testimonials: {
      eyebrow: "Customers",
      heading: "Teams that stopped guessing",
      lead: "What changed once they could see what their product was doing.",
    },
    pricing: {
      eyebrow: "Pricing",
      heading: "Start free, upgrade when it earns it",
      lead: "Every plan includes funnels, retention, and full data export. No core feature is held behind a sales call.",
    },
    faq: {
      eyebrow: "FAQ",
      heading: "Questions worth asking first",
    },
    comparison: {
      eyebrow: "Compare",
      heading: "Every plan, line by line",
      lead: "The full list, including every limit and quota that people usually have to email support about.",
    },
    pricingFaq: {
      eyebrow: "FAQ",
      heading: "Billing questions",
    },
    contact: {
      eyebrow: "Talk to us",
      heading: "Still deciding?",
      lead: "Tell us what you are trying to measure and we will tell you honestly whether Kestrel is the right tool for it.",
    },
  },

  features: [
    {
      icon: "zap",
      title: "Autocapture, not instrumentation",
      description:
        "Kestrel records every click, pageview, and form submit from the moment you install it. Answer questions you had not thought to ask when you shipped, without waiting on a release to add tracking.",
      span: 2,
    },
    {
      icon: "funnel",
      title: "Funnels in seconds",
      description:
        "Pick two events, get a funnel. Break it down by plan, platform, or cohort to see exactly which step is losing people.",
    },
    {
      icon: "repeat",
      title: "Retention that explains itself",
      description:
        "Cohort grids that surface which features correlate with the users who stay, and which ones nobody comes back for.",
    },
    {
      icon: "play",
      title: "Watch the moment it broke",
      description:
        "Jump from any point on any chart straight into the session replay behind it. See the rage clicks, the dead ends, and the empty state everyone misreads.",
      span: 2,
    },
    {
      icon: "bell",
      title: "Alerts that find you",
      description:
        "Threshold and anomaly alerts land in Slack the moment a metric moves, so nobody has to remember to go looking.",
    },
    {
      icon: "database",
      title: "Your data stays yours",
      description:
        "Stream every raw event to Snowflake, BigQuery, or S3. Export anything, any time. No lock-in and no re-ingestion fees.",
      span: 2,
    },
  ],

  howItWorks: [
    {
      step: 1,
      title: "Drop in the snippet",
      description:
        "One script tag or one npm package. Kestrel starts capturing immediately — no taxonomy meeting, no tracking plan to agree on first.",
    },
    {
      step: 2,
      title: "Ask your first question",
      description:
        "Open a funnel, pick two events, get an answer. No SQL to write and no ticket to file with the data team.",
    },
    {
      step: 3,
      title: "Put it where the team looks",
      description:
        "Pin metrics to a dashboard, route alerts into Slack, and share a link that works without a login.",
    },
  ],

  testimonials: [
    {
      quote:
        "We killed two features and doubled down on a third in a single afternoon. We had been arguing about it for a quarter.",
      name: "Priya Raghunathan",
      role: "VP Product",
      company: "Loomstack",
      avatar: "PR",
    },
    {
      quote:
        "Our old tool needed a data engineer to answer anything at all. Kestrel handed that time back to the whole team.",
      name: "Marcus Bell",
      role: "Head of Engineering",
      company: "Fernwood",
      avatar: "MB",
    },
    {
      quote:
        "Onboarding completion went from 41% to 68%, because we could finally see the exact step people were stuck on.",
      name: "Dana Okafor",
      role: "Growth Lead",
      company: "Trellis Health",
      avatar: "DO",
    },
  ],

  pricing: {
    annualDiscountPct: 20,
    tiers: [
      {
        name: "Starter",
        monthlyPrice: 0,
        description: "For side projects and early prototypes.",
        features: [
          "10,000 events per month",
          "1 project",
          "30-day data retention",
          "Funnels and retention",
          "Community support",
        ],
        cta: { label: "Start free", href: "#" },
        highlighted: false,
      },
      {
        name: "Growth",
        monthlyPrice: 89,
        description: "For teams shipping to real customers.",
        features: [
          "1 million events per month",
          "Unlimited projects",
          "12-month data retention",
          "Session replay",
          "Slack and email alerts",
          "Priority support",
        ],
        cta: { label: "Start free trial", href: "#" },
        highlighted: true,
      },
      {
        name: "Scale",
        monthlyPrice: 349,
        description: "For companies with compliance requirements.",
        features: [
          "10 million events per month",
          "Unlimited data retention",
          "Warehouse sync",
          "SSO and SAML",
          "Audit logs and SOC 2 report",
          "Dedicated success manager",
        ],
        cta: { label: "Talk to sales", href: "#" },
        highlighted: false,
      },
    ],

    // One value per tier, in the same order as `tiers` above.
    // `true` renders a check, `false` a dash, a string renders as text.
    comparison: [
      {
        title: "Usage",
        rows: [
          {
            label: "Events per month",
            values: ["10,000", "1 million", "10 million"],
          },
          { label: "Projects", values: ["1", "Unlimited", "Unlimited"] },
          { label: "Team members", values: ["1", "10", "Unlimited"] },
          {
            label: "Data retention",
            values: ["30 days", "12 months", "Unlimited"],
          },
        ],
      },
      {
        title: "Analytics",
        rows: [
          { label: "Autocapture", values: [true, true, true] },
          { label: "Funnels and retention", values: [true, true, true] },
          { label: "Breakdowns and cohorts", values: [false, true, true] },
          { label: "Session replay", values: [false, true, true] },
          {
            label: "Saved dashboards",
            values: ["1", "Unlimited", "Unlimited"],
          },
          { label: "Anomaly detection", values: [false, false, true] },
        ],
      },
      {
        title: "Data and integrations",
        rows: [
          { label: "CSV export", values: [true, true, true] },
          { label: "REST API", values: [true, true, true] },
          { label: "Slack and email alerts", values: [false, true, true] },
          { label: "Warehouse sync", values: [false, false, true] },
        ],
      },
      {
        title: "Security and support",
        rows: [
          { label: "EU data residency", values: [false, true, true] },
          { label: "SSO and SAML", values: [false, false, true] },
          { label: "Audit logs and SOC 2 report", values: [false, false, true] },
          {
            label: "Support",
            values: ["Community", "Priority email", "Dedicated manager"],
          },
          { label: "Uptime SLA", values: [false, false, "99.9%"] },
        ],
      },
    ],
  },

  faq: [
    {
      question: "How long does it actually take to install?",
      answer:
        "About five minutes. Add one script tag or install the npm package and Kestrel begins capturing straight away. Because autocapture is on by default, you do not need to agree on an event taxonomy before you start — the events are already there when you think of the question.",
    },
    {
      question: "Do I need a data team to use this?",
      answer:
        "No, and that is rather the point. Funnels, retention, and breakdowns are built by picking events from a dropdown. If you do have a data team, you can still send everything to your warehouse and query it there.",
    },
    {
      question: "What happens if I go over my event limit?",
      answer:
        "We keep collecting and send you an email. We never silently drop data and we never stop your dashboards mid-month. You choose whether to upgrade or adjust what you capture.",
    },
    {
      question: "Can I export my data?",
      answer:
        "Yes, on every plan including the free one. CSV export, a full REST API, and continuous warehouse sync on Scale. Your events are yours and there is no fee to take them with you.",
    },
    {
      question: "Is Kestrel GDPR compliant?",
      answer:
        "Yes. EU data residency, a signed DPA, IP anonymization, and a cookieless mode that needs no consent banner. We are SOC 2 Type II certified and the report is available under NDA.",
    },
    {
      question: "How is this different from Google Analytics?",
      answer:
        "Google Analytics answers questions about traffic — where visitors came from and which pages they landed on. Kestrel answers questions about your product: who activated, which features get used twice, and where people give up. Most teams run both.",
    },
  ],

  pricingFaq: [
    {
      question: "Can I change plans later?",
      answer:
        "Any time, in one click. Upgrades take effect immediately and we prorate the difference. Downgrades take effect at the end of your current billing period.",
    },
    {
      question: "What counts as an event?",
      answer:
        "Any single captured action: a pageview, a click, a form submit, or a custom event you send. Session replays are not counted as events and are billed separately on Growth and above.",
    },
    {
      question: "Do you offer annual billing?",
      answer:
        "Yes, and it saves you 20% against monthly. You can switch billing period at any time from your workspace settings.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Growth is free for 14 days and does not ask for a card. If you do nothing at the end of the trial you drop to the Starter plan rather than losing access.",
    },
    {
      question: "Do you offer startup discounts?",
      answer:
        "Companies that have raised under $5M get 90% off their first year. Send us proof of funding and we will apply it to your account.",
    },
    {
      question: "What payment methods do you take?",
      answer:
        "All major cards through Stripe. Scale customers can pay by invoice and bank transfer on net-30 terms.",
    },
  ],

  finalCta: {
    headline: "Stop guessing what your product is doing",
    subheadline:
      "Free forever on Starter. No credit card, no sales call, no implementation project.",
    cta: { label: "Start free", href: "#" },
  },

  forms: {
    newsletter: {
      heading: "One email a month",
      description:
        "What we shipped, what we learned, and the occasional post worth reading. No drip sequence.",
      email: {
        label: "Email address",
        placeholder: "you@company.com",
      },
      submitLabel: "Subscribe",
      pendingLabel: "Subscribing…",
      successMessage: "You are on the list. Check your inbox to confirm.",
    },
    contact: {
      name: { label: "Name", placeholder: "Alex Mercer" },
      email: { label: "Work email", placeholder: "you@company.com" },
      company: { label: "Company (optional)", placeholder: "Loomstack" },
      message: {
        label: "What are you trying to measure?",
        placeholder:
          "We are launching a new onboarding flow next month and want to know where people drop out.",
      },
      submitLabel: "Send message",
      pendingLabel: "Sending…",
      successMessage: "Thanks — we read every message and reply within a day.",
    },
  },

  notFound: {
    code: "404",
    heading: "We could not find that page",
    lead: "The link may be out of date, or the page may have moved. Everything else is where you left it.",
    cta: { label: "Back to home", href: "/" },
    metaTitle: "Page not found",
  },

  footer: {
    columns: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "/#features" },
          { label: "Pricing", href: "/pricing" },
          { label: "Changelog", href: "/changelog" },
          { label: "Integrations", href: "#" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "#" },
          { label: "Blog", href: "/blog" },
          { label: "Careers", href: "#" },
          { label: "Contact", href: "#" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Documentation", href: "#" },
          { label: "API reference", href: "#" },
          { label: "Status", href: "#" },
          { label: "Support", href: "#" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy", href: "#" },
          { label: "Terms", href: "#" },
          { label: "Security", href: "#" },
          { label: "DPA", href: "#" },
        ],
      },
    ],
    social: [
      { platform: "x", href: "#" },
      { platform: "github", href: "#" },
      { platform: "linkedin", href: "#" },
    ],
    legal: "© 2026 Kestrel Analytics, Inc. All rights reserved.",
  },

  seo: {
    titleTemplate: "%s · Kestrel",
    description:
      "Kestrel turns raw events into answers about adoption, activation, and retention. Product analytics without a data team.",
    ogImageAlt: "Kestrel — product analytics for teams that ship",
    twitterHandle: "@kestrelhq",
  },
};
