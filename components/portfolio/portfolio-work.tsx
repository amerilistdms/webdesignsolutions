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
  portfolioItems,
  type PortfolioCategory,
  type PortfolioItem,
} from "./portfolio-data";
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

function tagsForItem(item: PortfolioItem) {
  const tags = [getPortfolioCategoryLabel(item.category)];
  if (item.detail?.services?.length) {
    tags.push(...item.detail.services.slice(0, 2));
  }
  return [...new Set(tags)].slice(0, 3);
}

function resultForItem(item: PortfolioItem) {
  if (item.detail?.tagline) return item.detail.tagline;
  if (getPortfolioLiveUrl(item)) return "View live project";
  return "Amerilist portfolio";
}

export function PortfolioWork() {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>("all");

  const heroRef = useRef<HTMLElement>(null);
  const heroOrbRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => filterPortfolioItems(activeFilter),
    [activeFilter],
  );

  const featuredCount = portfolioItems.length;

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      if (line1Ref.current && line2Ref.current) {
        tl.from([line1Ref.current, line2Ref.current], {
          y: "110%",
          duration: 1.1,
          stagger: 0.12,
          ease: "power4.out",
        });
      }

      if (subRef.current) {
        tl.from(
          subRef.current,
          { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5",
        );
      }

      if (filterRef.current) {
        tl.from(
          filterRef.current,
          { y: 20, opacity: 0, duration: 0.7, ease: "power3.out" },
          "-=0.4",
        );
      }

      if (heroOrbRef.current) {
        ScrollTrigger.create({
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          onUpdate: (self) => {
            gsap.set(heroOrbRef.current, { y: self.progress * 120 });
          },
        });
      }
    }, hero);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll(".portfolio-work__card");
    const triggers: ScrollTrigger[] = [];

    cards.forEach((card, i) => {
      const trigger = ScrollTrigger.create({
        trigger: card,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.from(card, {
            y: 48,
            opacity: 0,
            duration: 0.85,
            delay: (i % 2) * 0.1,
            ease: "power3.out",
          });
        },
      });
      triggers.push(trigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, [filtered]);

  const handleFilter = (cat: PortfolioCategory) => {
    if (cat === activeFilter || !gridRef.current) return;
    const cards = Array.from(
      gridRef.current.querySelectorAll(".portfolio-work__card"),
    );
    if (cards.length) {
      gsap.to(cards, {
        opacity: 0,
        y: 12,
        stagger: 0.03,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => setActiveFilter(cat),
      });
    } else {
      setActiveFilter(cat);
    }
  };

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll(".portfolio-work__card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, stagger: 0.06, duration: 0.45, ease: "power3.out" },
    );
  }, [activeFilter]);

  return (
    <div className="portfolio-work">
      <section className="portfolio-work__hero" ref={heroRef}>
        <div className="portfolio-work__hero-bg" aria-hidden>
          <div className="portfolio-work__orb portfolio-work__orb--primary" ref={heroOrbRef} />
          <div className="portfolio-work__orb portfolio-work__orb--secondary" />
        </div>

        <div className="portfolio-work__hero-inner">
          <p className="portfolio-work__tag">Selected Work</p>
          <h1 className="portfolio-work__title">
            <span className="portfolio-work__line-wrap">
              <span className="portfolio-work__line" ref={line1Ref}>
                Our
              </span>
            </span>
            <span className="portfolio-work__line-wrap">
              <span
                className="portfolio-work__line portfolio-work__line--stroke"
                ref={line2Ref}
              >
                Portfolio.
              </span>
            </span>
          </h1>
          <div className="portfolio-work__meta">
            <p className="portfolio-work__sub" ref={subRef}>
              3,000+ projects delivered. Here&apos;s a selection of work we&apos;re
              proud to put our name on.
            </p>
            <div className="portfolio-work__count">
              <strong>{featuredCount}</strong>
              Featured Projects
            </div>
          </div>
        </div>
      </section>

      <div className="portfolio-work__filter-bar">
        <div className="portfolio-work__filter-inner" ref={filterRef}>
          {portfolioFilters.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={`portfolio-work__filter-btn ${
                activeFilter === id ? "portfolio-work__filter-btn--on" : ""
              }`}
              onClick={() => handleFilter(id)}
            >
              {label}
            </button>
          ))}
          <span className="portfolio-work__filter-count">
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="portfolio-work__grid-section">
        <div className="portfolio-work__grid" ref={gridRef}>
          {filtered.map((item, index) => {
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
                  <span className="portfolio-work__card-year">2024</span>
                </div>
                <div className="portfolio-work__card-bottom">
                  <div className="portfolio-work__card-tags">
                    {tagsForItem(item).map((tag) => (
                      <span key={tag} className="portfolio-work__card-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="portfolio-work__card-title">{item.title}</div>
                  <div className="portfolio-work__card-cat">
                    {getPortfolioCategoryLabel(item.category)}
                  </div>
                </div>
                <div className="portfolio-work__card-desc">
                  <p className="portfolio-work__card-desc-text">
                    {item.detail?.description ??
                      `A ${getPortfolioCategoryLabel(item.category).toLowerCase()} project built for measurable growth.`}
                  </p>
                  <div
                    className="portfolio-work__card-result"
                    style={{ color: palette.accent }}
                  >
                    <span>{resultForItem(item)}</span>
                    <span
                      className="portfolio-work__card-arrow"
                      style={{ background: palette.accent }}
                    >
                      ↗
                    </span>
                  </div>
                  {liveUrl && !href ? (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-work__card-live"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View live
                    </a>
                  ) : null}
                </div>
              </>
            );

            return href ? (
              <Link key={item.id} href={href} className="portfolio-work__card">
                {cardInner}
              </Link>
            ) : (
              <div key={item.id} className="portfolio-work__card">
                {cardInner}
              </div>
            );
          })}
        </div>
      </div>

      <section className="portfolio-work__cta" aria-labelledby="portfolio-work-cta-title">
        <div className="portfolio-work__cta-glow" aria-hidden />
        <div className="portfolio-work__cta-inner">
          <p className="portfolio-work__cta-label">Ready to be next?</p>
          <h2 id="portfolio-work-cta-title" className="portfolio-work__cta-title">
            Your project
            <br />
            <span>starts here.</span>
          </h2>
          <p className="portfolio-work__cta-sub">
            Let&apos;s build something together that makes this list.
          </p>
          <Link href="/get-started" className="portfolio-work__cta-btn">
            Start Your Project <span aria-hidden>↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
