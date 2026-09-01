import type { Metadata } from "next";
import Link from "next/link";

import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

const { notFound } = siteConfig;

export const metadata: Metadata = buildMetadata({
  title: notFound.metaTitle,
  description: notFound.lead,
  noIndex: true,
});

export default function NotFound() {
  return (
    // min-h keeps the block optically centred in the viewport rather than
    // sitting under the navbar with the footer pulled up to meet it.
    <Section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-[88px] md:text-[120px] font-semibold leading-none tracking-[-0.04em] text-fg-muted">
        {notFound.code}
      </p>

      <h1 className="mt-6 text-[28px] md:text-[36px] leading-[1.15] font-semibold tracking-[-0.025em] text-fg text-balance">
        {notFound.heading}
      </h1>

      <p className="mt-4 max-w-[480px] text-[17px] leading-[1.6] text-fg-secondary text-pretty">
        {notFound.lead}
      </p>

      <Button
        size="lg"
        className="mt-8"
        render={<Link href={notFound.cta.href} />}
      >
        {notFound.cta.label}
      </Button>
    </Section>
  );
}
