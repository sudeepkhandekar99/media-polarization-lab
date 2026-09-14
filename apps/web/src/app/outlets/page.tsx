import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  ArrowRight,
  CircleDot,
  Newspaper,
  TrendingUp,
} from "lucide-react";

import {
  getOutletTrendCounts,
  getStableOutlets,
  getTopClimateImpactRisers,
  loadOutletSummaries,
} from "@/lib/data";


// ============================================================
// METADATA
// ============================================================

export const metadata: Metadata = {
  title: "Outlet Explorer",

  description:
    "Explore outlet-level climate coverage trajectories, coverage continuity, and long-run climate-impact trends across the primary stable news outlet cohort.",

  openGraph: {
    title:
      "Outlet Explorer | Media Polarization Lab",

    description:
      "Compare how individual news outlets changed in their relative emphasis on climate impacts from 2016 through 2026.",

    type: "website",
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Outlet Explorer | Media Polarization Lab",

    description:
      "Explore outlet-level climate-impact trajectories and long-run semantic trends across news coverage.",
  },
};


// ============================================================
// FORMAT HELPERS
// ============================================================

function formatSigned(
  value:
    | number
    | null
    | undefined,
  digits = 4,
) {
  if (
    value === null ||
    value === undefined
  ) {
    return "—";
  }

  const prefix =
    value > 0
      ? "+"
      : "";

  return `${prefix}${value.toFixed(
    digits,
  )}`;
}


function formatNumber(
  value:
    | number
    | null
    | undefined,
  digits = 3,
) {
  if (
    value === null ||
    value === undefined
  ) {
    return "—";
  }

  return value.toFixed(
    digits,
  );
}


function formatPercent(
  value:
    | number
    | null
    | undefined,
  digits = 1,
) {
  if (
    value === null ||
    value === undefined
  ) {
    return "—";
  }

  return `${value.toFixed(
    digits,
  )}%`;
}


function formatPValue(
  value:
    | number
    | null
    | undefined,
) {
  if (
    value === null ||
    value === undefined
  ) {
    return "—";
  }

  if (value < 0.001) {
    return "< 0.001";
  }

  return value.toFixed(
    3,
  );
}


// ============================================================
// PAGE
// ============================================================

export default async function OutletsPage() {
  const outletSummaries =
    await loadOutletSummaries();


  // ----------------------------------------------------------
  // PRIMARY COHORT
  // ----------------------------------------------------------

  const stableOutlets =
    getStableOutlets(
      outletSummaries,
    );


  const topRisers =
    getTopClimateImpactRisers(
      outletSummaries,
      5,
    );


  const trendCounts =
    getOutletTrendCounts(
      outletSummaries,
    );


  // ----------------------------------------------------------
  // SORT TABLE BY IMPACT TREND
  // ----------------------------------------------------------

  const rankedStableOutlets =
    [...stableOutlets].sort(
      (a, b) =>
        (
          b
            .impact_annualized_change ??
          -Infinity
        ) -
        (
          a
            .impact_annualized_change ??
          -Infinity
        ),
    );


  return (
    <main>
      {/* ==================================================== */}
      {/* HERO */}
      {/* ==================================================== */}

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <Newspaper className="h-3.5 w-3.5" />

              Outlet explorer
            </div>


            <h1 className="mt-7 text-5xl font-semibold tracking-[-0.045em] sm:text-6xl">
              See how individual outlets
              changed over time.
            </h1>


            <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">
              The aggregate rise in
              climate-impact divergence is
              built from different outlet-level
              trajectories. Start with the
              stable 90% cohort to compare
              outlets observed consistently
              across the study.
            </p>
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* SUMMARY METRICS */}
      {/* ==================================================== */}

      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
          <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-b border-r border-border bg-background p-6">
              <Newspaper className="h-5 w-5 text-muted-foreground" />

              <p className="mt-7 text-3xl font-semibold tracking-tight">
                {
                  outletSummaries.length
                }
              </p>

              <p className="mt-2 text-sm font-medium">
                Outlets in app data
              </p>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                All outlets with qualifying
                outlet-month climate profiles.
              </p>
            </div>


            <div className="border-b border-r border-border bg-background p-6">
              <CircleDot className="h-5 w-5 text-muted-foreground" />

              <p className="mt-7 text-3xl font-semibold tracking-tight">
                {
                  stableOutlets.length
                }
              </p>

              <p className="mt-2 text-sm font-medium">
                Stable 90% cohort
              </p>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Primary cohort used for
                outlet-level trend comparison.
              </p>
            </div>


            <div className="border-b border-r border-border bg-background p-6">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />

              <p className="mt-7 text-3xl font-semibold tracking-tight">
                {
                  trendCounts
                    .significantPositive
                }
                /{
                  trendCounts.total
                }
              </p>

              <p className="mt-2 text-sm font-medium">
                Significant increases
              </p>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Stable outlets with a 95%
                confidence interval entirely
                above zero.
              </p>
            </div>


            <div className="border-b border-r border-border bg-background p-6">
              <TrendingUp className="h-5 w-5 rotate-180 text-muted-foreground" />

              <p className="mt-7 text-3xl font-semibold tracking-tight">
                {
                  trendCounts
                    .significantNegative
                }
              </p>

              <p className="mt-2 text-sm font-medium">
                Significant decreases
              </p>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                None of the stable outlets
                showed a statistically
                significant decline.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* TOP RISERS */}
      {/* ==================================================== */}

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Largest increases
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Which outlets changed fastest?
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              Ranked by the estimated
              annualized trend in relative
              climate-impact emphasis within
              the stable 90% cohort.
            </p>
          </div>


          <div className="grid gap-4 md:grid-cols-5">
            {topRisers.map(
              (
                outlet,
                index,
              ) => (
                <Link
                  key={
                    outlet.media_name
                  }
                  href={`/outlets/${encodeURIComponent(
                    outlet.media_name,
                  )}`}
                  className="group rounded-3xl border border-border p-6 transition-colors hover:bg-muted/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                      #
                      {index + 1}
                    </span>

                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>


                  <p className="mt-8 break-words text-lg font-semibold tracking-tight">
                    {
                      outlet.media_name
                    }
                  </p>


                  <p className="mt-5 font-mono text-2xl font-semibold">
                    {formatSigned(
                      outlet
                        .impact_annualized_change,
                      4,
                    )}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    annual change
                  </p>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* STABLE COHORT TABLE */}
      {/* ==================================================== */}

      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Stable 90% cohort
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">
                Outlet-level climate-impact
                trajectories
              </h2>
            </div>


            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              Click an outlet to inspect its
              full monthly thematic profile.
            </p>
          </div>


          <div className="overflow-hidden rounded-3xl border border-border bg-background">
            <div className="hidden grid-cols-[1.35fr_0.6fr_0.65fr_0.65fr_0.7fr_0.9fr_0.55fr_40px] border-b border-border bg-muted/30 px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground lg:grid">
              <div>
                Outlet
              </div>

              <div className="text-right">
                Coverage
              </div>

              <div className="text-right">
                Early
              </div>

              <div className="text-right">
                Late
              </div>

              <div className="text-right">
                Change
              </div>

              <div className="text-right">
                Annual trend
              </div>

              <div className="text-right">
                p
              </div>

              <div />
            </div>


            {rankedStableOutlets.map(
              (
                outlet,
                index,
              ) => (
                <Link
                  key={
                    outlet.media_name
                  }
                  href={`/outlets/${encodeURIComponent(
                    outlet.media_name,
                  )}`}
                  className="group grid gap-5 border-b border-border px-6 py-5 transition-colors last:border-b-0 hover:bg-muted/30 lg:grid-cols-[1.35fr_0.6fr_0.65fr_0.65fr_0.7fr_0.9fr_0.55fr_40px] lg:items-center"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 font-mono text-xs text-muted-foreground">
                        {String(
                          index + 1,
                        ).padStart(
                          2,
                          "0",
                        )}
                      </span>

                      <p className="font-medium">
                        {
                          outlet.media_name
                        }
                      </p>
                    </div>
                  </div>


                  <div className="lg:text-right">
                    <p className="text-xs text-muted-foreground lg:hidden">
                      Coverage
                    </p>

                    <p className="font-mono text-sm">
                      {formatPercent(
                        outlet.coverage_pct,
                      )}
                    </p>
                  </div>


                  <div className="lg:text-right">
                    <p className="text-xs text-muted-foreground lg:hidden">
                      Early mean
                    </p>

                    <p className="font-mono text-sm">
                      {formatNumber(
                        outlet
                          .impact_early_mean,
                      )}
                    </p>
                  </div>


                  <div className="lg:text-right">
                    <p className="text-xs text-muted-foreground lg:hidden">
                      Late mean
                    </p>

                    <p className="font-mono text-sm">
                      {formatNumber(
                        outlet
                          .impact_late_mean,
                      )}
                    </p>
                  </div>


                  <div className="lg:text-right">
                    <p className="text-xs text-muted-foreground lg:hidden">
                      Early → late
                    </p>

                    <p className="font-mono text-sm">
                      {formatSigned(
                        outlet
                          .impact_early_to_late_change,
                        3,
                      )}
                    </p>
                  </div>


                  <div className="lg:text-right">
                    <p className="text-xs text-muted-foreground lg:hidden">
                      Annual trend
                    </p>

                    <p className="font-mono text-sm font-medium">
                      {formatSigned(
                        outlet
                          .impact_annualized_change,
                        4,
                      )}
                    </p>
                  </div>


                  <div className="lg:text-right">
                    <p className="text-xs text-muted-foreground lg:hidden">
                      p-value
                    </p>

                    <p className="font-mono text-sm">
                      {formatPValue(
                        outlet
                          .impact_p_value,
                      )}
                    </p>
                  </div>


                  <div className="hidden justify-end lg:flex">
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ),
            )}
          </div>


          <p className="mt-5 max-w-3xl text-xs leading-5 text-muted-foreground">
            Annual trends use HAC-adjusted
            inference. Positive values indicate
            increasing relative climate-impact
            emphasis for that outlet over the
            study period. They should not be
            interpreted as ideological
            direction.
          </p>
        </div>
      </section>


      {/* ==================================================== */}
      {/* CONTEXT */}
      {/* ==================================================== */}

      <section>
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Why the stable cohort?
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">
              Comparability matters more than
              maximizing outlet count.
            </h2>
          </div>


          <div className="max-w-2xl space-y-5 leading-7 text-muted-foreground">
            <p>
              The full dataset contains 136
              outlets, but many appear only
              during part of the study period.
              Comparing a changing set of
              outlets can make aggregate
              divergence difficult to interpret.
            </p>

            <p>
              The primary 20-outlet cohort
              therefore requires presence in at
              least 90% of complete study
              months. This substantially reduces
              composition changes while
              retaining more outlets than the
              six-outlet fully balanced panel.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}