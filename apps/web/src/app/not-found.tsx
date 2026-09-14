import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  SearchX,
} from "lucide-react";


// ============================================================
// PAGE
// ============================================================

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center">
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          {/* ================================================= */}
          {/* STATUS */}
          {/* ================================================= */}

          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-muted/40">
              <SearchX className="h-5 w-5 text-muted-foreground" />
            </div>


            <p className="mt-8 font-mono text-sm text-muted-foreground">
              404
            </p>


            <h1 className="mt-3 text-5xl font-semibold tracking-[-0.045em] sm:text-6xl">
              Page not found.
            </h1>
          </div>


          {/* ================================================= */}
          {/* EXPLANATION */}
          {/* ================================================= */}

          <div className="max-w-2xl">
            <p className="text-lg leading-8 text-muted-foreground">
              The page or outlet you requested
              does not exist in the current
              research interface.
            </p>


            <p className="mt-5 leading-7 text-muted-foreground">
              If you followed an outlet link,
              the outlet may not have a
              qualifying profile in the
              exported application dataset.
            </p>


            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-5 py-3 text-sm font-medium text-white transition-all hover:bg-foreground/90"
              >
                <ArrowLeft className="h-4 w-4" />

                Back to overview
              </Link>


              <Link
                href="/outlets"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Browse outlets

                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>


        {/* ================================================== */}
        {/* QUICK ROUTES */}
        {/* ================================================== */}

        <div className="mt-20 grid gap-4 border-t border-border pt-8 sm:grid-cols-3">
          <QuickLink
            href="/explore"
            label="Explore trends"
            description="Compare climate dimensions and panel specifications."
          />

          <QuickLink
            href="/outlets"
            label="Outlet explorer"
            description="Browse outlet-level climate-impact trajectories."
          />

          <QuickLink
            href="/methodology"
            label="Methodology"
            description="Review the research design and interpretation."
          />
        </div>
      </div>
    </main>
  );
}


// ============================================================
// QUICK LINK
// ============================================================

function QuickLink({
  href,
  label,
  description,
}: {
  href: string;
  label: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-border p-5 transition-colors hover:bg-muted/40"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="font-medium">
          {label}
        </p>

        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </div>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </Link>
  );
}