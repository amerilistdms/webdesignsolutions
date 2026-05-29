"use client";

import Link from "next/link";
import { useRef } from "react";
import { useHomeHeroPinScroll } from "../home/use-home-hero-pin-scroll";
import { AboutServiceTicker } from "./about-service-ticker";
import "../home/home-hero.css";
import "./about-stripe-hero.css";

export function AboutStripeHero() {
  const pinRef = useRef<HTMLDivElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bottomFadeRef = useRef<HTMLDivElement>(null);

  useHomeHeroPinScroll(
    {
      pinTarget: pinRef,
      aurora: auroraRef,
      stage: stageRef,
      bottomFade: bottomFadeRef,
    },
    { pinVH: 0.55, scrub: 0.9 },
  );

  return (
    <section className="about-hero-outer" aria-label="About Amerilist hero">
      <div
        ref={pinRef}
        className="home-hero-wrapper home-hero-wrapper--fullscreen about-hero-wrapper"
      >
        <div ref={auroraRef} className="home-hero-aurora about-hero-aurora" aria-hidden>
          <div className="home-hero-stripes about-hero-stripes" />
        </div>
        <div className="home-hero-scrim about-hero-scrim" aria-hidden />
        <div ref={bottomFadeRef} className="home-hero-bottom-fade" aria-hidden />

        <div ref={stageRef} className="home-hero-stage">
          <div className="home-hero-content about-hero-content site-hero__content mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="about-hero-eyebrow">About Amerilist Web Design</p>

            <h1 className="home-hero-title about-hero-title">
              <span className="home-hero-title__bar" aria-hidden />
              <span className="home-hero-glass-line" data-text="We take brands,">
                We take brands,
              </span>
              <span
                className="home-hero-glass-line home-hero-title__accent about-hero-title__accent"
                data-text="large and small,"
              >
                large and small,
              </span>
              <span
                className="home-hero-glass-line home-hero-title__muted"
                data-text="to new heights"
              >
                to new heights
              </span>
            </h1>

            <p className="about-hero-lead">
              For over fifteen years, clients have trusted Amerilist to reach the right
              people with the right message. Our web design practice brings that same
              discipline to the browser—where data, design, and measurable outcomes
              meet.
            </p>
          </div>

          <div className="home-hero-actions site-hero__content mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/get-started" className="home-hero-btn">
                Start a project
              </Link>
              <Link href="/our-process" className="home-hero-btn">
                Our process
              </Link>
            </div>
          </div>
        </div>
      </div>

      <AboutServiceTicker />
    </section>
  );
}
