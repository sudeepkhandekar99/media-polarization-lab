import Link from "next/link";

import {
  ArrowUpRight,
} from "lucide-react";

import {
  APP_NAME,
} from "@/lib/data/constants";


// ============================================================
// NAVIGATION
// ============================================================

const NAVIGATION = [
  {
    label: "Overview",
    href: "/",
  },
  {
    label: "Explore",
    href: "/explore",
  },
  {
    label: "Outlets",
    href: "/outlets",
  },
  {
    label: "Methodology",
    href: "/methodology",
  },
];


// ============================================================
// COMPONENT
// ============================================================

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          {/* ================================================= */}
          {/* PROJECT */}
          {/* ================================================= */}

          <div className="max-w-xl">
            <Link
              href="/"
              className="inline-flex text-lg font-semibold tracking-[-0.02em] text-foreground"
            >
              {APP_NAME}
            </Link>


            <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground">
              An interactive research project
              examining how climate-theme
              emphasis diverged across news
              outlets from 2016 through 2026.
            </p>


            <p className="mt-5 max-w-lg text-xs leading-5 text-muted-foreground">
              Cross-outlet divergence measures
              differences in thematic emphasis.
              It should not by itself be
              interpreted as ideological or
              partisan polarization.
            </p>
          </div>


          {/* ================================================= */}
          {/* LINKS */}
          {/* ================================================= */}

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Navigate
              </p>

              <nav className="mt-4 flex flex-col gap-3">
                {NAVIGATION.map(
                  (item) => (
                    <Link
                      key={
                        item.href
                      }
                      href={
                        item.href
                      }
                      className="w-fit text-sm text-foreground transition-opacity hover:opacity-60"
                    >
                      {
                        item.label
                      }
                    </Link>
                  ),
                )}
              </nav>
            </div>


            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Research
              </p>

              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/methodology"
                  className="inline-flex w-fit items-center gap-1.5 text-sm text-foreground transition-opacity hover:opacity-60"
                >
                  Methodology

                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>


                <Link
                  href="/data-check"
                  className="inline-flex w-fit items-center gap-1.5 text-sm text-foreground transition-opacity hover:opacity-60"
                >
                  Data contract

                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>


                {/*
                  Add the real GitHub repository later.

                  Example:

                  <a
                    href="https://github.com/..."
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-fit items-center gap-1.5 text-sm text-foreground transition-opacity hover:opacity-60"
                  >
                    Source code

                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                */}

                <span className="text-sm text-muted-foreground">
                  Source code
                </span>
              </div>
            </div>
          </div>
        </div>


        {/* ================================================== */}
        {/* BOTTOM */}
        {/* ================================================== */}

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            Semantic climate coverage
            analysis · 2016–2026
          </p>

          <p>
            Research interface built with
            Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}