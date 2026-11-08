"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useRouter } from "@/lib/router";
import { siteConfig } from "@/config/site";
import { Icon } from "@/lib/icons";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger, StaggerItem } from "@/lib/motion";

/** Grid of all ten sample services with image cards. */
export function ServicesGrid() {
  const { navigate } = useRouter();

  return (
    <section
      className="bg-ivory-soft py-20 lg:py-28"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="Services for Every Season & Every Property"
          subtitle="Ten core services covering design, build, and year-round care — for homes, businesses, and residential communities. Each listing below is sample content, ready to match a real service menu."
        />

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {siteConfig.services.map((service) => (
            <StaggerItem key={service.slug}>
              <button
                onClick={() => navigate(`/services/${service.slug}`)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:-translate-y-1"
                aria-label={`${service.title} — view service details`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={service.cardImage}
                    alt={service.cardAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-transparent to-transparent" />
                  <span className="absolute left-3 top-3 grid size-10 place-items-center rounded-xl bg-ivory/95 text-forest shadow-sm">
                    <Icon name={service.icon} className="size-5" />
                  </span>
                  <span className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-gold text-charcoal opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="size-4.5" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-xl font-semibold leading-snug text-forest">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {service.short}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-earth-deep">
                    Explore service
                    <ArrowRight
                      className="size-3.5 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </button>
            </StaggerItem>
          ))}

          {/* CTA tile completes the 3-col grid */}
          <StaggerItem>
            <button
              onClick={() => navigate("/estimate")}
              className="group flex h-full w-full flex-col justify-between rounded-2xl bg-forest p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-forest-deep hover:shadow-xl"
            >
              <div>
                <h3 className="font-serif text-2xl font-semibold leading-snug text-ivory">
                  Not sure where to start?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/75">
                  Tell us about your property and what you&apos;d like to
                  change. We&apos;ll suggest the right service — and a clear
                  plan to get there.
                </p>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-charcoal transition-colors group-hover:bg-gold-light">
                Request an Estimate
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </button>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
