import type {
  MetadataRoute,
} from "next";


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
// ROBOTS
// ============================================================

export default function robots(): MetadataRoute.Robots {
  const siteUrl =
    getSiteUrl();


  return {
    rules: [
      {
        userAgent: "*",

        allow: "/",

        disallow: [
          "/data-check",
        ],
      },
    ],

    sitemap:
      `${siteUrl}/sitemap.xml`,

    host:
      siteUrl,
  };
}