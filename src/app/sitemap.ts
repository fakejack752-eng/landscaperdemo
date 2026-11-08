import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Sitemap template for the demo website concept.
 *
 * The site is a single-page app using hash routes, so each entry points at
 * its hash URL. Navigation between "pages" is client-side; crawlers that
 * support the fragment will land on the right view.
 *
 * Note: public/robots.txt currently blocks all crawling while this is a
 * demo concept. When the site goes live, update robots.txt to allow
 * crawling and reference this sitemap (see README "Go-live checklist").
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  const lastModified = new Date();

  const routes: Array<{ path: string; priority: number }> = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/gallery", priority: 0.8 },
    { path: "/areas", priority: 0.8 },
    { path: "/estimate", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${base}/#${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
