import type { Metadata } from "next";
import { PortfolioFooterCta } from "../../components/portfolio/portfolio-footer-cta";
import { PortfolioGallery } from "../../components/portfolio/portfolio-gallery";
import { PortfolioHero } from "../../components/portfolio/portfolio-hero";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore Amerilist Web Design portfolio—websites, logo design, and email blast campaigns built for brands that convert.",
};

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <PortfolioGallery />
      <PortfolioFooterCta />
    </>
  );
}
