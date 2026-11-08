"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRouter } from "@/lib/router";
import { siteConfig } from "@/config/site";
import { Icon } from "@/lib/icons";
import { Reveal, Stagger, StaggerItem } from "@/lib/motion";

/** Editorial two-column introduction with overlapping imagery and value points. */
export function IntroSection() {
  const { navigate } = useRouter();

  return (
    <section className="bg-ivory py-20 lg:py-28" aria-labelledby="intro-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div>
            <Reveal>
              <p className="flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-earth">
                <span className="h-px w-10 bg-earth/60" aria-hidden="true" />
                The Evergreen Approach
              </p>
              <h2
                id="intro-heading"
                className="mt-4 font-serif text-3xl font-semibold leading-[1.12] tracking-tight text-forest text-balance sm:text-4xl lg:text-[2.75rem]"
              >
                Your Property Deserves More Than{" "}
                <span className="italic text-earth-deep">Ordinary.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                A great landscape isn&apos;t just mowed grass and trimmed
                hedges — it&apos;s the path you walk to the front door, the
                patio where summer dinners happen, and the garden that changes
                with every season. We design and care for outdoor spaces the
                way they&apos;ll actually be used.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                From single-family homes in Queens to commercial properties
                across Nassau County, every project starts with the same
                simple idea: listen first, plan carefully, build to last.
              </p>
            </Reveal>

            {/* Value points */}
            <Stagger className="mt-10 space-y-5" stagger={0.12}>
              {siteConfig.values.map((v) => (
                <StaggerItem key={v.title}>
                  <div className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sage-light text-forest">
                      <Icon name={v.icon} className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-forest">
                        {v.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {v.text}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.15}>
              <button
                onClick={() => navigate("/about")}
                className="group mt-9 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-forest underline-offset-8 hover:underline"
              >
                More about the approach
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </Reveal>
          </div>

          {/* Imagery — editorial overlap */}
          <div className="relative">
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl sm:aspect-[5/5.5]">
                <Image
                  src={siteConfig.images.introMain.src}
                  alt={siteConfig.images.introMain.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-charcoal/60 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-ivory backdrop-blur-sm">
                  Design inspiration
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.28} className="absolute -bottom-10 -left-4 hidden w-1/2 sm:block lg:-left-12">
              <div className="relative aspect-square overflow-hidden rounded-2xl border-[6px] border-ivory shadow-xl">
                <Image
                  src={siteConfig.images.introDetail.src}
                  alt={siteConfig.images.introDetail.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </Reveal>
            {/* Soft frame accent */}
            <div
              className="absolute -right-5 -top-5 -z-10 hidden h-40 w-40 rounded-tr-3xl border-r-2 border-t-2 border-gold/50 sm:block lg:-right-8"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
