"use client";

import { useEffect } from "react";
import { RouterProvider, useRouter } from "@/lib/router";
import { getService } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/layout/ChatWidget";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { HomePage } from "@/components/pages/HomePage";
import { ServicesPage } from "@/components/pages/ServicesPage";
import { ServiceDetailPage } from "@/components/pages/ServiceDetailPage";
import { GalleryPage } from "@/components/pages/GalleryPage";
import { AboutPage } from "@/components/pages/AboutPage";
import { AreasPage } from "@/components/pages/AreasPage";
import { EstimatePage } from "@/components/pages/EstimatePage";
import { ContactPage } from "@/components/pages/ContactPage";
import { PrivacyPage, TermsPage } from "@/components/pages/LegalPages";

/* ── Per-route document titles & descriptions (SEO demo) ───────────────── */

const BASE = "Evergreen Landscape & Outdoor Living";

const META: Record<string, { title: string; description: string }> = {
  "/": {
    title: `${BASE} | Landscaping in Queens, Brooklyn & Nassau County`,
    description:
      "Landscaping services, garden design, patios and pavers, lawn care, and commercial grounds maintenance for Queens, Brooklyn, and Nassau County, New York. Demo website concept created by AI Automation NY.",
  },
  "/services": {
    title: "Landscaping Services — Lawn Care, Design, Patios & More",
    description:
      "Ten landscaping services: landscape design, lawn care, seasonal cleanups, patios and pavers, gardens, tree and shrub care, irrigation, lighting, commercial maintenance, and snow removal.",
  },
  "/gallery": {
    title: "Project Inspiration — Backyard, Patio & Garden Design Ideas",
    description:
      "Design inspiration for backyards, patios, gardens, commercial landscapes, and outdoor lighting in Queens, Brooklyn & Nassau County. Example imagery for demonstration.",
  },
  "/about": {
    title: "About Us — Landscape Company Website Concept",
    description:
      "How a design-led landscaping business could present itself online: approach, audiences, and service philosophy. Fictional demo company created by AI Automation NY.",
  },
  "/areas": {
    title: "Service Areas — Landscaping in Queens, Brooklyn & Nassau County",
    description:
      "Example coverage areas: Queens neighborhoods including Astoria, Forest Hills and Bayside; Brooklyn including Park Slope and Bay Ridge; Nassau County including Garden City and Mineola.",
  },
  "/estimate": {
    title: "Request an Estimate — Guided Project Request Form",
    description:
      "Request a landscaping estimate in about a minute: choose your service, property type, timeline, and share project details. Demo form — no data is sent.",
  },
  "/contact": {
    title: "Contact Us — Call, Email, or Send a Message",
    description:
      "Contact the landscaping team by phone, email, or message form. Placeholder contact details for a demonstration website.",
  },
  "/privacy": {
    title: "Privacy Policy (Demo)",
    description: "Template privacy policy for the demonstration website.",
  },
  "/terms": {
    title: "Terms of Use (Demo)",
    description: "Template terms of use for the demonstration website.",
  },
};

function PageNotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center bg-ivory px-4 text-center">
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-earth">
        Page not found
      </p>
      <h1 className="mt-3 font-serif text-4xl font-semibold text-forest">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        The link may be outdated. Head back to the homepage or explore the
        project inspiration gallery.
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => (window.location.hash = "/")}
          className="rounded-full bg-forest px-6 py-3 text-sm font-bold text-ivory transition-colors hover:bg-forest-deep"
        >
          Back to home
        </button>
        <button
          onClick={() => (window.location.hash = "/gallery")}
          className="rounded-full border border-forest/30 px-6 py-3 text-sm font-bold text-forest transition-colors hover:bg-forest/5"
        >
          Project inspiration
        </button>
      </div>
    </section>
  );
}

/* ── Route matching ────────────────────────────────────────────────────── */

function usePageMeta(path: string, serviceSlug: string | null) {
  useEffect(() => {
    const service = serviceSlug ? getService(serviceSlug) : undefined;
    if (service) {
      document.title = `${service.title} | Landscaping in Queens, Brooklyn & Nassau County`;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute(
          "content",
          `${service.short} Example ${service.title.toLowerCase()} service page for Queens, Brooklyn & Nassau County — demonstration website concept.`
        );
      return;
    }
    const meta = META[path] ?? META["/"];
    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.description);
  }, [path, serviceSlug]);
}

function AppShell() {
  const { path } = useRouter();

  const serviceMatch = path.match(/^\/services\/([a-z0-9-]+)$/);
  const serviceSlug = serviceMatch ? serviceMatch[1] : null;

  usePageMeta(path, serviceSlug);

  let page: React.ReactNode;
  if (serviceSlug) {
    page = <ServiceDetailPage slug={serviceSlug} />;
  } else {
    switch (path) {
      case "/":
        page = <HomePage />;
        break;
      case "/services":
        page = <ServicesPage />;
        break;
      case "/gallery":
        page = <GalleryPage />;
        break;
      case "/about":
        page = <AboutPage />;
        break;
      case "/areas":
        page = <AreasPage />;
        break;
      case "/estimate":
        page = <EstimatePage />;
        break;
      case "/contact":
        page = <ContactPage />;
        break;
      case "/privacy":
        page = <PrivacyPage />;
        break;
      case "/terms":
        page = <TermsPage />;
        break;
      default:
        page = <PageNotFound />;
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-ivory"
      >
        Skip to main content
      </a>
      <Header />
      <main key={path} id="main-content" className="flex-1">
        {page}
      </main>
      <Footer />
      <ChatWidget />
      <MobileActionBar />
    </div>
  );
}

export default function Page() {
  return (
    <RouterProvider>
      <AppShell />
    </RouterProvider>
  );
}
