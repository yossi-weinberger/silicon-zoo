import type { MetadataRoute } from "next";
import { getAllAnimals } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  const animals = getAllAnimals().map((animal) => ({
    url: `${base}/animal/${animal.slug}`,
    lastModified: new Date(animal.lastReviewedAt),
  }));

  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/zoo`, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    ...animals,
  ];
}
