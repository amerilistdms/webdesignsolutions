"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type HeroPinScrollOptions = {
  /** Extra scroll distance while hero animates, in viewport heights. */
  pinVH?: number;
  scrub?: number;
  enabled?: boolean;
};

function pinEndDistance(pinVH: number) {
  return `+=${Math.round(window.innerHeight * pinVH)}`;
}

function getHeroBg(section: HTMLElement) {
  return (
    section.querySelector<HTMLElement>(".site-hero__bg-layer") ??
    section.querySelector<HTMLElement>("[data-hero-bg]")
  );
}

function getHeroContent(section: HTMLElement) {
  return (
    section.querySelector<HTMLElement>(".site-hero__content") ??
    section.querySelector<HTMLElement>("[data-hero-content]")
  );
}

/**
 * Scroll-scrubbed hero motion without pinning the section (safe with React routing).
 */
export function useHeroPinScroll(
  sectionRef: RefObject<HTMLElement | null>,
  { pinVH = 0.62, scrub = 0.9, enabled = true }: HeroPinScrollOptions = {},
) {
  useEffect(() => {
    if (!enabled) return;

    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const end = () => pinEndDistance(pinVH);
        const content = getHeroContent(section);
        const bg = getHeroBg(section);

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end,
            scrub,
            invalidateOnRefresh: true,
          },
        });

        if (content) {
          timeline.fromTo(
            content,
            { y: 0, opacity: 1, scale: 1 },
            { y: -100, opacity: 0, scale: 0.94, ease: "none" },
            0,
          );
        }

        if (bg) {
          timeline.fromTo(
            bg,
            { y: 0, scale: 1 },
            { y: 64, scale: 1.08, ease: "none" },
            0,
          );
        }
      }, section);

      return () => ctx.revert();
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, [sectionRef, pinVH, scrub, enabled]);
}
