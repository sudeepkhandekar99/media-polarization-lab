import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  ArrowRight,
  BarChart3,
  Layers3,
  SlidersHorizontal,
} from "lucide-react";

import {
  loadClimateDimensionTrends,
  loadMonthlyDimensions,
} from "@/lib/data";

import {
  ExploreControls,
} from "@/components/explore/explore-controls";


// ============================================================
// METADATA
// ============================================================

export const metadata: Metadata = {
  title: "Explore Climate Divergence",

  description:
    "Interactively compare semantic divergence across six climate themes, multiple outlet panels, and alternative dispersion measures from 2016 through 2026.",

  openGraph: {
    title:
      "Explore Climate Divergence | Media Polarization Lab",

    description:
      "Compare how climate science, emissions, clean energy, policy, impacts, and adaptation diverged across news outlets from 2016 through 2026.",

    type: "website",
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Explore Climate Divergence | Media Polarization Lab",

    description:
      "Interactively compare climate-theme divergence across news outlets from 2016 through 2026.",
  },
};


// ============================================================
// PAGE
// ============================================================

export default async function ExplorePage() {
  const [
    monthlyDimensions,
    dimensionTrends,
  ] = await Promise.all([
    loadMonthlyDimensions(),
    loadClimateDimensionTrends(),
  ]);


  return (
    <main>
      {/* ==================================================== */}
      {/* HERO */}
      {/* ==================================================== */}

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <SlidersHorizontal className="h-3.5 w-3.5" />

              Explore the research
            </div>


            <h1 className="mt-7 text-5xl font-semibold tracking-[-0.045em] sm:text-6xl">
              Compare how climate themes
              diverged across outlets.
            </h1>


            <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">
              The analysis tracks six climate
              dimensions over time. Change the
              outlet panel and dispersion
              measure to see how robust the
              patterns are across alternative
              specifications.
            </p>
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* INTERACTIVE EXPLORER */}
      {/* ==================================================== */}

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Cross-outlet divergence
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Climate impacts separate most
              strongly over time.
            </h2>

            <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
              Higher dispersion means outlets
              are less similar in how strongly
              they emphasize a given climate
              dimension relative to the other
              themes in their coverage.
            </p>
          </div>


          <ExploreControls
            monthlyDimensions={
              monthlyDimensions
            }
            dimensionTrends={
              dimensionTrends
            }
          />
        </div>
      </section>


      {/* ==================================================== */}
      {/* HOW TO READ */}
      {/* ==================================================== */}

      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-border bg-background p-7">
              <Layers3 className="h-5 w-5 text-muted-foreground" />

              <h3 className="mt-6 text-xl font-semibold">
                Relative emphasis
              </h3>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Each outlet-month is represented
                by its relative emphasis across
                six climate themes. The scores
                describe thematic emphasis, not
                sentiment or political ideology.
              </p>
            </div>


            <div className="rounded-3xl border border-border bg-background p-7">
              <BarChart3 className="h-5 w-5 text-muted-foreground" />

              <h3 className="mt-6 text-xl font-semibold">
                Cross-outlet spread
              </h3>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Standard deviation and IQR
                summarize how different outlets
                are from one another within the
                same month.
              </p>
            </div>


            <div className="rounded-3xl border border-border bg-background p-7">
              <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />

              <h3 className="mt-6 text-xl font-semibold">
                Panel robustness
              </h3>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Compare the dynamic panel, the
                primary stable 90% cohort, and
                the six-outlet fully balanced
                panel to see how sensitive the
                trend is to changing outlet
                composition.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* INTERPRETATION NOTE */}
      {/* ==================================================== */}

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                What this means
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">
                The divergence is thematic,
                not automatically ideological.
              </h2>
            </div>


            <div className="max-w-2xl space-y-5 leading-7 text-muted-foreground">
              <p>
                A rising line means outlets are
                becoming more different in the
                relative prominence they give
                that theme.
              </p>

              <p>
                Climate impacts show the most
                consistent increase in
                cross-outlet dispersion, while
                climate science remains much
                more stable. That supports a
                claim about divergence in
                framing emphasis, not by itself
                a claim about partisan or
                ideological polarization.
              </p>
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
                Next level
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
                See which outlets drove the
                divergence.
              </h2>

              <p className="mt-4 leading-7 text-background/65">
                Move from aggregate dispersion
                to outlet-specific trajectories,
                coverage continuity, and
                climate-impact trends.
              </p>
            </div>


            <Link
              href="/outlets"
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#fbfaf7] px-5 py-3 text-sm font-medium text-[#171716] transition-all duration-200 hover:bg-white lg:self-auto"
            >
              Browse outlets

              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}