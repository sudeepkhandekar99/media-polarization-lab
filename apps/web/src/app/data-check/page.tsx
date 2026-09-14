import {
  getAvailableMonths,
  getDataFileSummary,
  getOutletTrendCounts,
  loadHeadlineMetrics,
  loadManifest,
  loadMonthlyDimensions,
  loadOutletSummaries,
} from "@/lib/data";


// ============================================================
// EXPECTED VALUES FROM THE FROZEN RESEARCH PIPELINE
// ============================================================

const EXPECTED = {
  studyMonths: 116,
  firstMonth: "2016-06",
  lastMonth: "2026-01",

  outlets: 136,
  stableOutlets: 20,
  fullyBalancedOutlets: 6,

  monthlyDimensionRows: 2088,

  significantPositive: 17,
  significantNegative: 0,
  notSignificant: 3,
};


// ============================================================
// SMALL DISPLAY COMPONENTS
// ============================================================

function CheckRow({
  label,
  actual,
  expected,
}: {
  label: string;
  actual: string | number;
  expected: string | number;
}) {
  const passed =
    String(actual) ===
    String(expected);

  return (
    <div className="flex items-center justify-between gap-6 border-b py-3 last:border-b-0">
      <div>
        <p className="font-medium">
          {label}
        </p>

        <p className="text-sm text-muted-foreground">
          Expected: {expected}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="font-mono text-sm">
          {actual}
        </span>

        <span
          className={
            passed
              ? "font-semibold text-green-600"
              : "font-semibold text-red-600"
          }
        >
          {passed ? "✓" : "✕"}
        </span>
      </div>
    </div>
  );
}


function FileRow({
  filename,
  exists,
  sizeKB,
}: {
  filename: string;
  exists: boolean;
  sizeKB: number | null;
}) {
  return (
    <div className="flex items-center justify-between gap-6 border-b py-3 last:border-b-0">
      <div className="min-w-0">
        <p className="truncate font-mono text-sm">
          {filename}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <span className="font-mono text-xs text-muted-foreground">
          {sizeKB === null
            ? "—"
            : `${sizeKB.toFixed(1)} KB`}
        </span>

        <span
          className={
            exists
              ? "font-semibold text-green-600"
              : "font-semibold text-red-600"
          }
        >
          {exists ? "✓" : "✕"}
        </span>
      </div>
    </div>
  );
}


// ============================================================
// PAGE
// ============================================================

export default async function DataCheckPage() {
  const [
    manifest,
    headlineMetrics,
    monthlyDimensions,
    outletSummaries,
    fileSummary,
  ] = await Promise.all([
    loadManifest(),
    loadHeadlineMetrics(),
    loadMonthlyDimensions(),
    loadOutletSummaries(),
    getDataFileSummary(),
  ]);


  // ----------------------------------------------------------
  // MONTH CHECKS
  // ----------------------------------------------------------

  const months =
    getAvailableMonths(
      monthlyDimensions,
    );

  const firstMonth =
    months[0] ??
    "missing";

  const lastMonth =
    months[
      months.length - 1
    ] ??
    "missing";


  // ----------------------------------------------------------
  // OUTLET CHECKS
  // ----------------------------------------------------------

  const stableOutlets =
    outletSummaries.filter(
      (outlet) =>
        outlet.stable_90,
    );

  const balancedOutlets =
    outletSummaries.filter(
      (outlet) =>
        outlet.fully_balanced,
    );


  const trendCounts =
    getOutletTrendCounts(
      outletSummaries,
    );


  // ----------------------------------------------------------
  // FILE CHECKS
  // ----------------------------------------------------------

  const missingFiles =
    fileSummary.filter(
      (file) =>
        !file.exists,
    );


  // ----------------------------------------------------------
  // GLOBAL STATUS
  // ----------------------------------------------------------

  const checks = [
    months.length ===
      EXPECTED.studyMonths,

    firstMonth ===
      EXPECTED.firstMonth,

    lastMonth ===
      EXPECTED.lastMonth,

    outletSummaries.length ===
      EXPECTED.outlets,

    stableOutlets.length ===
      EXPECTED.stableOutlets,

    balancedOutlets.length ===
      EXPECTED.fullyBalancedOutlets,

    monthlyDimensions.length ===
      EXPECTED.monthlyDimensionRows,

    trendCounts.significantPositive ===
      EXPECTED.significantPositive,

    trendCounts.significantNegative ===
      EXPECTED.significantNegative,

    trendCounts.notSignificant ===
      EXPECTED.notSignificant,

    missingFiles.length === 0,
  ];


  const allPassed =
    checks.every(Boolean);


  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-16">
      {/* ==================================================== */}
      {/* HEADER */}
      {/* ==================================================== */}

      <div className="mb-12">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Development utility
        </p>

        <h1 className="text-4xl font-semibold tracking-tight">
          Research data check
        </h1>

        <p className="mt-4 max-w-2xl text-muted-foreground">
          This page verifies that the frozen research
          artifacts are being loaded correctly by the
          Next.js application.
        </p>
      </div>


      {/* ==================================================== */}
      {/* OVERALL STATUS */}
      {/* ==================================================== */}

      <section className="mb-10 rounded-2xl border p-6">
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-sm text-muted-foreground">
              Overall status
            </p>

            <h2 className="mt-1 text-2xl font-semibold">
              {allPassed
                ? "Data contract valid"
                : "Data contract mismatch"}
            </h2>
          </div>

          <div
            className={
              allPassed
                ? "rounded-full bg-green-100 px-4 py-2 font-medium text-green-700"
                : "rounded-full bg-red-100 px-4 py-2 font-medium text-red-700"
            }
          >
            {allPassed
              ? "All checks passed"
              : "Check failures"}
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* CORE DATA CONTRACT */}
      {/* ==================================================== */}

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">
          Core dataset
        </h2>

        <div className="rounded-2xl border px-6">
          <CheckRow
            label="Study months"
            actual={months.length}
            expected={
              EXPECTED.studyMonths
            }
          />

          <CheckRow
            label="First month"
            actual={firstMonth}
            expected={
              EXPECTED.firstMonth
            }
          />

          <CheckRow
            label="Last month"
            actual={lastMonth}
            expected={
              EXPECTED.lastMonth
            }
          />

          <CheckRow
            label="Outlets"
            actual={
              outletSummaries.length
            }
            expected={
              EXPECTED.outlets
            }
          />

          <CheckRow
            label="Stable ≥90% outlets"
            actual={
              stableOutlets.length
            }
            expected={
              EXPECTED.stableOutlets
            }
          />

          <CheckRow
            label="Fully balanced outlets"
            actual={
              balancedOutlets.length
            }
            expected={
              EXPECTED.fullyBalancedOutlets
            }
          />

          <CheckRow
            label="Monthly dimension rows"
            actual={
              monthlyDimensions.length
            }
            expected={
              EXPECTED.monthlyDimensionRows
            }
          />
        </div>
      </section>


      {/* ==================================================== */}
      {/* OUTLET-TREND VALIDATION */}
      {/* ==================================================== */}

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">
          Outlet-level trend analysis
        </h2>

        <div className="rounded-2xl border px-6">
          <CheckRow
            label="Significant positive trends"
            actual={
              trendCounts.significantPositive
            }
            expected={
              EXPECTED.significantPositive
            }
          />

          <CheckRow
            label="Significant negative trends"
            actual={
              trendCounts.significantNegative
            }
            expected={
              EXPECTED.significantNegative
            }
          />

          <CheckRow
            label="Not statistically significant"
            actual={
              trendCounts.notSignificant
            }
            expected={
              EXPECTED.notSignificant
            }
          />
        </div>
      </section>


      {/* ==================================================== */}
      {/* PRIMARY RESEARCH FINDING */}
      {/* ==================================================== */}

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">
          Primary research result
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border p-5">
            <p className="text-sm text-muted-foreground">
              Annualized trend
            </p>

            <p className="mt-2 text-2xl font-semibold">
              {headlineMetrics
                .climate_impact_divergence
                .annualized_change
                ?.toFixed(6) ??
                "—"}
            </p>
          </div>


          <div className="rounded-2xl border p-5">
            <p className="text-sm text-muted-foreground">
              Early → late
            </p>

            <p className="mt-2 text-2xl font-semibold">
              {headlineMetrics
                .early_vs_late
                .percent_change
                ?.toFixed(2) ??
                "—"}
              %
            </p>
          </div>


          <div className="rounded-2xl border p-5">
            <p className="text-sm text-muted-foreground">
              Candidate break
            </p>

            <p className="mt-2 text-2xl font-semibold">
              {headlineMetrics
                .structural_break
                .selected_month ??
                "—"}
            </p>
          </div>


          <div className="rounded-2xl border p-5">
            <p className="text-sm text-muted-foreground">
              Break bootstrap p
            </p>

            <p className="mt-2 text-2xl font-semibold">
              {headlineMetrics
                .structural_break
                .bootstrap_p_value
                ?.toFixed(3) ??
                "—"}
            </p>
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* MANIFEST */}
      {/* ==================================================== */}

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">
          Manifest
        </h2>

        <div className="rounded-2xl border p-6">
          <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <dt className="text-sm text-muted-foreground">
                Dataset version
              </dt>

              <dd className="mt-1 font-medium">
                {manifest.dataset_version}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-muted-foreground">
                Study months
              </dt>

              <dd className="mt-1 font-medium">
                {manifest.study_months}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-muted-foreground">
                Outlets
              </dt>

              <dd className="mt-1 font-medium">
                {manifest.outlets}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-muted-foreground">
                Stable cohort
              </dt>

              <dd className="mt-1 font-medium">
                {
                  manifest
                    .stable_90_outlets
                }
              </dd>
            </div>

            <div>
              <dt className="text-sm text-muted-foreground">
                Fully balanced
              </dt>

              <dd className="mt-1 font-medium">
                {
                  manifest
                    .fully_balanced_outlets
                }
              </dd>
            </div>

            <div>
              <dt className="text-sm text-muted-foreground">
                Dimensions
              </dt>

              <dd className="mt-1 font-medium">
                {
                  manifest
                    .dimensions
                    .length
                }
              </dd>
            </div>
          </dl>
        </div>
      </section>


      {/* ==================================================== */}
      {/* FILES */}
      {/* ==================================================== */}

      <section>
        <h2 className="mb-4 text-xl font-semibold">
          Generated files
        </h2>

        <div className="rounded-2xl border px-6">
          {fileSummary.map(
            (file) => (
              <FileRow
                key={
                  file.filename
                }
                filename={
                  file.filename
                }
                exists={
                  file.exists
                }
                sizeKB={
                  file.sizeKB
                }
              />
            ),
          )}
        </div>
      </section>


      {/* ==================================================== */}
      {/* DEVELOPMENT NOTE */}
      {/* ==================================================== */}

      <div className="mt-10 rounded-2xl bg-muted p-6 text-sm text-muted-foreground">
        This route is temporary. Once the main
        research interface is working, we can
        remove{" "}
        <code className="font-mono text-foreground">
          /data-check
        </code>
        .
      </div>
    </main>
  );
}