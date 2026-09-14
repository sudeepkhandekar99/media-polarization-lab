// apps/web/src/components/charts/dimension-comparison-chart.tsx

"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  CLIMATE_DIMENSIONS,
  DEFAULT_DISPERSION_MEASURE,
  DEFAULT_PANEL,
  getPanelLabel,
} from "@/lib/data/constants";

import type {
  ClimateDimension,
  DispersionMeasure,
  MonthlyDimensionRecord,
  Panel,
} from "@/lib/data/types";


// ============================================================
// PROPS
// ============================================================

interface DimensionComparisonChartProps {
  data: MonthlyDimensionRecord[];

  panel?: Panel;

  measure?: DispersionMeasure;
}


// ============================================================
// INTERNAL TYPES
// ============================================================

type ChartRow = {
  month: string;
} & Partial<
  Record<
    ClimateDimension,
    number | null
  >
>;


interface TooltipPayloadItem {
  dataKey?: string;

  value?: number;

  color?: string;
}


// ============================================================
// DIMENSION VISUAL CONFIG
// ============================================================

const DIMENSION_STYLES: Record<
  ClimateDimension,
  {
    stroke: string;
    dash?: string;
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

function normalizeMonth(
  month: string,
) {
  return month.slice(
    0,
    7,
  );
}


function formatYear(
  month: string,
) {
  return month.slice(
    0,
    4,
  );
}


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
// BUILD CHART DATA
// ============================================================

function buildChartData(
  records: MonthlyDimensionRecord[],
  panel: Panel,
  measure: DispersionMeasure,
): ChartRow[] {
  const monthMap =
    new Map<
      string,
      ChartRow
    >();


  for (
    const record
    of records
  ) {
    if (
      record.panel !==
      panel
    ) {
      continue;
    }


    const month =
      normalizeMonth(
        record.month,
      );


    const existing =
      monthMap.get(
        month,
      ) ?? {
        month,
      };


    existing[
      record.dimension
    ] =
      measure === "std"
        ? record.std
        : record.iqr;


    monthMap.set(
      month,
      existing,
    );
  }


  return Array.from(
    monthMap.values(),
  ).sort(
    (a, b) =>
      a.month.localeCompare(
        b.month,
      ),
  );
}


// ============================================================
// CUSTOM TOOLTIP
// ============================================================

interface CustomTooltipProps {
  active?: boolean;

  payload?:
    TooltipPayloadItem[];

  label?: string;
}


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
    <div className="min-w-[250px] rounded-xl border border-border bg-background/95 p-4 shadow-xl backdrop-blur">
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


            if (
              !dimension
            ) {
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

export function DimensionComparisonChart({
  data,
  panel =
    DEFAULT_PANEL,
  measure =
    DEFAULT_DISPERSION_MEASURE,
}: DimensionComparisonChartProps) {
  const chartData =
    buildChartData(
      data,
      panel,
      measure,
    );


  // ----------------------------------------------------------
  // EMPTY STATE
  // ----------------------------------------------------------

  if (
    chartData.length === 0
  ) {
    return (
      <div className="flex min-h-[460px] items-center justify-center rounded-3xl border border-dashed border-border">
        <p className="text-sm text-muted-foreground">
          No dimension data available.
        </p>
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
  // Y DOMAIN
  // ----------------------------------------------------------

  const allValues: number[] =
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
        allValues.push(
          value,
        );
      }
    }
  }


  const minValue =
    Math.min(
      ...allValues,
    );


  const maxValue =
    Math.max(
      ...allValues,
    );


  const spread =
    maxValue -
    minValue;


  const padding =
    spread > 0
      ? spread * 0.1
      : 0.01;


  const yDomain: [
    number,
    number,
  ] = [
    Math.max(
      0,
      minValue -
        padding,
    ),

    maxValue +
      padding,
  ];


  // ----------------------------------------------------------
  // DISPLAY LABELS
  // ----------------------------------------------------------

  const panelLabel =
    getPanelLabel(
      panel,
    );


  const measureLabel =
    measure === "std"
      ? "cross-outlet standard deviation"
      : "interquartile range";


  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-background">
      {/* ==================================================== */}
      {/* HEADER */}
      {/* ==================================================== */}

      <div className="border-b border-border px-6 py-6 sm:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">
              Climate dimension divergence
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {panelLabel}
              {" · "}
              {measureLabel}
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

      <div className="h-[500px] w-full px-2 pb-5 pt-7 sm:px-5">
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
              left: 0,
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
              width={56}
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


            {CLIMATE_DIMENSIONS.map(
              (dimension) => {
                const style =
                  DIMENSION_STYLES[
                    dimension.id
                  ];


                const isPrimary =
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
                      isPrimary
                        ? 2.75
                        : 1.6
                    }
                    strokeDasharray={
                      style.dash
                    }
                    strokeOpacity={
                      isPrimary
                        ? 1
                        : 0.72
                    }
                    dot={
                      false
                    }
                    activeDot={{
                      r:
                        isPrimary
                          ? 4
                          : 3,

                      strokeWidth:
                        2,

                      fill:
                        style.stroke,

                      stroke:
                        "var(--background)",
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
      {/* INTERPRETATION */}
      {/* ==================================================== */}

      <div className="grid gap-5 border-t border-border px-6 py-5 text-xs leading-5 text-muted-foreground sm:px-8 md:grid-cols-2">
        <p>
          Each line measures the
          cross-outlet dispersion of one
          climate theme. Higher values
          indicate greater differences
          between outlets in relative
          thematic emphasis.
        </p>

        <p>
          Climate impacts are emphasized
          because this dimension shows the
          strongest and most robust
          long-run increase in the primary
          stable-outlet analysis.
        </p>
      </div>
    </div>
  );
}