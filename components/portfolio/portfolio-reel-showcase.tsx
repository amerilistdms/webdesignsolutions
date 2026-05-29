"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  getPortfolioItemsKey,
  type PortfolioCategory,
  type PortfolioItem,
} from "./portfolio-data";
import { PortfolioReelFilters } from "./portfolio-reel-filters";
import "./portfolio-reel-showcase.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const categoryLabel: Record<PortfolioItem["category"], string> = {
  website: "Website design",
  logo: "Logo design",
  email: "Email blast",
};

type PortfolioReelShowcaseProps = {
  items: PortfolioItem[];
  watermarkLabel: string;
  filter: PortfolioCategory;
  onFilterChange: (category: PortfolioCategory) => void;
};

function ReelCard({ item }: { item: PortfolioItem }) {
  const inner = (
    <div className="portfolio-reel__card-frame">
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="portfolio-reel__card-image"
        sizes="(max-width: 768px) 70vw, 22rem"
      />
      <div className="portfolio-reel__card-gradient" aria-hidden />
      <div className="portfolio-reel__card-body">
        <span className="portfolio-reel__card-category">
          {categoryLabel[item.category]}
        </span>
        <p className="portfolio-reel__card-title">{item.title}</p>
      </div>
    </div>
  );

  if (item.detail) {
    return (
      <Link
        href={`/portfolio/${item.detail.slug}`}
        className="portfolio-reel__card group block"
      >
        {inner}
      </Link>
    );
  }

  return <article className="portfolio-reel__card">{inner}</article>;
}

export function PortfolioReelShowcase({
  items,
  watermarkLabel,
  filter,
  onFilterChange,
}: PortfolioReelShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemsKey = getPortfolioItemsKey(items);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;

      if (!section || !track || items.length === 0) return;

      const getScrollDistance = () => {
        const extra = 48;
        return Math.max(0, track.scrollWidth - window.innerWidth + extra);
      };

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance() + window.innerHeight * 0.35}`,
          pin: pinRef.current,
          pinReparent: false,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      const refresh = () => ScrollTrigger.refresh();

      refresh();
      window.addEventListener("resize", refresh);

      return () => {
        window.removeEventListener("resize", refresh);
        tween.scrollTrigger?.kill(true);
        tween.kill();
        gsap.set(track, { clearProps: "transform" });
      };
    },
    { scope: sectionRef, dependencies: [itemsKey] },
  );

  return (
    <section ref={sectionRef} className="portfolio-reel">
      <div className="portfolio-reel__header">
        <span className="portfolio-reel__watermark">{watermarkLabel}</span>
        <PortfolioReelFilters
          filter={filter}
          onFilterChange={onFilterChange}
          resultCount={items.length}
        />
      </div>

      <div ref={pinRef} className="portfolio-reel__pin">
        {items.length === 0 ? (
          <p className="portfolio-reel__empty">No projects in this category.</p>
        ) : (
          <div ref={trackRef} className="portfolio-reel__track">
            {items.map((item) => (
              <ReelCard key={item.id} item={item} />
            ))}
          </div>
        )}
        <p className="portfolio-reel__hint">Scroll to browse</p>
      </div>
    </section>
  );
}
