"use client";

import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/lib/motion";

/** Four-step engagement process — horizontal timeline on desktop, vertical on mobile. */
export function ProcessSection() {
  return (
    <section className="bg-ivory py-20 lg:py-28" aria-labelledby="process-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How It Works"
          title="From First Hello to Finished Project"
          subtitle="A simple, transparent process — so you always know what happens next. (Example workflow shown.)"
        />

        <div className="relative mt-16">
          {/* Desktop connector line */}
          <div
            className="absolute left-0 right-0 top-[2.4rem] hidden h-px bg-gradient-to-r from-transparent via-earth/40 to-transparent lg:block"
            aria-hidden="true"
          />

          <Stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6" stagger={0.12}>
            {siteConfig.process.map((p) => (
              <StaggerItem key={p.step}>
                <div className="group relative text-center lg:px-3">
                  {/* Number badge */}
                  <div className="relative z-10 mx-auto grid size-[4.8rem] place-items-center rounded-full border border-earth/30 bg-card shadow-md transition-all duration-300 group-hover:border-gold group-hover:shadow-lg">
                    <span className="font-serif text-[1.7rem] font-semibold text-earth-deep transition-colors group-hover:text-forest">
                      {p.step}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-semibold text-forest">
                    {p.title}
                  </h3>
                  <p className="mx-auto mt-2.5 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    {p.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.1} className="mt-14">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-gold/40 bg-gold/10 p-6 text-center sm:flex-row sm:text-left">
            <span className="font-serif text-2xl text-earth-deep" aria-hidden="true">
              ✦
            </span>
            <p className="text-sm leading-relaxed text-foreground/85">
              <span className="font-bold text-forest">Ready when you are.</span>{" "}
              Most estimate requests in this demo take about a minute to
              complete — the real form would go straight to the business&apos;s
              inbox or CRM.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
