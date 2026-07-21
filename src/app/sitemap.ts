import type { MetadataRoute } from "next";
import { getAllAnimals } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://silicon-zoo.vercel.app";
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
