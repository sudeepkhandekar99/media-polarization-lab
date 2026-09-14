"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  Check,
  SlidersHorizontal,
} from "lucide-react";

import {
  CLIMATE_DIMENSIONS,
  DEFAULT_DISPERSION_MEASURE,
  DEFAULT_PANEL,
  DISPERSION_MEASURES,
  PANELS,
  getPanelLabel,
} from "@/lib/data/constants";

import {
  getDimensionTrends,
} from "@/lib/data/selectors";

import type {
  ClimateDimensionTrend,
  DispersionMeasure,
  MonthlyDimensionRecord,
  Panel,
} from "@/lib/data/types";

import {
  DimensionComparisonChart,
} from "@/components/charts/dimension-comparison-chart";


// ============================================================
// PROPS
// ============================================================

interface ExploreControlsProps {
  monthlyDimensions:
    MonthlyDimensionRecord[];

  dimensionTrends:
    ClimateDimensionTrend[];
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
// COMPONENT
// ============================================================

export function ExploreControls({
  monthlyDimensions,
  dimensionTrends,
}: ExploreControlsProps) {
  const [
    panel,
    setPanel,
  ] = useState<Panel>(
    DEFAULT_PANEL,
  );

  const [
    measure,
    setMeasure,
  ] =
    useState<DispersionMeasure>(
      DEFAULT_DISPERSION_MEASURE,
    );


  // ----------------------------------------------------------
  // CURRENT TREND TABLE
  // ----------------------------------------------------------

  const currentTrends =
    useMemo(
      () =>
        getDimensionTrends(
          dimensionTrends,
          panel,
          measure,
        ),
      [
        dimensionTrends,
        panel,
        measure,
      ],
    );


  // ----------------------------------------------------------
  // PANEL INFORMATION
  // ----------------------------------------------------------

  const selectedPanel =
    PANELS.find(
      (item) =>
        item.id === panel,
    );


  const selectedMeasure =
    DISPERSION_MEASURES.find(
      (item) =>
        item.id === measure,
    );


  return (
    <div className="space-y-10">
      {/* ==================================================== */}
      {/* CONTROL PANEL */}
      {/* ==================================================== */}

      <div className="overflow-hidden rounded-3xl border border-border bg-background">
        <div className="border-b border-border px-6 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            </div>

            <div>
              <p className="text-sm font-medium">
                Analysis controls
              </p>

              <p className="mt-0.5 text-xs text-muted-foreground">
                Change the outlet panel
                and dispersion measure.
              </p>
            </div>
          </div>
        </div>


        <div className="grid gap-8 px-6 py-6 sm:px-8 lg:grid-cols-2">
          {/* ================================================= */}
          {/* PANEL */}
          {/* ================================================= */}

          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Outlet panel
            </p>

            <div className="flex flex-wrap gap-2">
              {PANELS.map(
                (item) => {
                  const active =
                    item.id ===
                    panel;

                  return (
                    <button
                      key={
                        item.id
                      }
                      type="button"
                      onClick={() =>
                        setPanel(
                          item.id,
                        )
                      }
                      className={[
                        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                        active
                          ? "border-foreground bg-foreground text-background"
                          : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
                      ].join(
                        " ",
                      )}
                    >
                      {active && (
                        <Check className="h-3.5 w-3.5" />
                      )}

                      {
                        item.shortLabel
                      }
                    </button>
                  );
                },
              )}
            </div>

            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
              {
                selectedPanel
                  ?.description
              }
            </p>
          </div>


          {/* ================================================= */}
          {/* MEASURE */}
          {/* ================================================= */}

          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Dispersion measure
            </p>

            <div className="flex flex-wrap gap-2">
              {DISPERSION_MEASURES.map(
                (item) => {
                  const active =
                    item.id ===
                    measure;

                  return (
                    <button
                      key={
                        item.id
                      }
                      type="button"
                      onClick={() =>
                        setMeasure(
                          item.id,
                        )
                      }
                      className={[
                        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                        active
                          ? "border-foreground bg-foreground text-background"
                          : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
                      ].join(
                        " ",
                      )}
                    >
                      {active && (
                        <Check className="h-3.5 w-3.5" />
                      )}

                      {
                        item.shortLabel
                      }
                    </button>
                  );
                },
              )}
            </div>

            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
              {
                selectedMeasure
                  ?.description
              }
            </p>
          </div>
        </div>


        {/* ================================================== */}
        {/* ACTIVE SPECIFICATION */}
        {/* ================================================== */}

        <div className="border-t border-border bg-muted/20 px-6 py-4 sm:px-8">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span>
              Current view
            </span>

            <span className="font-medium text-foreground">
              {getPanelLabel(
                panel,
              )}
            </span>

            <span className="hidden sm:inline">
              ·
            </span>

            <span className="font-medium text-foreground">
              {measure ===
              "std"
                ? "Standard deviation"
                : "Interquartile range"}
            </span>

            <span className="hidden sm:inline">
              ·
            </span>

            <span className="font-medium text-foreground">
              6 climate dimensions
            </span>
          </div>
        </div>
      </div>


      {/* ==================================================== */}
      {/* CHART */}
      {/* ==================================================== */}

      <DimensionComparisonChart
        data={
          monthlyDimensions
        }
        panel={panel}
        measure={measure}
      />


      {/* ==================================================== */}
      {/* CURRENT TREND SUMMARY */}
      {/* ==================================================== */}

      <div className="overflow-hidden rounded-3xl border border-border bg-background">
        <div className="border-b border-border px-6 py-5 sm:px-8">
          <div>
            <p className="text-sm font-medium">
              Long-run trend estimates
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {
                getPanelLabel(
                  panel,
                )
              }
              {" · "}
              {measure ===
              "std"
                ? "Standard deviation"
                : "Interquartile range"}
            </p>
          </div>
        </div>


        {/* ================================================== */}
        {/* DESKTOP HEADER */}
        {/* ================================================== */}

        <div className="hidden grid-cols-[1.45fr_0.65fr_0.9fr_0.55fr] border-b border-border bg-muted/20 px-6 py-3 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground md:grid sm:px-8">
          <div>
            Dimension
          </div>

          <div className="text-right">
            Annual trend
          </div>

          <div className="text-right">
            95% interval
          </div>

          <div className="text-right">
            p-value
          </div>
        </div>


        {/* ================================================== */}
        {/* ROWS */}
        {/* ================================================== */}

        {CLIMATE_DIMENSIONS.map(
          (dimension) => {
            const trend =
              currentTrends.find(
                (record) =>
                  record.anchor ===
                  dimension.id,
              );


            const annualizedChange =
              trend
                ?.annualized_change ??
              trend
                ?.annualized_std_change ??
              null;


            const isPrimary =
              dimension.id ===
              "climate_impacts";


            return (
              <div
                key={
                  dimension.id
                }
                className={[
                  "grid gap-4 border-b border-border px-6 py-5 last:border-b-0 md:grid-cols-[1.45fr_0.65fr_0.9fr_0.55fr] md:items-center sm:px-8",
                  isPrimary
                    ? "bg-muted/25"
                    : "",
                ].join(
                  " ",
                )}
              >
                {/* Dimension */}

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">
                      {
                        dimension.label
                      }
                    </p>

                    {isPrimary && (
                      <span className="rounded-full bg-foreground px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-background">
                        Primary
                      </span>
                    )}
                  </div>
                </div>


                {/* Trend */}

                <div className="md:text-right">
                  <p className="text-xs text-muted-foreground md:hidden">
                    Annual trend
                  </p>

                  <p className="font-mono text-sm font-medium">
                    {formatSigned(
                      annualizedChange,
                    )}
                  </p>
                </div>


                {/* CI */}

                <div className="md:text-right">
                  <p className="text-xs text-muted-foreground md:hidden">
                    95% interval
                  </p>

                  <p className="font-mono text-sm">
                    {formatSigned(
                      trend
                        ?.ci_lower,
                    )}
                    {" to "}
                    {formatSigned(
                      trend
                        ?.ci_upper,
                    )}
                  </p>
                </div>


                {/* P */}

                <div className="md:text-right">
                  <p className="text-xs text-muted-foreground md:hidden">
                    p-value
                  </p>

                  <p className="font-mono text-sm">
                    {formatPValue(
                      trend
                        ?.p_value,
                    )}
                  </p>
                </div>
              </div>
            );
          },
        )}


        {/* ================================================== */}
        {/* EMPTY TREND WARNING */}
        {/* ================================================== */}

        {currentTrends.length ===
          0 && (
          <div className="border-t border-border bg-muted/20 px-6 py-4 sm:px-8">
            <p className="text-xs leading-5 text-muted-foreground">
              No precomputed trend
              estimates were found for
              this exact panel and
              measure combination. The
              monthly chart above remains
              available because it is
              calculated from the exported
              monthly dispersion data.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}