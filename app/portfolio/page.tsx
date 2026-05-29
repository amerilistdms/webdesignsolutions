import type { Metadata } from "next";
import { SectionGlows } from "../../components/shared/section-glows";
import { PortfolioFooterCta } from "../../components/portfolio/portfolio-footer-cta";
import { PortfolioHero } from "../../components/portfolio/portfolio-hero";
import { PortfolioPageSections } from "../../components/portfolio/portfolio-page-sections";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore Amerilist Web Design portfolio—websites, logo design, and email blast campaigns built for brands that convert.",
};

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <div className="relative overflow-hidden bg-[#040c1c]">
        <SectionGlows density="rich" className="opacity-80" />
        <div className="relative z-[1]">
          <PortfolioPageSections />
        </div>
      </div>
      <PortfolioFooterCta />
    </>
  );
}
