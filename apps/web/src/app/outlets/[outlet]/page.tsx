import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CircleDot,
  Newspaper,
  TrendingUp,
} from "lucide-react";

import {
  getOutletSummaryByName,
  getOutletTrajectory,
  loadOutletMonthProfiles,
  loadOutletSummaries,
} from "@/lib/data";

import {
  OutletProfileChart,
} from "@/components/charts/outlet-profile-chart";


// ============================================================
// PAGE PROPS
// ============================================================

interface OutletPageProps {
  params: Promise<{
    outlet: string;
  }>;
}


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


function formatMonth(
  month:
    | string
    | null
    | undefined,
) {
  if (!month) {
    return "—";
  }

  const normalized =
    month.slice(
      0,
      7,
    );

  const [
    year,
    monthNumber,
  ] = normalized.split("-");

  const date = new Date(
    Number(year),
    Number(monthNumber) - 1,
    1,
  );

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      year: "numeric",
    },
  ).format(date);
}


function safeDecode(
  value: string,
) {
  try {
    return decodeURIComponent(
      value,
    );
  } catch {
    return value;
  }
}


// ============================================================
// PAGE
// ============================================================

export default async function OutletDetailPage({
  params,
}: OutletPageProps) {
  const {
    outlet: outletParam,
  } = await params;


  const outletName =
    safeDecode(
      outletParam,
    );


  // ----------------------------------------------------------
  // LOAD SERVER-SIDE DATA
  //
  // The full profile JSON remains server-side. Only this
  // outlet's normalized trajectory is passed into the
  // client-side chart component.
  // ----------------------------------------------------------

  const [
    outletSummaries,
    outletMonthProfiles,
  ] = await Promise.all([
    loadOutletSummaries(),
    loadOutletMonthProfiles(),
  ]);


  // ----------------------------------------------------------
  // FIND OUTLET
  // ----------------------------------------------------------

  const outletSummary =
    getOutletSummaryByName(
      outletSummaries,
      outletName,
    );


  if (!outletSummary) {
    notFound();
  }


  const trajectory =
    getOutletTrajectory(
      outletMonthProfiles,
      outletSummary.media_name,
    );


  if (
    trajectory.length === 0
  ) {
    notFound();
  }


  // ----------------------------------------------------------
  // DERIVED VALUES
  // ----------------------------------------------------------

  const firstObservation =
    trajectory[0];

  const lastObservation =
    trajectory[
      trajectory.length - 1
    ];


  const significantPositive =
    typeof outletSummary
      .impact_ci_lower ===
      "number" &&
    outletSummary
      .impact_ci_lower > 0;


  const significantNegative =
    typeof outletSummary
      .impact_ci_upper ===
      "number" &&
    outletSummary
      .impact_ci_upper < 0;


  const trendStatus =
    significantPositive
      ? "Statistically significant increase"
      : significantNegative
        ? "Statistically significant decrease"
        : "Not statistically distinguishable from zero";


  return (
    <main>
      {/* ==================================================== */}
      {/* BREADCRUMB / BACK */}
      {/* ==================================================== */}

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 lg:px-8">
          <Link
            href="/outlets"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />

            All outlets
          </Link>
        </div>
      </section>


      {/* ==================================================== */}
      {/* HERO */}
      {/* ==================================================== */}

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-24">
          <div className="max-w-5xl">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                <Newspaper className="h-3.5 w-3.5" />

                Outlet profile
              </div>


              {outletSummary.stable_90 && (
                <div className="inline-flex rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  Stable 90% cohort
                </div>
              )}


              {outletSummary
                .fully_balanced && (
                <div className="inline-flex rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  Fully balanced panel
                </div>
              )}
            </div>


            <h1 className="mt-7 break-words text-5xl font-semibold tracking-[-0.045em] sm:text-6xl">
              {
                outletSummary.media_name
              }
            </h1>


            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              Monthly climate-theme emphasis
              and the outlet&apos;s estimated
              long-run climate-impact
              trajectory.
            </p>
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* COVERAGE METRICS */}
      {/* ==================================================== */}

      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
          <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            {/* Coverage */}

            <div className="border-b border-r border-border bg-background p-6">
              <CircleDot className="h-5 w-5 text-muted-foreground" />

              <p className="mt-7 text-3xl font-semibold tracking-tight">
                {formatPercent(
                  outletSummary
                    .coverage_pct,
                )}
              </p>

              <p className="mt-2 text-sm font-medium">
                Study coverage
              </p>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {
                  outletSummary
                    .months_present
                }{" "}
                qualifying outlet-month
                observations.
              </p>
            </div>


            {/* First observation */}

            <div className="border-b border-r border-border bg-background p-6">
              <CalendarDays className="h-5 w-5 text-muted-foreground" />

              <p className="mt-7 text-2xl font-semibold tracking-tight">
                {formatMonth(
                  firstObservation.month,
                )}
              </p>

              <p className="mt-2 text-sm font-medium">
                First observation
              </p>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                First qualifying month in
                the application dataset.
              </p>
            </div>


            {/* Last observation */}

            <div className="border-b border-r border-border bg-background p-6">
              <CalendarDays className="h-5 w-5 text-muted-foreground" />

              <p className="mt-7 text-2xl font-semibold tracking-tight">
                {formatMonth(
                  lastObservation.month,
                )}
              </p>

              <p className="mt-2 text-sm font-medium">
                Latest observation
              </p>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Most recent complete month
                available for this outlet.
              </p>
            </div>


            {/* Trend */}

            <div className="border-b border-r border-border bg-background p-6">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />

              <p className="mt-7 text-3xl font-semibold tracking-tight">
                {formatSigned(
                  outletSummary
                    .impact_annualized_change,
                  4,
                )}
              </p>

              <p className="mt-2 text-sm font-medium">
                Annual impact trend
              </p>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Estimated annual change in
                relative climate-impact
                emphasis.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* CLIMATE-IMPACT ANALYSIS */}
      {/* ==================================================== */}

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Climate-impact trajectory
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                From early to late study
                period
              </h2>
            </div>


            <p className="max-w-2xl leading-7 text-muted-foreground">
              These values summarize
              climate-impact emphasis
              relative to the outlet&apos;s
              other climate themes. A higher
              value means impacts became more
              prominent within the thematic
              profile; it does not indicate
              political direction.
            </p>
          </div>


          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Early */}

            <div className="rounded-3xl border border-border p-6">
              <p className="text-sm text-muted-foreground">
                Early mean
              </p>

              <p className="mt-5 font-mono text-3xl font-semibold">
                {formatNumber(
                  outletSummary
                    .impact_early_mean,
                )}
              </p>
            </div>


            {/* Middle */}

            <div className="rounded-3xl border border-border p-6">
              <p className="text-sm text-muted-foreground">
                Middle mean
              </p>

              <p className="mt-5 font-mono text-3xl font-semibold">
                {formatNumber(
                  outletSummary
                    .impact_middle_mean,
                )}
              </p>
            </div>


            {/* Late */}

            <div className="rounded-3xl border border-border p-6">
              <p className="text-sm text-muted-foreground">
                Late mean
              </p>

              <p className="mt-5 font-mono text-3xl font-semibold">
                {formatNumber(
                  outletSummary
                    .impact_late_mean,
                )}
              </p>
            </div>


            {/* Change */}

            <div className="rounded-3xl border border-border p-6">
              <p className="text-sm text-muted-foreground">
                Early → late
              </p>

              <p className="mt-5 font-mono text-3xl font-semibold">
                {formatSigned(
                  outletSummary
                    .impact_early_to_late_change,
                  3,
                )}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* INFERENCE */}
      {/* ==================================================== */}

      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Trend inference
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">
              {trendStatus}
            </h2>
          </div>


          <div className="grid gap-5 md:grid-cols-3">
            {/* Estimate */}

            <div className="rounded-3xl border border-border bg-background p-7">
              <p className="text-sm text-muted-foreground">
                Annualized change
              </p>

              <p className="mt-5 font-mono text-3xl font-semibold">
                {formatSigned(
                  outletSummary
                    .impact_annualized_change,
                  4,
                )}
              </p>
            </div>


            {/* Confidence interval */}

            <div className="rounded-3xl border border-border bg-background p-7">
              <p className="text-sm text-muted-foreground">
                95% HAC interval
              </p>

              <p className="mt-5 font-mono text-xl font-semibold">
                {formatSigned(
                  outletSummary
                    .impact_ci_lower,
                  4,
                )}
                {" to "}
                {formatSigned(
                  outletSummary
                    .impact_ci_upper,
                  4,
                )}
              </p>
            </div>


            {/* P-value */}

            <div className="rounded-3xl border border-border bg-background p-7">
              <p className="text-sm text-muted-foreground">
                p-value
              </p>

              <p className="mt-5 font-mono text-3xl font-semibold">
                {formatPValue(
                  outletSummary
                    .impact_p_value,
                )}
              </p>
            </div>
          </div>


          <p className="mt-6 max-w-3xl text-xs leading-5 text-muted-foreground">
            The trend is estimated from the
            outlet&apos;s monthly relative
            climate-impact emphasis with
            HAC-adjusted uncertainty. This is
            a descriptive longitudinal result,
            not a causal estimate.
          </p>
        </div>
      </section>


      {/* ==================================================== */}
      {/* SIX-DIMENSION TRAJECTORY */}
      {/* ==================================================== */}

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Full thematic profile
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              How the six climate themes
              moved together
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              Because these scores are
              relative across six themes,
              changes should be interpreted as
              shifts in thematic prominence
              within the outlet&apos;s climate
              coverage.
            </p>
          </div>


          <OutletProfileChart
            data={
              trajectory
            }
            outletName={
              outletSummary.media_name
            }
          />
        </div>
      </section>


      {/* ==================================================== */}
      {/* LATEST THEMATIC SNAPSHOT */}
      {/* ==================================================== */}

      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Latest profile
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">
              {formatMonth(
                lastObservation.month,
              )}
            </h2>
          </div>


          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ThemeCard
              label="Climate science"
              value={
                lastObservation
                  .climate_science
              }
            />

            <ThemeCard
              label="Emissions & fossil fuels"
              value={
                lastObservation
                  .emissions_fossil_fuels
              }
            />

            <ThemeCard
              label="Clean energy transition"
              value={
                lastObservation
                  .clean_energy_transition
              }
            />

            <ThemeCard
              label="Climate policy"
              value={
                lastObservation
                  .climate_policy
              }
            />

            <ThemeCard
              label="Climate impacts"
              value={
                lastObservation
                  .climate_impacts
              }
              emphasized
            />

            <ThemeCard
              label="Adaptation & resilience"
              value={
                lastObservation
                  .adaptation_resilience
              }
            />
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* NAVIGATION */}
      {/* ==================================================== */}

      <section>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="flex flex-col gap-5 sm:flex-row">
            <Link
              href="/outlets"
              className="group flex flex-1 items-center justify-between rounded-3xl border border-border p-7 transition-colors hover:bg-muted/40"
            >
              <div>
                <p className="text-sm text-muted-foreground">
                  Back
                </p>

                <p className="mt-2 text-xl font-semibold">
                  Browse all outlets
                </p>
              </div>

              <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            </Link>


            <Link
              href="/explore"
              className="group flex flex-1 items-center justify-between rounded-3xl border border-border p-7 transition-colors hover:bg-muted/40"
            >
              <div>
                <p className="text-sm text-muted-foreground">
                  Compare
                </p>

                <p className="mt-2 text-xl font-semibold">
                  Explore aggregate trends
                </p>
              </div>

              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


// ============================================================
// THEME CARD
// ============================================================

function ThemeCard({
  label,
  value,
  emphasized = false,
}: {
  label: string;

  value:
    | number
    | null;

  emphasized?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-3xl border p-6",
        emphasized
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background",
      ].join(
        " ",
      )}
    >
      <p
        className={[
          "text-sm",
          emphasized
            ? "text-background/60"
            : "text-muted-foreground",
        ].join(
          " ",
        )}
      >
        {label}
      </p>

      <p className="mt-5 font-mono text-3xl font-semibold">
        {value === null
          ? "—"
          : formatSigned(
              value,
              3,
            )}
      </p>
    </div>
  );
}