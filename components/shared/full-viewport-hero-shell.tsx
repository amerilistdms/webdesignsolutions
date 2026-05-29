"use client";

import { useRef, type ReactNode } from "react";
import "../home/home-hero.css";
import "./page-hero-bg.css";
import { SITE_HERO_PIN } from "./site-hero";
import "./site-hero-typography.css";
import "./site-hero-viewport.css";
import { useHeroPinScroll } from "./use-hero-pin-scroll";

type FullViewportHeroShellProps = {
  ariaLabel: string;
  outerClassName?: string;
  wrapperClassName?: string;
  background: ReactNode;
  children: ReactNode;
};

export function FullViewportHeroShell({
  ariaLabel,
  outerClassName = "",
  wrapperClassName = "",
  background,
  children,
}: FullViewportHeroShellProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useHeroPinScroll(heroRef, {
    enabled: true,
    pinVH: SITE_HERO_PIN.pinVH,
    scrub: SITE_HERO_PIN.scrub,
  });

  return (
    <section className={`page-hero-outer ${outerClassName}`.trim()} aria-label={ariaLabel}>
      <div
        ref={heroRef}
        className={`home-hero-wrapper home-hero-wrapper--fullscreen page-hero-wrapper ${wrapperClassName}`.trim()}
      >
        {background}
        <div className="home-hero-stage">
          <div className="site-hero__content page-hero__content mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
