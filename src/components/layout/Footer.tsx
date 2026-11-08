"use client";

import { Phone, Mail, MapPin, Clock, Leaf } from "lucide-react";
import { useRouter } from "@/lib/router";
import { siteConfig } from "@/config/site";

export function Footer() {
  const { navigate, path } = useRouter();

  const linkCls =
    "text-left text-sm text-ivory/70 underline-offset-4 transition-colors hover:text-gold hover:underline";

  return (
    <footer className="mt-auto bg-forest text-ivory">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <span className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-full bg-ivory/10 text-gold">
                <Leaf className="size-4.5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-serif text-xl font-semibold leading-none tracking-wide text-ivory">
                  Evergreen
                </span>
                <span className="mt-1 block text-[0.6rem] font-bold uppercase leading-none tracking-[0.22em] text-ivory/60">
                  Landscape &amp; Outdoor Living
                </span>
              </span>
            </span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/70">
              {siteConfig.business.tagline} A full-service landscaping and
              outdoor living concept for homes and businesses across Queens,
              Brooklyn &amp; Nassau County.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-ivory/20 bg-ivory/5 px-3 py-1.5 text-xs font-semibold text-ivory/75">
              {siteConfig.demo.badge}
            </p>
          </div>

          {/* Services */}
          <nav aria-label="Footer services">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <button
                    onClick={() => navigate(`/services/${s.slug}`)}
                    aria-current={
                      path === `/services/${s.slug}` ? "page" : undefined
                    }
                    className={linkCls}
                  >
                    {s.title}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => navigate("/services")} className={linkCls}>
                  View all services →
                </button>
              </li>
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Footer company links">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.nav
                .filter((n) => n.label !== "Home")
                .map((item) => (
                  <li key={item.path}>
                    <button onClick={() => navigate(item.path)} className={linkCls}>
                      {item.label}
                    </button>
                  </li>
                ))}
              <li>
                <button onClick={() => navigate("/estimate")} className={linkCls}>
                  Request an Estimate
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/privacy")} className={linkCls}>
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/terms")} className={linkCls}>
                  Terms of Use
                </button>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Contact — Placeholder
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-ivory/70">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <a
                  href={siteConfig.business.phoneHref}
                  className="underline-offset-4 hover:text-gold hover:underline"
                >
                  {siteConfig.business.phoneDisplay}
                  <span className="block text-xs text-ivory/50">
                    Placeholder number for demonstration
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <span>{siteConfig.business.email}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <span>{siteConfig.business.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  {siteConfig.business.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}: {h.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Service areas strip */}
        <div className="mt-10 border-t border-ivory/10 pt-6">
          <p className="text-xs leading-relaxed text-ivory/55">
            <span className="font-semibold text-ivory/70">Service areas: </span>
            {siteConfig.areas
              .map((a) => `${a.borough} — ${a.neighborhoods.slice(0, 4).join(", ")}`)
              .join("  ·  ")}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col gap-4 border-t border-ivory/10 pt-6 text-xs text-ivory/55 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl leading-relaxed">
            {siteConfig.demo.disclosure} {siteConfig.business.shortName} is a
            fictional company presented for demonstration purposes only.
          </p>
          <div className="flex flex-col items-start gap-1.5 md:items-end">
            <a
              href={siteConfig.demo.creditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold underline-offset-4 hover:underline"
            >
              {siteConfig.demo.credit}
            </a>
            <span>© {new Date().getFullYear()} Demo Website Concept. Not a real business.</span>
          </div>
        </div>
      </div>
      {/* Spacer for the fixed mobile action bar */}
      <div className="h-16 lg:hidden" aria-hidden="true" />
    </footer>
  );
}
