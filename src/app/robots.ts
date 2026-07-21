import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://silicon-zoo.vercel.app";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/audit"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
