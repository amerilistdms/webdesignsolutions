"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Expand, Eye, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  portfolioFilters,
  portfolioItems,
  type PortfolioCategory,
  type PortfolioItem,
} from "./portfolio-data";

const categoryLabel: Record<PortfolioItem["category"], string> = {
  website: "Website design",
  logo: "Logo design",
  email: "Email blast",
};

export function PortfolioGallery() {
  const [filter, setFilter] = useState<PortfolioCategory>("all");
  const [active, setActive] = useState<PortfolioItem | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return portfolioItems;
    return portfolioItems.filter((item) => item.category === filter);
  }, [filter]);

  const closeLightbox = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, closeLightbox]);

  return (
    <>
      <section className="relative bg-[#0a1220] py-16 text-white lg:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(56,189,248,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.06)_1px,transparent_1px)] [background-size:48px_48px]" aria-hidden />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-xl text-sm text-white/60">
              Filter by category. More disciplines (SEO, social, data, hosting) live under{" "}
              <Link href="/services" className="font-semibold text-[var(--color-accent)] hover:underline">
                Services
              </Link>
              —this gallery reflects our current showcase library.
            </p>
            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="Portfolio categories"
            >
              {portfolioFilters.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={filter === id}
                  onClick={() => setFilter(id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    filter === id
                      ? "bg-[var(--color-accent)] text-[var(--color-nav)] shadow-lg shadow-sky-500/25"
                      : "border border-white/15 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <motion.p
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-xs font-medium uppercase tracking-widest text-white/40"
          >
            Showing {filtered.length} project{filtered.length === 1 ? "" : "s"}
          </motion.p>

          <motion.ul
            layout
            className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => (
                <motion.li
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-5 break-inside-avoid"
                >
                  <div className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left backdrop-blur-sm transition hover:border-[var(--color-accent)]/40">
                    <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[3/4]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover object-top transition duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#040c1c]/95 via-[#040c1c]/20 to-transparent opacity-90 transition group-hover:opacity-100" />
                      <div className="absolute right-3 top-3 z-20 flex gap-2">
                        {item.detail ? (
                          <Link
                            href={`/portfolio/${item.detail.slug}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex h-9 items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 text-xs font-semibold text-white backdrop-blur-md transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-nav)]"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            View
                          </Link>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => setActive(item)}
                          className="flex h-9 items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 text-xs font-semibold text-white backdrop-blur-md transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-nav)]"
                          aria-label={`Zoom ${item.title}`}
                        >
                          <Expand className="h-3.5 w-3.5" />
                          Zoom
                        </button>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)]">
                        {categoryLabel[item.category]}
                      </span>
                      <h3 className="mt-2 text-lg font-semibold leading-snug text-white">
                        {item.title}
                      </h3>
                    </div>
                    {item.detail ? (
                      <Link
                        href={`/portfolio/${item.detail.slug}`}
                        className="absolute inset-0 z-0"
                        aria-label={`View case study: ${item.title}`}
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setActive(item)}
                        className="absolute inset-0 z-0"
                        aria-label={`Open ${item.title}`}
                      />
                    )}
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      </section>

      {/* Mid CTA */}
      <section className="border-y border-black/5 bg-[var(--background)] py-16 lg:py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
              Want work that sells like this?
            </h2>
            <p className="mt-3 text-[var(--foreground-muted)] leading-relaxed">
              We design for conversion—whether it’s a full website, a logo system, or
              email that lands in the inbox and gets clicks.
            </p>
          </div>
          <Link
            href="/get-started"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--color-accent)] px-8 py-3.5 text-sm font-semibold text-[var(--color-nav)] transition hover:brightness-110"
          >
            Start your project
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#040c1c]/95 p-4 backdrop-blur-md sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 sm:right-8 sm:top-8"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#0f1b33] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-h-[75vh] w-full">
                <Image
                  src={active.image}
                  alt={active.title}
                  width={1200}
                  height={900}
                  className="h-auto max-h-[75vh] w-full object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col gap-2 border-t border-white/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)]">
                    {categoryLabel[active.category]}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">{active.title}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {active.detail ? (
                    <Link
                      href={`/portfolio/${active.detail.slug}`}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      <Eye className="h-4 w-4" />
                      View case study
                    </Link>
                  ) : null}
                  <Link
                    href="/get-started"
                    className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-2.5 text-sm font-semibold text-[var(--color-nav)]"
                  >
                    Build something like this
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
