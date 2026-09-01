import type { Metadata } from "next";

import { siteConfig } from "@/site.config";

/**
 * Canonical origin for the deployed site.
 *
 * The environment variable wins so a preview deploy is not tagged with the
 * production URL, which is how duplicate canonicals get indexed. It falls back
 * to `siteConfig.url`, so a fresh clone builds with no `.env` file at all.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url)
  .trim()
  .replace(/\/+$/, "");

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return path === "/" ? siteUrl : `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

type SeoInput = {
  /** Page title. Omit on the home page to use the site default. */
  title?: string;
  description?: string;
  /** Site-relative path, used for the canonical and the OG url. */
  path?: string;
  /** `article` adds the published date to the OpenGraph payload. */
  type?: "website" | "article";
  publishedTime?: string;
  /** Keep this page out of the index. */
  noIndex?: boolean;
};

/**
 * The single metadata builder. Every route calls this rather than assembling a
 * `Metadata` object by hand, which is what keeps the canonical, the OpenGraph
 * payload, and the Twitter card from disagreeing with each other.
 */
export function buildMetadata({
  title,
  description = siteConfig.seo.description,
  path = "/",
  type = "website",
  publishedTime,
  noIndex = false,
}: SeoInput = {}): Metadata {
  const url = absoluteUrl(path);

  // The layout's title template appends the site name, so a page passes its own
  // short title and the home page passes nothing at all.
  const resolvedTitle = title ?? `${siteConfig.name} — ${siteConfig.tagline}`;

  // The generated card at app/opengraph-image.tsx. It has to be named here:
  // a route that sets `openGraph` replaces the parent's object wholesale, and
  // the file-based image lives on the root layout's. Without this line every
  // page except the home page ships with no og:image at all.
  const images = [
    {
      url: absoluteUrl("/opengraph-image"),
      width: 1200,
      height: 630,
      alt: siteConfig.seo.ogImageAlt,
    },
  ];

  return {
    // Spread rather than assigned: `title: undefined` is not the same as no
    // title at all — it overrides the layout's default with nothing, which is
    // how the home page ended up with no <title> element.
    ...(title ? { title } : {}),
    description,
    // A canonical on a noindex page points crawlers at a URL that is not this
    // one, for a page they were told to skip. Omit it.
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : { alternates: { canonical: url } }),
    openGraph: {
      type,
      url,
      siteName: siteConfig.name,
      title: resolvedTitle,
      description,
      images,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images,
      ...(siteConfig.seo.twitterHandle
        ? { creator: siteConfig.seo.twitterHandle }
        : {}),
    },
  };
}

/**
 * Metadata for a route that resolved to `notFound()`.
 *
 * `app/not-found.tsx` exports its own metadata, but that only applies when
 * nothing matched a route at all — a `notFound()` from inside a route renders
 * under *that* route's metadata. Every route with a dynamic segment returns
 * this when its lookup misses.
 */
export function notFoundMetadata(): Metadata {
  return buildMetadata({
    title: siteConfig.notFound.metaTitle,
    description: siteConfig.notFound.lead,
    noIndex: true,
  });
}

/**
 * Organization schema for the home page. Search engines use it for the
 * knowledge panel; nothing else on the site reads it.
 */
export function organizationSchema() {
  // The social links ship as "#" placeholders. Emitting those as sameAs would
  // publish structured data claiming three profiles at "#", which is invalid —
  // so only real URLs are included, and the key disappears when there are none.
  const sameAs = siteConfig.footer.social
    .map((item) => item.href)
    .filter((href) => href.startsWith("http"));

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteUrl,
    description: siteConfig.tagline,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}
