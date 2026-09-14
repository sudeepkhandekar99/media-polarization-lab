
// ============================================================
// SKELETON
// ============================================================

function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={[
        "animate-pulse rounded-xl bg-muted",
        className,
      ].join(" ")}
    />
  );
}


// ============================================================
// PAGE
// ============================================================

export default function OutletLoading() {
  return (
    <main>
      {/* ==================================================== */}
      {/* BACK NAV */}
      {/* ==================================================== */}

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />

            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* HERO */}
      {/* ==================================================== */}

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-24">
          <div className="max-w-5xl">
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-7 w-28 rounded-full" />

              <Skeleton className="h-7 w-32 rounded-full" />
            </div>


            <Skeleton className="mt-8 h-14 w-full max-w-2xl sm:h-16" />


            <div className="mt-7 space-y-3">
              <Skeleton className="h-5 w-full max-w-2xl" />

              <Skeleton className="h-5 w-3/5 max-w-lg" />
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* COVERAGE METRICS */}
      {/* ==================================================== */}

      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
          <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({
              length: 4,
            }).map((_, index) => (
              <div
                key={index}
                className="border-b border-r border-border bg-background p-6"
              >
                <Skeleton className="h-5 w-5 rounded-full" />

                <Skeleton className="mt-7 h-9 w-28" />

                <Skeleton className="mt-3 h-4 w-32" />

                <div className="mt-4 space-y-2">
                  <Skeleton className="h-3 w-full" />

                  <Skeleton className="h-3 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* EARLY / MIDDLE / LATE */}
      {/* ==================================================== */}

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <Skeleton className="h-4 w-44" />

              <Skeleton className="mt-5 h-10 w-full max-w-md" />

              <Skeleton className="mt-3 h-10 w-4/5 max-w-sm" />
            </div>


            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />

              <Skeleton className="h-4 w-11/12" />

              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>


          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({
              length: 4,
            }).map((_, index) => (
              <div
                key={index}
                className="rounded-3xl border border-border bg-background p-6"
              >
                <Skeleton className="h-4 w-24" />

                <Skeleton className="mt-6 h-9 w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* TREND INFERENCE */}
      {/* ==================================================== */}

      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <Skeleton className="h-4 w-32" />

            <Skeleton className="mt-5 h-10 w-full max-w-2xl" />
          </div>


          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {Array.from({
              length: 3,
            }).map((_, index) => (
              <div
                key={index}
                className="rounded-3xl border border-border bg-background p-7"
              >
                <Skeleton className="h-4 w-32" />

                <Skeleton className="mt-6 h-9 w-36" />
              </div>
            ))}
          </div>


          <div className="mt-7 max-w-3xl space-y-2">
            <Skeleton className="h-3 w-full" />

            <Skeleton className="h-3 w-5/6" />
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* PROFILE CHART */}
      {/* ==================================================== */}

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <Skeleton className="h-4 w-40" />

            <Skeleton className="mt-5 h-10 w-full max-w-xl" />

            <Skeleton className="mt-3 h-10 w-4/5 max-w-lg" />


            <div className="mt-6 space-y-2">
              <Skeleton className="h-4 w-full" />

              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>


          <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-background">
            {/* Chart header */}

            <div className="flex flex-col gap-5 border-b border-border px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-44" />

                <Skeleton className="h-3 w-64" />
              </div>


              <div className="flex flex-wrap gap-4">
                {Array.from({
                  length: 6,
                }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2"
                  >
                    <Skeleton className="h-1 w-5 rounded-full" />

                    <Skeleton className="h-3 w-16" />
                  </div>
                ))}
              </div>
            </div>


            {/* Fake chart */}

            <div className="h-[520px] px-6 pb-8 pt-10 sm:px-8">
              <div className="relative h-full">
                {/* Horizontal grid */}

                <div className="absolute inset-0 flex flex-col justify-between">
                  {Array.from({
                    length: 6,
                  }).map((_, index) => (
                    <div
                      key={index}
                      className="border-t border-border"
                    />
                  ))}
                </div>


                {/* Line approximations */}

                <div className="absolute inset-x-0 top-[24%]">
                  <Skeleton className="h-1 w-full rounded-full" />
                </div>

                <div className="absolute inset-x-[5%] top-[38%]">
                  <Skeleton className="h-1 w-[90%] rounded-full" />
                </div>

                <div className="absolute inset-x-[8%] top-[52%]">
                  <Skeleton className="h-1 w-[84%] rounded-full" />
                </div>

                <div className="absolute inset-x-[3%] top-[65%]">
                  <Skeleton className="h-1 w-[94%] rounded-full" />
                </div>

                <div className="absolute inset-x-[12%] top-[76%]">
                  <Skeleton className="h-1 w-[76%] rounded-full" />
                </div>
              </div>
            </div>


            {/* Chart footer */}

            <div className="grid gap-4 border-t border-border px-6 py-5 sm:px-8 md:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />

                <Skeleton className="h-3 w-5/6" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />

                <Skeleton className="h-3 w-4/5" />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* LATEST PROFILE */}
      {/* ==================================================== */}

      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Skeleton className="h-4 w-28" />

          <Skeleton className="mt-5 h-10 w-48" />


          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <div
                key={index}
                className="rounded-3xl border border-border bg-background p-6"
              >
                <Skeleton className="h-4 w-36" />

                <Skeleton className="mt-6 h-9 w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ==================================================== */}
      {/* NAVIGATION */}
      {/* ==================================================== */}

      <section>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="flex flex-col gap-5 sm:flex-row">
            {Array.from({
              length: 2,
            }).map((_, index) => (
              <div
                key={index}
                className="flex-1 rounded-3xl border border-border p-7"
              >
                <Skeleton className="h-4 w-20" />

                <Skeleton className="mt-4 h-6 w-48" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}