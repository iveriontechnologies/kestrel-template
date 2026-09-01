import type { Metadata } from "next";

import { ChangelogEntry } from "@/components/changelog/ChangelogEntry";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { getAllChangelogEntries } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import { Reveal } from "@/components/motion/Reveal";

const { pages } = siteConfig;

export const metadata: Metadata = buildMetadata({
  title: pages.changelog.metaTitle,
  description: pages.changelog.metaDescription,
  path: "/changelog",
});

export default function ChangelogPage() {
  const entries = getAllChangelogEntries();

  return (
    <Section>
      <PageHeader
        eyebrow={pages.changelog.eyebrow}
        heading={pages.changelog.heading}
        lead={pages.changelog.lead}
      />

      {entries.length === 0 ? (
        <p className="mt-12 text-center text-[15px] text-fg-muted">
          No releases yet.
        </p>
      ) : (
        <Reveal
          as="ol"
          stagger
          className="mx-auto mt-14 w-full max-w-reading"
        >
          {entries.map((entry) => (
            <ChangelogEntry key={entry.slug} entry={entry} />
          ))}
        </Reveal>
      )}
    </Section>
  );
}
