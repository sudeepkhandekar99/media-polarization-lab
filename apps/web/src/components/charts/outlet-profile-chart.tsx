"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  CLIMATE_DIMENSIONS,
} from "@/lib/data/constants";

import type {
  ClimateDimension,
  NormalizedOutletMonthProfile,
} from "@/lib/data/types";


// ============================================================
// PROPS
// ============================================================

interface OutletProfileChartProps {
  data:
    NormalizedOutletMonthProfile[];

  outletName:
    string;
}


// ============================================================
// INTERNAL TYPES
// ============================================================

type ChartRow = {
  month: string;

  climate_science:
    number | null;

  emissions_fossil_fuels:
    number | null;

  clean_energy_transition:
    number | null;

  climate_policy:
    number | null;

  climate_impacts:
    number | null;

  adaptation_resilience:
    number | null;
};


interface TooltipPayloadItem {
  dataKey?: string;

  value?: number;

  color?: string;
}


interface CustomTooltipProps {
  active?: boolean;

  payload?:
    TooltipPayloadItem[];

  label?: string;
}


// ============================================================
// DIMENSION VISUALS
// ============================================================

const DIMENSION_STYLES: Record<
  ClimateDimension,
  {
    stroke: string;
  }
> = {
  climate_science: {
    stroke: "#64748b",
  },

  emissions_fossil_fuels: {
    stroke: "#b45309",
  },

  clean_energy_transition: {
    stroke: "#15803d",
  },

  climate_policy: {
    stroke: "#7c3aed",
  },

  climate_impacts: {
    stroke: "#dc2626",
  },

  adaptation_resilience: {
    stroke: "#0369a1",
  },
};


// ============================================================
// HELPERS
// ============================================================

function formatMonth(
  month: string,
) {
  const [
    year,
    monthNumber,
  ] = month.split("-");

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


function formatYear(
  month: string,
) {
  return month.slice(
    0,
    4,
  );
}


function getDimensionLabel(
  dimension: string,
) {
  return (
    CLIMATE_DIMENSIONS.find(
      (item) =>
        item.id ===
        dimension,
    )?.label ??
    dimension
  );
}


// ============================================================
// TOOLTIP
// ============================================================

function CustomTooltip({
  active,
  payload,
  label,
}: CustomTooltipProps) {
  if (
    !active ||
    !payload ||
    payload.length === 0 ||
    !label
  ) {
    return null;
  }


  const visiblePayload =
    payload
      .filter(
        (item) =>
          typeof item.value ===
          "number",
      )
      .sort(
        (a, b) =>
          (
            b.value ??
            -Infinity
          ) -
          (
            a.value ??
            -Infinity
          ),
      );


  return (
    <div className="min-w-[260px] rounded-xl border border-border bg-background/95 p-4 shadow-xl backdrop-blur">
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {formatMonth(
          label,
        )}
      </p>


      <div className="mt-4 space-y-2.5">
        {visiblePayload.map(
          (item) => {
            const dimension =
              item.dataKey as
                | ClimateDimension
                | undefined;


            if (!dimension) {
              return null;
            }


            return (
              <div
                key={
                  dimension
                }
                className="flex items-center justify-between gap-6"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor:
                        item.color,
                    }}
                  />

                  <span className="text-xs text-muted-foreground">
                    {getDimensionLabel(
                      dimension,
                    )}
                  </span>
                </div>


                <span className="font-mono text-xs font-medium text-foreground">
                  {item.value?.toFixed(
                    3,
                  )}
                </span>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}


// ============================================================
// COMPONENT
// ============================================================

export function OutletProfileChart({
  data,
  outletName,
}: OutletProfileChartProps) {
  const chartData: ChartRow[] =
    data.map(
      (record) => ({
        month:
          record.month,

        climate_science:
          record.climate_science,

        emissions_fossil_fuels:
          record.emissions_fossil_fuels,

        clean_energy_transition:
          record.clean_energy_transition,

        climate_policy:
          record.climate_policy,

        climate_impacts:
          record.climate_impacts,

        adaptation_resilience:
          record.adaptation_resilience,
      }),
    );


  // ----------------------------------------------------------
  // EMPTY STATE
  // ----------------------------------------------------------

  if (
    chartData.length === 0
  ) {
    return (
      <div className="flex min-h-[480px] items-center justify-center rounded-3xl border border-dashed border-border">
        <div className="max-w-sm px-6 text-center">
          <p className="font-medium">
            No monthly profile available
          </p>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            We could not find outlet-month
            observations for {outletName}.
          </p>
        </div>
      </div>
    );
  }


  // ----------------------------------------------------------
  // YEAR TICKS
  // ----------------------------------------------------------

  const yearTicks =
    chartData
      .filter(
        (
          point,
          index,
        ) => {
          if (
            index === 0
          ) {
            return true;
          }


          const previous =
            chartData[
              index - 1
            ];


          return (
            formatYear(
              point.month,
            ) !==
            formatYear(
              previous.month,
            )
          );
        },
      )
      .map(
        (point) =>
          point.month,
      );


  // ----------------------------------------------------------
  // FIND Y DOMAIN
  //
  // Relative dimension scores can be negative, so unlike the
  // cross-outlet dispersion chart we must NOT force the axis
  // to start at zero.
  // ----------------------------------------------------------

  const values: number[] =
    [];


  for (
    const row
    of chartData
  ) {
    for (
      const dimension
      of CLIMATE_DIMENSIONS
    ) {
      const value =
        row[
          dimension.id
        ];


      if (
        typeof value ===
          "number" &&
        Number.isFinite(
          value,
        )
      ) {
        values.push(
          value,
        );
      }
    }
  }


  const minValue =
    Math.min(
      ...values,
    );

  const maxValue =
    Math.max(
      ...values,
    );

  const spread =
    maxValue -
    minValue;

  const padding =
    spread > 0
      ? spread * 0.1
      : 0.02;


  const yDomain: [
    number,
    number,
  ] = [
    minValue -
      padding,

    maxValue +
      padding,
  ];


  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-background">
      {/* ==================================================== */}
      {/* HEADER */}
      {/* ==================================================== */}

      <div className="border-b border-border px-6 py-6 sm:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">
              Monthly thematic profile
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {outletName} · relative
              climate-theme emphasis
            </p>
          </div>


          <div className="flex max-w-3xl flex-wrap gap-x-5 gap-y-3">
            {CLIMATE_DIMENSIONS.map(
              (dimension) => (
                <div
                  key={
                    dimension.id
                  }
                  className="flex items-center gap-2"
                >
                  <span
                    className="h-[2px] w-5"
                    style={{
                      backgroundColor:
                        DIMENSION_STYLES[
                          dimension.id
                        ].stroke,
                    }}
                  />

                  <span className="text-xs text-muted-foreground">
                    {
                      dimension.shortLabel
                    }
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>


      {/* ==================================================== */}
      {/* CHART */}
      {/* ==================================================== */}

      <div className="h-[520px] w-full px-2 pb-5 pt-7 sm:px-5">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={
              chartData
            }
            margin={{
              top: 8,
              right: 20,
              bottom: 6,
              left: 2,
            }}
          >
            <CartesianGrid
              vertical={
                false
              }
              stroke="var(--border)"
              strokeDasharray="3 5"
            />


            <XAxis
              dataKey="month"
              ticks={
                yearTicks
              }
              tickFormatter={
                formatYear
              }
              axisLine={
                false
              }
              tickLine={
                false
              }
              dy={10}
              minTickGap={
                20
              }
              tick={{
                fill:
                  "var(--muted-foreground)",
                fontSize: 11,
              }}
            />


            <YAxis
              domain={
                yDomain
              }
              axisLine={
                false
              }
              tickLine={
                false
              }
              width={58}
              tickFormatter={(
                value: number,
              ) =>
                value.toFixed(
                  2,
                )
              }
              tick={{
                fill:
                  "var(--muted-foreground)",
                fontSize: 11,
              }}
            />


            <Tooltip
              content={
                <CustomTooltip />
              }
              cursor={{
                stroke:
                  "var(--muted-foreground)",
                strokeDasharray:
                  "3 4",
                strokeWidth: 1,
              }}
            />


            {/* ---------------------------------------------- */}
            {/* ZERO BASELINE */}
            {/* ---------------------------------------------- */}

            <ReferenceLine
              y={0}
              stroke="var(--muted-foreground)"
              strokeOpacity={0.55}
              strokeDasharray="4 4"
            />


            {/* ---------------------------------------------- */}
            {/* DIMENSION LINES */}
            {/* ---------------------------------------------- */}

            {CLIMATE_DIMENSIONS.map(
              (dimension) => {
                const style =
                  DIMENSION_STYLES[
                    dimension.id
                  ];


                const isImpact =
                  dimension.id ===
                  "climate_impacts";


                return (
                  <Line
                    key={
                      dimension.id
                    }
                    type="monotone"
                    dataKey={
                      dimension.id
                    }
                    name={
                      dimension.label
                    }
                    stroke={
                      style.stroke
                    }
                    strokeWidth={
                      isImpact
                        ? 2.8
                        : 1.6
                    }
                    strokeOpacity={
                      isImpact
                        ? 1
                        : 0.72
                    }
                    dot={
                      false
                    }
                    activeDot={{
                      r:
                        isImpact
                          ? 4
                          : 3,

                      fill:
                        style.stroke,

                      stroke:
                        "var(--background)",

                      strokeWidth:
                        2,
                    }}
                    connectNulls={
                      false
                    }
                    isAnimationActive={
                      true
                    }
                    animationDuration={
                      850
                    }
                  />
                );
              },
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>


      {/* ==================================================== */}
      {/* FOOTNOTE */}
      {/* ==================================================== */}

      <div className="grid gap-4 border-t border-border px-6 py-5 text-xs leading-5 text-muted-foreground sm:px-8 md:grid-cols-2">
        <p>
          Scores are relative within each
          outlet-month. Values above zero
          indicate greater emphasis than
          that outlet-month&apos;s average
          across the six climate
          dimensions.
        </p>

        <p>
          Climate impacts are visually
          emphasized because this is the
          dimension used in the primary
          outlet-level trajectory
          analysis.
        </p>
      </div>
    </div>
  );
}