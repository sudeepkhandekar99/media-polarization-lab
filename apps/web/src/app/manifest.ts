import type {
  MetadataRoute,
} from "next";


// ============================================================
// MANIFEST
// ============================================================

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:
      "Media Polarization Lab",

    short_name:
      "Media Polarization Lab",

    description:
      "An interactive research project examining semantic divergence in climate coverage across U.S. news outlets from 2016 through 2026.",

    start_url:
      "/",

    display:
      "standalone",

    background_color:
      "#fbfaf7",

    theme_color:
      "#fbfaf7",

    orientation:
      "portrait-primary",

    categories: [
      "education",
      "research",
      "news",
      "data visualization",
    ],
  };
}