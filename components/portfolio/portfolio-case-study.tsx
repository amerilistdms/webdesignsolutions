"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHeroPinScroll } from "../shared/use-hero-pin-scroll";
import {
  getPortfolioNav,
  type PortfolioDetail,
  type PortfolioItem,
} from "./portfolio-data";

type PortfolioCaseStudyProps = {
  item: PortfolioItem & { detail: PortfolioDetail };
};

export function PortfolioCaseStudy({ item }: PortfolioCaseStudyProps) {
  const { detail } = item;
  const { prev, next } = getPortfolioNav(detail.slug);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  useHeroPinScroll(heroRef);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") {
        setLightboxIndex((i) =>
          i === null ? null : (i + 1) % detail.galleryImages.length,
        );
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((i) =>
          i === null
            ? null
            : (i - 1 + detail.galleryImages.length) % detail.galleryImages.length,
        );
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, closeLightbox, detail.galleryImages.length]);

  return (
    <>
      <section
        ref={heroRef}
        className="site-hero site-hero--pin overflow-hidden text-white"
      >
        <div className="site-hero__bg-layer pointer-events-none absolute inset-0 overflow-hidden" data-hero-bg aria-hidden>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${detail.bannerImage})` }}
          />
          <div className="absolute inset-0 bg-[#040c1c]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(56,189,248,0.2),transparent_60%)]" />
        </div>

        <div className="site-hero__content">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-[var(--color-accent)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Link>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)]">
            Case study
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {item.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/75">{detail.tagline}</p>
        </div>
      </section>

      <section className="border-b border-black/5 bg-[var(--background)] py-16 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_280px] lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
              {detail.headline}
            </h2>
            <p className="mt-6 text-[var(--foreground-muted)] leading-relaxed">
              {detail.description}
            </p>
          </div>
          <aside className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)]">
              Deliverables
            </p>
            <ul className="mt-4 space-y-2">
              {detail.services.map((service) => (
                <li
                  key={service}
                  className="text-sm font-medium text-[var(--foreground)]"
                >
                  {service}
                </li>
              ))}
            </ul>
            <a
              href={detail.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-nav)] transition hover:brightness-110"
            >
              View live site
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </aside>
        </div>
      </section>

      <section className="bg-[#0a1220] py-4 text-white lg:py-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
            Project gallery
          </p>
        </div>
        <ul className="mx-auto mt-6 grid max-w-[1600px] grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
          {detail.galleryImages.map((src, index) => (
            <li key={src} className="group relative">
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="relative block w-full overflow-hidden"
              >
                <div className="relative aspect-[4/3] w-full bg-[#0f1b33]">
                  <Image
                    src={src}
                    alt={`${item.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-[#040c1c]/0 transition group-hover:bg-[#040c1c]/40">
                    <span className="flex h-11 w-11 scale-90 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white opacity-0 transition group-hover:scale-100 group-hover:opacity-100">
                      <Expand className="h-5 w-5" />
                    </span>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {(prev || next) && (
        <section className="grid border-y border-black/5 sm:grid-cols-2">
          {prev?.detail ? (
            <Link
              href={`/portfolio/${prev.detail.slug}`}
              className="group flex min-h-[140px] flex-col justify-center border-b border-black/5 bg-[var(--background)] p-8 transition hover:bg-white sm:border-b-0 sm:border-r"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--foreground-muted)]">
                Previous project
              </span>
              <span className="mt-2 flex items-center gap-2 text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--color-accent)]">
                <ArrowLeft className="h-4 w-4 shrink-0" />
                {prev.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
          {next?.detail ? (
            <Link
              href={`/portfolio/${next.detail.slug}`}
              className="group flex min-h-[140px] flex-col items-end justify-center bg-[var(--background)] p-8 text-right transition hover:bg-white"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--foreground-muted)]">
                Next project
              </span>
              <span className="mt-2 flex items-center gap-2 text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--color-accent)]">
                {next.title}
                <ArrowRight className="h-4 w-4 shrink-0" />
              </span>
            </Link>
          ) : null}
        </section>
      )}

      <section className="bg-[var(--color-nav)] py-14 text-white lg:py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center sm:items-start sm:px-6 sm:text-left lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <h2 className="max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
            Ready to build something like this?
          </h2>
          <Link
            href="/get-started"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--color-accent)] px-8 py-3.5 text-sm font-semibold text-[var(--color-nav)] transition hover:brightness-110"
          >
            Get started
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#040c1c]/95 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={`${item.title} gallery`}
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            {detail.galleryImages.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(
                      (lightboxIndex - 1 + detail.galleryImages.length) %
                        detail.galleryImages.length,
                    );
                  }}
                  className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="Previous image"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((lightboxIndex + 1) % detail.galleryImages.length);
                  }}
                  className="absolute right-16 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 sm:right-20"
                  aria-label="Next image"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </>
            ) : null}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="relative max-h-[90vh] w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={detail.galleryImages[lightboxIndex]}
                alt={`${item.title} ${lightboxIndex + 1}`}
                width={1400}
                height={1000}
                className="mx-auto h-auto max-h-[85vh] w-full object-contain"
                priority
              />
              <p className="mt-4 text-center text-sm text-white/60">
                {lightboxIndex + 1} / {detail.galleryImages.length}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
