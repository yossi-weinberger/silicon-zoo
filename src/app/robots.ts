import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = SITE_URL;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/audit"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
