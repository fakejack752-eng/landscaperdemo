"use client";

import Image from "next/image";
import { ArrowRight, Leaf, MessagesSquare, PencilRuler } from "lucide-react";
import { useRouter } from "@/lib/router";
import { siteConfig } from "@/config/site";
import { PageHero, PageCtaBand } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/lib/motion";

const APPROACH = [
  {
    icon: PencilRuler,
    title: "Plan first",
    text: "Walk the property together, list what's working, and agree on priorities before pricing anything.",
  },
  {
    icon: MessagesSquare,
    title: "Communicate always",
    text: "Schedules in advance, updates during visits, and a real person answering the phone.",
  },
  {
    icon: Leaf,
    title: "Care for the long term",
    text: "Recommendations made for plant health and property value — not for the fastest sale.",
  },
];

/** About page — fictional company framing kept explicit throughout. */
export function AboutPage() {
  const { navigate } = useRouter();

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A Landscape Company Concept, Built Around How People Live Outdoors"
        description="Evergreen Landscape & Outdoor Living is a demonstration brand — a fully designed example of how a real landscaping business could present itself online."
        crumbs={["About"]}
      />

      {/* Story */}
      <section className="bg-ivory py-16 lg:py-24" aria-label="Our story">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-earth">
                <span className="h-px w-10 bg-earth/60" aria-hidden="true" />
                Our Story (Example)
              </p>
              <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-forest sm:text-4xl">
                Started with a simple observation
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  In this sample story, Evergreen began with a frustrating
                  truth: most properties don&apos;t suffer from neglect — they
                  suffer from generic care. The same mowing route, the same
                  shrub shearing, the same beds refreshed out of habit rather
                  than intent.
                </p>
                <p>
                  The concept answers with a different model: design-led
                  improvements, season-by-season maintenance, and honest
                  communication — for family backyards in Queens and
                  commercial plazas in Nassau County alike.
                </p>
                <p className="rounded-2xl border border-dashed border-earth/40 bg-earth/[0.06] p-4 text-sm">
                  <span className="font-bold text-forest">Note: </span>
                  This narrative is placeholder copy for demonstration. A real
                  business would replace it with its own history, team, and
                  credentials — nothing here should be read as factual claims
                  about a real company.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="relative">
                <div className="relative aspect-[4/3.4] overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src={siteConfig.images.about.src}
                    alt={siteConfig.images.about.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full bg-charcoal/60 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-ivory backdrop-blur-sm">
                    Example imagery
                  </span>
                </div>
                <div
                  className="absolute -bottom-5 -left-5 -z-10 h-36 w-36 rounded-bl-3xl border-b-2 border-l-2 border-gold/50"
                  aria-hidden="true"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-ivory-soft py-16 lg:py-24" aria-label="Our approach">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Approach"
            title="Three Habits That Shape Every Project"
          />
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.1}>
            {APPROACH.map((a) => (
              <StaggerItem key={a.title}>
                <div className="h-full rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <span className="grid size-12 place-items-center rounded-2xl bg-sage-light text-forest">
                    <a.icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-serif text-2xl font-semibold text-forest">
                    {a.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {a.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Who we serve */}
      <section className="bg-ivory py-16 lg:py-24" aria-label="Who we serve">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Who We Serve"
            title="Homes, Businesses & Communities"
            subtitle="Sample audiences this website concept is designed to convert."
          />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {[
              ["Homeowners", "Backyards, front yards, gardens, and outdoor living upgrades."],
              ["Property managers", "Reliable recurring care with clear reporting and one point of contact."],
              ["Business owners", "Entrances and exteriors that make the right first impression."],
              ["Communities & HOAs", "Common areas kept consistent across many residences."],
            ].map(([title, text]) => (
              <StaggerItem key={title}>
                <div className="h-full rounded-2xl bg-forest p-6 text-ivory shadow-sm transition-transform duration-300 hover:-translate-y-1">
                  <h3 className="font-serif text-xl font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/75">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <PageCtaBand
        title="Let's design your outdoor space next"
        text="Tell us about your property and what you'd like to change — the estimate form takes about a minute."
        primaryLabel="Request an estimate"
        onPrimary={() => {
          navigate("/estimate");
        }}
      />
    </>
  );
}
