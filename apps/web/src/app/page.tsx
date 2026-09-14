// apps/web/src/app/page.tsx

import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  ArrowRight,
  CircleDot,
  Database,
  Newspaper,
  TrendingUp,
} from "lucide-react";

import {
  getOutletTrendCounts,
  getPrimaryClimateImpactSeries,
  loadHeadlineMetrics,
  loadManifest,
  loadMonthlyDimensions,
  loadOutletSummaries,
} from "@/lib/data";

import {
  ClimateImpactTrendChart,
} from "@/components/charts/climate-impact-trend-chart";


// ============================================================
// METADATA
// ============================================================

export const metadata: Metadata = {
  title: {
    absolute:
      "Media Polarization Lab",
  },

  description:
    "An interactive longitudinal study of semantic divergence in climate coverage across U.S. news outlets from 2016 through 2026.",

  openGraph: {
    title:
      "Media Polarization Lab",

    description:
      "Explore how news outlets became more different in the climate themes they emphasized from 2016 through 2026.",

    type: "website",
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Media Polarization Lab",

    description:
      "Explore semantic divergence in climate coverage across U.S. news outlets from 2016 through 2026.",
  },
};


// ============================================================
// FORMAT HELPERS
// ============================================================

function formatNumber(
  value: number | null,
  digits = 3,
) {
  if (value === null) {
    return "—";
  }

  return value.toFixed(
    digits,
  );
}


function formatPercent(
  value: number | null,
  digits = 1,
) {
  if (value === null) {
    return "—";
  }

  return `${value.toFixed(
    digits,
  )}%`;
}


// ============================================================
// PAGE
// ============================================================

export default async function HomePage() {
  const [
    headlineMetrics,
    manifest,
    outletSummaries,
    monthlyDimensions,
  ] = await Promise.all([
    loadHeadlineMetrics(),
    loadManifest(),
    loadOutletSummaries(),
    loadMonthlyDimensions(),
  ]);


  // ----------------------------------------------------------
  // DERIVED DATA
  // ----------------------------------------------------------

  const outletTrendCounts =
    getOutletTrendCounts(
      outletSummaries,
    );


  const climateImpactSeries =
    getPrimaryClimateImpactSeries(
      monthlyDimensions,
    );


  const divergence =
    headlineMetrics
      .climate_impact_divergence;


  const earlyVsLate =
    headlineMetrics
      .early_vs_late;


  const structuralBreak =
    headlineMetrics
      .structural_break;


  return (
    <main>
      {/* ==================================================== */}
      {/* HERO */}
      {/* ==================================================== */}

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-6 sm:pb-24 sm:pt-24 lg:px-8 lg:pb-32 lg:pt-28">
          <div className="max-w-5xl">
            <div className="mb-7 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                <CircleDot className="h-3.5 w-3.5" />

                2016–2026 longitudinal study
              </div>

              <div className="inline-flex rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">
                {manifest.outlets} news outlets
              </div>
            </div>


            <h1 className="max-w-5xl text-5xl font-semibold tracking-[-0.045em] text-foreground sm:text-6xl lg:text-7xl">
              News outlets are becoming
              more different in how they
              frame climate impacts.
            </h1>


            <p className="mt-8 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
              We track semantic differences in
              climate coverage across U.S. news
              outlets over nearly a decade,
              measuring how strongly outlets
              emphasize science, policy, energy,
              impacts, emissions, and adaptation.
            </p>


            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Explore the data

                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/methodology"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Read methodology
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* HEADLINE RESULT */}
      {/* ==================================================== */}

      <section className="border-b border-border bg-muted/25">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Primary finding
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                Climate-impact framing
                divergence nearly doubled.
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
                Among outlets observed in at
                least 90% of study months,
                cross-outlet dispersion in
                climate-impact emphasis rose
                substantially from the early to
                late study period.
              </p>
            </div>


            <div>
              <p className="text-[clamp(5rem,14vw,10rem)] font-semibold leading-[0.8] tracking-[-0.075em]">
                {formatPercent(
                  earlyVsLate
                    .percent_change,
                  0,
                )}
              </p>

              <p className="mt-6 max-w-xl text-sm leading-6 text-muted-foreground">
                increase in average
                climate-impact dispersion from
                the early to late period in the
                stable 90% outlet cohort.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* KEY METRICS */}
      {/* ==================================================== */}

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Evidence
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">
              The trend persists under
              stricter comparison.
            </h2>
          </div>


          <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-b border-r border-border p-6 sm:p-7">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />

              <p className="mt-8 text-3xl font-semibold tracking-tight">
                +
                {formatNumber(
                  divergence
                    .annualized_change,
                  4,
                )}
              </p>

              <p className="mt-2 text-sm font-medium">
                Annualized trend
              </p>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Increase in cross-outlet
                climate-impact dispersion per
                year.
              </p>
            </div>


            <div className="border-b border-r border-border p-6 sm:p-7">
              <CircleDot className="h-5 w-5 text-muted-foreground" />

              <p className="mt-8 text-xl font-semibold tracking-tight">
                {formatNumber(
                  divergence.ci_lower,
                  4,
                )}
                {" – "}
                {formatNumber(
                  divergence.ci_upper,
                  4,
                )}
              </p>

              <p className="mt-2 text-sm font-medium">
                95% HAC interval
              </p>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                The long-run trend remains
                clearly above zero.
              </p>
            </div>


            <div className="border-b border-r border-border p-6 sm:p-7">
              <Newspaper className="h-5 w-5 text-muted-foreground" />

              <p className="mt-8 text-3xl font-semibold tracking-tight">
                {
                  outletTrendCounts
                    .significantPositive
                }
                /{
                  outletTrendCounts.total
                }
              </p>

              <p className="mt-2 text-sm font-medium">
                Stable outlets rising
              </p>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                17 of 20 stable outlets show a
                statistically significant
                positive climate-impact trend.
              </p>
            </div>


            <div className="border-b border-r border-border p-6 sm:p-7">
              <Database className="h-5 w-5 text-muted-foreground" />

              <p className="mt-8 text-3xl font-semibold tracking-tight">
                {manifest.study_months}
              </p>

              <p className="mt-2 text-sm font-medium">
                Complete months
              </p>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                June 2016 through January 2026.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* PRIMARY TREND CHART */}
      {/* ==================================================== */}

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Climate-impact divergence
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                A persistent increase,
                not a single sudden break.
              </h2>
            </div>


            <div className="max-w-sm text-sm leading-6 text-muted-foreground">
              The primary stable-panel trend is
              approximately linear. A candidate
              break appears in{" "}
              <span className="font-medium text-foreground">
                {
                  structuralBreak
                    .selected_month
                }
              </span>
              , but the bootstrap test does not
              support a genuine structural break
              (
              p ={" "}
              {formatNumber(
                structuralBreak
                  .bootstrap_p_value,
                3,
              )}
              ).
            </div>
          </div>


          <div className="mt-12">
            <ClimateImpactTrendChart
              data={
                climateImpactSeries
              }
              candidateBreakMonth={
                structuralBreak
                  .selected_month
              }
            />
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* INTERPRETATION */}
      {/* ==================================================== */}

      <section className="border-b border-border bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-background/55">
              Interpretation
            </p>

            <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
              Divergence does not automatically
              mean ideological polarization.
            </h2>
          </div>


          <div className="max-w-xl space-y-5 text-base leading-7 text-white/70">
            <p>
              The measure captures differences
              in thematic emphasis: which parts
              of the climate story outlets make
              more or less central in their
              coverage.
            </p>

            <p>
              Higher dispersion means outlets
              are becoming less similar in that
              emphasis. Establishing ideological
              or partisan polarization would
              require an additional analysis of
              political direction or outlet
              ideology.
            </p>
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* NEXT EXPLORATION */}
      {/* ==================================================== */}

      <section>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-5 md:grid-cols-2">
            <Link
              href="/explore"
              className="group rounded-3xl border border-border p-8 transition-colors hover:bg-muted/50 sm:p-10"
            >
              <p className="text-sm text-muted-foreground">
                Explore trends
              </p>

              <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                Compare all six climate
                dimensions
              </h3>

              <p className="mt-4 max-w-lg leading-7 text-muted-foreground">
                Switch between outlet panels,
                thematic dimensions, standard
                deviation, and interquartile
                range.
              </p>

              <div className="mt-8 flex items-center gap-2 text-sm font-medium">
                Open explorer

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>


            <Link
              href="/outlets"
              className="group rounded-3xl border border-border p-8 transition-colors hover:bg-muted/50 sm:p-10"
            >
              <p className="text-sm text-muted-foreground">
                Outlet explorer
              </p>

              <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                See how individual outlets
                changed
              </h3>

              <p className="mt-4 max-w-lg leading-7 text-muted-foreground">
                Compare coverage continuity,
                thematic trajectories, and
                outlet-specific climate-impact
                trends.
              </p>

              <div className="mt-8 flex items-center gap-2 text-sm font-medium">
                Browse outlets

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}