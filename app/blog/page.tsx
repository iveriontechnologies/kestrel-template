import type { Metadata } from "next";

import { PostGrid } from "@/components/blog/PostGrid";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { getAllPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

const { pages } = siteConfig;

export const metadata: Metadata = buildMetadata({
  title: pages.blog.metaTitle,
  description: pages.blog.metaDescription,
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Section>
      <PageHeader
        eyebrow={pages.blog.eyebrow}
        heading={pages.blog.heading}
        lead={pages.blog.lead}
      />
      <PostGrid posts={posts} />
    </Section>
  );
}
