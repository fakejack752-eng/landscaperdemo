"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/lib/router";
import { siteConfig } from "@/config/site";
import { EASE } from "@/lib/motion";

/** Fade-up helper that honors reduced-motion preferences. */
function HeroFade({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const { navigate } = useRouter();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: background drifts down & zooms slightly; content floats up.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.14]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-charcoal"
      aria-label="Introduction"
    >
      {/* Background image */}
      <div className="absolute inset-0" aria-hidden="true">
        <motion.div
          style={reduce ? undefined : { y: bgY, scale: bgScale }}
          className="absolute inset-0"
        >
          <Image
            src={siteConfig.images.hero.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
        {/* Layered gradients for legibility + brand mood */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/45 to-charcoal/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-transparent to-charcoal/40" />
      </div>

      {/* Content */}
      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-28 pt-32 sm:px-6 lg:px-8 lg:pb-36 lg:pt-40"
      >
        <div className="max-w-2xl">
          <HeroFade delay={0.05}>
            <p className="inline-flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.7rem] font-bold uppercase tracking-[0.26em] text-gold">
              <span className="h-px w-10 bg-gold/70" aria-hidden="true" />
              Landscape Design · Lawn Care · Outdoor Living
            </p>
          </HeroFade>

          <HeroFade delay={0.18}>
            <h1 className="mt-5 font-serif text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-ivory text-balance sm:text-6xl lg:text-[4.2rem]">
              Outdoor Spaces Designed for the Way You{" "}
              <span className="italic text-gold-light">Live.</span>
            </h1>
          </HeroFade>

          <HeroFade delay={0.32}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/85 sm:text-lg">
              {siteConfig.business.tagline} From weekly lawn care to complete
              backyard transformations — one team for design, build, and
              year-round care.
            </p>
          </HeroFade>

          <HeroFade delay={0.46}>
            <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <Button
                onClick={() => navigate("/estimate")}
                className="h-12 rounded-full bg-gold px-7 text-base font-bold text-charcoal shadow-lg transition-all hover:bg-gold-light hover:shadow-xl active:scale-95"
              >
                Request an Estimate
              </Button>
              <Button
                onClick={() => navigate("/gallery")}
                variant="outline"
                className="h-12 rounded-full border-ivory/40 bg-ivory/5 px-7 text-base font-semibold text-ivory backdrop-blur-sm transition-all hover:bg-ivory/15 hover:text-ivory active:scale-95"
              >
                See Project Inspiration
              </Button>
            </div>
          </HeroFade>

          <HeroFade delay={0.6}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ivory/70">
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-gold" aria-hidden="true" />
                {siteConfig.business.serviceAreaLine}
              </span>
              <a
                href={siteConfig.business.phoneHref}
                className="inline-flex items-center gap-2 underline-offset-4 transition-colors hover:text-gold hover:underline"
              >
                <Phone className="size-4 text-gold" aria-hidden="true" />
                {siteConfig.business.phoneDisplay}
                <span className="sr-only">(placeholder number for demo)</span>
              </a>
            </div>
          </HeroFade>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-24 z-10 hidden justify-center lg:flex lg:bottom-8"
        aria-hidden="true"
      >
        <motion.span
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="text-ivory/50"
        >
          <ChevronDown className="size-6" />
        </motion.span>
      </div>
    </section>
  );
}
