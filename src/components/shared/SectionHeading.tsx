"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "@/lib/motion";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "dark" | "light"; // dark = dark text on light bg, light = ivory text on dark bg
  className?: string;
  as?: "h2" | "h3";
};

/** Editorial section heading with eyebrow label, serif title, and optional subtitle. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "dark",
  className,
  as = "h2",
}: SectionHeadingProps) {
  const Heading = as;
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-[0.7rem] font-bold uppercase tracking-[0.28em]",
            tone === "dark" ? "text-earth" : "text-gold"
          )}
        >
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          "mt-3 font-serif text-3xl font-semibold leading-[1.12] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]",
          tone === "dark" ? "text-forest" : "text-ivory"
        )}
      >
        {title}
      </Heading>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            tone === "dark" ? "text-muted-foreground" : "text-ivory/75"
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
