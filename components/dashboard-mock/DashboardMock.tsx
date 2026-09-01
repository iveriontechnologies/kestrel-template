import { Search, TrendingUp } from "lucide-react";

import { MockBarChart } from "@/components/dashboard-mock/MockBarChart";
import { MockLineChart } from "@/components/dashboard-mock/MockLineChart";
import { MockSidebar } from "@/components/dashboard-mock/MockSidebar";
import { MockStatCard } from "@/components/dashboard-mock/MockStatCard";
import {
  mockEventsByDay,
  mockMeta,
  mockStats,
  mockTopFeatures,
  mockUsersSeries,
} from "@/lib/mock-dashboard";

/**
 * The product shot. Entirely markup — no screenshots, no image assets, no
 * chart library. That is what lets it retheme with the accent token and stay
 * sharp at any density, which a PNG cannot do.
 *
 * Decorative: the whole thing is aria-hidden, and the hero copy carries the
 * text alternative.
 */
export function DashboardMock() {
  return (
    <div
      className="overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--shadow-lg)]"
      aria-hidden="true"
    >
      {/* Below md the app layout stops making sense at phone width, so the
          frame scrolls horizontally inside a mask instead of squashing. */}
      <div className="overflow-x-auto scrollbar-none [mask-image:linear-gradient(to_right,black_88%,transparent)] md:[mask-image:none]">
        <div className="flex min-w-[720px] md:min-w-0">
          <MockSidebar />

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold tracking-[-0.01em] text-fg">
                  {mockMeta.chartTitle}
                </span>
                <span className="rounded-full bg-surface-raised px-2 py-0.5 text-[10px] text-fg-muted">
                  {mockMeta.chartRange}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-md border border-border bg-surface-raised px-2 py-1 text-[10px] text-fg-muted">
                  <Search className="h-3 w-3" />
                  Search
                </span>
              </div>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-4 gap-3">
                {mockStats.map((stat) => (
                  <MockStatCard key={stat.label} {...stat} />
                ))}
              </div>

              <div className="mt-4 rounded-lg border border-border bg-surface-raised p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-fg-secondary">
                    {mockMeta.chartTitle}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-medium text-success">
                    <TrendingUp className="h-3 w-3" />
                    12.4%
                  </span>
                </div>
                <MockLineChart points={mockUsersSeries} />
              </div>

              <div className="mt-4 grid grid-cols-5 gap-3">
                <div className="col-span-2 rounded-lg border border-border bg-surface-raised p-3">
                  <p className="mb-3 text-[11px] font-medium text-fg-secondary">
                    {mockMeta.barTitle}
                  </p>
                  <MockBarChart points={mockEventsByDay} />
                </div>

                <div className="col-span-3 rounded-lg border border-border bg-surface-raised p-3">
                  <p className="mb-2 text-[11px] font-medium text-fg-secondary">
                    {mockMeta.tableTitle}
                  </p>
                  <table className="w-full border-collapse">
                    <tbody>
                      {mockTopFeatures.map((row) => (
                        <tr
                          key={row.feature}
                          className="border-t border-border first:border-t-0"
                        >
                          <td className="py-1.5 pr-2 text-[11px] text-fg">
                            {row.feature}
                          </td>
                          <td className="py-1.5 pr-2 text-right text-[11px] tabular-nums text-fg-muted">
                            {row.users}
                          </td>
                          <td className="w-[72px] py-1.5">
                            <div className="h-1 w-full overflow-hidden rounded-full bg-border">
                              <div
                                className="h-full rounded-full bg-chart-1"
                                style={{ width: `${row.adoption}%` }}
                              />
                            </div>
                          </td>
                          <td className="w-[34px] py-1.5 text-right text-[10px] tabular-nums text-fg-muted">
                            {row.adoption}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
