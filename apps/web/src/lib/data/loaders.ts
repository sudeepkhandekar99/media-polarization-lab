import "server-only";

import fs from "node:fs/promises";
import path from "node:path";

import type {
  ClimateDimensionTrend,
  ClimateImpactOutletDriver,
  ClimateImpactPeriodRecord,
  ClimateImpactRollingTrend,
  ClimateImpactStructuralBreak,
  DataManifest,
  HeadlineMetrics,
  Methodology,
  MonthlyDimensionRecord,
  MonthlyOverallRecord,
  OutletMonthProfile,
  OutletSummary,
  ResearchSummary,
} from "./types";


// ============================================================
// FILE MAP
// ============================================================

export const DATA_FILES = {
  manifest:
    "manifest.json",

  researchSummary:
    "research_summary.json",

  headlineMetrics:
    "headline_metrics.json",

  methodology:
    "methodology.json",

  monthlyDimensions:
    "monthly_dimensions.json",

  monthlyOverall:
    "monthly_overall.json",

  outletSummary:
    "outlet_summary.json",

  outletMonthProfiles:
    "outlet_month_profiles.json",

  climateImpactPeriods:
    "climate_impact_periods.json",

  climateImpactRollingTrends:
    "climate_impact_rolling_trends.json",

  climateImpactStructuralBreaks:
    "climate_impact_structural_breaks.json",

  climateDimensionTrends:
    "climate_dimension_trends.json",

  climateImpactOutletDrivers:
    "climate_impact_outlet_drivers.json",
} as const;


export type DataFileKey =
  keyof typeof DATA_FILES;


// ============================================================
// DATA DIRECTORY
// ============================================================

/**
 * Normally Next.js runs with:
 *
 * process.cwd() === apps/web
 *
 * so our preferred location is:
 *
 * apps/web/data/generated
 *
 * The second candidate makes this work if a monorepo command
 * happens to execute with process.cwd() at the repository root.
 */

let resolvedDataDirectory:
  | string
  | null = null;


async function getDataDirectory(): Promise<string> {
  if (resolvedDataDirectory) {
    return resolvedDataDirectory;
  }

  const candidates = [
    path.join(
      process.cwd(),
      "data",
      "generated",
    ),

    path.join(
      process.cwd(),
      "apps",
      "web",
      "data",
      "generated",
    ),
  ];


  for (const candidate of candidates) {
    try {
      const stats =
        await fs.stat(
          candidate,
        );

      if (stats.isDirectory()) {
        resolvedDataDirectory =
          candidate;

        return candidate;
      }
    } catch {
      // Try the next candidate.
    }
  }


  throw new Error(
    [
      "Could not find the generated webapp data directory.",
      "",
      "Checked:",
      ...candidates.map(
        (candidate) =>
          `  - ${candidate}`,
      ),
      "",
      "Expected project structure:",
      "",
      "apps/web/data/generated/",
      "",
      "Make sure the exported JSON files were copied there.",
    ].join("\n"),
  );
}


// ============================================================
// LOW-LEVEL JSON LOADER
// ============================================================

async function readJsonFile<T>(
  filename: string,
): Promise<T> {
  const dataDirectory =
    await getDataDirectory();

  const filePath =
    path.join(
      dataDirectory,
      filename,
    );


  let raw: string;


  try {
    raw = await fs.readFile(
      filePath,
      "utf8",
    );
  } catch (error) {
    throw new Error(
      [
        `Failed to read research data file: ${filename}`,
        "",
        `Path: ${filePath}`,
        "",
        `Reason: ${
          error instanceof Error
            ? error.message
            : String(error)
        }`,
      ].join("\n"),
    );
  }


  try {
    return JSON.parse(
      raw,
    ) as T;
  } catch (error) {
    throw new Error(
      [
        `Failed to parse JSON file: ${filename}`,
        "",
        `Path: ${filePath}`,
        "",
        `Reason: ${
          error instanceof Error
            ? error.message
            : String(error)
        }`,
      ].join("\n"),
    );
  }
}


// ============================================================
// GENERIC FILE LOADER
// ============================================================

export async function loadDataFile<T>(
  key: DataFileKey,
): Promise<T> {
  return readJsonFile<T>(
    DATA_FILES[key],
  );
}


// ============================================================
// MANIFEST
// ============================================================

export async function loadManifest(): Promise<DataManifest> {
  return loadDataFile<DataManifest>(
    "manifest",
  );
}


// ============================================================
// RESEARCH SUMMARY
// ============================================================

export async function loadResearchSummary(): Promise<ResearchSummary> {
  return loadDataFile<ResearchSummary>(
    "researchSummary",
  );
}


// ============================================================
// HEADLINE METRICS
// ============================================================

export async function loadHeadlineMetrics(): Promise<HeadlineMetrics> {
  return loadDataFile<HeadlineMetrics>(
    "headlineMetrics",
  );
}


// ============================================================
// METHODOLOGY
// ============================================================

export async function loadMethodology(): Promise<Methodology> {
  return loadDataFile<Methodology>(
    "methodology",
  );
}


// ============================================================
// MONTHLY DIMENSION DATA
// ============================================================

export async function loadMonthlyDimensions(): Promise<
  MonthlyDimensionRecord[]
> {
  return loadDataFile<
    MonthlyDimensionRecord[]
  >(
    "monthlyDimensions",
  );
}


// ============================================================
// OVERALL MONTHLY DISPERSION
// ============================================================

export async function loadMonthlyOverall(): Promise<
  MonthlyOverallRecord[]
> {
  return loadDataFile<
    MonthlyOverallRecord[]
  >(
    "monthlyOverall",
  );
}


// ============================================================
// OUTLET SUMMARY
// ============================================================

export async function loadOutletSummaries(): Promise<
  OutletSummary[]
> {
  return loadDataFile<
    OutletSummary[]
  >(
    "outletSummary",
  );
}


// ============================================================
// OUTLET-MONTH PROFILES
// ============================================================

/**
 * This is our largest webapp dataset.
 *
 * Do NOT include it in general homepage/dashboard loaders.
 * Load it only when outlet-level trajectories are required.
 */
export async function loadOutletMonthProfiles(): Promise<
  OutletMonthProfile[]
> {
  return loadDataFile<
    OutletMonthProfile[]
  >(
    "outletMonthProfiles",
  );
}


// ============================================================
// CLIMATE-IMPACT PERIODS
// ============================================================

export async function loadClimateImpactPeriods(): Promise<
  ClimateImpactPeriodRecord[]
> {
  return loadDataFile<
    ClimateImpactPeriodRecord[]
  >(
    "climateImpactPeriods",
  );
}


// ============================================================
// ROLLING CLIMATE-IMPACT TRENDS
// ============================================================

export async function loadClimateImpactRollingTrends(): Promise<
  ClimateImpactRollingTrend[]
> {
  return loadDataFile<
    ClimateImpactRollingTrend[]
  >(
    "climateImpactRollingTrends",
  );
}


// ============================================================
// STRUCTURAL BREAK RESULTS
// ============================================================

export async function loadClimateImpactStructuralBreaks(): Promise<
  ClimateImpactStructuralBreak[]
> {
  return loadDataFile<
    ClimateImpactStructuralBreak[]
  >(
    "climateImpactStructuralBreaks",
  );
}


// ============================================================
// DIMENSION TREND RESULTS
// ============================================================

export async function loadClimateDimensionTrends(): Promise<
  ClimateDimensionTrend[]
> {
  return loadDataFile<
    ClimateDimensionTrend[]
  >(
    "climateDimensionTrends",
  );
}


// ============================================================
// OUTLET DRIVER RESULTS
// ============================================================

export async function loadClimateImpactOutletDrivers(): Promise<
  ClimateImpactOutletDriver[]
> {
  return loadDataFile<
    ClimateImpactOutletDriver[]
  >(
    "climateImpactOutletDrivers",
  );
}


// ============================================================
// HOMEPAGE / MAIN DASHBOARD BUNDLE
// ============================================================

/**
 * Small-to-medium datasets required by the main research
 * experience.
 *
 * outlet_month_profiles.json is deliberately NOT loaded here.
 */
export async function loadDashboardData() {
  const [
    researchSummary,
    headlineMetrics,
    monthlyDimensions,
    monthlyOverall,
    climateImpactPeriods,
    climateImpactRollingTrends,
    climateImpactStructuralBreaks,
    climateDimensionTrends,
  ] = await Promise.all([
    loadResearchSummary(),
    loadHeadlineMetrics(),
    loadMonthlyDimensions(),
    loadMonthlyOverall(),
    loadClimateImpactPeriods(),
    loadClimateImpactRollingTrends(),
    loadClimateImpactStructuralBreaks(),
    loadClimateDimensionTrends(),
  ]);


  return {
    researchSummary,
    headlineMetrics,
    monthlyDimensions,
    monthlyOverall,
    climateImpactPeriods,
    climateImpactRollingTrends,
    climateImpactStructuralBreaks,
    climateDimensionTrends,
  };
}


// ============================================================
// OUTLET INDEX BUNDLE
// ============================================================

/**
 * Used by the /outlets listing page.
 *
 * No 4.5 MB monthly profile dataset is loaded here.
 */
export async function loadOutletIndexData() {
  const [
    outletSummaries,
    outletDrivers,
  ] = await Promise.all([
    loadOutletSummaries(),
    loadClimateImpactOutletDrivers(),
  ]);


  return {
    outletSummaries,
    outletDrivers,
  };
}


// ============================================================
// OUTLET DETAIL BUNDLE
// ============================================================

/**
 * Used only when an outlet detail page needs the full
 * month-by-month thematic profile.
 */
export async function loadOutletDetailData() {
  const [
    outletSummaries,
    outletMonthProfiles,
    outletDrivers,
  ] = await Promise.all([
    loadOutletSummaries(),
    loadOutletMonthProfiles(),
    loadClimateImpactOutletDrivers(),
  ]);


  return {
    outletSummaries,
    outletMonthProfiles,
    outletDrivers,
  };
}


// ============================================================
// COMPLETE RESEARCH BUNDLE
// ============================================================

/**
 * Useful for internal validation or development.
 *
 * Avoid using this on ordinary pages because this intentionally
 * loads every dataset, including outlet_month_profiles.json.
 */
export async function loadAllResearchData() {
  const [
    manifest,
    researchSummary,
    headlineMetrics,
    methodology,
    monthlyDimensions,
    monthlyOverall,
    outletSummaries,
    outletMonthProfiles,
    climateImpactPeriods,
    climateImpactRollingTrends,
    climateImpactStructuralBreaks,
    climateDimensionTrends,
    climateImpactOutletDrivers,
  ] = await Promise.all([
    loadManifest(),
    loadResearchSummary(),
    loadHeadlineMetrics(),
    loadMethodology(),
    loadMonthlyDimensions(),
    loadMonthlyOverall(),
    loadOutletSummaries(),
    loadOutletMonthProfiles(),
    loadClimateImpactPeriods(),
    loadClimateImpactRollingTrends(),
    loadClimateImpactStructuralBreaks(),
    loadClimateDimensionTrends(),
    loadClimateImpactOutletDrivers(),
  ]);


  return {
    manifest,
    researchSummary,
    headlineMetrics,
    methodology,
    monthlyDimensions,
    monthlyOverall,
    outletSummaries,
    outletMonthProfiles,
    climateImpactPeriods,
    climateImpactRollingTrends,
    climateImpactStructuralBreaks,
    climateDimensionTrends,
    climateImpactOutletDrivers,
  };
}


// ============================================================
// FILE VALIDATION
// ============================================================

export interface DataFileStatus {
  key: DataFileKey;

  filename: string;

  path: string;

  exists: boolean;

  sizeBytes:
    | number
    | null;
}


export async function validateDataFiles(): Promise<
  DataFileStatus[]
> {
  const dataDirectory =
    await getDataDirectory();

  const entries =
    Object.entries(
      DATA_FILES,
    ) as Array<
      [
        DataFileKey,
        string,
      ]
    >;


  return Promise.all(
    entries.map(
      async (
        [
          key,
          filename,
        ],
      ) => {
        const filePath =
          path.join(
            dataDirectory,
            filename,
          );


        try {
          const stats =
            await fs.stat(
              filePath,
            );

          return {
            key,
            filename,
            path: filePath,
            exists: true,
            sizeBytes:
              stats.size,
          };
        } catch {
          return {
            key,
            filename,
            path: filePath,
            exists: false,
            sizeBytes: null,
          };
        }
      },
    ),
  );
}


// ============================================================
// REQUIRED FILE ASSERTION
// ============================================================

export async function assertRequiredDataFiles(): Promise<void> {
  const statuses =
    await validateDataFiles();

  const missing =
    statuses.filter(
      (file) =>
        !file.exists,
    );


  if (
    missing.length === 0
  ) {
    return;
  }


  const missingFiles =
    missing
      .map(
        (file) =>
          `  - ${file.filename}`,
      )
      .join("\n");


  throw new Error(
    [
      "Required research data files are missing.",
      "",
      missingFiles,
      "",
      "Expected directory:",
      "",
      "  apps/web/data/generated/",
    ].join("\n"),
  );
}


// ============================================================
// DEBUG SUMMARY
// ============================================================

/**
 * Handy during Sprint 1:
 *
 * const files = await getDataFileSummary();
 * console.table(files);
 */
export async function getDataFileSummary() {
  const statuses =
    await validateDataFiles();


  return statuses.map(
    (status) => ({
      key:
        status.key,

      filename:
        status.filename,

      exists:
        status.exists,

      sizeKB:
        status.sizeBytes ===
        null
          ? null
          : Number(
              (
                status.sizeBytes /
                1024
              ).toFixed(
                1,
              ),
            ),

      sizeMB:
        status.sizeBytes ===
        null
          ? null
          : Number(
              (
                status.sizeBytes /
                1024 /
                1024
              ).toFixed(
                3,
              ),
            ),
    }),
  );
}