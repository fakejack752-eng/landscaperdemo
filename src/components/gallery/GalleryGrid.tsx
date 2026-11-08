"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Expand, X } from "lucide-react";
import { siteConfig, type GalleryItem } from "@/config/site";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

type GalleryGridProps = {
  /** Limit the number of items shown (e.g. 6 for the home preview). */
  limit?: number;
  /** Show the "design inspiration" note under the filters. */
  showNote?: boolean;
  /** Pre-filter the grid to specific categories and hide the filter pills. */
  categories?: string[];
  className?: string;
};

const allCategories = ["All", ...siteConfig.galleryCategories];

/** Filterable project-inspiration gallery with keyboard-accessible lightbox. */
export function GalleryGrid({ limit, showNote = true, categories, className }: GalleryGridProps) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string>("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const pool = useMemo(
    () =>
      categories
        ? siteConfig.gallery.filter((g) => categories.includes(g.category))
        : siteConfig.gallery,
    [categories]
  );
  const showFilters = !categories;

  const filtered = useMemo(() => {
    const items =
      active === "All" ? pool : pool.filter((g) => g.category === active);
    return limit ? items.slice(0, limit) : items;
  }, [active, limit, pool]);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  // Escape closes the lightbox; arrows navigate it.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const idx = pool.findIndex((g) => g.src === lightbox.src);
        const dir = e.key === "ArrowRight" ? 1 : -1;
        const next = pool[(idx + dir + pool.length) % pool.length];
        setLightbox(next);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox, pool]);

  const lightboxIndex = lightbox
    ? pool.findIndex((g) => g.src === lightbox.src)
    : -1;

  return (
    <div className={className}>
      {/* Filters */}
      {showFilters && (
        <div
          className="flex flex-wrap items-center justify-center gap-2"
          role="group"
          aria-label="Filter gallery by category"
        >
          {allCategories.map((cat) => {
            const selected = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                aria-pressed={selected}
                className={cn(
                  "rounded-full px-4 py-2 text-[0.78rem] font-bold uppercase tracking-[0.14em] transition-all outline-offset-2",
                  selected
                    ? "bg-forest text-ivory shadow-md"
                    : "border border-forest/20 bg-card text-forest/75 hover:border-forest/40 hover:text-forest"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {showNote && (
        <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
          All imagery is example content shared as design inspiration — not
          claims of completed projects.
        </p>
      )}

      {/* Grid */}
      <motion.div
        layout={reduce ? false : true}
        className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((item) => (
            <motion.div
              key={item.src}
              layout={reduce ? false : true}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <button
                onClick={() => setLightbox(item)}
                className="group relative block w-full overflow-hidden rounded-xl bg-sage-light text-left outline-offset-4"
                aria-label={`Open image: ${item.alt}`}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="mb-1 inline-flex w-fit rounded-full bg-gold px-2.5 py-0.5 text-[0.6rem] font-black uppercase tracking-[0.16em] text-charcoal">
                    {item.category} · Example
                  </span>
                  <span className="line-clamp-2 text-sm font-semibold leading-snug text-ivory">
                    {item.alt}
                  </span>
                </div>
                <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-ivory/90 text-forest opacity-0 shadow transition-opacity duration-300 group-hover:opacity-100">
                  <Expand className="size-4" aria-hidden="true" />
                </span>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={closeLightbox}
        >
          <div
            className="relative max-h-[92dvh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-forest-deep shadow-2xl">
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                fill
                sizes="(min-width: 896px) 56rem, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex rounded-full bg-gold px-2.5 py-0.5 text-[0.62rem] font-black uppercase tracking-[0.16em] text-charcoal">
                  {lightbox.category} · Design inspiration
                </span>
                <p className="mt-2 text-sm leading-relaxed text-ivory/90">
                  {lightbox.alt}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-ivory/60">
                <button
                  onClick={() => {
                    const next =
                      pool[
                        (lightboxIndex - 1 + pool.length) %
                          pool.length
                      ];
                    setLightbox(next);
                  }}
                  className="rounded-full border border-ivory/25 px-3.5 py-1.5 transition-colors hover:bg-ivory/10"
                  aria-label="Previous image"
                >
                  ← Prev
                </button>
                <span aria-hidden="true">
                  {lightboxIndex + 1} / {pool.length}
                </span>
                <button
                  onClick={() => {
                    const next =
                      pool[(lightboxIndex + 1) % pool.length];
                    setLightbox(next);
                  }}
                  className="rounded-full border border-ivory/25 px-3.5 py-1.5 transition-colors hover:bg-ivory/10"
                  aria-label="Next image"
                >
                  Next →
                </button>
              </div>
            </div>
            <button
              onClick={closeLightbox}
              className="absolute -top-3 right-0 grid size-10 place-items-center rounded-full bg-ivory text-charcoal shadow-xl transition-transform hover:scale-105 sm:-right-3 sm:-top-3"
              aria-label="Close image viewer"
              autoFocus
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
