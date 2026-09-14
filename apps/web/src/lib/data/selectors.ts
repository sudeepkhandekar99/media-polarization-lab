import {
  DEFAULT_DIMENSION,
  DEFAULT_DISPERSION_MEASURE,
  DEFAULT_PANEL,
} from "./constants";

import type {
  ClimateDimension,
  ClimateDimensionTrend,
  ClimateImpactOutletDriver,
  ClimateImpactPeriodRecord,
  ClimateImpactRollingTrend,
  ClimateImpactStructuralBreak,
  DimensionQuery,
  DispersionMeasure,
  MonthlyDimensionPoint,
  MonthlyDimensionRecord,
  NormalizedOutletMonthProfile,
  OutletMonthProfile,
  OutletQuery,
  OutletSummary,
  Panel,
  StudyPeriod,
} from "./types";


// ============================================================
// INTERNAL HELPERS
// ============================================================

function normalizeMonth(
  value: string,
): string {
  return value.slice(
    0,
    7,
  );
}


function compareMonths(
  a: string,
  b: string,
): number {
  return normalizeMonth(
    a,
  ).localeCompare(
    normalizeMonth(
      b,
    ),
  );
}


function normalizeOutletName(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase();
}


function nullableNumber(
  value:
    | number
    | null
    | undefined,
): number | null {
  if (
    value === null ||
    value === undefined
  ) {
    return null;
  }

  if (
    !Number.isFinite(
      value,
    )
  ) {
    return null;
  }

  return value;
}


// ============================================================
// MONTHLY DIMENSION SERIES
// ============================================================

export function getMonthlyDimensionSeries(
  records:
    MonthlyDimensionRecord[],
  query: DimensionQuery = {},
): MonthlyDimensionPoint[] {
  const panel =
    query.panel ??
    DEFAULT_PANEL;

  const dimension =
    query.dimension ??
    DEFAULT_DIMENSION;

  const measure =
    query.measure ??
    DEFAULT_DISPERSION_MEASURE;

  const startMonth =
    query.startMonth
      ? normalizeMonth(
          query.startMonth,
        )
      : null;

  const endMonth =
    query.endMonth
      ? normalizeMonth(
          query.endMonth,
        )
      : null;


  return records
    .filter(
      (record) =>
        record.panel ===
          panel &&
        record.dimension ===
          dimension,
    )
    .map(
      (
        record,
      ): MonthlyDimensionPoint => {
        const month =
          normalizeMonth(
            record.month,
          );

        const std =
          nullableNumber(
            record.std,
          );

        const iqr =
          nullableNumber(
            record.iqr,
          );

        return {
          month,

          panel:
            record.panel,

          dimension:
            record.dimension,

          outlets:
            nullableNumber(
              record.outlets,
            ),

          std,

          iqr,

          value:
            measure ===
            "std"
              ? std
              : iqr,
        };
      },
    )
    .filter(
      (record) => {
        if (
          startMonth &&
          record.month <
            startMonth
        ) {
          return false;
        }

        if (
          endMonth &&
          record.month >
            endMonth
        ) {
          return false;
        }

        return true;
      },
    )
    .sort(
      (a, b) =>
        compareMonths(
          a.month,
          b.month,
        ),
    );
}


// ============================================================
// PRIMARY CLIMATE-IMPACT SERIES
// ============================================================

export function getPrimaryClimateImpactSeries(
  records:
    MonthlyDimensionRecord[],
): MonthlyDimensionPoint[] {
  return getMonthlyDimensionSeries(
    records,
    {
      panel:
        DEFAULT_PANEL,

      dimension:
        DEFAULT_DIMENSION,

      measure:
        DEFAULT_DISPERSION_MEASURE,
    },
  );
}


// ============================================================
// ALL DIMENSIONS FOR ONE MONTH
// ============================================================

export function getDimensionSnapshot(
  records:
    MonthlyDimensionRecord[],
  month: string,
  panel: Panel =
    DEFAULT_PANEL,
  measure: DispersionMeasure =
    DEFAULT_DISPERSION_MEASURE,
): MonthlyDimensionPoint[] {
  const targetMonth =
    normalizeMonth(
      month,
    );


  return records
    .filter(
      (record) =>
        record.panel ===
          panel &&
        normalizeMonth(
          record.month,
        ) ===
          targetMonth,
    )
    .map(
      (
        record,
      ): MonthlyDimensionPoint => {
        const std =
          nullableNumber(
            record.std,
          );

        const iqr =
          nullableNumber(
            record.iqr,
          );


        return {
          month:
            normalizeMonth(
              record.month,
            ),

          panel:
            record.panel,

          dimension:
            record.dimension,

          outlets:
            nullableNumber(
              record.outlets,
            ),

          std,

          iqr,

          value:
            measure ===
            "std"
              ? std
              : iqr,
        };
      },
    );
}


// ============================================================
// AVAILABLE MONTHS
// ============================================================

export function getAvailableMonths(
  records:
    MonthlyDimensionRecord[],
): string[] {
  const months =
    new Set<string>();


  for (
    const record
    of records
  ) {
    months.add(
      normalizeMonth(
        record.month,
      ),
    );
  }


  return Array.from(
    months,
  ).sort(
    compareMonths,
  );
}


// ============================================================
// FIRST / LATEST MONTH
// ============================================================

export function getFirstMonth(
  records:
    MonthlyDimensionRecord[],
): string | null {
  const months =
    getAvailableMonths(
      records,
    );


  return (
    months[0] ??
    null
  );
}


export function getLatestMonth(
  records:
    MonthlyDimensionRecord[],
): string | null {
  const months =
    getAvailableMonths(
      records,
    );


  return (
    months[
      months.length -
        1
    ] ??
    null
  );
}


// ============================================================
// OUTLET PROFILE NORMALIZATION
// ============================================================

/**
 * Research-side files intentionally keep the explicit
 * "relative_" prefix.
 *
 * UI components should use the shorter normalized names.
 */
export function normalizeOutletMonthProfile(
  record:
    OutletMonthProfile,
): NormalizedOutletMonthProfile {
  return {
    media_name:
      record.media_name,

    month:
      normalizeMonth(
        record.month,
      ),

    climate_science:
      nullableNumber(
        record
          .relative_climate_science,
      ),

    emissions_fossil_fuels:
      nullableNumber(
        record
          .relative_emissions_fossil_fuels,
      ),

    clean_energy_transition:
      nullableNumber(
        record
          .relative_clean_energy_transition,
      ),

    climate_policy:
      nullableNumber(
        record
          .relative_climate_policy,
      ),

    climate_impacts:
      nullableNumber(
        record
          .relative_climate_impacts,
      ),

    adaptation_resilience:
      nullableNumber(
        record
          .relative_adaptation_resilience,
      ),

    window_climate_articles:
      nullableNumber(
        record
          .window_climate_articles,
      ),

    current_month_climate_articles:
      nullableNumber(
        record
          .current_month_climate_articles,
      ),

    observed_months_in_window:
      nullableNumber(
        record
          .observed_months_in_window,
      ),

    centroid_concentration:
      nullableNumber(
        record
          .centroid_concentration,
      ),

    mean_climate_relevance:
      nullableNumber(
        record
          .mean_climate_relevance,
      ),

    median_climate_relevance:
      nullableNumber(
        record
          .median_climate_relevance,
      ),

    dominant_climate_anchor:
      record
        .dominant_climate_anchor ??
      null,
  };
}


// ============================================================
// ONE OUTLET'S FULL MONTHLY TRAJECTORY
// ============================================================

export function getOutletTrajectory(
  records:
    OutletMonthProfile[],
  outlet: string,
): NormalizedOutletMonthProfile[] {
  const target =
    normalizeOutletName(
      outlet,
    );


  return records
    .filter(
      (record) =>
        normalizeOutletName(
          record.media_name,
        ) ===
        target,
    )
    .map(
      normalizeOutletMonthProfile,
    )
    .sort(
      (a, b) =>
        compareMonths(
          a.month,
          b.month,
        ),
    );
}


// ============================================================
// SINGLE DIMENSION FOR ONE OUTLET
// ============================================================

export interface OutletDimensionPoint {
  month: string;
  value: number | null;
}


export function getOutletDimensionSeries(
  records:
    OutletMonthProfile[],
  outlet: string,
  dimension:
    ClimateDimension =
      DEFAULT_DIMENSION,
): OutletDimensionPoint[] {
  const trajectory =
    getOutletTrajectory(
      records,
      outlet,
    );


  return trajectory.map(
    (record) => ({
      month:
        record.month,

      value:
        record[
          dimension
        ],
    }),
  );
}


// ============================================================
// OUTLET LIST FILTERING
// ============================================================

export function getOutlets(
  records:
    OutletSummary[],
  query: OutletQuery = {},
): OutletSummary[] {
  const search =
    query.search
      ?.trim()
      .toLowerCase() ??
    "";

  const minimumCoverage =
    query
      .minimumCoveragePct ??
    0;


  return records
    .filter(
      (outlet) => {
        if (
          search &&
          !outlet
            .media_name
            .toLowerCase()
            .includes(
              search,
            )
        ) {
          return false;
        }


        if (
          query.stableOnly &&
          !outlet.stable_90
        ) {
          return false;
        }


        if (
          query
            .fullyBalancedOnly &&
          !outlet
            .fully_balanced
        ) {
          return false;
        }


        if (
          outlet.coverage_pct <
          minimumCoverage
        ) {
          return false;
        }


        return true;
      },
    )
    .sort(
      (a, b) => {
        if (
          a.coverage_pct !==
          b.coverage_pct
        ) {
          return (
            b.coverage_pct -
            a.coverage_pct
          );
        }


        return a.media_name.localeCompare(
          b.media_name,
        );
      },
    );
}


// ============================================================
// GET ONE OUTLET
// ============================================================

export function getOutletSummaryByName(
  records:
    OutletSummary[],
  outlet: string,
): OutletSummary | null {
  const target =
    normalizeOutletName(
      outlet,
    );


  return (
    records.find(
      (record) =>
        normalizeOutletName(
          record.media_name,
        ) ===
        target,
    ) ??
    null
  );
}


// ============================================================
// STABLE OUTLETS
// ============================================================

export function getStableOutlets(
  records:
    OutletSummary[],
): OutletSummary[] {
  return records
    .filter(
      (outlet) =>
        outlet.stable_90,
    )
    .sort(
      (a, b) =>
        a.media_name.localeCompare(
          b.media_name,
        ),
    );
}


// ============================================================
// FULLY BALANCED OUTLETS
// ============================================================

export function getFullyBalancedOutlets(
  records:
    OutletSummary[],
): OutletSummary[] {
  return records
    .filter(
      (outlet) =>
        outlet
          .fully_balanced,
    )
    .sort(
      (a, b) =>
        a.media_name.localeCompare(
          b.media_name,
        ),
    );
}


// ============================================================
// TOP CLIMATE-IMPACT OUTLET TRENDS
// ============================================================

export function getTopClimateImpactRisers(
  records:
    OutletSummary[],
  limit = 10,
): OutletSummary[] {
  return records
    .filter(
      (record) =>
        record.stable_90 &&
        typeof record
          .impact_annualized_change ===
          "number",
    )
    .sort(
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
    )
    .slice(
      0,
      limit,
    );
}


// ============================================================
// SMALLEST CLIMATE-IMPACT OUTLET TRENDS
// ============================================================

export function getLowestClimateImpactTrends(
  records:
    OutletSummary[],
  limit = 10,
): OutletSummary[] {
  return records
    .filter(
      (record) =>
        record.stable_90 &&
        typeof record
          .impact_annualized_change ===
          "number",
    )
    .sort(
      (a, b) =>
        (
          a
            .impact_annualized_change ??
          Infinity
        ) -
        (
          b
            .impact_annualized_change ??
          Infinity
        ),
    )
    .slice(
      0,
      limit,
    );
}


// ============================================================
// SIGNIFICANT OUTLET TREND COUNTS
// ============================================================

export interface OutletTrendCounts {
  total: number;

  significantPositive:
    number;

  significantNegative:
    number;

  notSignificant:
    number;
}


export function getOutletTrendCounts(
  records:
    OutletSummary[],
): OutletTrendCounts {
  const stable =
    records.filter(
      (record) =>
        record.stable_90 &&
        typeof record
          .impact_ci_lower ===
          "number" &&
        typeof record
          .impact_ci_upper ===
          "number",
    );


  const significantPositive =
    stable.filter(
      (record) =>
        (
          record
            .impact_ci_lower ??
          -Infinity
        ) > 0,
    ).length;


  const significantNegative =
    stable.filter(
      (record) =>
        (
          record
            .impact_ci_upper ??
          Infinity
        ) < 0,
    ).length;


  return {
    total:
      stable.length,

    significantPositive,

    significantNegative,

    notSignificant:
      stable.length -
      significantPositive -
      significantNegative,
  };
}


// ============================================================
// EARLY / MIDDLE / LATE PERIODS
// ============================================================

export function getClimateImpactPeriods(
  records:
    ClimateImpactPeriodRecord[],
  panel: Panel =
    DEFAULT_PANEL,
): ClimateImpactPeriodRecord[] {
  const order: Record<
    StudyPeriod,
    number
  > = {
    early: 0,
    middle: 1,
    late: 2,
  };


  return records
    .filter(
      (record) =>
        record.panel ===
        panel,
    )
    .sort(
      (a, b) =>
        order[
          a.period
        ] -
        order[
          b.period
        ],
    );
}


// ============================================================
// ONE PERIOD
// ============================================================

export function getClimateImpactPeriod(
  records:
    ClimateImpactPeriodRecord[],
  period: StudyPeriod,
  panel: Panel =
    DEFAULT_PANEL,
): ClimateImpactPeriodRecord | null {
  return (
    records.find(
      (record) =>
        record.panel ===
          panel &&
        record.period ===
          period,
    ) ??
    null
  );
}


// ============================================================
// ROLLING TREND SERIES
// ============================================================

export function getRollingTrends(
  records:
    ClimateImpactRollingTrend[],
  panel: Panel =
    DEFAULT_PANEL,
): ClimateImpactRollingTrend[] {
  return records
    .filter(
      (record) =>
        record.panel ===
        panel,
    )
    .sort(
      (a, b) =>
        compareMonths(
          a.window_end,
          b.window_end,
        ),
    );
}


// ============================================================
// LATEST ROLLING TREND
// ============================================================

export function getLatestRollingTrend(
  records:
    ClimateImpactRollingTrend[],
  panel: Panel =
    DEFAULT_PANEL,
): ClimateImpactRollingTrend | null {
  const series =
    getRollingTrends(
      records,
      panel,
    );


  return (
    series[
      series.length -
        1
    ] ??
    null
  );
}


// ============================================================
// STRUCTURAL BREAK
// ============================================================

export function getStructuralBreak(
  records:
    ClimateImpactStructuralBreak[],
  panel: Panel =
    DEFAULT_PANEL,
): ClimateImpactStructuralBreak | null {
  return (
    records.find(
      (record) =>
        record.panel ===
        panel,
    ) ??
    null
  );
}


// ============================================================
// STRUCTURAL BREAK INTERPRETATION
// ============================================================

export function isStructuralBreakSupported(
  record:
    | ClimateImpactStructuralBreak
    | null,
  alpha = 0.05,
): boolean {
  if (
    !record ||
    typeof record
      .bootstrap_p_value !==
      "number"
  ) {
    return false;
  }


  return (
    record
      .bootstrap_p_value <
    alpha
  );
}


// ============================================================
// DIMENSION TREND RESULTS
// ============================================================

export function getDimensionTrends(
  records:
    ClimateDimensionTrend[],
  panel: Panel =
    DEFAULT_PANEL,
  measure: DispersionMeasure =
    DEFAULT_DISPERSION_MEASURE,
): ClimateDimensionTrend[] {
  return records.filter(
    (record) => {
      if (
        record.panel !==
        panel
      ) {
        return false;
      }


      if (
        record
          .dispersion_measure &&
        record
          .dispersion_measure !==
          measure
      ) {
        return false;
      }


      return true;
    },
  );
}


// ============================================================
// ONE DIMENSION TREND
// ============================================================

export function getDimensionTrend(
  records:
    ClimateDimensionTrend[],
  dimension:
    ClimateDimension,
  panel: Panel =
    DEFAULT_PANEL,
  measure: DispersionMeasure =
    DEFAULT_DISPERSION_MEASURE,
): ClimateDimensionTrend | null {
  const trends =
    getDimensionTrends(
      records,
      panel,
      measure,
    );


  return (
    trends.find(
      (record) =>
        record.anchor ===
        dimension,
    ) ??
    null
  );
}


// ============================================================
// OUTLET DRIVER LOOKUP
// ============================================================

export function getOutletDriver(
  records:
    ClimateImpactOutletDriver[],
  outlet: string,
): ClimateImpactOutletDriver | null {
  const target =
    normalizeOutletName(
      outlet,
    );


  return (
    records.find(
      (record) =>
        normalizeOutletName(
          record.media_name,
        ) ===
        target,
    ) ??
    null
  );
}


// ============================================================
// TOP OUTLET DRIVERS
// ============================================================

export function getTopOutletDrivers(
  records:
    ClimateImpactOutletDriver[],
  limit = 10,
): ClimateImpactOutletDriver[] {
  return [...records]
    .filter(
      (record) =>
        typeof record
          .annualized_change ===
        "number",
    )
    .sort(
      (a, b) =>
        (
          b
            .annualized_change ??
          -Infinity
        ) -
        (
          a
            .annualized_change ??
          -Infinity
        ),
    )
    .slice(
      0,
      limit,
    );
}


// ============================================================
// TIME-SERIES CHANGE HELPER
// ============================================================

export interface SeriesChange {
  firstValue:
    number | null;

  lastValue:
    number | null;

  absoluteChange:
    number | null;

  percentChange:
    number | null;
}


export function calculateSeriesChange(
  series:
    MonthlyDimensionPoint[],
): SeriesChange {
  const valid =
    series.filter(
      (
        point,
      ): point is MonthlyDimensionPoint & {
        value: number;
      } =>
        typeof point.value ===
        "number" &&
        Number.isFinite(
          point.value,
        ),
    );


  if (
    valid.length === 0
  ) {
    return {
      firstValue: null,

      lastValue: null,

      absoluteChange: null,

      percentChange: null,
    };
  }


  const firstValue =
    valid[0].value;

  const lastValue =
    valid[
      valid.length - 1
    ].value;

  const absoluteChange =
    lastValue -
    firstValue;

  const percentChange =
    firstValue !== 0
      ? (
          absoluteChange /
          firstValue
        ) * 100
      : null;


  return {
    firstValue,

    lastValue,

    absoluteChange,

    percentChange,
  };
}