import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  Database,
  Layers3,
  Newspaper,
  Scale,
  ShieldCheck,
} from "lucide-react";

import {
  CLIMATE_DIMENSION_BY_ID,
  loadManifest,
  loadMethodology,
  loadResearchSummary,
} from "@/lib/data";


// ============================================================
// METADATA
// ============================================================

export const metadata: Metadata = {
  title: "Methodology",

  description:
    "Learn how the Media Polarization Lab identifies climate coverage, constructs semantic climate dimensions, builds outlet panels, measures cross-outlet divergence, and estimates long-run trends.",

  openGraph: {
    title:
      "Methodology | Media Polarization Lab",

    description:
      "Review the research design behind the semantic analysis of climate coverage across news outlets from 2016 through 2026.",

    type: "website",
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Methodology | Media Polarization Lab",

    description:
      "Review the methodology behind climate-theme classification, outlet profiles, dispersion measures, and longitudinal trend analysis.",
  },
};


// ============================================================
// FORMAT HELPERS
// ============================================================

function formatPercent(
  value: number,
  digits = 0,
) {
  return `${value.toFixed(
    digits,
  )}%`;
}


function formatThreshold(
  value: number,
) {
  return value.toFixed(
    3,
  );
}


// ============================================================
// PAGE
// ============================================================

export default async function MethodologyPage() {
  const [
    methodology,
    manifest,
    researchSummary,
  ] = await Promise.all([
    loadMethodology(),
    loadManifest(),
    loadResearchSummary(),
  ]);


  const stableCoverage =
    90;


  return (
    <main>
      {/* ==================================================== */}
      {/* HERO */}
      {/* ==================================================== */}

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" />

              Research methodology
            </div>


            <h1 className="mt-7 text-5xl font-semibold tracking-[-0.045em] sm:text-6xl">
              From headlines to
              cross-outlet semantic
              divergence.
            </h1>


            <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">
              The project converts climate
              news coverage into monthly
              outlet-level semantic profiles,
              then measures how different
              those profiles are across news
              organizations over time.
            </p>
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* STUDY SNAPSHOT */}
      {/* ==================================================== */}

      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
          <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              icon={
                <Database className="h-5 w-5 text-muted-foreground" />
              }
              value={
                String(
                  manifest.study_months,
                )
              }
              label="Complete months"
              description={`${manifest.first_month} through ${manifest.last_month}`}
            />

            <MetricCard
              icon={
                <Newspaper className="h-5 w-5 text-muted-foreground" />
              }
              value={
                String(
                  manifest.outlets,
                )
              }
              label="Analyzed outlets"
              description="Outlets represented in the application data"
            />

            <MetricCard
              icon={
                <Scale className="h-5 w-5 text-muted-foreground" />
              }
              value={
                String(
                  manifest
                    .stable_90_outlets,
                )
              }
              label="Primary stable cohort"
              description={`Observed in at least ${formatPercent(
                stableCoverage,
              )} of complete study months`}
            />

            <MetricCard
              icon={
                <Layers3 className="h-5 w-5 text-muted-foreground" />
              }
              value={
                String(
                  methodology
                    .climate_dimensions
                    .length,
                )
              }
              label="Climate dimensions"
              description="Semantic themes used to characterize climate coverage"
            />
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* PIPELINE */}
      {/* ==================================================== */}

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Research pipeline
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Six steps from article text
              to monthly divergence.
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              The web application uses
              precomputed research outputs.
              Embeddings, climate
              classification, rolling
              centroids, and statistical
              inference are all produced
              offline in the research
              pipeline.
            </p>
          </div>


          <div className="grid gap-4 lg:grid-cols-3">
            <PipelineStep
              number="01"
              title="Identify climate coverage"
              description={`Articles are classified with a multi-anchor semantic climate-relevance approach using a similarity threshold of ${formatThreshold(
                methodology
                  .climate_relevance
                  .similarity_threshold,
              )}.`}
              icon={
                <BrainCircuit className="h-5 w-5" />
              }
            />

            <PipelineStep
              number="02"
              title="Embed article language"
              description={`Article text is represented in a ${methodology.representation.embedding_dimension}-dimensional semantic embedding space.`}
              icon={
                <Database className="h-5 w-5" />
              }
            />

            <PipelineStep
              number="03"
              title="Measure six themes"
              description="Each outlet-month is characterized by relative semantic emphasis across six climate dimensions."
              icon={
                <Layers3 className="h-5 w-5" />
              }
            />

            <PipelineStep
              number="04"
              title="Build rolling outlet profiles"
              description={`${methodology.climate_relevance.aggregation}. A qualifying window requires at least ${methodology.climate_relevance.minimum_window_climate_headlines} climate headlines and at least ${methodology.climate_relevance.minimum_current_month_climate_headlines} headline from the target month.`}
              icon={
                <Newspaper className="h-5 w-5" />
              }
            />

            <PipelineStep
              number="05"
              title="Measure cross-outlet spread"
              description="Monthly dispersion summarizes how different outlets are from one another in their relative thematic emphasis."
              icon={
                <BarChart3 className="h-5 w-5" />
              }
            />

            <PipelineStep
              number="06"
              title="Test the time trend"
              description={`${methodology.inference.trend_model} with ${methodology.inference.standard_errors} uncertainty and ${methodology.inference.primary_hac_lags} primary HAC lags.`}
              icon={
                <CheckCircle2 className="h-5 w-5" />
              }
            />
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* CLIMATE RELEVANCE */}
      {/* ==================================================== */}

      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Climate relevance
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">
              Semantic retrieval rather
              than keyword matching alone.
            </h2>
          </div>


          <div className="space-y-6">
            <p className="leading-7 text-muted-foreground">
              {
                methodology
                  .climate_relevance
                  .classifier
              }
              . The classifier uses semantic
              similarity to identify articles
              whose language is meaningfully
              related to climate coverage.
            </p>


            <div className="grid gap-4 sm:grid-cols-3">
              <SmallMetric
                label="Similarity threshold"
                value={
                  formatThreshold(
                    methodology
                      .climate_relevance
                      .similarity_threshold,
                  )
                }
              />

              <SmallMetric
                label="Minimum window headlines"
                value={
                  String(
                    methodology
                      .climate_relevance
                      .minimum_window_climate_headlines,
                  )
                }
              />

              <SmallMetric
                label="Current-month minimum"
                value={
                  String(
                    methodology
                      .climate_relevance
                      .minimum_current_month_climate_headlines,
                  )
                }
              />
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* SIX DIMENSIONS */}
      {/* ==================================================== */}

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Semantic dimensions
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Six themes describe the
              composition of climate
              coverage.
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              The resulting values are
              relative thematic emphasis
              scores. They describe what an
              outlet emphasizes within its
              climate coverage rather than
              whether that outlet supports or
              opposes a political position.
            </p>
          </div>


          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {methodology
              .climate_dimensions
              .map(
                (
                  dimension,
                  index,
                ) => {
                  const metadata =
                    CLIMATE_DIMENSION_BY_ID[
                      dimension
                    ];


                  return (
                    <div
                      key={
                        dimension
                      }
                      className="rounded-3xl border border-border p-7"
                    >
                      <p className="font-mono text-xs text-muted-foreground">
                        {String(
                          index + 1,
                        ).padStart(
                          2,
                          "0",
                        )}
                      </p>

                      <h3 className="mt-7 text-xl font-semibold tracking-tight">
                        {
                          metadata.label
                        }
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {
                          metadata.description
                        }
                      </p>
                    </div>
                  );
                },
              )}
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* RELATIVE REPRESENTATION */}
      {/* ==================================================== */}

      <section className="border-b border-border bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-background/55">
              Relative emphasis
            </p>

            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              A positive score does not
              mean favorable coverage.
            </h2>
          </div>


          <div className="max-w-2xl space-y-5 leading-7 text-background/70">
            <p>
              {
                methodology
                  .representation
                  .dimension_measure
              }
              .
            </p>

            <p>
              A dimension above zero is more
              prominent than that
              outlet-month&apos;s average
              across the six climate themes.
              A value below zero is less
              prominent relative to the
              outlet-month&apos;s other
              climate themes.
            </p>

            <p>
              These values therefore measure
              thematic composition, not
              sentiment, factual accuracy,
              ideology, or political
              direction.
            </p>
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* OUTLET PANELS */}
      {/* ==================================================== */}

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Panel construction
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Changing outlet composition
              is treated as a research
              problem.
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              A rising dispersion series can
              be misleading if the outlets
              being compared change
              substantially over time. The
              analysis therefore examines
              multiple panel definitions.
            </p>
          </div>


          <div className="grid gap-5 lg:grid-cols-3">
            <PanelCard
              title="Dynamic panel"
              countLabel="Varies by month"
              description={
                methodology
                  .robustness_panels
                  .dynamic_panel
              }
            />

            <PanelCard
              title="Stable 90% panel"
              countLabel={`${manifest.stable_90_outlets} outlets`}
              description={
                methodology
                  .primary_panel
                  .definition
              }
              primary
            />

            <PanelCard
              title="Fully balanced panel"
              countLabel={`${manifest.fully_balanced_outlets} outlets`}
              description={
                methodology
                  .robustness_panels
                  .fully_balanced
              }
            />
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* DISPERSION */}
      {/* ==================================================== */}

      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Primary outcome
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">
              Cross-outlet dispersion.
            </h2>
          </div>


          <div>
            <p className="text-lg leading-8 text-foreground">
              {
                methodology
                  .primary_outcome
                  .measure
              }
              .
            </p>

            <p className="mt-5 leading-7 text-muted-foreground">
              When monthly dispersion rises,
              outlets are becoming more
              heterogeneous in the relative
              emphasis they place on that
              climate dimension. Standard
              deviation is the primary
              measure; the Explore interface
              also exposes IQR as a more
              robust spread measure.
            </p>
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* INFERENCE */}
      {/* ==================================================== */}

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Statistical inference
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">
                Trend uncertainty accounts
                for temporal dependence.
              </h2>
            </div>


            <div>
              <div className="grid gap-4 sm:grid-cols-2">
                <SmallMetric
                  label="Trend model"
                  value={
                    methodology
                      .inference
                      .trend_model
                  }
                />

                <SmallMetric
                  label="Standard errors"
                  value={
                    methodology
                      .inference
                      .standard_errors
                  }
                />

                <SmallMetric
                  label="Primary HAC lags"
                  value={
                    String(
                      methodology
                        .inference
                        .primary_hac_lags,
                    )
                  }
                />

                <SmallMetric
                  label="Primary dimension"
                  value={
                    CLIMATE_DIMENSION_BY_ID[
                      methodology
                        .primary_outcome
                        .dimension
                    ].label
                  }
                />
              </div>


              <div className="mt-8">
                <p className="text-sm font-medium">
                  Additional robustness checks
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {methodology
                    .inference
                    .additional_checks
                    .map(
                      (
                        check,
                      ) => (
                        <div
                          key={
                            check
                          }
                          className="flex items-start gap-3 rounded-2xl border border-border bg-background p-4"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

                          <p className="text-sm leading-6 text-muted-foreground">
                            {
                              check
                            }
                          </p>
                        </div>
                      ),
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* STRUCTURAL BREAK */}
      {/* ==================================================== */}

      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Trend shape
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">
              A candidate break is not the
              same as evidence of a break.
            </h2>
          </div>


          <div className="max-w-2xl space-y-5 leading-7 text-muted-foreground">
            <p>
              The stable-panel structural-break
              search selected{" "}
              <span className="font-medium text-foreground">
                {
                  researchSummary
                    .structural_break
                    .candidate_break_month
                }
              </span>{" "}
              as the best candidate within the
              permitted search range.
            </p>

            <p>
              The bootstrap test did not
              support that candidate as a
              statistically established
              structural break. The primary
              interpretation is therefore a
              persistent long-run increase
              rather than a single abrupt
              regime shift.
            </p>
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* INTERPRETATION BOUNDARY */}
      {/* ==================================================== */}

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="rounded-3xl border border-border p-8 sm:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <Scale className="h-6 w-6 text-muted-foreground" />

                <h2 className="mt-6 text-3xl font-semibold tracking-[-0.03em]">
                  What the measure does
                  and does not establish.
                </h2>
              </div>


              <div className="space-y-5 leading-7 text-muted-foreground">
                <p>
                  {
                    methodology.interpretation
                  }
                </p>

                <p>
                  The project can therefore
                  support claims about
                  increasing semantic or
                  thematic divergence in
                  climate framing. A stronger
                  claim about left-right
                  polarization would require a
                  separate measure of
                  ideological direction and
                  evidence that the divergence
                  aligns with that structure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* NEXT */}
      {/* ==================================================== */}

      <section>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="flex flex-col gap-8 rounded-3xl bg-foreground p-8 text-background sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm text-background/55">
                Explore the evidence
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
                Move from methodology back
                to the observed trends.
              </h2>

              <p className="mt-4 leading-7 text-background/65">
                Compare dimensions and panel
                definitions directly in the
                interactive explorer.
              </p>
            </div>


            <Link
              href="/explore"
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-background px-5 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-90 lg:self-auto"
            >
              Explore trends

              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


// ============================================================
// METRIC CARD
// ============================================================

function MetricCard({
  icon,
  value,
  label,
  description,
}: {
  icon: React.ReactNode;

  value: string;

  label: string;

  description: string;
}) {
  return (
    <div className="border-b border-r border-border bg-background p-6">
      {icon}

      <p className="mt-7 text-3xl font-semibold tracking-tight">
        {value}
      </p>

      <p className="mt-2 text-sm font-medium">
        {label}
      </p>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}


// ============================================================
// SMALL METRIC
// ============================================================

function SmallMetric({
  label,
  value,
}: {
  label: string;

  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5">
      <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </p>

      <p className="mt-3 text-sm font-medium leading-6">
        {value}
      </p>
    </div>
  );
}


// ============================================================
// PIPELINE STEP
// ============================================================

function PipelineStep({
  number,
  title,
  description,
  icon,
}: {
  number: string;

  title: string;

  description: string;

  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-border p-7">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
          {icon}
        </div>

        <span className="font-mono text-xs text-muted-foreground">
          {number}
        </span>
      </div>

      <h3 className="mt-8 text-xl font-semibold tracking-tight">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}


// ============================================================
// PANEL CARD
// ============================================================

function PanelCard({
  title,
  countLabel,
  description,
  primary = false,
}: {
  title: string;

  countLabel: string;

  description: string;

  primary?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-3xl border p-7",
        primary
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background",
      ].join(
        " ",
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-xl font-semibold">
          {title}
        </p>

        {primary && (
          <span className="rounded-full bg-background px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-foreground">
            Primary
          </span>
        )}
      </div>

      <p
        className={[
          "mt-7 font-mono text-2xl font-semibold",
          primary
            ? "text-background"
            : "text-foreground",
        ].join(
          " ",
        )}
      >
        {countLabel}
      </p>

      <p
        className={[
          "mt-4 text-sm leading-6",
          primary
            ? "text-background/65"
            : "text-muted-foreground",
        ].join(
          " ",
        )}
      >
        {description}
      </p>
    </div>
  );
}