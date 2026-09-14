// ============================================================
// CORE TYPES
// ============================================================

export type Panel =
  | "dynamic_panel"
  | "stable_90"
  | "fully_balanced";

export type ClimateDimension =
  | "climate_science"
  | "emissions_fossil_fuels"
  | "clean_energy_transition"
  | "climate_policy"
  | "climate_impacts"
  | "adaptation_resilience";

export type DispersionMeasure =
  | "std"
  | "iqr";

export type StudyPeriod =
  | "early"
  | "middle"
  | "late";

export type TrendDirection =
  | "increasing"
  | "decreasing"
  | "not_significantly_different_from_zero";


// ============================================================
// RESEARCH SUMMARY
// ============================================================

export interface ResearchSummaryProject {
  title: string;
  analysis_level: string;
  primary_panel: Panel;

  study_first_month: string | null;
  study_last_month: string | null;
  study_months: number | null;

  panels: Panel[];
}


export interface PrimaryFinding {
  dimension: ClimateDimension;

  dispersion_measure: string;

  annualized_change: number | null;

  ci_lower: number | null;
  ci_upper: number | null;

  p_value: number | null;
  r_squared: number | null;
}


export interface ResearchPeriodComparison {
  early_mean_dispersion: number | null;
  middle_mean_dispersion: number | null;
  late_mean_dispersion: number | null;

  early_to_late_absolute_change:
    | number
    | null;

  early_to_late_pct_change:
    | number
    | null;
}


export interface ResearchStructuralBreak {
  candidate_break_month:
    | string
    | null;

  bootstrap_p_value:
    | number
    | null;

  pre_break_slope:
    | number
    | null;

  slope_change:
    | number
    | null;

  slope_change_p_value:
    | number
    | null;

  post_break_slope:
    | number
    | null;

  break_supported_by_bootstrap_05:
    | boolean
    | null;
}


export interface ResearchModelShape {
  preferred_polynomial_degree:
    | number
    | null;

  preferred_model_bic:
    | number
    | null;
}


export interface PanelSizeSummary {
  months: number;

  mean_outlets_per_month:
    | number
    | null;
}


export interface ResearchSummary {
  project: ResearchSummaryProject;

  primary_finding: PrimaryFinding;

  period_comparison:
    ResearchPeriodComparison;

  structural_break:
    ResearchStructuralBreak;

  model_shape:
    ResearchModelShape;

  panel_sizes: Partial<
    Record<
      Panel,
      PanelSizeSummary
    >
  >;
}


// ============================================================
// HEADLINE METRICS
// ============================================================

export interface HeadlineStudyPeriod {
  start: string | null;
  end: string | null;
  months: number | null;
}


export interface HeadlineClimateImpactDivergence {
  annualized_change:
    | number
    | null;

  annualized_change_pct_points:
    | number
    | null;

  ci_lower:
    | number
    | null;

  ci_upper:
    | number
    | null;

  p_value:
    | number
    | null;

  r_squared:
    | number
    | null;
}


export interface HeadlineEarlyVsLate {
  early: number | null;
  middle: number | null;
  late: number | null;

  absolute_change:
    | number
    | null;

  percent_change:
    | number
    | null;
}


export interface HeadlineStructuralBreak {
  selected_month:
    | string
    | null;

  bootstrap_p_value:
    | number
    | null;

  slope_change_p_value:
    | number
    | null;

  pre_break_slope:
    | number
    | null;

  post_break_slope:
    | number
    | null;
}


export interface HeadlineMetrics {
  primary_panel: Panel;

  study_period:
    HeadlineStudyPeriod;

  climate_impact_divergence:
    HeadlineClimateImpactDivergence;

  early_vs_late:
    HeadlineEarlyVsLate;

  structural_break:
    HeadlineStructuralBreak;
}


// ============================================================
// METHODOLOGY
// ============================================================

export interface ClimateRelevanceMethod {
  classifier: string;

  similarity_threshold:
    number;

  aggregation: string;

  minimum_window_climate_headlines:
    number;

  minimum_current_month_climate_headlines:
    number;
}


export interface RepresentationMethod {
  embedding_dimension:
    number;

  dimension_measure:
    string;
}


export interface PrimaryOutcomeMethod {
  dimension:
    ClimateDimension;

  measure:
    string;
}


export interface PrimaryPanelMethod {
  name: Panel;
  definition: string;
}


export interface RobustnessPanelsMethod {
  dynamic_panel: string;

  fully_balanced: string;
}


export interface InferenceMethod {
  trend_model: string;

  standard_errors: string;

  primary_hac_lags:
    number;

  additional_checks:
    string[];
}


export interface Methodology {
  unit_of_analysis:
    string;

  climate_relevance:
    ClimateRelevanceMethod;

  climate_dimensions:
    ClimateDimension[];

  representation:
    RepresentationMethod;

  primary_outcome:
    PrimaryOutcomeMethod;

  primary_panel:
    PrimaryPanelMethod;

  robustness_panels:
    RobustnessPanelsMethod;

  inference:
    InferenceMethod;

  interpretation:
    string;
}


// ============================================================
// MONTHLY CLIMATE DIMENSIONS
// ============================================================

/**
 * data/app/monthly_dimensions.json
 *
 * Long format:
 *
 * month
 * panel
 * dimension
 * outlets
 * std
 * iqr
 */
export interface MonthlyDimensionRecord {
  month: string;

  panel: Panel;

  dimension:
    ClimateDimension;

  outlets:
    number;

  std:
    number | null;

  iqr:
    number | null;
}


// ============================================================
// MONTHLY OVERALL SEMANTIC DISPERSION
// ============================================================

export interface MonthlyOverallRecord {
  month: string;

  outlets?: number | null;

  pairs?: number | null;

  mean_pairwise_distance?:
    | number
    | null;

  median_pairwise_distance?:
    | number
    | null;

  p25_pairwise_distance?:
    | number
    | null;

  p75_pairwise_distance?:
    | number
    | null;

  p90_pairwise_distance?:
    | number
    | null;

  max_pairwise_distance?:
    | number
    | null;
}


// ============================================================
// OUTLET MONTH PROFILES
// ============================================================

export interface OutletMonthProfile {
  media_name: string;

  month: string;

  relative_climate_science:
    number | null;

  relative_emissions_fossil_fuels:
    number | null;

  relative_clean_energy_transition:
    number | null;

  relative_climate_policy:
    number | null;

  relative_climate_impacts:
    number | null;

  relative_adaptation_resilience:
    number | null;

  window_climate_articles?:
    | number
    | null;

  current_month_climate_articles?:
    | number
    | null;

  observed_months_in_window?:
    | number
    | null;

  centroid_concentration?:
    | number
    | null;

  mean_climate_relevance?:
    | number
    | null;

  median_climate_relevance?:
    | number
    | null;

  dominant_climate_anchor?:
    | string
    | null;
}


// ============================================================
// OUTLET SUMMARY
// ============================================================

export interface OutletSummary {
  media_name: string;

  months_present:
    number;

  first_month:
    string;

  last_month:
    string;

  coverage_pct:
    number;

  stable_90:
    boolean;

  fully_balanced:
    boolean;

  impact_early_mean:
    | number
    | null;

  impact_middle_mean:
    | number
    | null;

  impact_late_mean:
    | number
    | null;

  impact_early_to_late_change:
    | number
    | null;

  impact_annualized_change?:
    | number
    | null;

  impact_hac_se?:
    | number
    | null;

  impact_ci_lower?:
    | number
    | null;

  impact_ci_upper?:
    | number
    | null;

  impact_p_value?:
    | number
    | null;

  impact_r_squared?:
    | number
    | null;

  impact_spearman_rho?:
    | number
    | null;

  impact_trend_direction?:
    | TrendDirection
    | string
    | null;

  median_current_month_articles?:
    | number
    | null;

  mean_current_month_articles?:
    | number
    | null;
}


// ============================================================
// CLIMATE-IMPACT PERIOD RESULTS
// ============================================================

export interface ClimateImpactPeriodRecord {
  panel: Panel;

  period:
    StudyPeriod;

  months:
    number;

  first_month:
    string;

  last_month:
    string;

  mean_std:
    number | null;

  median_std:
    number | null;

  mean_iqr:
    number | null;

  mean_outlets:
    number | null;

  annualized_change:
    number | null;

  trend_p_value:
    number | null;
}


// ============================================================
// ROLLING TRENDS
// ============================================================

export interface ClimateImpactRollingTrend {
  panel: Panel;

  window_start:
    string;

  window_end:
    string;

  months:
    number;

  annualized_change:
    number | null;

  hac_se:
    number | null;

  ci_lower:
    number | null;

  ci_upper:
    number | null;

  p_value:
    number | null;

  r_squared:
    number | null;
}


// ============================================================
// STRUCTURAL BREAK RESULTS
// ============================================================

export interface ClimateImpactStructuralBreak {
  panel: Panel;

  months?: number;

  first_month?:
    string | null;

  last_month?:
    string | null;

  break_idx:
    number;

  break_month:
    string;

  linear_bic:
    number | null;

  segmented_bic:
    number | null;

  delta_bic:
    number | null;

  linear_r_squared:
    number | null;

  segmented_r_squared:
    number | null;

  observed_sup_f:
    number | null;

  classical_f_p_value?:
    number | null;

  pre_break_slope:
    number | null;

  pre_ci_lower?:
    number | null;

  pre_ci_upper?:
    number | null;

  slope_change:
    number | null;

  slope_change_ci_lower?:
    number | null;

  slope_change_ci_upper?:
    number | null;

  slope_change_p_value:
    number | null;

  post_break_slope:
    number | null;

  post_ci_lower?:
    number | null;

  post_ci_upper?:
    number | null;

  bootstrap_p_value:
    number | null;

  bootstrap_q90?:
    number | null;

  bootstrap_q95?:
    number | null;

  bootstrap_q99?:
    number | null;
}


// ============================================================
// DIMENSION HAC RESULTS
// ============================================================

export interface ClimateDimensionTrend {
  panel: Panel;

  anchor:
    ClimateDimension;

  dispersion_measure?:
    DispersionMeasure;

  hac_lags?:
    number;

  n_months?:
    number;

  annualized_change?:
    number | null;

  annualized_std_change?:
    number | null;

  hac_se_annualized?:
    number | null;

  ci_lower:
    number | null;

  ci_upper:
    number | null;

  p_value:
    number | null;

  r_squared?:
    number | null;
}


// ============================================================
// OUTLET DRIVERS
// ============================================================

export interface ClimateImpactOutletDriver {
  media_name: string;

  coverage_pct:
    number;

  early:
    number | null;

  middle?:
    number | null;

  late:
    number | null;

  early_to_late_change:
    number | null;

  annualized_change:
    number | null;

  time_correlation:
    number | null;
}


// ============================================================
// MANIFEST
// ============================================================

export interface DataManifest {
  dataset_version:
    string;

  study_months:
    number;

  first_month:
    string;

  last_month:
    string;

  dimensions:
    ClimateDimension[];

  panels:
    Panel[];

  outlets:
    number;

  stable_90_outlets:
    number;

  fully_balanced_outlets:
    number;

  files:
    string[];
}


// ============================================================
// QUERY TYPES
// ============================================================

export interface DimensionQuery {
  panel?: Panel;

  dimension?:
    ClimateDimension;

  measure?:
    DispersionMeasure;

  startMonth?:
    string;

  endMonth?:
    string;
}


export interface OutletQuery {
  search?: string;

  stableOnly?: boolean;

  fullyBalancedOnly?:
    boolean;

  minimumCoveragePct?:
    number;
}


// ============================================================
// FRONTEND-NORMALIZED TYPES
// ============================================================

export interface MonthlyDimensionPoint {
  month: string;

  panel: Panel;

  dimension:
    ClimateDimension;

  outlets:
    number | null;

  std:
    number | null;

  iqr:
    number | null;

  value:
    number | null;
}


export interface NormalizedOutletMonthProfile {
  media_name:
    string;

  month:
    string;

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

  window_climate_articles:
    number | null;

  current_month_climate_articles:
    number | null;

  observed_months_in_window:
    number | null;

  centroid_concentration:
    number | null;

  mean_climate_relevance:
    number | null;

  median_climate_relevance:
    number | null;

  dominant_climate_anchor:
    string | null;
}


// ============================================================
// DISPLAY METADATA
// ============================================================

export interface ClimateDimensionMetadata {
  id:
    ClimateDimension;

  label:
    string;

  shortLabel:
    string;

  description:
    string;
}