"use client";

import { Info } from "lucide-react";
import { siteConfig } from "@/config/site";
import { PageHero, PageCtaBand } from "@/components/shared/PageHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Reveal } from "@/lib/motion";

/** Full project-inspiration gallery. */
export function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Project Inspiration"
        title="Outdoor Spaces to Spark Ideas"
        description="Browse the full collection by category — backyards, patios, gardens, commercial settings, and landscape lighting. Imagery is shared as design inspiration, not as claims of finished work."
        crumbs={["Project Inspiration"]}
      />

      <section className="bg-ivory py-16 lg:py-24" aria-label="Inspiration gallery">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl rounded-2xl border border-dashed border-earth/40 bg-earth/[0.06] p-4">
              <p className="flex items-start gap-2.5 text-xs leading-relaxed text-foreground/80">
                <Info className="mt-0.5 size-4 shrink-0 text-earth-deep" aria-hidden="true" />
                Every image on this page is an example concept. Photos of real
                completed projects would only appear here with the client&apos;s
                permission.
              </p>
            </div>
          </Reveal>
          <GalleryGrid className="mt-10" />
        </div>
      </section>

      <PageCtaBand
        title="See something you like?"
        text="Send an estimate request and mention the styles that caught your eye — the guided form makes it easy to describe the look you're going for."
      />
    </>
  );
}
