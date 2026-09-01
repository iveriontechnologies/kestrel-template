"use client";

import {
  Children,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import {
  MAX_STAGGER_ITEMS,
  REVEAL_DURATION_MS,
  REVEAL_THRESHOLD,
  STAGGER_STEP_MS,
  cn,
} from "@/lib/utils";

type Props = {
  children: ReactNode;
  /**
   * The element to render as. `Reveal` replaces the container it animates
   * rather than wrapping it — a wrapper div between a grid and its items
   * would take over the grid slots, and one between `ol` and `li` is invalid.
   */
  as?: "div" | "ol" | "ul";
  /**
   * Reveal direct children in sequence instead of the block as a whole.
   * Ignored above `MAX_STAGGER_ITEMS` children: past six the sequence reads
   * as a slow load rather than as choreography, so the group moves as one.
   */
  stagger?: boolean;
  className?: string;
};

/**
 * The only file in the project that animates on scroll.
 *
 * The visual states live in `globals.css` under `[data-reveal]`, so the
 * durations, the distance, and the reduced-motion override are all in the
 * file a buyer already edits for design values. This component only decides
 * *when* to flip the switch.
 */
export function Reveal({
  children,
  as: Tag = "div",
  stagger = false,
  className,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  // Past the cap the group reveals as one block. See `stagger` above.
  const staggered = stagger && Children.count(children) <= MAX_STAGGER_ITEMS;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No observer for these users, and no state change either: the
    // reduced-motion rule in globals.css already forces every [data-reveal]
    // visible, so leaving the flag alone renders exactly the same page.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        // Once. A section that re-animates on every pass is a distraction.
        observer.disconnect();
      },
      { threshold: REVEAL_THRESHOLD },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // One ref type for three possible tags; each is an HTMLElement.
      ref={ref as React.Ref<never>}
      data-reveal={staggered ? "stagger" : "block"}
      data-revealed={revealed ? "" : undefined}
      style={
        {
          "--reveal-duration": `${REVEAL_DURATION_MS}ms`,
          "--reveal-step": `${STAGGER_STEP_MS}ms`,
        } as CSSProperties
      }
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
