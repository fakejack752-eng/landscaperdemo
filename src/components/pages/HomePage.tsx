"use client";

import { Hero } from "@/components/home/Hero";
import { IntroSection } from "@/components/home/IntroSection";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { WhyChoose } from "@/components/home/WhyChoose";
import { ProcessSection } from "@/components/home/ProcessSection";
import { EstimateForm } from "@/components/forms/EstimateForm";
import { LeadFlowDemo } from "@/components/home/LeadFlowDemo";
import { SeasonsSection } from "@/components/home/SeasonsSection";
import { AreasPreview } from "@/components/home/AreasPreview";
import { TestimonialsPlaceholder } from "@/components/home/TestimonialsPlaceholder";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";
import { SectionHeading } from "@/components/shared/SectionHeading";

/** The home page — 13 sections assembled in order. */
export function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Editorial introduction */}
      <IntroSection />

      {/* 3. Services grid */}
      <ServicesGrid />

      {/* 4. Project inspiration preview */}
      <section
        className="bg-ivory py-20 lg:py-28"
        aria-labelledby="inspiration-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Project Inspiration"
            title="Ideas for Backyards, Patios, Gardens & More"
            subtitle="Browse example looks by category — every image is shared as design inspiration for what could be built on your property."
          />
          <GalleryGrid limit={6} className="mt-12" />
        </div>
      </section>

      {/* 5. Why choose */}
      <WhyChoose />

      {/* 6. Process */}
      <ProcessSection />

      {/* 7. Multi-step estimate form */}
      <section
        className="bg-ivory-soft py-20 lg:py-28"
        aria-labelledby="estimate-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Request an Estimate"
            title="Tell Us About Your Project — In About a Minute"
            subtitle="A guided five-step request that captures exactly what a landscaping crew needs to quote confidently."
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <EstimateForm compact />
          </div>
        </div>
      </section>

      {/* 8. AI automation demonstration */}
      <LeadFlowDemo />

      {/* 9. Seasonal services */}
      <SeasonsSection />

      {/* 10. Service areas */}
      <AreasPreview />

      {/* 11. Testimonial placeholders */}
      <TestimonialsPlaceholder />

      {/* 12. FAQ */}
      <FaqSection />

      {/* 13. Final CTA */}
      <FinalCta />
    </>
  );
}
