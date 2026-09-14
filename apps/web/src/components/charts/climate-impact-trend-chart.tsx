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

import type {
  MonthlyDimensionPoint,
} from "@/lib/data/types";


// ============================================================
// PROPS
// ============================================================

interface ClimateImpactTrendChartProps {
  data: MonthlyDimensionPoint[];

  candidateBreakMonth?:
    | string
    | null;
}


// ============================================================
// CHART DATA
// ============================================================

interface ChartPoint {
  month: string;
  value: number | null;
  outlets: number | null;
}


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


function formatValue(
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

  return value.toFixed(
    3,
  );
}


// ============================================================
// TOOLTIP
// ============================================================

interface TooltipPayloadItem {
  value?: number;
  payload?: ChartPoint;
}


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
    payload.length === 0
  ) {
    return null;
  }


  const point =
    payload[0].payload;


  if (!point) {
    return null;
  }


  return (
    <div className="min-w-[190px] rounded-xl border border-border bg-background/95 p-4 shadow-lg backdrop-blur">
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {label
          ? formatMonth(
              label,
            )
          : "Month"}
      </p>

      <div className="mt-3 flex items-end justify-between gap-6">
        <div>
          <p className="text-xs text-muted-foreground">
            Dispersion
          </p>

          <p className="mt-1 font-mono text-lg font-semibold text-foreground">
            {formatValue(
              point.value,
            )}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-muted-foreground">
            Outlets
          </p>

          <p className="mt-1 font-mono text-sm font-medium text-foreground">
            {point.outlets ??
              "—"}
          </p>
        </div>
      </div>
    </div>
  );
}


// ============================================================
// COMPONENT
// ============================================================

export function ClimateImpactTrendChart({
  data,
  candidateBreakMonth,
}: ClimateImpactTrendChartProps) {
  const chartData: ChartPoint[] =
    data.map(
      (point) => ({
        month:
          point.month,

        value:
          point.value,

        outlets:
          point.outlets,
      }),
    );


  // ----------------------------------------------------------
  // EMPTY STATE
  // ----------------------------------------------------------

  if (
    chartData.length === 0
  ) {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-dashed border-border bg-muted/20">
        <p className="text-sm text-muted-foreground">
          No trend data available.
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
          if (index === 0) {
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

  const values =
    chartData
      .map(
        (point) =>
          point.value,
      )
      .filter(
        (
          value,
        ): value is number =>
          typeof value ===
            "number" &&
          Number.isFinite(
            value,
          ),
      );


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
      ? spread * 0.12
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


  return (
    <div className="rounded-3xl border border-border bg-background">
      {/* ==================================================== */}
      {/* CHART HEADER */}
      {/* ==================================================== */}

      <div className="flex flex-col gap-5 border-b border-border px-6 py-6 sm:flex-row sm:items-start sm:justify-between sm:px-8">
        <div>
          <p className="text-sm font-medium text-foreground">
            Climate-impact framing
            dispersion
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Stable 90% outlet cohort ·
            cross-outlet standard
            deviation
          </p>
        </div>


        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="h-[2px] w-5 bg-foreground" />

            Monthly dispersion
          </div>

          {candidateBreakMonth && (
            <div className="flex items-center gap-2">
              <span className="h-4 border-l border-dashed border-muted-foreground" />

              Candidate break
            </div>
          )}
        </div>
      </div>


      {/* ==================================================== */}
      {/* CHART */}
      {/* ==================================================== */}

      <div className="h-[430px] w-full px-2 pb-4 pt-6 sm:px-5">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={
              chartData
            }
            margin={{
              top: 10,
              right: 18,
              bottom: 4,
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
              tick={{
                fill:
                  "var(--muted-foreground)",
                fontSize: 11,
              }}
              minTickGap={
                20
              }
              dy={10}
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
                strokeWidth: 1,
                strokeDasharray:
                  "3 4",
              }}
            />


            {candidateBreakMonth && (
              <ReferenceLine
                x={
                  candidateBreakMonth
                }
                stroke="var(--muted-foreground)"
                strokeDasharray="5 5"
                strokeWidth={1}
              />
            )}


            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--foreground)"
              strokeWidth={2.25}
              dot={false}
              activeDot={{
                r: 4,
                fill:
                  "var(--foreground)",
                stroke:
                  "var(--background)",
                strokeWidth: 2,
              }}
              connectNulls={
                false
              }
              isAnimationActive={
                true
              }
              animationDuration={
                900
              }
            />
          </LineChart>
        </ResponsiveContainer>
      </div>


      {/* ==================================================== */}
      {/* FOOTNOTE */}
      {/* ==================================================== */}

      <div className="border-t border-border px-6 py-4 sm:px-8">
        <p className="max-w-3xl text-xs leading-5 text-muted-foreground">
          Higher values indicate greater
          cross-outlet differences in
          relative climate-impact
          emphasis. The vertical marker,
          when shown, identifies the
          data-selected structural-break
          candidate rather than a
          statistically confirmed regime
          change.
        </p>
      </div>
    </div>
  );
}