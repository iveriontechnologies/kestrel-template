import type { Metadata } from "next";

import { Faq } from "@/components/home/Faq";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { LogoCloud } from "@/components/home/LogoCloud";
import { PricingTiers } from "@/components/home/PricingTiers";
import { Testimonials } from "@/components/home/Testimonials";
import { buildMetadata, organizationSchema } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = buildMetadata({ path: "/" });

export default function HomePage() {
  const { hero, logoCloud, sections, features, howItWorks, testimonials, pricing, faq, finalCta } =
    siteConfig;

  return (
    <>
      {/* Organization schema, home page only. Search engines read it for the
          knowledge panel; nothing on the site does. `dangerouslySetInnerHTML`
          is the documented way to emit JSON-LD from a Server Component — the
          content is our own object, not user input. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema()),
        }}
      />

      <Hero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        subheadline={hero.subheadline}
        bullets={hero.bullets}
        primary={hero.primaryCta}
        secondary={hero.secondaryCta}
      />
      <LogoCloud caption={logoCloud.caption} logos={logoCloud.logos} />
      <FeatureGrid copy={sections.features} features={features} />
      <HowItWorks copy={sections.howItWorks} steps={howItWorks} />
      <Testimonials copy={sections.testimonials} testimonials={testimonials} />
      <PricingTiers
        copy={sections.pricing}
        tiers={pricing.tiers}
        annualDiscountPct={pricing.annualDiscountPct}
      />
      <Faq copy={sections.faq} items={faq} />
      <FinalCta
        headline={finalCta.headline}
        subheadline={finalCta.subheadline}
        cta={finalCta.cta}
      />
    </>
  );
}
