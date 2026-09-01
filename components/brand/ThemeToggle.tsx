"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/**
 * Which icon to show is decided by CSS, not by state.
 *
 * The obvious implementation keeps a `mounted` flag, because `resolvedTheme`
 * is unknowable during SSR — but that means an effect that immediately calls
 * setState (which React now flags), a placeholder to stop the navbar shifting,
 * and a frame where the button is empty. Switching on the `.dark` class
 * instead removes all three: `next-themes` sets that class in a blocking
 * script before first paint, so the correct icon is simply painted.
 *
 * `resolvedTheme` is still read, but only inside the click handler, where it
 * is always accurate and never part of a render.
 */
export function ThemeToggle({ className }: Props) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md",
        "text-fg-secondary transition-colors duration-150",
        "hover:bg-surface-raised hover:text-fg",
        // 36px is the visual size the navbar wants; 44px is the tap target the
        // rule wants. The pseudo-element gives the second without changing the
        // first, and is dropped on desktop where a pointer is precise.
        "relative after:absolute after:-inset-1 after:content-[''] lg:after:hidden",
        className,
      )}
    >
      <Sun className="hidden h-[18px] w-[18px] dark:block" aria-hidden="true" />
      <Moon className="h-[18px] w-[18px] dark:hidden" aria-hidden="true" />

      {/* The accessible name names the destination, not the current state, and
          swaps with the same class the icons do. */}
      <span className="sr-only hidden dark:inline">Switch to light theme</span>
      <span className="sr-only dark:hidden">Switch to dark theme</span>
    </button>
  );
}
