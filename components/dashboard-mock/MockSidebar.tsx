import {
  Bell,
  ChevronDown,
  LayoutDashboard,
  Play,
  Repeat,
  Settings,
  Funnel,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { mockMeta, mockNav, type MockNavItem } from "@/lib/mock-dashboard";

const ICONS: Record<MockNavItem["icon"], LucideIcon> = {
  dashboard: LayoutDashboard,
  users: Users,
  funnel: Funnel,
  retention: Repeat,
  replay: Play,
  alerts: Bell,
  settings: Settings,
};

export function MockSidebar() {
  return (
    <aside className="hidden w-[200px] shrink-0 flex-col border-r border-border bg-bg-subtle md:flex">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-accent">
          <svg viewBox="0 0 32 32" className="h-4 w-4 fill-accent-contrast">
            <path d="M16 7.5 L24.5 23 L16 18.6 L7.5 23 Z" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12px] font-medium leading-none text-fg">
            {mockMeta.workspace}
          </p>
        </div>
        <ChevronDown className="h-3 w-3 shrink-0 text-fg-muted" />
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        {mockNav.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <span
              key={item.label}
              className={cn(
                "flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px]",
                item.active
                  ? "bg-accent-subtle font-medium text-accent-text"
                  : "text-fg-secondary",
              )}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              {item.label}
            </span>
          );
        })}
      </nav>

      <div className="flex items-center gap-2 border-t border-border px-3 py-3">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-subtle text-[10px] font-medium text-accent-text">
          {mockMeta.user.initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-medium leading-none text-fg">
            {mockMeta.user.name}
          </p>
          <p className="mt-1 truncate text-[10px] leading-none text-fg-muted">
            {mockMeta.plan} plan
          </p>
        </div>
      </div>
    </aside>
  );
}
