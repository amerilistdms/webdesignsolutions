"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  filterPortfolioItems,
  getPortfolioCategoryLabel,
  getPortfolioLiveUrl,
  portfolioFilters,
  type PortfolioCategory,
  type PortfolioItem,
} from "./portfolio-data";
import { SectionGlows } from "../shared/section-glows";
import "./portfolio-work.css";

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_ACCENTS: Record<
  Exclude<PortfolioCategory, "all">,
  { color: string; accent: string }
> = {
  website: { color: "#04081a", accent: "#38bdf8" },
  logo: { color: "#100808", accent: "#81e92f" },
  email: { color: "#04100a", accent: "#0ea5e9" },
};

function initialsFromTitle(title: string) {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function PortfolioProjectGrid() {
  const [filter, setFilter] = useState<PortfolioCategory>("all");
  const items = useMemo(() => filterPortfolioItems(filter), [filter]);

  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollTriggersReady = useRef(false);

  const handleFilter = (cat: PortfolioCategory) => {
    if (cat === filter) return;
    setFilter(cat);
  };

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll(".portfolio-work__card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: 0.35,
        ease: "power2.out",
        overwrite: true,
      },
    );
  }, [items]);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid || scrollTriggersReady.current) return;

    const cards = grid.querySelectorAll(".portfolio-work__card");
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 92%",
          once: true,
          onEnter: () => {
            gsap.from(card, {
              y: 40,
              opacity: 0,
              duration: 0.75,
              delay: (i % 2) * 0.08,
              ease: "power3.out",
              overwrite: true,
            });
          },
        });
      });
    }, section);

    scrollTriggersReady.current = true;

    return () => {
      ctx.revert();
      scrollTriggersReady.current = false;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio-gallery"
      className="portfolio-work portfolio-work--embedded"
      aria-label="Portfolio projects"
    >
      <SectionGlows density="rich" />
      <div className="portfolio-work__filter-bar">
        <div className="portfolio-work__filter-inner" role="tablist" aria-label="Filter projects">
          {portfolioFilters.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={filter === id}
              className={`portfolio-work__filter-btn ${
                filter === id ? "portfolio-work__filter-btn--on" : ""
              }`}
              onClick={() => handleFilter(id)}
            >
              {label}
            </button>
          ))}
          <span className="portfolio-work__filter-count" aria-live="polite">
            {items.length} project{items.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="portfolio-work__grid-section">
        <div className="portfolio-work__grid" ref={gridRef}>
          {items.map((item, index) => {
            const palette = CATEGORY_ACCENTS[item.category];
            const slug = item.detail?.slug;
            const href = slug ? `/portfolio/${slug}` : undefined;
            const liveUrl = getPortfolioLiveUrl(item);

            const cardInner = (
              <>
                <div
                  className="portfolio-work__card-bg"
                  style={{ background: palette.color }}
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    className="portfolio-work__card-image"
                  />
                </div>
                <div
                  className="portfolio-work__card-glow"
                  style={{ background: palette.accent }}
                  aria-hidden
                />
                <div
                  className="portfolio-work__card-initials"
                  style={{ WebkitTextStroke: `1px ${palette.accent}33` }}
                  aria-hidden
                >
                  {initialsFromTitle(item.title)}
                </div>
                <div className="portfolio-work__card-overlay" aria-hidden />
                <div className="portfolio-work__card-top">
                  <span className="portfolio-work__card-num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="portfolio-work__card-actions">
                    {liveUrl ? (
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-work__card-live-pill"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Live
                      </a>
                    ) : null}
                    <span className="portfolio-work__card-year">2024</span>
                  </div>
                </div>
                <div className="portfolio-work__card-bottom">
                  <span className="portfolio-work__card-tag">
                    {getPortfolioCategoryLabel(item.category)}
                  </span>
                  <p className="portfolio-work__card-title">{item.title}</p>
                  {liveUrl ? (
                    <div className="portfolio-work__card-footer">
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-work__card-live-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View live <span aria-hidden>↗</span>
                      </a>
                    </div>
                  ) : null}
                </div>
              </>
            );

            return (
              <div key={item.id} className="portfolio-work__card">
                {href ? (
                  <Link
                    href={href}
                    className="portfolio-work__card-hit"
                    aria-label={`View case study: ${item.title}`}
                  />
                ) : null}
                {cardInner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
