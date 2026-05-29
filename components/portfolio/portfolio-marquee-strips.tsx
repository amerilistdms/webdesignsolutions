"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  getPortfolioCategoryLabel,
  getPortfolioLiveUrl,
  portfolioItems,
  type PortfolioItem,
} from "./portfolio-data";
import { SectionGlows } from "../shared/section-glows";
import "./portfolio-marquee-strips.css";

gsap.registerPlugin(ScrollTrigger);

const marqueeSource = portfolioItems.slice(0, 6);

function buildRow(items: PortfolioItem[]) {
  return [...items, ...items];
}

const row1 = buildRow(marqueeSource);
const row2 = buildRow([
  ...marqueeSource.slice(3),
  ...marqueeSource,
  ...marqueeSource.slice(0, 3),
]);

function StripItem({
  item,
  index,
  onPreview,
}: {
  item: PortfolioItem;
  index: number;
  onPreview: (item: PortfolioItem) => void;
}) {
  const num = String((index % marqueeSource.length) + 1).padStart(2, "0");
  const category = getPortfolioCategoryLabel(item.category);

  const body = (
    <>
      <span className="portfolio-marquee__num">{num}</span>
      <span className="portfolio-marquee__name">{item.title}</span>
      <span className="portfolio-marquee__cat">{category}</span>
      <span className="portfolio-marquee__arrow" aria-hidden>
        ↗
      </span>
    </>
  );

  return (
    <button
      type="button"
      className="portfolio-marquee__item"
      data-category={item.category}
      onClick={() => onPreview(item)}
      aria-label={`Preview ${item.title}`}
    >
      {body}
    </button>
  );
}

export function PortfolioMarqueeStrips() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<PortfolioItem | null>(null);

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

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    const lines = title.querySelectorAll(".portfolio-marquee__reveal-line");
    if (!lines.length) return;

    const ctx = gsap.context(() => {
      gsap.from(lines, {
        y: "110%",
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: title,
          start: "top 75%",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="portfolio-marquee"
        aria-labelledby="portfolio-marquee-title"
      >
        <SectionGlows density="rich" />
        <div className="portfolio-marquee__header">
          <div ref={titleRef} className="portfolio-marquee__title-block">
            <h2 id="portfolio-marquee-title" className="portfolio-marquee__title">
              <span className="portfolio-marquee__line-wrap">
                <span className="portfolio-marquee__reveal-line">Projects</span>
              </span>
              <span className="portfolio-marquee__line-wrap">
                <span className="portfolio-marquee__reveal-line portfolio-marquee__title-accent">
                  That Sell.
                </span>
              </span>
            </h2>
          </div>
        </div>

        <div className="portfolio-marquee__tracks">
          <div className="portfolio-marquee__row">
            <div className="portfolio-marquee__track">
              {row1.map((item, i) => (
                <StripItem
                  key={`r1-${item.id}-${i}`}
                  item={item}
                  index={i}
                  onPreview={setActive}
                />
              ))}
            </div>
          </div>

          <div className="portfolio-marquee__row portfolio-marquee__row--border">
            <div className="portfolio-marquee__track portfolio-marquee__track--reverse">
              {row2.map((item, i) => (
                <StripItem
                  key={`r2-${item.id}-${i}`}
                  item={item}
                  index={i}
                  onPreview={setActive}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

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
              <div className="portfolio-marquee__preview">
                {getPortfolioLiveUrl(active) ? (
                  <iframe
                    title={`Live preview: ${active.title}`}
                    src={getPortfolioLiveUrl(active)}
                    className="portfolio-marquee__preview-frame"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <Image
                    src={active.image}
                    alt={active.title}
                    width={1200}
                    height={900}
                    className="portfolio-marquee__preview-image"
                    priority
                  />
                )}
              </div>
              <div className="flex flex-col gap-3 border-t border-white/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)]">
                    {getPortfolioCategoryLabel(active.category)}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">{active.title}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {getPortfolioLiveUrl(active) ? (
                    <a
                      href={getPortfolioLiveUrl(active)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-accent)] hover:text-[var(--color-nav)]"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden />
                      View live
                    </a>
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
