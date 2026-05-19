"use client";

import Link from "next/link";
import { useRef } from "react";
import { HeroParallaxBg } from "./hero-parallax-bg";
import { HeroTaglines } from "./hero-taglines";
import { useSectionParallaxLift } from "./use-section-parallax-lift";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { bg, fg } = useSectionParallaxLift(sectionRef, 0.045, 0.2);

  return (
    <section
      ref={sectionRef}
      className="relative -mt-[var(--site-header-offset)] flex min-h-dvh w-full items-center overflow-hidden"
    >
      <HeroParallaxBg bgLift={bg} />
      <div
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-center px-4 py-24 will-change-transform sm:px-6 lg:px-8 lg:py-32"
        style={{ transform: `translate3d(0, ${fg}px, 0)` }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)] sm:text-sm">
          Amerilist Web Design Solutions
        </p>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Data-driven digital solutions
        </h1>
        <HeroTaglines />
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/get-started"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-sm font-semibold text-[var(--color-nav)] shadow-lg shadow-sky-500/25 transition hover:brightness-110"
          >
            Get started
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10"
          >
            Explore services
          </Link>
        </div>
      </div>
    </section>
  );
}
