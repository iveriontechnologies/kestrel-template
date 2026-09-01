import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/ContactForm";
import { Faq } from "@/components/home/Faq";
import { PricingTiers } from "@/components/home/PricingTiers";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeader } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

const { pages, sections, pricing, pricingFaq, forms } = siteConfig;

export const metadata: Metadata = buildMetadata({
  title: pages.pricing.metaTitle,
  description: pages.pricing.metaDescription,
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      {/* The page header and the tiers share one section: a background seam
          between a heading and the cards it introduces reads as a mistake. */}
      <Section>
        <PageHeader
          eyebrow={pages.pricing.eyebrow}
          heading={pages.pricing.heading}
          lead={pages.pricing.lead}
        />
        <PricingTiers
          copy={sections.pricing}
          tiers={pricing.tiers}
          annualDiscountPct={pricing.annualDiscountPct}
          bare
        />
      </Section>

      <ComparisonTable
        copy={sections.comparison}
        tiers={pricing.tiers}
        groups={pricing.comparison}
      />

      <Faq copy={sections.pricingFaq} items={pricingFaq} />

      <Section variant="subtle">
        <Reveal>
          <SectionHeader
            eyebrow={sections.contact.eyebrow}
            heading={sections.contact.heading}
            lead={sections.contact.lead}
          />
        </Reveal>
        <ContactForm copy={forms.contact} />
      </Section>
    </>
  );
}
