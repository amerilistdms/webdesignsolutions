import Link from "next/link";
import {
  BannerGlassTitle,
  type BannerGlassTitleLine,
} from "./banner-glass-title";
import "../portfolio/portfolio-footer-cta.css";

const defaultTitleLines: BannerGlassTitleLine[] = [
  { text: "Your project", tone: "default" },
  { text: "starts here.", tone: "accent" },
];

export type PageFooterCtaProps = {
  id?: string;
  eyebrow?: string;
  titleLines?: BannerGlassTitleLine[];
  lead?: string;
  ctaText?: string;
  ctaHref?: string;
  /** Renders inside a parent section (e.g. services arch) — no separate background block */
  embedded?: boolean;
};

export function PageFooterCta({
  id = "page-footer-cta-title",
  eyebrow = "Ready to be next?",
  titleLines = defaultTitleLines,
  lead = "Let's build something together that makes this list.",
  ctaText = "Start Your Project",
  ctaHref = "/get-started",
  embedded = false,
}: PageFooterCtaProps) {
  const className = embedded
    ? "portfolio-footer-cta portfolio-footer-cta--embedded"
    : "portfolio-footer-cta";

  const inner = (
    <>
      <div className="portfolio-footer-cta__glow portfolio-footer-cta__glow--left" aria-hidden />
      <div className="portfolio-footer-cta__glow portfolio-footer-cta__glow--right" aria-hidden />

      <div className="portfolio-footer-cta__inner">
        <p className="portfolio-footer-cta__eyebrow">{eyebrow}</p>

        <BannerGlassTitle
          as="h2"
          id={id}
          align="center"
          size="compact"
          showBar={false}
          lines={titleLines}
          className="portfolio-footer-cta__title"
        />

        <p className="portfolio-footer-cta__lead">{lead}</p>

        <Link href={ctaHref} className="portfolio-footer-cta__btn">
          {ctaText}
          <span aria-hidden>↗</span>
        </Link>
      </div>
    </>
  );

  if (embedded) {
    return (
      <div className={className} aria-labelledby={id}>
        {inner}
      </div>
    );
  }

  return (
    <section className={className} aria-labelledby={id}>
      {inner}
    </section>
  );
}

/** @deprecated Use PageFooterCta */
export function PortfolioFooterCta() {
  return <PageFooterCta id="portfolio-footer-cta-title" />;
}
