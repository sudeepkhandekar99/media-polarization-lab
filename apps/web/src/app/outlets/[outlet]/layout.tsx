import type {
  Metadata,
} from "next";

import type {
  ReactNode,
} from "react";

import {
  getOutletSummaryByName,
  loadOutletSummaries,
} from "@/lib/data";


// ============================================================
// TYPES
// ============================================================

interface OutletLayoutProps {
  children: ReactNode;

  params: Promise<{
    outlet: string;
  }>;
}


// ============================================================
// HELPERS
// ============================================================

function safeDecode(
  value: string,
) {
  try {
    return decodeURIComponent(
      value,
    );
  } catch {
    return value;
  }
}


// ============================================================
// DYNAMIC METADATA
// ============================================================

export async function generateMetadata({
  params,
}: Omit<
  OutletLayoutProps,
  "children"
>): Promise<Metadata> {
  const {
    outlet: outletParam,
  } = await params;


  const outletName =
    safeDecode(
      outletParam,
    );


  const outletSummaries =
    await loadOutletSummaries();


  const outletSummary =
    getOutletSummaryByName(
      outletSummaries,
      outletName,
    );


  // ----------------------------------------------------------
  // UNKNOWN OUTLET
  // ----------------------------------------------------------

  if (!outletSummary) {
    return {
      title:
        "Outlet not found",

      description:
        "The requested outlet is not available in the Media Polarization Lab research dataset.",

      robots: {
        index: false,
        follow: false,
      },
    };
  }


  // ----------------------------------------------------------
  // VALID OUTLET
  // ----------------------------------------------------------

  const title =
    outletSummary.media_name;


  const description =
    `Explore ${outletSummary.media_name}'s climate coverage from 2016 to 2026, including thematic emphasis, climate-impact trends, coverage continuity, and longitudinal semantic profiles.`;


  return {
    title,

    description,

    openGraph: {
      title:
        `${title} | Media Polarization Lab`,

      description,

      type: "article",
    },

    twitter: {
      card:
        "summary_large_image",

      title:
        `${title} | Media Polarization Lab`,

      description,
    },
  };
}


// ============================================================
// LAYOUT
// ============================================================

export default function OutletLayout({
  children,
}: OutletLayoutProps) {
  return children;
}