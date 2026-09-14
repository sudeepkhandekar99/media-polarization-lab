import type {
  ClimateDimension,
  ClimateDimensionMetadata,
  DispersionMeasure,
  Panel,
  StudyPeriod,
} from "./types";


// ============================================================
// PRIMARY RESEARCH SPECIFICATION
// ============================================================

/**
 * These reflect the final primary specification from the
 * completed research pipeline.
 */
export const PRIMARY_PANEL: Panel = "stable_90";

export const PRIMARY_DIMENSION: ClimateDimension =
  "climate_impacts";

export const PRIMARY_DISPERSION_MEASURE: DispersionMeasure =
  "std";


// ============================================================
// STUDY PERIOD
// ============================================================

/**
 * Final complete-month application dataset.
 *
 * 116 complete months:
 * June 2016 → January 2026
 */
export const STUDY_START_MONTH = "2016-06";

export const STUDY_END_MONTH = "2026-01";

export const STUDY_MONTHS = 116;


// ============================================================
// STUDY PERIOD SEGMENTS
// ============================================================

export interface StudyPeriodDefinition {
  id: StudyPeriod;
  label: string;
  startMonth: string;
  endMonth: string;
  months: number;
}

export const STUDY_PERIODS: StudyPeriodDefinition[] = [
  {
    id: "early",
    label: "Early",
    startMonth: "2016-06",
    endMonth: "2019-08",
    months: 39,
  },
  {
    id: "middle",
    label: "Middle",
    startMonth: "2019-09",
    endMonth: "2022-11",
    months: 39,
  },
  {
    id: "late",
    label: "Late",
    startMonth: "2022-12",
    endMonth: "2026-01",
    months: 38,
  },
];


// ============================================================
// PANEL DEFINITIONS
// ============================================================

export interface PanelMetadata {
  id: Panel;
  label: string;
  shortLabel: string;
  description: string;
}

export const PANELS: PanelMetadata[] = [
  {
    id: "dynamic_panel",
    label: "Dynamic Outlet Panel",
    shortLabel: "Dynamic",
    description:
      "Uses every qualifying outlet available in each month. The set of outlets can change over time.",
  },

  {
    id: "stable_90",
    label: "Stable 90% Outlet Cohort",
    shortLabel: "Stable 90%",
    description:
      "Restricts the analysis to outlets observed in at least 90% of study months. This is the primary specification.",
  },

  {
    id: "fully_balanced",
    label: "Fully Balanced Outlet Panel",
    shortLabel: "Balanced",
    description:
      "Uses only outlets observed in every study month, providing the strictest panel-composition control.",
  },
];

export const PANEL_IDS: Panel[] = PANELS.map(
  (panel) => panel.id,
);

export const PANEL_BY_ID: Record<
  Panel,
  PanelMetadata
> = Object.fromEntries(
  PANELS.map((panel) => [
    panel.id,
    panel,
  ]),
) as Record<Panel, PanelMetadata>;


// ============================================================
// CLIMATE DIMENSIONS
// ============================================================

export const CLIMATE_DIMENSIONS: ClimateDimensionMetadata[] = [
  {
    id: "climate_science",
    label: "Climate Science",
    shortLabel: "Science",
    description:
      "Coverage emphasizing climate change, global warming, greenhouse effects, and the scientific understanding of climate.",
  },

  {
    id: "emissions_fossil_fuels",
    label: "Emissions & Fossil Fuels",
    shortLabel: "Emissions",
    description:
      "Coverage emphasizing carbon emissions, greenhouse-gas emissions, fossil fuels, oil, gas, coal, and related energy sources.",
  },

  {
    id: "clean_energy_transition",
    label: "Clean Energy Transition",
    shortLabel: "Clean Energy",
    description:
      "Coverage emphasizing renewable energy, clean-energy technologies, solar power, wind power, electrification, and the energy transition.",
  },

  {
    id: "climate_policy",
    label: "Climate Policy",
    shortLabel: "Policy",
    description:
      "Coverage emphasizing climate regulation, government action, international agreements, carbon policy, and political responses to climate change.",
  },

  {
    id: "climate_impacts",
    label: "Climate Impacts",
    shortLabel: "Impacts",
    description:
      "Coverage emphasizing the consequences of climate change, including heat, drought, wildfire, flooding, storms, ecological effects, and other physical impacts.",
  },

  {
    id: "adaptation_resilience",
    label: "Adaptation & Resilience",
    shortLabel: "Adaptation",
    description:
      "Coverage emphasizing climate adaptation, resilience, preparedness, recovery, infrastructure response, and adjustment to climate risks.",
  },
];

export const CLIMATE_DIMENSION_IDS: ClimateDimension[] =
  CLIMATE_DIMENSIONS.map(
    (dimension) => dimension.id,
  );

export const CLIMATE_DIMENSION_BY_ID: Record<
  ClimateDimension,
  ClimateDimensionMetadata
> = Object.fromEntries(
  CLIMATE_DIMENSIONS.map((dimension) => [
    dimension.id,
    dimension,
  ]),
) as Record<
  ClimateDimension,
  ClimateDimensionMetadata
>;


// ============================================================
// DISPERSION MEASURES
// ============================================================

export interface DispersionMeasureMetadata {
  id: DispersionMeasure;
  label: string;
  shortLabel: string;
  description: string;
}

export const DISPERSION_MEASURES: DispersionMeasureMetadata[] = [
  {
    id: "std",
    label: "Cross-Outlet Standard Deviation",
    shortLabel: "Standard deviation",
    description:
      "Measures how widely outlet thematic emphasis is distributed around the monthly cross-outlet mean.",
  },

  {
    id: "iqr",
    label: "Cross-Outlet Interquartile Range",
    shortLabel: "IQR",
    description:
      "Measures the spread between the 25th and 75th percentiles of outlet thematic emphasis.",
  },
];


// ============================================================
// PRIMARY FINDING LABELS
// ============================================================

/**
 * These are presentation strings only.
 * Numerical results will come from the exported JSON data,
 * not from hard-coded constants.
 */
export const PRIMARY_FINDING_TITLE =
  "Climate-impact framing has diverged across news outlets";

export const PRIMARY_FINDING_DESCRIPTION =
  "Cross-outlet variation in climate-impact emphasis increased substantially over the study period, with the pattern remaining visible under alternative outlet-panel definitions.";


// ============================================================
// UI COPY
// ============================================================

export const APP_NAME =
  "Media Polarization Lab";

export const APP_SUBTITLE =
  "Climate framing divergence across U.S. news outlets";

export const RESEARCH_DATE_RANGE =
  "June 2016 – January 2026";


// ============================================================
// DEFAULT CHART OPTIONS
// ============================================================

export const DEFAULT_PANEL: Panel =
  PRIMARY_PANEL;

export const DEFAULT_DIMENSION: ClimateDimension =
  PRIMARY_DIMENSION;

export const DEFAULT_DISPERSION_MEASURE: DispersionMeasure =
  PRIMARY_DISPERSION_MEASURE;


// ============================================================
// FORMAT HELPERS
// ============================================================

export function getPanelLabel(
  panel: Panel,
): string {
  return PANEL_BY_ID[panel].label;
}


export function getPanelShortLabel(
  panel: Panel,
): string {
  return PANEL_BY_ID[panel].shortLabel;
}


export function getDimensionLabel(
  dimension: ClimateDimension,
): string {
  return CLIMATE_DIMENSION_BY_ID[
    dimension
  ].label;
}


export function getDimensionShortLabel(
  dimension: ClimateDimension,
): string {
  return CLIMATE_DIMENSION_BY_ID[
    dimension
  ].shortLabel;
}


export function getStudyPeriod(
  period: StudyPeriod,
): StudyPeriodDefinition {
  const result = STUDY_PERIODS.find(
    (item) => item.id === period,
  );

  if (!result) {
    throw new Error(
      `Unknown study period: ${period}`,
    );
  }

  return result;
}