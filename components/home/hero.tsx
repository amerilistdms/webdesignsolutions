"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { HeroTaglines } from "./hero-taglines";
import { useHomeHeroPinScroll } from "./use-home-hero-pin-scroll";
import "./home-hero.css";

export function Hero() {
  const [altBackground, setAltBackground] = useState(false);
  const switchId = useId();
  const pinRef = useRef<HTMLDivElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bottomFadeRef = useRef<HTMLDivElement>(null);

  useHomeHeroPinScroll({
    pinTarget: pinRef,
    aurora: auroraRef,
    stage: stageRef,
    bottomFade: bottomFadeRef,
  });

  return (
    <section className="home-hero-outer" aria-label="Amerilist homepage hero">
      <div
        ref={pinRef}
        className={`home-hero-wrapper home-hero-wrapper--fullscreen${
          altBackground ? " home-hero-wrapper--alt" : ""
        }`}
      >
      <div ref={auroraRef} className="home-hero-aurora" aria-hidden>
        <div className="home-hero-stripes" />
      </div>
      <div className="home-hero-scrim" aria-hidden />
      <div ref={bottomFadeRef} className="home-hero-bottom-fade" aria-hidden />

      <div ref={stageRef} className="home-hero-stage">
        <div className="home-hero-shell">
        <div className="home-hero-content flex flex-col justify-center">
          <h1 className="home-hero-title">
            <span className="home-hero-title__bar" aria-hidden />
            <span className="home-hero-glass-line" data-text="Amerilist">
              Amerilist
            </span>
            <span
              className="home-hero-glass-line home-hero-title__accent"
              data-text="Digital"
            >
              Digital
            </span>
            <span
              className="home-hero-glass-line home-hero-title__muted"
              data-text="Experiences"
            >
              Experiences
            </span>
          </h1>

          <div className="home-hero-taglines">
            <HeroTaglines />
          </div>

          <input
            id={switchId}
            type="checkbox"
            className="home-hero-switch"
            checked={altBackground}
            onChange={(event) => setAltBackground(event.target.checked)}
          />
          <label htmlFor={switchId} className="home-hero-switch-label">
            <span className="home-hero-switch-icon" aria-hidden>
              →
            </span>
            <span>Switch background</span>
          </label>
        </div>

        <div className="home-hero-actions">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/get-started" className="home-hero-btn">
              Get started
            </Link>
            <Link href="/services" className="home-hero-btn">
              Explore services
            </Link>
          </div>
        </div>
        </div>
      </div>
      </div>
    </section>
  );
}
