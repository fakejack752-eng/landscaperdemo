"use client";

import { ArrowRight, Info, MapPin } from "lucide-react";
import { useRouter } from "@/lib/router";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/lib/motion";

/** Home-page service-area preview with borough columns and neighborhood chips. */
export function AreasPreview() {
  const { navigate } = useRouter();

  return (
    <section className="bg-ivory py-20 lg:py-28" aria-labelledby="areas-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Where We Work"
          title="Proudly Serving Queens, Brooklyn & Nassau County"
          subtitle="Local crews, familiar neighborhoods, and scheduling built around the communities we work in every week."
        />

        <Stagger className="mt-14 grid gap-5 md:grid-cols-3" stagger={0.1}>
          {siteConfig.areas.map((area) => (
            <StaggerItem key={area.borough}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-sage-light text-forest">
                    <MapPin className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-serif text-2xl font-semibold text-forest">
                    {area.borough}
                  </h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {area.neighborhoods.map((n) => (
                    <li
                      key={n}
                      className="rounded-full border border-forest/15 bg-forest/[0.05] px-3 py-1.5 text-xs font-semibold text-forest/85"
                    >
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-dashed border-earth/40 bg-earth/[0.06] p-4">
            <p className="flex items-start gap-2.5 text-xs leading-relaxed text-foreground/80">
              <Info className="mt-0.5 size-4 shrink-0 text-earth-deep" aria-hidden="true" />
              {siteConfig.areasNote}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-8 text-center">
          <button
            onClick={() => navigate("/areas")}
            className="group inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-bold text-ivory transition-colors hover:bg-forest-deep"
          >
            View all service areas
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
