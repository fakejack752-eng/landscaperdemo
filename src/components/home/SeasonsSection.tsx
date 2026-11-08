"use client";

import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useRouter } from "@/lib/router";
import { siteConfig } from "@/config/site";
import { Icon } from "@/lib/icons";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger, StaggerItem, Reveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SEASON_IMG: Record<string, string> = {
  spring: "from-sage/60",
  summer: "from-gold/50",
  fall: "from-earth/60",
  winter: "from-sage-light/70",
};

/** Four interactive season cards that expand to show example seasonal services. */
export function SeasonsSection() {
  const { navigate } = useRouter();
  const [open, setOpen] = useState<string | null>("spring");

  return (
    <section
      className="bg-ivory-soft py-20 lg:py-28"
      aria-labelledby="seasons-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Year-Round Care"
          title="What Your Property Needs, Season by Season"
          subtitle="Tap a season to see example services a full-service crew could handle through the year."
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.09}>
          {siteConfig.seasons.map((season) => {
            const expanded = open === season.key;
            return (
              <StaggerItem key={season.key}>
                <div
                  className={cn(
                    "flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300",
                    expanded
                      ? "border-gold/60 shadow-xl"
                      : "border-border shadow-sm hover:-translate-y-0.5 hover:shadow-md"
                  )}
                >
                  <button
                    onClick={() => setOpen(expanded ? null : season.key)}
                    aria-expanded={expanded}
                    aria-controls={`season-panel-${season.key}`}
                    className="flex flex-1 flex-col items-start p-6 text-left outline-offset-[-4px]"
                  >
                    <span
                      className={cn(
                        "grid size-12 place-items-center rounded-2xl bg-gradient-to-br to-transparent text-forest",
                        SEASON_IMG[season.key] ?? "from-sage/50"
                      )}
                    >
                      <Icon name={season.icon} className="size-6" />
                    </span>
                    <h3 className="mt-4 font-serif text-2xl font-semibold text-forest">
                      {season.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {season.blurb}
                    </p>
                    <span
                      className="mt-4 inline-flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-earth-deep"
                      aria-hidden="true"
                    >
                      {expanded ? "Hide services" : "View example services"}
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform duration-300",
                          expanded && "rotate-180"
                        )}
                      />
                    </span>
                  </button>

                  {/* Expandable panel */}
                  <div
                    id={`season-panel-${season.key}`}
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      expanded
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-border bg-ivory/70 px-6 py-5">
                        <ul className="space-y-2.5">
                          {season.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-sm text-foreground/85"
                            >
                              <span
                                className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-gold"
                                aria-hidden="true"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => navigate("/estimate")}
                          className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-forest underline-offset-4 hover:underline"
                        >
                          Request a seasonal estimate
                          <ArrowRight className="size-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Seasonal menus above are editable examples, matched to a typical
            northeastern service calendar.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
