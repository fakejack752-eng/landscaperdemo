"use client";

import { Quote } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger, StaggerItem } from "@/lib/motion";

/** Honest testimonial placeholders — no fabricated reviews, stars, or badges. */
export function TestimonialsPlaceholder() {
  return (
    <section
      className="bg-ivory-soft py-20 lg:py-28"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What Clients Say"
          title="Reserved for Real Customer Voices"
          subtitle="This section intentionally stays empty in the demo. Once connected, approved reviews from real customers would live here — never invented ones."
        />

        <Stagger className="mt-14 grid gap-5 md:grid-cols-3" stagger={0.1}>
          {[1, 2, 3].map((n) => (
            <StaggerItem key={n}>
              <figure className="flex h-full flex-col items-center rounded-2xl border-2 border-dashed border-sage bg-ivory/50 p-7 text-center">
                <span className="grid size-11 place-items-center rounded-full bg-sage-light text-forest/50">
                  <Quote className="size-5" aria-hidden="true" />
                </span>
                <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {siteConfig.reviewPlaceholderText}
                </blockquote>
                <figcaption className="mt-auto pt-4">
                  <span className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.18em] text-muted-foreground">
                    Placeholder {n} of 3
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
          Demo sites never ship with fabricated testimonials, star ratings, or
          trust badges — those require genuine, approved customer feedback.
        </p>
      </div>
    </section>
  );
}
