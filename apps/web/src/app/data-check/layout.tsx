// apps/web/src/app/data-check/layout.tsx

import type {
  Metadata,
} from "next";

import type {
  ReactNode,
} from "react";


// ============================================================
// METADATA
// ============================================================

export const metadata: Metadata = {
  title: "Data Contract Check",

  description:
    "Internal validation page for the Media Polarization Lab application data contract.",

  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};


// ============================================================
// LAYOUT
// ============================================================

export default function DataCheckLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}