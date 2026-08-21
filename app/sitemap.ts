import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { site } from "@/lib/content/site";

const base = site.url.replace(/\/$/, "");

const paths = [
  "",
  "about",
  "contact",
  "cv",
  "work/tennis-match",
  "work/preferito",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of paths) {
      entries.push({
        url: `${base}/${locale}${path ? `/${path}` : ""}`,
        lastModified: new Date(),
        changeFrequency: path.startsWith("work") ? "monthly" : "weekly",
        priority: path === "" ? 1 : path.startsWith("work") ? 0.9 : 0.7,
      });
    }
  }

  return entries;
}
