import type {
  Metadata,
} from "next";

import type {
  ReactNode,
} from "react";

import {
  SiteFooter,
} from "@/components/site-footer";

import {
  SiteHeader,
} from "@/components/site-header";

import "./globals.css";


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


const siteUrl =
  getSiteUrl();


// ============================================================
// METADATA
// ============================================================

export const metadata: Metadata = {
  metadataBase:
    new URL(
      siteUrl,
    ),

  applicationName:
    "Media Polarization Lab",

  title: {
    default:
      "Media Polarization Lab",

    template:
      "%s | Media Polarization Lab",
  },

  description:
    "An interactive longitudinal research project examining semantic divergence in climate coverage across U.S. news outlets from 2016 through 2026.",

  manifest:
    "/manifest.webmanifest",

  keywords: [
    "media polarization",
    "climate coverage",
    "climate journalism",
    "semantic analysis",
    "news media",
    "media divergence",
    "climate framing",
    "natural language processing",
    "longitudinal media analysis",
    "news outlet analysis",
  ],

  authors: [
    {
      name:
        "Media Polarization Lab",
    },
  ],

  creator:
    "Media Polarization Lab",

  publisher:
    "Media Polarization Lab",

  category:
    "Research",

  referrer:
    "origin-when-cross-origin",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  alternates: {
    canonical:
      "/",
  },

  openGraph: {
    type:
      "website",

    siteName:
      "Media Polarization Lab",

    title:
      "Media Polarization Lab",

    description:
      "Explore how climate-theme emphasis diverged across U.S. news outlets from 2016 through 2026.",

    url:
      "/",
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Media Polarization Lab",

    description:
      "Explore semantic divergence in climate coverage across U.S. news outlets from 2016 through 2026.",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,

      "max-image-preview":
        "large",

      "max-snippet":
        -1,

      "max-video-preview":
        -1,
    },
  },
};


// ============================================================
// ROOT LAYOUT
// ============================================================

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />

          <div className="flex-1">
            {children}
          </div>

          <SiteFooter />
        </div>
      </body>
    </html>
  );
}