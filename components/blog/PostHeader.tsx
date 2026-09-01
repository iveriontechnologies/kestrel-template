// Blog post — the header above the body.

import { formatPostDate, readingTime } from "@/lib/utils";
import type { Post } from "@/types";

type Props = {
  post: Post;
};

export function PostHeader({ post }: Props) {
  const minutes = readingTime(post.content);

  return (
    // Constrained to prose width like the body, so the title sits on the same
    // measure as the paragraphs under it rather than running wider.
    <header className="mx-auto w-full max-w-reading">
      {post.tags[0] ? (
        <span className="inline-flex rounded-full border border-accent-border bg-accent-subtle px-2.5 py-1 text-[12px] font-medium text-accent-text">
          {post.tags[0]}
        </span>
      ) : null}

      <h1 className="mt-5 text-[32px] md:text-[40px] leading-[1.15] font-semibold tracking-[-0.03em] text-fg text-balance">
        {post.title}
      </h1>

      <p className="mt-4 text-[18px] leading-[1.6] text-fg-secondary text-pretty">
        {post.description}
      </p>

      <div className="mt-6 flex items-center gap-2 border-t border-border pt-5 text-[13px] font-medium text-fg-muted">
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{minutes} min read</span>
      </div>
    </header>
  );
}
