import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

import { siteConfig } from "@/site.config";

export const alt = siteConfig.seo.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Geist ships TTFs alongside the woff2s the site uses. Satori cannot read
 * woff2, so the OG image reads the TTF directly at build time.
 *
 * Wrapped because this is the one thing here that touches `node_modules` by
 * path: a package manager that lays the tree out differently would otherwise
 * fail the whole build over a font. Falling back to the default face gives a
 * plainer card, not a broken deploy.
 */
async function geist(weight: "Regular" | "SemiBold"): Promise<Buffer | null> {
  try {
    return await readFile(
      path.join(
        process.cwd(),
        "node_modules/geist/dist/fonts/geist-sans",
        `Geist-${weight}.ttf`,
      ),
    );
  } catch {
    console.warn(
      "[opengraph-image] Geist TTF not found; falling back to the default face.",
    );
    return null;
  }
}

export default async function OpengraphImage() {
  const [regular, semibold] = await Promise.all([
    geist("Regular"),
    geist("SemiBold"),
  ]);

  const fonts = [
    ...(regular
      ? [{ name: "Geist", data: regular, weight: 400 as const, style: "normal" as const }]
      : []),
    ...(semibold
      ? [{ name: "Geist", data: semibold, weight: 600 as const, style: "normal" as const }]
      : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          // Hex rather than tokens: this renders in Satori, which never sees
          // globals.css. These are the dark palette's --bg, --fg, and --accent.
          background: "#08080b",
          backgroundImage:
            "radial-gradient(900px 500px at 50% -10%, rgba(109,94,248,0.28), transparent 70%)",
          fontFamily: fonts.length ? "Geist" : "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#6d5ef8",
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M12 3 L20 21 L12 16.5 L4 21 Z" />
            </svg>
          </div>
          <span style={{ fontSize: 40, fontWeight: 600, color: "#ededf0" }}>
            {siteConfig.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              fontSize: 68,
              fontWeight: 600,
              letterSpacing: -2,
              lineHeight: 1.1,
              color: "#ededf0",
              maxWidth: 900,
            }}
          >
            {siteConfig.hero.headline}
          </span>
          <span style={{ fontSize: 30, color: "#a1a1ae", maxWidth: 820 }}>
            {siteConfig.tagline}
          </span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
