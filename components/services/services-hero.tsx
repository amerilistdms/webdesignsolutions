"use client";

import { FullViewportHeroShell } from "../shared/full-viewport-hero-shell";
import { SectionGlows } from "../shared/section-glows";
import { SiteHeroCopy } from "../shared/site-hero-copy";
import "../shared/page-hero-bg.css";

export function ServicesHero() {
  return (
    <FullViewportHeroShell
      ariaLabel="Amerilist services"
      outerClassName="services-hero-outer"
      wrapperClassName="services-hero-wrapper"
      background={
        <>
          <div className="page-hero__bg pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(56,189,248,0.28),transparent_55%),radial-gradient(circle_at_90%_60%,rgba(7,78,185,0.22),transparent_45%),linear-gradient(180deg,#252840_0%,#1e2033_55%,#0f1b33_100%)]" />
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(56,189,248,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.12)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_70%_80%_at_50%_30%,black,transparent)]" />
            <div className="absolute -right-32 top-1/3 h-[28rem] w-[28rem] rounded-full bg-cyan-400/25 blur-[100px]" />
            <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-blue-600/20 blur-[90px]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,12,28,0.95)_0%,transparent_45%)]" />
            <SectionGlows />
          </div>
        </>
      }
    >
      <SiteHeroCopy
        eyebrow="Amerilist Web Design Solutions"
        titleLines={[
          { text: "Our", tone: "default" },
          { text: "Services", tone: "accent" },
        ]}
        lead="Designed to captivate, engage, and connect you to your target audience online."
      />
    </FullViewportHeroShell>
  );
}
