import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MdxContent } from "@/components/blog/MdxContent";
import { PostHeader } from "@/components/blog/PostHeader";
import { Section } from "@/components/layout/Section";
import { getAllPosts, getPostBySlug } from "@/lib/content";
import { buildMetadata, notFoundMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  // An unknown slug renders not-found.tsx, but this route's metadata is what
  // the tab shows — the not-found page's own export only applies when nothing
  // matched a route at all.
  if (!post) return notFoundMetadata();

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
  });
}

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <Section>
      <PostHeader post={post} />
      <article className="mx-auto w-full max-w-reading">
        <MdxContent source={post.content} />
      </article>
    </Section>
  );
}
