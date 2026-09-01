import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { siteUrl } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import { validateSiteConfig } from "@/lib/validate-config";
import "./globals.css";

export const metadata: Metadata = {
  // Resolves every relative URL in a route's metadata, including the OG image
  // Next generates from app/opengraph-image.tsx. Without it those ship as
  // relative paths, which no social scraper will follow.
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.description,
};

validateSiteConfig();

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Scroll reveals start hidden and are flipped by an observer. With
            JavaScript off nothing would ever flip them, so the page would be
            blank. Three lines, and the site degrades to a static one. */}
        <noscript>
          <style>{`[data-reveal],[data-reveal]>*{opacity:1!important;transform:none!important;animation:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
