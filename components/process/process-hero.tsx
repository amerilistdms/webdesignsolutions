"use client";

import type { CSSProperties } from "react";
import { CountUpValue } from "../shared/count-up-value";
import { FullViewportHeroShell } from "../shared/full-viewport-hero-shell";
import "../shared/page-hero-bg.css";
import { SectionGlows } from "../shared/section-glows";
import { SiteHeroCopy } from "../shared/site-hero-copy";
import { processSteps } from "./process-data";
import "./process-hero.css";

export function ProcessHero() {
  return (
    <FullViewportHeroShell
      ariaLabel="Our process"
      outerClassName="process-hero-outer"
      wrapperClassName="process-hero-wrapper"
      background={
        <>
          <div
            className="page-hero__bg pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_0%,rgba(56,189,248,0.35),transparent_55%),linear-gradient(180deg,#252840_0%,#040c1c_88%)]" />
            <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(56,189,248,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.1)_1px,transparent_1px)] [background-size:56px_56px]" />
            <div className="absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-cyan-400/20 blur-[110px]" />
            <SectionGlows density="rich" />
          </div>
        </>
      }
    >
      <SiteHeroCopy
        eyebrow="How we work"
        titleLines={[
          { text: "Our", tone: "default" },
          { text: "Process", tone: "accent" },
        ]}
        lead="We take an eight-step approach to web design & development. This process ensures that all of your needs are met—from initial paperwork through ongoing support."
      >
        <div
          className="site-hero__actions process-hero__badges !mt-2 flex flex-wrap gap-2 !pl-[1.25rem]"
          aria-label="Eight process steps"
        >
          {processSteps.map((step, index) => (
            <span
              key={step.number}
              className="process-hero__badge"
              style={
                {
                  "--badge-delay": `${0.25 + index * 0.15}s`,
                } as CSSProperties
              }
            >
              <CountUpValue
                value={step.number}
                pad={2}
                delay={0.25 + index * 0.15}
                duration={2.5}
                className="process-hero__badge-num"
              />
            </span>
          ))}
        </div>
      </SiteHeroCopy>
    </FullViewportHeroShell>
  );
}
