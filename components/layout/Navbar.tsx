"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/brand/ThemeToggle";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";

/** Hash links point at sections of a page, so they never mark a route active. */
function isActiveRoute(href: string, pathname: string): boolean {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // The border appears only once the page has moved. At rest the bar is
  // borderless so the hero reads as full-bleed.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full",
          "bg-bg/72 backdrop-blur-lg",
          "transition-colors duration-150",
          scrolled ? "border-b border-border" : "border-b border-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-page items-center justify-between px-6">
          <Logo />

          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Main navigation"
          >
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-150",
                  isActiveRoute(item.href, pathname)
                    ? "text-fg"
                    : "text-fg-secondary hover:text-fg",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Link
              href={siteConfig.ctas.secondary.href}
              className="hidden px-2 text-sm font-medium text-fg-secondary transition-colors duration-150 hover:text-fg md:inline-flex"
            >
              {siteConfig.ctas.secondary.label}
            </Link>

            <Button
              className="hidden md:inline-flex"
              render={<Link href={siteConfig.ctas.primary.href} />}
            >
              {siteConfig.ctas.primary.label}
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-md text-fg-secondary transition-colors duration-150 after:absolute after:-inset-1 after:content-[''] hover:bg-surface-raised hover:text-fg md:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
