"use client";

import Link from "next/link";
import { FullViewportHeroShell } from "../shared/full-viewport-hero-shell";
import { SiteHeroCopy } from "../shared/site-hero-copy";
import { AboutServiceTicker } from "./about-service-ticker";
import "../shared/site-hero-shell.css";
import "./about-stripe-hero.css";

const aboutTitleLines = [
  { text: "We take brands,", tone: "default" as const },
  { text: "large and small,", tone: "accent" as const },
  { text: "to new heights", tone: "muted" as const },
];

export function AboutStripeHero() {
  return (
    <>
      <FullViewportHeroShell
        ariaLabel="About Amerilist hero"
        outerClassName="about-hero-outer"
        wrapperClassName="about-hero-wrapper"
        background={
          <>
            <div className="home-hero-aurora about-hero-aurora" aria-hidden>
              <div className="home-hero-stripes site-hero-shell__stripes site-hero-shell__stripes--about" />
            </div>
            <div
              className="home-hero-scrim site-hero-shell__scrim site-hero-shell__scrim--about"
              aria-hidden
            />
            <div className="home-hero-bottom-fade site-hero-shell__bottom-fade" aria-hidden />
          </>
        }
      >
        <SiteHeroCopy
          eyebrow="About Amerilist Web Design"
          titleLines={aboutTitleLines}
          lead="For over fifteen years, clients have trusted Amerilist to reach the right people with the right message. Our web design practice brings that same discipline to the browser—where data, design, and measurable outcomes meet."
        />
        <div className="site-hero__actions">
          <Link href="/get-started" className="home-hero-btn">
            Start a project
          </Link>
          <Link href="/our-process" className="home-hero-btn">
            Our process
          </Link>
        </div>
      </FullViewportHeroShell>

      <AboutServiceTicker />
    </>
  );
}
