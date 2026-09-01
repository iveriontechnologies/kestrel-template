"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/site.config";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: Props) {
  const pathname = usePathname();

  // Close on route change. Without this the overlay survives navigation.
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Escape to close, and lock body scroll while open.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-bg md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div className="flex h-16 shrink-0 items-center justify-between px-6">
        <Logo />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-md text-fg-secondary transition-colors duration-150 after:absolute after:-inset-1 after:content-[''] hover:bg-surface-raised hover:text-fg"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-6 px-6 pt-8">
        {siteConfig.nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="text-[20px] font-medium text-fg transition-colors duration-150 hover:text-accent-text"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex flex-col gap-3 border-t border-border px-6 py-6">
        <Link
          href={siteConfig.ctas.secondary.href}
          onClick={onClose}
          className="text-center text-[15px] font-medium text-fg-secondary transition-colors duration-150 hover:text-fg"
        >
          {siteConfig.ctas.secondary.label}
        </Link>
        <Button size="lg" className="w-full" render={<Link href={siteConfig.ctas.primary.href} />}>
          {siteConfig.ctas.primary.label}
        </Button>
      </div>
    </div>
  );
}
