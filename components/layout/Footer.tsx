import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import { SocialIcon, socialLabel } from "@/components/brand/SocialIcon";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { siteConfig } from "@/site.config";

export function Footer() {
  const { columns, social, legal } = siteConfig.footer;
  const newsletter = siteConfig.forms.newsletter;

  return (
    <footer className="w-full border-t border-border bg-bg-subtle">
      <div className="mx-auto w-full max-w-page px-6 py-16">
        <div className="flex flex-col gap-8 border-b border-border pb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-[420px]">
            <h2 className="text-[18px] font-semibold tracking-[-0.015em] text-fg">
              {newsletter.heading}
            </h2>
            <p className="mt-2 text-[14px] leading-[1.55] text-fg-secondary">
              {newsletter.description}
            </p>
          </div>
          <NewsletterForm copy={newsletter} />
        </div>

        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-4">
              <h3 className="text-[13px] font-medium text-fg-muted">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-fg-secondary transition-colors duration-150 hover:text-fg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-6 border-t border-border pt-8 sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
            <Logo />
            <p className="text-[13px] text-fg-muted">{legal}</p>
          </div>

          <ul className="flex items-center gap-2">
            {social.map((item) => (
              <li key={item.platform}>
                <Link
                  href={item.href}
                  className="relative inline-flex h-9 w-9 items-center justify-center rounded-md text-fg-muted transition-colors duration-150 after:absolute after:-inset-1 after:content-[''] hover:bg-surface-raised hover:text-fg lg:after:hidden"
                  aria-label={socialLabel(item.platform)}
                >
                  <SocialIcon platform={item.platform} className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
