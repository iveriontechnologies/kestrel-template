// Blog post — the MDX element map.

import { Children, isValidElement, type ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

type Props = {
  source: string;
};

/**
 * Named rather than inline so the paragraph mapping below can recognise it and
 * strip the paragraph markdown wraps around a standalone image.
 */
function MdxImage({ src, alt = "", className }: ComponentPropsWithoutRef<"img">) {
  if (typeof src !== "string") return null;

  return (
    <figure className="mt-10 overflow-hidden rounded-lg border border-border bg-surface p-5">
      <Image
        src={src}
        alt={alt}
        // Markdown carries no dimensions. These are the intrinsic size of the
        // sample figure and the aspect post images are authored to; the classes
        // below let it scale, so they only fix the ratio.
        width={1200}
        height={600}
        className={cn("h-auto w-full", className)}
      />
    </figure>
  );
}

/**
 * Every element MDX can produce is mapped here. Nothing in a post body falls
 * back to a browser default, because a buyer writing their second post should
 * never have to open a component file to make a table look right.
 */
const components = {
  h2: ({ className, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className={cn(
        "mt-14 text-[28px] font-semibold leading-[1.25] tracking-[-0.02em] text-fg",
        className,
      )}
      {...props}
    />
  ),

  h3: ({ className, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className={cn(
        "mt-10 text-[20px] font-semibold leading-[1.35] tracking-[-0.015em] text-fg",
        className,
      )}
      {...props}
    />
  ),

  h4: ({ className, ...props }: ComponentPropsWithoutRef<"h4">) => (
    <h4
      className={cn(
        "mt-8 text-[18px] font-semibold leading-[1.4] tracking-[-0.01em] text-fg",
        className,
      )}
      {...props}
    />
  ),

  p: ({ className, children, ...props }: ComponentPropsWithoutRef<"p">) => {
    // Markdown wraps a standalone image in a paragraph, which would put a
    // <figure> inside a <p> — invalid HTML that the browser silently
    // restructures, and a hydration mismatch every time. Unwrap it instead.
    const onlyChild =
      Children.count(children) === 1 ? Children.toArray(children)[0] : null;

    if (isValidElement(onlyChild) && onlyChild.type === MdxImage) {
      return onlyChild;
    }

    return (
      <p
        className={cn("mt-6 text-[17px] leading-[1.7] text-fg-secondary", className)}
        {...props}
      >
        {children}
      </p>
    );
  },

  a: ({ href = "", className, ...props }: ComponentPropsWithoutRef<"a">) => {
    const style = cn(
      "text-accent-text underline decoration-accent-border underline-offset-[3px] transition-colors duration-150 hover:decoration-accent",
      className,
    );

    // Internal links go through next/link for client-side navigation; external
    // ones carry noreferrer, which next/link would not add for us.
    return href.startsWith("/") ? (
      <Link href={href} className={style} {...props} />
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={style}
        {...props}
      />
    );
  },

  ul: ({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className={cn(
        "mt-6 flex list-disc flex-col gap-3 pl-5 marker:text-fg-muted",
        className,
      )}
      {...props}
    />
  ),

  ol: ({ className, ...props }: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className={cn(
        "mt-6 flex list-decimal flex-col gap-3 pl-5 marker:text-fg-muted",
        className,
      )}
      {...props}
    />
  ),

  li: ({ className, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li
      className={cn("text-[17px] leading-[1.7] text-fg-secondary", className)}
      {...props}
    />
  ),

  strong: ({ className, ...props }: ComponentPropsWithoutRef<"strong">) => (
    <strong className={cn("font-medium text-fg", className)} {...props} />
  ),

  blockquote: ({ className, ...props }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      // Left rule rather than a tinted panel: a quote is emphasis, not a card,
      // and a filled block in the middle of prose reads as a callout.
      className={cn(
        "mt-8 border-l-2 border-accent-border pl-5 text-[17px] leading-[1.7] text-fg [&>p]:mt-0 [&>p+p]:mt-4 [&>p]:text-fg",
        className,
      )}
      {...props}
    />
  ),

  code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) => {
    // A fenced block arrives as <pre><code class="language-x">. Only inline
    // code gets the pill; inside a block it inherits the block's styling.
    const isBlock = typeof className === "string" && className.includes("language-");

    if (isBlock) return <code className={className} {...props} />;

    return (
      <code
        className={cn(
          "rounded-sm bg-surface-raised px-1.5 py-0.5 font-mono text-[0.875em] text-fg",
          className,
        )}
        {...props}
      />
    );
  },

  pre: ({ className, ...props }: ComponentPropsWithoutRef<"pre">) => (
    // Scrolls inside itself. A code block is the one place in prose where
    // wrapping would change what the reader sees.
    <pre
      className={cn(
        "mt-8 overflow-x-auto rounded-lg border border-border bg-surface-raised p-5 font-mono text-[13px] leading-[1.7] text-fg-secondary",
        className,
      )}
      {...props}
    />
  ),

  table: ({ className, ...props }: ComponentPropsWithoutRef<"table">) => (
    <div className="mt-8 overflow-hidden rounded-lg border border-border bg-surface">
      <div className="overflow-x-auto">
        <table
          className={cn(
            "w-full min-w-[520px] text-left",
            // The last row would otherwise double its border against the
            // container edge.
            "[&_tbody_tr:last-child_td]:border-b-0",
            className,
          )}
          {...props}
        />
      </div>
    </div>
  ),

  th: ({ className, ...props }: ComponentPropsWithoutRef<"th">) => (
    <th
      className={cn(
        "border-b border-border px-4 py-3 text-[13px] font-medium text-fg-muted",
        className,
      )}
      {...props}
    />
  ),

  td: ({ className, ...props }: ComponentPropsWithoutRef<"td">) => (
    <td
      className={cn(
        "border-b border-border px-4 py-3 text-[14px] text-fg-secondary",
        className,
      )}
      {...props}
    />
  ),

  hr: ({ className, ...props }: ComponentPropsWithoutRef<"hr">) => (
    <hr className={cn("mt-12 border-t border-border", className)} {...props} />
  ),

  img: MdxImage,
};

export function MdxContent({ source }: Props) {
  return (
    <MDXRemote
      source={source}
      components={components}
      // Tables, strikethrough, and autolinks are GitHub extensions, not core
      // markdown. Without this a table renders as a run of pipe characters in a
      // paragraph, which is the kind of thing a buyer discovers after shipping.
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
    />
  );
}
