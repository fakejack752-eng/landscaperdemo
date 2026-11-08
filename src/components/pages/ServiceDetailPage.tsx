"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { useRouter } from "@/lib/router";
import { siteConfig, getService } from "@/config/site";
import { Icon } from "@/lib/icons";
import { PageHero, PageCtaBand } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { useEstimateStore } from "@/store/estimate";
import { Reveal, Stagger, StaggerItem } from "@/lib/motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function NotFoundBlock() {
  const { navigate } = useRouter();
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-ivory px-4 pt-28 text-center">
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-earth">
        Page not found
      </p>
      <h1 className="mt-3 font-serif text-4xl font-semibold text-forest">
        That service page doesn&apos;t exist
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        The service you&apos;re looking for may have been renamed. Browse the
        full list to find what you need.
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => navigate("/services")}
          className="rounded-full bg-forest px-6 py-3 text-sm font-bold text-ivory transition-colors hover:bg-forest-deep"
        >
          All services
        </button>
        <button
          onClick={() => navigate("/")}
          className="rounded-full border border-forest/30 px-6 py-3 text-sm font-bold text-forest transition-colors hover:bg-forest/5"
        >
          Back to home
        </button>
      </div>
    </section>
  );
}

/** Service detail page — hero, intro, project types, benefits, gallery, FAQ, CTAs. */
export function ServiceDetailPage({ slug }: { slug: string }) {
  const { navigate } = useRouter();
  const service = getService(slug);
  const assignPrefill = useEstimateStore((s) => s.assignPrefill);

  if (!service) return <NotFoundBlock />;

  const related = siteConfig.gallery
    .filter((g) => g.category === service.galleryCategory)
    .slice(0, 3);
  const index = siteConfig.services.findIndex((s) => s.slug === slug);
  const nextService = siteConfig.services[(index + 1) % siteConfig.services.length];

  const goEstimate = () => {
    assignPrefill(service.title);
    navigate("/estimate");
  };

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60svh] items-end overflow-hidden bg-charcoal pt-28">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={service.cardImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal/85" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-ivory/60">
              {[
                { label: "Home", path: "/" },
                { label: "Services", path: "/services" },
                { label: service.title, path: "" },
              ].map((c, i) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  {c.path ? (
                    <button
                      onClick={() => navigate(c.path)}
                      className="rounded underline-offset-4 hover:text-ivory hover:underline"
                    >
                      {c.label}
                    </button>
                  ) : (
                    <span aria-current="page" className="text-gold">
                      {c.label}
                    </span>
                  )}
                  {i < 2 && (
                    <ChevronRight className="size-3 text-ivory/30" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-6 flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-gold text-charcoal shadow-lg">
              <Icon name={service.icon} className="size-6" />
            </span>
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.26em] text-gold">
              {service.galleryCategory} · Example service
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-ivory text-balance sm:text-5xl lg:text-[3.4rem]">
            {service.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ivory/80 sm:text-lg">
            {service.short}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={goEstimate}
              className="rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-charcoal shadow-lg transition-colors hover:bg-gold-light"
            >
              Request an estimate for this service
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="rounded-full border border-ivory/40 bg-ivory/5 px-7 py-3.5 text-sm font-semibold text-ivory backdrop-blur-sm transition-colors hover:bg-ivory/15"
            >
              Ask a question first
            </button>
          </div>
        </div>
      </section>

      {/* Intro + project types */}
      <section className="bg-ivory py-16 lg:py-24" aria-label="Service overview">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-earth">
                <span className="h-px w-10 bg-earth/60" aria-hidden="true" />
                Overview
              </p>
              <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-forest sm:text-4xl">
                What this service covers
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {service.intro}
              </p>
              <div className="mt-8 rounded-2xl border border-gold/40 bg-gold/10 p-5">
                <p className="text-sm leading-relaxed text-foreground/85">
                  <span className="font-bold text-forest">How it starts: </span>
                  Every engagement in this example begins with an estimate
                  request — a short conversation about the property, followed
                  by a clear written scope before any work is scheduled.
                </p>
                <button
                  onClick={goEstimate}
                  className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-forest underline-offset-4 hover:underline"
                >
                  Start with the estimate form
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <h3 className="font-serif text-2xl font-semibold text-forest">
                Types of projects included
              </h3>
              <ul className="mt-5 space-y-3">
                {service.types.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm"
                  >
                    <CheckCircle2
                      className="mt-0.5 size-5 shrink-0 text-forest"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium leading-relaxed text-foreground/85">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Project lists above are editable examples — match them to the
                real service menu before launch.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-forest py-16 lg:py-24" aria-label="Service benefits">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why It Matters"
            title="The Difference Good Work Makes"
            tone="light"
          />
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.1}>
            {service.benefits.map((b) => (
              <StaggerItem key={b.title}>
                <div className="h-full rounded-2xl border border-ivory/12 bg-ivory/[0.06] p-6 transition-colors hover:border-gold/40">
                  <span className="font-serif text-2xl text-gold" aria-hidden="true">
                    ✦
                  </span>
                  <h3 className="mt-3 font-serif text-xl font-semibold text-ivory">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/70">
                    {b.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Related inspiration */}
      <section className="bg-ivory py-16 lg:py-24" aria-label="Related inspiration">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Related Inspiration"
            title="Design Ideas in This Style"
            subtitle={`Example imagery from the ${service.galleryCategory.toLowerCase()} collection — design inspiration only, not completed projects.`}
          />
          <GalleryGrid
            categories={[service.galleryCategory]}
            limit={3}
            showNote={false}
            className="mt-10"
          />
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/gallery")}
              className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-forest underline-offset-8 hover:underline"
            >
              Browse the full gallery
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ivory-soft py-16 lg:py-24" aria-label="Service FAQ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Good to Know" title="Common Questions" />
          <Reveal delay={0.08} className="mx-auto mt-10 max-w-3xl">
            <Accordion
              type="single"
              collapsible
              className="w-full rounded-2xl border border-border bg-card px-5 shadow-sm sm:px-7"
            >
              {service.faqs.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`sf-${i}`}
                  className="border-border/70 last:border-b-0"
                >
                  <AccordionTrigger className="py-5 text-left font-serif text-lg font-semibold text-forest hover:text-earth-deep hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* Next service nav */}
      <section className="bg-ivory py-10" aria-label="Next service">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:px-6 md:flex-row lg:px-8">
          <button
            onClick={() => navigate("/services")}
            className="group inline-flex items-center gap-2 text-sm font-bold text-forest underline-offset-4 hover:underline"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            All services
          </button>
          <button
            onClick={() => navigate(`/services/${nextService.slug}`)}
            className="group inline-flex items-center gap-2 text-right"
          >
            <span>
              <span className="block text-[0.62rem] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Next service
              </span>
              <span className="block font-serif text-lg font-semibold text-forest group-hover:text-earth-deep">
                {nextService.title}
              </span>
            </span>
            <ArrowRight
              className="size-5 text-gold transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
        </div>
      </section>

      <PageCtaBand
        title={`Interested in ${service.title.toLowerCase()}?`}
        text="Request an estimate and the service will be pre-selected for you. This demo form doesn't send data anywhere — it shows how the real flow would feel."
        primaryLabel="Request an estimate"
        onPrimary={goEstimate}
      />
    </>
  );
}
