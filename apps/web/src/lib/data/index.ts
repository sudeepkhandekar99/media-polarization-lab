// ============================================================
// LOADERS
// ============================================================

export {
  DATA_FILES,
  assertRequiredDataFiles,
  getDataFileSummary,
  loadAllResearchData,
  loadClimateDimensionTrends,
  loadClimateImpactOutletDrivers,
  loadClimateImpactPeriods,
  loadClimateImpactRollingTrends,
  loadClimateImpactStructuralBreaks,
  loadDashboardData,
  loadDataFile,
  loadHeadlineMetrics,
  loadManifest,
  loadMethodology,
  loadMonthlyDimensions,
  loadMonthlyOverall,
  loadOutletDetailData,
  loadOutletIndexData,
  loadOutletMonthProfiles,
  loadOutletSummaries,
  loadResearchSummary,
  validateDataFiles,
} from "./loaders";


// ============================================================
// SELECTORS
// ============================================================

export {
  calculateSeriesChange,
  getAvailableMonths,
  getClimateImpactPeriod,
  getClimateImpactPeriods,
  getDimensionSnapshot,
  getDimensionTrend,
  getDimensionTrends,
  getFirstMonth,
  getFullyBalancedOutlets,
  getLatestMonth,
  getLatestRollingTrend,
  getLowestClimateImpactTrends,
  getMonthlyDimensionSeries,
  getOutletDimensionSeries,
  getOutletDriver,
  getOutletSummaryByName,
  getOutletTrajectory,
  getOutlets,
  getOutletTrendCounts,
  getPrimaryClimateImpactSeries,
  getRollingTrends,
  getStableOutlets,
  getStructuralBreak,
  getTopClimateImpactRisers,
  getTopOutletDrivers,
  isStructuralBreakSupported,
  normalizeOutletMonthProfile,
} from "./selectors";


// ============================================================
// CONSTANTS
// ============================================================

export {
  APP_NAME,
  APP_SUBTITLE,
  CLIMATE_DIMENSION_BY_ID,
  CLIMATE_DIMENSION_IDS,
  CLIMATE_DIMENSIONS,
  DEFAULT_DIMENSION,
  DEFAULT_DISPERSION_MEASURE,
  DEFAULT_PANEL,
  DISPERSION_MEASURES,
  PANELS,
  PANEL_BY_ID,
  PANEL_IDS,
  PRIMARY_DIMENSION,
  PRIMARY_DISPERSION_MEASURE,
  PRIMARY_FINDING_DESCRIPTION,
  PRIMARY_FINDING_TITLE,
  PRIMARY_PANEL,
  RESEARCH_DATE_RANGE,
  STUDY_END_MONTH,
  STUDY_MONTHS,
  STUDY_PERIODS,
  STUDY_START_MONTH,
  getDimensionLabel,
  getDimensionShortLabel,
  getPanelLabel,
  getPanelShortLabel,
  getStudyPeriod,
} from "./constants";


// ============================================================
// TYPES
// ============================================================

export type {
  ClimateDimension,
  ClimateDimensionMetadata,
  ClimateDimensionTrend,
  ClimateImpactOutletDriver,
  ClimateImpactPeriodRecord,
  ClimateImpactRollingTrend,
  ClimateImpactStructuralBreak,
  ClimateRelevanceMethod,
  DataManifest,
  DimensionQuery,
  DispersionMeasure,
  HeadlineClimateImpactDivergence,
  HeadlineEarlyVsLate,
  HeadlineMetrics,
  HeadlineStructuralBreak,
  HeadlineStudyPeriod,
  InferenceMethod,
  Methodology,
  MonthlyDimensionPoint,
  MonthlyDimensionRecord,
  MonthlyOverallRecord,
  NormalizedOutletMonthProfile,
  OutletMonthProfile,
  OutletQuery,
  OutletSummary,
  Panel,
  PanelSizeSummary,
  PrimaryFinding,
  PrimaryOutcomeMethod,
  PrimaryPanelMethod,
  RepresentationMethod,
  ResearchModelShape,
  ResearchPeriodComparison,
  ResearchStructuralBreak,
  ResearchSummary,
  ResearchSummaryProject,
  RobustnessPanelsMethod,
  StudyPeriod,
  TrendDirection,
} from "./types";


// ============================================================
// SELECTOR-SPECIFIC TYPES
// ============================================================

export type {
  OutletDimensionPoint,
  OutletTrendCounts,
  SeriesChange,
} from "./selectors";


// ============================================================
// LOADER-SPECIFIC TYPES
// ============================================================

export type {
  DataFileKey,
  DataFileStatus,
} from "./loaders";