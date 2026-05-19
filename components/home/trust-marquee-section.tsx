/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef } from "react";
import { useSectionParallaxLift } from "./use-section-parallax-lift";

const MARQUEE_LOGOS = [
  "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg",
] as const;

const LOGO_ALTS = [
  "Sony",
  "Spotify",
  "BMW",
  "Google",
  "Amazon",
  "Airbnb",
] as const;

/** Repeat the 6-logo cycle this many times per half-strip so total width > viewport (no empty “gap” before the loop). */
const CYCLES_PER_HALF = 6;

function LogoRow({ duplicate }: { duplicate?: boolean }) {
  const slots = CYCLES_PER_HALF * MARQUEE_LOGOS.length;

  return (
    <div
      className="logo-track-group flex shrink-0 flex-row items-center gap-[38px] sm:gap-[54px]"
      aria-hidden={duplicate ? true : undefined}
    >
      {Array.from({ length: slots }, (_, idx) => {
        const i = idx % MARQUEE_LOGOS.length;
        const src = MARQUEE_LOGOS[i];
        const cycle = Math.floor(idx / MARQUEE_LOGOS.length);
        const showAlt = !duplicate && cycle === 0;

        return (
          <div
            key={`${duplicate ? "d" : "s"}-${cycle}-${i}`}
            className="logo-pill flex h-[60px] w-[140px] shrink-0 items-center justify-center sm:h-[70px] sm:w-[180px]"
          >
            <img
              src={src}
              alt={showAlt ? LOGO_ALTS[i] : ""}
              className="max-h-[42px] max-w-[120px] object-contain opacity-[0.38] grayscale transition-[opacity,transform,filter] duration-200 ease-out hover:scale-105 hover:opacity-100 hover:grayscale-0"
              draggable={false}
            />
          </div>
        );
      })}
    </div>
  );
}

export function TrustMarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { bg, fg } = useSectionParallaxLift(sectionRef, 0.055, 0.22);

  return (
    <section
      ref={sectionRef}
      className="trust-section relative overflow-hidden border-y border-black/5 py-16 sm:py-20 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[var(--background)] will-change-transform"
        style={{ transform: `translate3d(0, ${bg}px, 0)` }}
        aria-hidden
      />

      <div
        className="relative z-10 will-change-transform"
        style={{ transform: `translate3d(0, ${fg}px, 0)` }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-[var(--foreground-muted)] sm:text-sm">
            Trusted by teams who expect more than pretty pages
          </p>
        </div>

        <div
          className="logo-marquee relative mt-10 w-full overflow-hidden sm:mt-14"
          role="region"
          aria-label="Partner logos"
        >
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--background)] to-transparent sm:w-28"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--background)] to-transparent sm:w-28"
            aria-hidden
          />

          <div className="trust-marquee-track">
            <LogoRow />
            <LogoRow duplicate />
          </div>
        </div>
      </div>
    </section>
  );
}
