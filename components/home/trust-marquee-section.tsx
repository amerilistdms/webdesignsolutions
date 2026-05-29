"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionGlows } from "../shared/section-glows";
import { TrustMarqueeLogos } from "./trust-marquee-logos";
import "./trust-marquee-section.css";

gsap.registerPlugin(ScrollTrigger);

/** Standalone strip — prefer embedding via `HomeManifestoSection`. */
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

      <TrustMarqueeLogos className="trust-marquee-section__marquee mt-10 sm:mt-14" />
    </section>
  );
}
