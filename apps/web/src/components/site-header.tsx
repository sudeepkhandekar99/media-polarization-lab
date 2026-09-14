"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";
import {
  usePathname,
} from "next/navigation";

import {
  Menu,
  X,
} from "lucide-react";

import {
  APP_NAME,
} from "@/lib/data/constants";


// ============================================================
// NAVIGATION
// ============================================================

const NAV_ITEMS = [
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
// HELPERS
// ============================================================

function isRouteActive(
  pathname: string,
  href: string,
) {
  if (href === "/") {
    return pathname === "/";
  }

  return (
    pathname === href ||
    pathname.startsWith(
      `${href}/`,
    )
  );
}


// ============================================================
// COMPONENT
// ============================================================

export function SiteHeader() {
  const pathname =
    usePathname();

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);


  // ----------------------------------------------------------
  // CLOSE MOBILE MENU ON ROUTE CHANGE
  // ----------------------------------------------------------

  useEffect(
    () => {
      setMobileOpen(false);
    },
    [pathname],
  );


  // ----------------------------------------------------------
  // PREVENT BODY SCROLL WHILE MOBILE MENU IS OPEN
  // ----------------------------------------------------------

  useEffect(
    () => {
      if (!mobileOpen) {
        document.body.style.overflow =
          "";

        return;
      }

      document.body.style.overflow =
        "hidden";


      return () => {
        document.body.style.overflow =
          "";
      };
    },
    [mobileOpen],
  );


  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* ================================================== */}
        {/* BRAND */}
        {/* ================================================== */}

        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3"
          aria-label={`${APP_NAME} home`}
        >
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background">
            <span className="h-2.5 w-2.5 rounded-full bg-foreground transition-transform duration-300 group-hover:scale-125" />
          </div>


          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-[-0.02em] text-foreground sm:text-[15px]">
              {APP_NAME}
            </p>

            <p className="hidden text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:block">
              Climate coverage research
            </p>
          </div>
        </Link>


        {/* ================================================== */}
        {/* DESKTOP NAV */}
        {/* ================================================== */}

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map(
            (item) => {
              const active =
                isRouteActive(
                  pathname,
                  item.href,
                );


              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={
                    active
                      ? "page"
                      : undefined
                  }
                  className={[
                    "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                    active
                      ? "border-border bg-muted text-foreground"
                      : "border-transparent text-muted-foreground hover:border-border hover:bg-muted/60 hover:text-foreground",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            },
          )}
        </nav>


        {/* ================================================== */}
        {/* MOBILE BUTTON */}
        {/* ================================================== */}

        <button
          type="button"
          onClick={() =>
            setMobileOpen(
              (current) =>
                !current,
            )
          }
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted md:hidden"
          aria-label={
            mobileOpen
              ? "Close navigation"
              : "Open navigation"
          }
          aria-expanded={
            mobileOpen
          }
        >
          {mobileOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </button>
      </div>


      {/* ==================================================== */}
      {/* MOBILE NAV */}
      {/* ==================================================== */}

      {mobileOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6">
            <nav className="flex flex-col">
              {NAV_ITEMS.map(
                (
                  item,
                  index,
                ) => {
                  const active =
                    isRouteActive(
                      pathname,
                      item.href,
                    );


                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={
                        active
                          ? "page"
                          : undefined
                      }
                      className={[
                        "group flex items-center justify-between border-b border-border py-5 text-lg font-medium tracking-[-0.02em] last:border-b-0",
                        active
                          ? "text-foreground"
                          : "text-muted-foreground",
                      ].join(" ")}
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-5 font-mono text-[10px] text-muted-foreground">
                          {String(
                            index + 1,
                          ).padStart(
                            2,
                            "0",
                          )}
                        </span>

                        <span>
                          {item.label}
                        </span>
                      </div>


                      <span
                        className={[
                          "h-2 w-2 rounded-full transition-opacity",
                          active
                            ? "bg-foreground opacity-100"
                            : "bg-muted-foreground opacity-0 group-hover:opacity-40",
                        ].join(" ")}
                      />
                    </Link>
                  );
                },
              )}
            </nav>


            <div className="mt-6 rounded-2xl bg-muted/50 p-4">
              <p className="text-xs leading-5 text-muted-foreground">
                Tracking semantic divergence in
                climate coverage across news
                outlets from 2016 through 2026.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}