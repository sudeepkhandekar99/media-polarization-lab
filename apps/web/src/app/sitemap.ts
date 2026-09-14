import type {
  MetadataRoute,
} from "next";

import {
  loadOutletSummaries,
} from "@/lib/data";


// ============================================================
// SITE URL
// ============================================================

function getSiteUrl() {
  const value =
    process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!value) {
    return "http://localhost:3000";
  }

  return value.replace(
    /\/+$/,
    "",
  );
}


// ============================================================
// SITEMAP
// ============================================================

export default async function sitemap(): Promise<
  MetadataRoute.Sitemap
> {
  const siteUrl =
    getSiteUrl();


  const outletSummaries =
    await loadOutletSummaries();


  // ----------------------------------------------------------
  // STATIC ROUTES
  // ----------------------------------------------------------

  const staticRoutes: MetadataRoute.Sitemap =
    [
      {
        url: `${siteUrl}/`,
        changeFrequency:
          "monthly",
        priority: 1,
      },

      {
        url: `${siteUrl}/explore`,
        changeFrequency:
          "monthly",
        priority: 0.9,
      },

      {
        url: `${siteUrl}/outlets`,
        changeFrequency:
          "monthly",
        priority: 0.9,
      },

      {
        url: `${siteUrl}/methodology`,
        changeFrequency:
          "yearly",
        priority: 0.8,
      },
    ];


  // ----------------------------------------------------------
  // OUTLET ROUTES
  // ----------------------------------------------------------

  const outletRoutes: MetadataRoute.Sitemap =
    outletSummaries.map(
      (outlet) => ({
        url: `${siteUrl}/outlets/${encodeURIComponent(
          outlet.media_name,
        )}`,

        changeFrequency:
          "monthly",

        priority:
          outlet.stable_90
            ? 0.8
            : 0.6,
      }),
    );


  // ----------------------------------------------------------
  // RETURN
  // ----------------------------------------------------------

  return [
    ...staticRoutes,
    ...outletRoutes,
  ];
}