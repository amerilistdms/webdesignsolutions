"use client";

import { CountUpValue } from "../shared/count-up-value";
import { FullViewportHeroShell } from "../shared/full-viewport-hero-shell";
import "../shared/page-hero-bg.css";
import { SectionGlows } from "../shared/section-glows";
import { SiteHeroCopy } from "../shared/site-hero-copy";
import { portfolioCounts } from "./portfolio-data";
import "./portfolio-hero.css";

const heroStats = [
  {
    key: "total",
    value: portfolioCounts.total,
    label: "Projects showcased",
    accent: true,
    delay: 0.2,
  },
  {
    key: "website",
    value: portfolioCounts.website,
    label: "Websites",
    accent: false,
    delay: 0.32,
  },
  {
    key: "logo",
    value: portfolioCounts.logo,
    label: "Logos",
    accent: false,
    delay: 0.44,
  },
  {
    key: "email",
    value: portfolioCounts.email,
    label: "Email blasts",
    accent: false,
    delay: 0.56,
  },
] as const;

export function PortfolioHero() {
  return (
    <FullViewportHeroShell
      ariaLabel="Amerilist portfolio"
      outerClassName="portfolio-hero-outer"
      wrapperClassName="portfolio-hero-wrapper"
      background={
        <>
          <div className="page-hero__bg pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(56,189,248,0.3),transparent_55%),linear-gradient(180deg,#040c1c_0%,#0a1730_100%)]" />
            <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(148,163,184,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.15)_1px,transparent_1px)] [background-size:56px_56px]" />
            <SectionGlows density="rich" />
          </div>
        </>
      }
    >
      <SiteHeroCopy
        eyebrow="Selected work"
        titleLines={[
          { text: "Our", tone: "default" },
          { text: "Portfolio", tone: "accent" },
        ]}
        lead="Here's a quick look at work we've shipped—websites, logos, and email campaigns built to captivate audiences and drive response."
      >
        <dl className="portfolio-hero__stats">
          {heroStats.map((stat) => (
            <div key={stat.key}>
              <dt
                className={
                  stat.accent
                    ? "portfolio-hero__stat-value portfolio-hero__stat-value--accent"
                    : "portfolio-hero__stat-value"
                }
              >
                <CountUpValue value={stat.value} delay={stat.delay} />
              </dt>
              <dd className="portfolio-hero__stat-label">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </SiteHeroCopy>
    </FullViewportHeroShell>
  );
}
