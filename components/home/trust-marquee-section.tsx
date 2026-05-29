/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionGlows } from "../shared/section-glows";
import "./trust-marquee-section.css";

gsap.registerPlugin(ScrollTrigger);

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
              className="max-h-[42px] max-w-[120px] object-contain opacity-90 transition-[opacity,transform] duration-200 ease-out hover:scale-105 hover:opacity-100"
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
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const parallax = parallaxRef.current;
    if (!section || !parallax) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        parallax,
        { y: "-10%" },
        {
          y: "10%",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="trust-marquee-section"
      aria-label="Trusted by leading brands"
    >
      <div ref={parallaxRef} className="trust-marquee-section__parallax" aria-hidden />
      <SectionGlows density="rich" />

      <div className="trust-marquee-section__inner mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="trust-marquee-section__eyebrow sm:text-sm">
          Trusted by teams who expect more than pretty pages
        </p>
      </div>

      <div
        className="trust-marquee-section__marquee logo-marquee relative mt-10 w-full overflow-hidden sm:mt-14"
        role="region"
        aria-label="Partner logos"
      >
        <div className="trust-marquee-track">
          <LogoRow />
          <LogoRow duplicate />
        </div>
      </div>
    </section>
  );
}
