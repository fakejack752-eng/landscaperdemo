"use client";

import { ArrowRight, Info } from "lucide-react";
import { useRouter } from "@/lib/router";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/lib/motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/** FAQ accordion with editable example answers. */
export function FaqSection() {
  const { navigate } = useRouter();

  return (
    <section className="bg-ivory py-20 lg:py-28" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Questions, Answered"
          title="Frequently Asked Questions"
          subtitle="Example copy below shows how a real business might answer the questions customers ask most."
        />

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-3xl">
          <Accordion
            type="single"
            collapsible
            className="w-full rounded-2xl border border-border bg-card px-5 shadow-sm sm:px-7"
          >
            {siteConfig.faqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${i}`}
                className="border-border/70 last:border-b-0"
              >
                <AccordionTrigger className="py-5 text-left font-serif text-lg font-semibold leading-snug text-forest hover:text-earth-deep hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="mt-5 flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
            {siteConfig.faqNote}
          </p>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Still curious about something?
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="group mt-3 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-bold text-ivory transition-colors hover:bg-forest-deep"
            >
              Ask us directly
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
