"use client";

import { useEffect } from "react";
import { CheckCircle2, Clock, Info, Phone, ShieldCheck } from "lucide-react";
import { useRouter } from "@/lib/router";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/shared/PageHero";
import { EstimateForm } from "@/components/forms/EstimateForm";
import { useEstimateStore } from "@/store/estimate";
import { Reveal } from "@/lib/motion";

const REASSURANCES = [
  {
    icon: Clock,
    title: "Takes about a minute",
    text: "Five short steps with clear choices — no account needed, no long forms.",
  },
  {
    icon: ShieldCheck,
    title: "Demo-safe by design",
    text: "Nothing you type here is sent, stored, or shared. It exists only on your screen.",
  },
  {
    icon: Phone,
    title: "Call instead",
    text: "Prefer to talk it through? The placeholder phone line shows where a real number would sit.",
  },
];

/** Dedicated estimate page: hero + multi-step form + reassurance sidebar. */
export function EstimatePage() {
  const { navigate } = useRouter();

  // Clear any service prefill when leaving the estimate page so future
  // visits start fresh.
  useEffect(() => {
    return () => {
      useEstimateStore.getState().assignPrefill(null);
    };
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Request an Estimate"
        title="Tell Us About Your Property"
        description="A guided five-step request that captures your service, property, timeline, and contact preferences — everything a landscaping business needs to respond with a clear plan."
        crumbs={["Request an Estimate"]}
      />

      <section className="bg-ivory-soft py-16 lg:py-24" aria-label="Estimate request form">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            {/* Form */}
            <Reveal>
              <EstimateForm />
            </Reveal>

            {/* Sidebar */}
            <Reveal delay={0.12} className="space-y-5 lg:sticky lg:top-24">
              {REASSURANCES.map((r) => (
                <div
                  key={r.title}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-sage-light text-forest">
                    <r.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="font-serif text-lg font-semibold text-forest">
                      {r.title}
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {r.text}
                    </p>
                  </div>
                </div>
              ))}

              <div className="rounded-2xl border border-gold/50 bg-gold/10 p-5">
                <p className="flex items-start gap-2.5 text-xs leading-relaxed text-foreground/85">
                  <Info className="mt-0.5 size-4 shrink-0 text-earth-deep" aria-hidden="true" />
                  {siteConfig.demo.formNotice} Connecting this form to a real
                  inbox or CRM is documented in the project README.
                </p>
              </div>

              <div className="rounded-2xl bg-forest p-6 text-ivory shadow-md">
                <h2 className="font-serif text-xl font-semibold">
                  What happens after a real submission?
                </h2>
                <ul className="mt-4 space-y-3">
                  {[
                    "The request lands in the business pipeline instantly",
                    "The team gets an immediate notification",
                    "You receive a quick acknowledgment message",
                    "A consultation time gets booked and synced",
                  ].map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-sm text-ivory/80">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                      {s}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate("/")}
                  className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-gold underline-offset-4 hover:underline"
                >
                  See the interactive walkthrough
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
