"use client";

import { ArrowRight, Info, MapPin, Navigation, Phone } from "lucide-react";
import { useRouter } from "@/lib/router";
import { siteConfig } from "@/config/site";
import { PageHero, PageCtaBand } from "@/components/shared/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/lib/motion";
import { Button } from "@/components/ui/button";

const BOROUGH_TONE: Record<string, string> = {
  Queens: "from-sage/40",
  Brooklyn: "from-gold/30",
  "Nassau County": "from-earth/30",
};

/** Service-area page with borough cards, stylized coverage map, and ZIP guidance. */
export function AreasPage() {
  const { navigate } = useRouter();

  return (
    <>
      <PageHero
        eyebrow="Service Areas"
        title="Local Landscaping Across Queens, Brooklyn & Nassau County"
        description="Crews working close to home mean reliable arrival windows, neighborhood know-how, and faster response when it matters. Coverage below is editable sample content."
        crumbs={["Service Areas"]}
      />

      {/* Borough cards */}
      <section className="bg-ivory py-16 lg:py-24" aria-label="Coverage by borough">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Stagger className="grid gap-6 md:grid-cols-3" stagger={0.1}>
            {siteConfig.areas.map((area) => (
              <StaggerItem key={area.borough}>
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg">
                  <div
                    className={`flex items-center gap-3 bg-gradient-to-r to-transparent p-6 pb-5 ${BOROUGH_TONE[area.borough] ?? "from-sage/40"}`}
                  >
                    <span className="grid size-11 place-items-center rounded-xl bg-forest text-gold">
                      <MapPin className="size-5" aria-hidden="true" />
                    </span>
                    <h2 className="font-serif text-2xl font-semibold text-forest">
                      {area.borough}
                    </h2>
                  </div>
                  <div className="flex flex-1 flex-col p-6 pt-4">
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-muted-foreground">
                      {area.neighborhoods.length} example neighborhoods
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {area.neighborhoods.map((n) => (
                        <li
                          key={n}
                          className="rounded-full border border-forest/15 bg-forest/[0.05] px-3 py-1.5 text-xs font-semibold text-forest/85"
                        >
                          {n}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => navigate("/estimate")}
                      className="group mt-auto pt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-forest underline-offset-4 hover:underline"
                    >
                      Check availability here
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1}>
            <p className="mt-8 flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
              <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
              {siteConfig.areasNote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stylized coverage panel */}
      <section className="bg-forest py-16 lg:py-24" aria-label="Coverage overview">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-gold">
                Coverage at a glance
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-ivory sm:text-4xl">
                Close to Home, Everywhere We Work
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-ivory/75">
                A stylized overview — not a real map. On a live website this
                panel could show the business&apos;s actual service radius,
                with neighborhood pins and drive-time shading.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                {siteConfig.areas.map((a) => (
                  <div
                    key={a.borough}
                    className="rounded-xl border border-ivory/15 bg-ivory/[0.06] px-3 py-4"
                  >
                    <p className="font-serif text-3xl font-semibold text-gold">
                      {a.neighborhoods.length}
                    </p>
                    <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-ivory/60">
                      {a.borough}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Decorative map mock */}
            <Reveal delay={0.12}>
              <div
                className="relative overflow-hidden rounded-3xl border border-ivory/15 bg-forest-deep p-6 shadow-2xl"
                aria-hidden="true"
              >
                {/* Grid lines */}
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #F6F4EC 1px, transparent 1px), linear-gradient(to bottom, #F6F4EC 1px, transparent 1px)",
                    backgroundSize: "2.5rem 2.5rem",
                  }}
                />
                {/* Radius rings */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  {[8, 12, 16].map((s) => (
                    <span
                      key={s}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold/30"
                      style={{ width: `${s}rem`, height: `${s}rem` }}
                    />
                  ))}
                </div>
                {/* Pins */}
                {[
                  { top: "22%", left: "30%", label: "Astoria" },
                  { top: "30%", left: "62%", label: "Bayside" },
                  { top: "52%", left: "24%", label: "Greenpoint" },
                  { top: "60%", left: "55%", label: "Forest Hills" },
                  { top: "74%", left: "38%", label: "Garden City" },
                  { top: "82%", left: "68%", label: "Great Neck" },
                ].map((p) => (
                  <span
                    key={p.label}
                    className="absolute flex flex-col items-center gap-1"
                    style={{ top: p.top, left: p.left }}
                  >
                    <span className="grid size-7 place-items-center rounded-full bg-gold text-charcoal shadow-lg">
                      <Navigation className="size-3.5" aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-charcoal/70 px-2 py-0.5 text-[0.55rem] font-bold text-ivory/90">
                      {p.label}
                    </span>
                  </span>
                ))}
                <div className="relative flex h-72 items-end sm:h-80">
                  <p className="w-full rounded-xl bg-charcoal/60 px-4 py-3 text-center text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ivory/70 backdrop-blur-sm">
                    Illustrative coverage map — sample locations
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Don't see your area */}
      <section className="bg-ivory py-16 lg:py-24" aria-label="Availability question">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold text-forest sm:text-4xl">
              Don&apos;t see your neighborhood?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
              {siteConfig.areasCta} On this demo site, the fastest options are
              the estimate form or the placeholder phone line — both show how
              availability questions would be handled.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                onClick={() => navigate("/contact")}
                className="h-12 rounded-full bg-forest px-7 font-bold text-ivory hover:bg-forest-deep"
              >
                Ask about your address
              </Button>
              <a
                href={siteConfig.business.phoneHref}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-forest/30 px-7 font-semibold text-forest transition-colors hover:bg-forest/5"
              >
                <Phone className="size-4" aria-hidden="true" />
                {siteConfig.business.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <PageCtaBand
        title="Ready for a property walkthrough?"
        text="Request an estimate and include your ZIP code — the form captures everything a real dispatcher would need."
      />
    </>
  );
}
