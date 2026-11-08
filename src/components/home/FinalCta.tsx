"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/lib/router";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/lib/motion";

/** Full-width closing call-to-action over a golden-hour backyard image. */
export function FinalCta() {
  const { navigate } = useRouter();

  return (
    <section className="relative overflow-hidden" aria-labelledby="final-cta-heading">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={siteConfig.images.cta.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/55 to-forest-deep/85" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:py-36">
        <Reveal>
          <p className="flex items-center justify-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-gold">
            <span className="h-px w-10 bg-gold/70" aria-hidden="true" />
            Let&apos;s Get Started
            <span className="h-px w-10 bg-gold/70" aria-hidden="true" />
          </p>
          <h2
            id="final-cta-heading"
            className="mt-5 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-ivory text-balance sm:text-5xl lg:text-6xl"
          >
            Let&apos;s Create an Outdoor Space You&apos;ll{" "}
            <span className="italic text-gold-light">Love.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ivory/85 sm:text-lg">
            Tell us about your property today — the guided request takes about
            a minute, and a real conversation is always one phone call away.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <Button
              onClick={() => navigate("/estimate")}
              className="h-12 rounded-full bg-gold px-8 text-base font-bold text-charcoal shadow-xl transition-all hover:bg-gold-light"
            >
              Request an Estimate
            </Button>
            <Button
              onClick={() => navigate("/contact")}
              variant="outline"
              className="h-12 rounded-full border-ivory/40 bg-ivory/5 px-8 text-base font-semibold text-ivory backdrop-blur-sm hover:bg-ivory/15 hover:text-ivory"
            >
              <Phone className="size-4" aria-hidden="true" />
              {siteConfig.business.phoneDisplay}
            </Button>
          </div>
          <p className="mt-6 text-xs text-ivory/55">
            {siteConfig.business.serviceAreaLine} · Placeholder contact details
            shown for demonstration
          </p>
        </Reveal>
      </div>
    </section>
  );
}
