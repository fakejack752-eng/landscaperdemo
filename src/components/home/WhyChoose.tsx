"use client";

import { ArrowRight, ShieldCheck, HeartHandshake, Clock, Leaf, Sparkles, MessagesSquare } from "lucide-react";
import { useRouter } from "@/lib/router";
import { siteConfig } from "@/config/site";
import { Icon } from "@/lib/icons";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/lib/motion";

const SUPPORT_ICONS = [ShieldCheck, HeartHandshake, Clock, Leaf, Sparkles, MessagesSquare];

/** Dark section with six editable example benefits. */
export function WhyChoose() {
  const { navigate } = useRouter();

  return (
    <section className="bg-forest py-20 lg:py-28" aria-labelledby="why-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Homeowners & Property Managers Choose This Model"
          title="Landscaping Without the Headaches"
          subtitle="Six qualities a business like this could be built around. Each point below is editable sample positioning — replace it with what genuinely sets the business apart."
          tone="light"
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {siteConfig.benefits.map((b, i) => {
            const SupportIcon = SUPPORT_ICONS[i % SUPPORT_ICONS.length];
            return (
              <StaggerItem key={b.title}>
                <div className="group h-full rounded-2xl border border-ivory/12 bg-ivory/[0.06] p-6 backdrop-blur-[2px] transition-colors duration-300 hover:border-gold/40 hover:bg-ivory/10">
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl bg-gold/15 text-gold transition-colors group-hover:bg-gold/25">
                      <Icon name={b.icon} className="size-5.5" />
                    </span>
                    <SupportIcon
                      className="size-4 text-ivory/25 transition-colors group-hover:text-gold/60"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-semibold text-ivory">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/70">
                    {b.text}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.1} className="mt-10 text-center">
          <p className="mx-auto max-w-2xl text-xs leading-relaxed text-ivory/50">
            Sample positioning only. Statements about licensing, insurance,
            awards, guarantees, or experience would need to be verified with
            the real business before being published.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-8 text-center">
          <button
            onClick={() => navigate("/estimate")}
            className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-charcoal shadow-lg transition-all hover:bg-gold-light hover:shadow-xl"
          >
            Start with an Estimate Request
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
