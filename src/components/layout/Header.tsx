"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Leaf, Menu, Phone, X } from "lucide-react";
import { useRouter } from "@/lib/router";
import { siteConfig, getService } from "@/config/site";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function Wordmark({ light }: { light: boolean }) {
  return (
    <span className="flex items-center gap-2.5 text-left">
      <span
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-full transition-colors",
          light ? "bg-ivory/10 text-gold" : "bg-forest text-gold"
        )}
      >
        <Leaf className="size-4.5" aria-hidden="true" />
      </span>
      <span>
        <span
          className={cn(
            "block font-serif text-[1.35rem] font-semibold leading-none tracking-wide",
            light ? "text-ivory" : "text-forest"
          )}
        >
          Evergreen
        </span>
        <span
          className={cn(
            "mt-1 block text-[0.6rem] font-bold uppercase leading-none tracking-[0.22em]",
            light ? "text-ivory/70" : "text-muted-foreground"
          )}
        >
          Landscape &amp; Outdoor Living
        </span>
      </span>
    </span>
  );
}

export function Header() {
  const { path, navigate } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const overHero = path === "/" && !scrolled;
  const isServiceDetail = path.startsWith("/services/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet whenever the route changes
  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [path]);

  const go = (to: string) => {
    setMobileOpen(false);
    navigate(to);
  };

  const activePath = (target: string) =>
    target === "/" ? path === "/" : path.startsWith(target);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        overHero
          ? "bg-gradient-to-b from-charcoal/60 to-transparent"
          : "border-b border-border/70 bg-ivory/90 shadow-[0_1px_12px_rgba(23,33,27,0.06)] backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <button
          onClick={() => go("/")}
          className="rounded-md outline-offset-4"
          aria-label={`${siteConfig.business.name} — go to home page`}
        >
          <Wordmark light={overHero} />
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {/* Services mega menu */}
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold transition-colors outline-offset-2",
                  overHero
                    ? "text-ivory hover:bg-ivory/10"
                    : "text-foreground/80 hover:bg-forest/5 hover:text-forest",
                  isServiceDetail && !overHero && "text-forest bg-forest/5"
                )}
              >
                Services
                <ChevronDown className="size-3.5" aria-hidden="true" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              side="bottom"
              align="center"
              className="w-[34rem] rounded-xl border-border p-3"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <p className="px-2 pb-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                All services — demo content
              </p>
              <div className="grid grid-cols-2 gap-1">
                {siteConfig.services.map((s) => (
                  <button
                    key={s.slug}
                    onClick={() => navigate(`/services/${s.slug}`)}
                    className={cn(
                      "flex items-start gap-2.5 rounded-lg p-2.5 text-left transition-colors hover:bg-forest/5",
                      path === `/services/${s.slug}` && "bg-forest/5"
                    )}
                  >
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-md bg-sage-light text-forest">
                      <Icon name={s.icon} className="size-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold leading-snug text-foreground">
                        {s.title}
                      </span>
                      <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                        {s.short}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-2 border-t border-border pt-2">
                <button
                  onClick={() => navigate("/services")}
                  className="w-full rounded-md px-2.5 py-2 text-left text-sm font-semibold text-forest underline-offset-4 hover:underline"
                >
                  View all services →
                </button>
              </div>
            </PopoverContent>
          </Popover>

          {siteConfig.nav
            .filter((n) => n.label !== "Home")
            .map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                aria-current={activePath(item.path) ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-semibold transition-colors outline-offset-2",
                  overHero
                    ? "text-ivory hover:bg-ivory/10"
                    : "text-foreground/80 hover:bg-forest/5 hover:text-forest",
                  activePath(item.path) && !overHero && "text-forest bg-forest/5",
                  activePath(item.path) && overHero && "text-gold"
                )}
              >
                {item.label}
              </button>
            ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={siteConfig.business.phoneHref}
            className={cn(
              "flex items-center gap-2 rounded-md px-2.5 py-2 text-sm font-semibold transition-colors outline-offset-2",
              overHero ? "text-ivory hover:bg-ivory/10" : "text-forest hover:bg-forest/5"
            )}
            aria-label={`Call us at ${siteConfig.business.phoneDisplay} (placeholder number)`}
          >
            <Phone className="size-4" aria-hidden="true" />
            {siteConfig.business.phoneDisplay}
          </a>
          <Button
            onClick={() => navigate("/estimate")}
            className="rounded-full bg-gold px-5 font-bold text-charcoal shadow-sm transition-all hover:bg-gold-light hover:shadow-md"
          >
            Request an Estimate
          </Button>
        </div>

        {/* Mobile hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              className={cn(
                "grid size-11 place-items-center rounded-md outline-offset-2 lg:hidden",
                overHero ? "text-ivory hover:bg-ivory/10" : "text-forest hover:bg-forest/5"
              )}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="size-6" aria-hidden="true" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="flex w-full max-w-sm flex-col bg-ivory p-0 sm:max-w-sm"
          >
            <SheetHeader className="border-b border-border p-5 text-left">
              <SheetTitle asChild>
                <div>
                  <Wordmark light={false} />
                </div>
              </SheetTitle>
              <SheetDescription className="sr-only">
                Site navigation menu
              </SheetDescription>
            </SheetHeader>
            <div className="custom-scroll flex-1 overflow-y-auto p-5">
              <button
                onClick={() => go("/")}
                className="block w-full rounded-lg px-3 py-3 text-left text-base font-semibold text-forest hover:bg-forest/5"
              >
                Home
              </button>

              <div>
                <button
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  aria-expanded={mobileServicesOpen}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-base font-semibold text-forest hover:bg-forest/5"
                >
                  Services
                  <ChevronDown
                    className={cn(
                      "size-4 transition-transform",
                      mobileServicesOpen && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </button>
                {mobileServicesOpen && (
                  <div className="ml-3 border-l border-border pl-3">
                    {siteConfig.services.map((s) => (
                      <button
                        key={s.slug}
                        onClick={() => go(`/services/${s.slug}`)}
                        className="block w-full rounded-lg px-3 py-2.5 text-left text-[0.95rem] font-medium text-foreground/85 hover:bg-forest/5"
                      >
                        {s.title}
                      </button>
                    ))}
                    <button
                      onClick={() => go("/services")}
                      className="block w-full rounded-lg px-3 py-2.5 text-left text-[0.95rem] font-bold text-earth-deep hover:bg-forest/5"
                    >
                      View all services →
                    </button>
                  </div>
                )}
              </div>

              {siteConfig.nav
                .filter((n) => n.label !== "Home")
                .map((item) => (
                  <button
                    key={item.path}
                    onClick={() => go(item.path)}
                    className="block w-full rounded-lg px-3 py-3 text-left text-base font-semibold text-forest hover:bg-forest/5"
                  >
                    {item.label}
                  </button>
                ))}
            </div>
            <div className="space-y-3 border-t border-border p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
              <Button
                onClick={() => go("/estimate")}
                className="h-12 w-full rounded-full bg-gold text-base font-bold text-charcoal hover:bg-gold-light"
              >
                Request an Estimate
              </Button>
              <a
                href={siteConfig.business.phoneHref}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-forest/25 text-base font-semibold text-forest hover:bg-forest/5"
              >
                <Phone className="size-4" aria-hidden="true" />
                {siteConfig.business.phoneDisplay}
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export { Wordmark };
export const _unusedX = X; // keep import tree-shaken but referenced
