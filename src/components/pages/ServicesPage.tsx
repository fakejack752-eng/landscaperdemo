"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useRouter } from "@/lib/router";
import { siteConfig } from "@/config/site";
import { Icon } from "@/lib/icons";
import { PageHero, PageCtaBand } from "@/components/shared/PageHero";
import { Reveal } from "@/lib/motion";

/** All ten services as rich alternating cards. */
export function ServicesPage() {
  const { navigate } = useRouter();

  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Complete Landscape Care, From Design to Year-Round Maintenance"
        description="Ten example services covering design, installation, and seasonal upkeep for homes, businesses, and residential communities across Queens, Brooklyn & Nassau County. Every listing below is editable sample content."
        crumbs={["Services"]}
      />

      <section className="bg-ivory py-16 lg:py-24" aria-label="Service listings">
        <div className="mx-auto max-w-7xl space-y-14 px-4 sm:px-6 lg:space-y-20 lg:px-8">
          {siteConfig.services.map((service, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal key={service.slug}>
                <article
                  className={`group grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                    flip ? "lg:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  {/* Image */}
                  <button
                    onClick={() => navigate(`/services/${service.slug}`)}
                    className="relative block aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-md outline-offset-4"
                    aria-label={`View ${service.title} details`}
                  >
                    <Image
                      src={service.cardImage}
                      alt={service.cardAlt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute bottom-3 left-3 rounded-full bg-charcoal/60 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-ivory backdrop-blur-sm">
                      Design inspiration
                    </span>
                  </button>

                  {/* Copy */}
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="grid size-11 place-items-center rounded-xl bg-sage-light text-forest">
                        <Icon name={service.icon} className="size-5" />
                      </span>
                      <span className="text-[0.65rem] font-black uppercase tracking-[0.22em] text-earth">
                        Service {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-forest sm:text-[2.1rem]">
                      {service.title}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                      {service.intro.split(". ").slice(0, 2).join(". ")}.
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {service.types.slice(0, 3).map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-forest/15 bg-forest/[0.04] px-3 py-1.5 text-xs font-semibold text-forest/80"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => navigate(`/services/${service.slug}`)}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-forest underline-offset-8 hover:underline"
                    >
                      View service details
                      <ArrowRight
                        className="size-4 transition-transform hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Quick-jump chip cloud */}
      <section className="bg-ivory-soft py-14" aria-label="Quick service links">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Reveal>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-earth">
              Jump straight to a service
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2.5">
              {siteConfig.services.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => navigate(`/services/${s.slug}`)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-forest/20 bg-card px-4 py-2 text-xs font-bold text-forest transition-all hover:border-gold hover:bg-gold/10"
                >
                  {s.title}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <PageCtaBand
        title="Ready to talk through your project?"
        text="Send an estimate request and we'll match the right service to your property, timeline, and budget."
      />
    </>
  );
}
