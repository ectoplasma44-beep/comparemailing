import type { MetadataRoute } from "next";
import { getAllTools, VS_COMBINATIONS, getVsPageSlug } from "@/data/tools";
import { getAllProfiles } from "@/data/profiles";

const BASE = "https://toolpick.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const homepage: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  const vsPages: MetadataRoute.Sitemap = VS_COMBINATIONS.map(([slugA, slugB]) => ({
    url: `${BASE}/${getVsPageSlug(slugA, slugB)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const alternativePages: MetadataRoute.Sitemap = getAllTools().map((tool) => ({
    url: `${BASE}/alternative/${tool.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const profilPages: MetadataRoute.Sitemap = getAllProfiles().map((profil) => ({
    url: `${BASE}/meilleur-emailing/${profil.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/simulateur-cout`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/quiz`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/outils`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/guide`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  return [...homepage, ...staticPages, ...vsPages, ...alternativePages, ...profilPages];
}
