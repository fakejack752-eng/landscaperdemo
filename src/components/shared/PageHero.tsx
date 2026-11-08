"use client";

import { ChevronRight } from "lucide-react";
import { useRouter } from "@/lib/router";
import { cn } from "@/lib/utils";
import { Reveal } from "@/lib/motion";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  /** Breadcrumb trail: first item is "Home" by default. */
  crumbs?: string[];
  children?: React.ReactNode;
};

/** Consistent dark hero band for inner pages. */
export function PageHero({ eyebrow, title, description, crumbs, children }: PageHeroProps) {
  const { navigate } = useRouter();
  const trail = ["Home", ...(crumbs ?? [])];

  return (
    <section className="relative overflow-hidden bg-forest">
      {/* Decorative texture accents */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-gold/10 blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-16 size-80 rounded-full bg-sage/10 blur-2xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-32 sm:px-6 lg:px-8 lg:pb-20 lg:pt-40">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-ivory/55">
            {trail.map((c, i) => {
              const last = i === trail.length - 1;
              return (
                <li key={`${c}-${i}`} className="flex items-center gap-1.5">
                  {last ? (
                    <span aria-current="page" className="text-gold">
                      {c}
                    </span>
                  ) : (
                    <button
                      onClick={() => navigate("/")}
                      className="rounded underline-offset-4 hover:text-ivory hover:underline"
                    >
                      {c}
                    </button>
                  )}
                  {!last && (
                    <ChevronRight className="size-3 text-ivory/30" aria-hidden="true" />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <Reveal className="mt-6 max-w-3xl">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-gold">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-ivory text-balance sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ivory/75 sm:text-lg">
              {description}
            </p>
          )}
          {children}
        </Reveal>
      </div>
    </section>
  );
}

/** Shared page-level CTA band used at the bottom of inner pages. */
export function PageCtaBand({
  title,
  text,
  primaryLabel = "Request an Estimate",
  onPrimary,
  className,
}: {
  title: string;
  text: string;
  primaryLabel?: string;
  onPrimary?: () => void;
  className?: string;
}) {
  const { navigate } = useRouter();
  return (
    <section className={cn("bg-ivory-soft py-16 lg:py-20", className)}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-forest p-8 text-center shadow-xl sm:p-10">
          <h2 className="font-serif text-3xl font-semibold text-ivory sm:text-4xl">
            {title}
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-ivory/75 sm:text-base">
            {text}
          </p>
          <button
            onClick={onPrimary ?? (() => navigate("/estimate"))}
            className="rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-charcoal shadow-lg transition-all hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-xl active:scale-95"
          >
            {primaryLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
