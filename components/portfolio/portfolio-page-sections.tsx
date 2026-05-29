"use client";

import { PortfolioMarqueeStrips } from "./portfolio-marquee-strips";
import { PortfolioProjectGrid } from "./portfolio-project-grid";

export function PortfolioPageSections() {
  return (
    <>
      <PortfolioMarqueeStrips />
      <PortfolioProjectGrid />
    </>
  );
}
