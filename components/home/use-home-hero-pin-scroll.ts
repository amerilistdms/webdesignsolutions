"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type HomeHeroPinRefs = {
  pinTarget: RefObject<HTMLElement | null>;
  aurora: RefObject<HTMLDivElement | null>;
  stage: RefObject<HTMLDivElement | null>;
  bottomFade: RefObject<HTMLDivElement | null>;
};

type HomeHeroPinOptions = {
  pinVH?: number;
  scrub?: number;
};

export function useHomeHeroPinScroll(
  { pinTarget, aurora, stage, bottomFade }: HomeHeroPinRefs,
  { pinVH = 0.78, scrub = 1.05 }: HomeHeroPinOptions = {},
) {
  useGSAP(
    () => {
      const pinEl = pinTarget.current;
      const auroraEl = aurora.current;
      const stageEl = stage.current;
      const fadeEl = bottomFade.current;
      if (!pinEl || !auroraEl || !stageEl) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const end = () => `+=${Math.round(window.innerHeight * pinVH)}`;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: pinEl,
            start: "top top",
            end,
            scrub,
            invalidateOnRefresh: true,
          },
        });

        timeline.fromTo(
          auroraEl,
          { y: 0, scale: 1 },
          { y: 72, scale: 1.05, ease: "none" },
          0,
        );

        timeline.fromTo(
          stageEl,
          { y: 0, opacity: 1 },
          { y: -120, opacity: 0, ease: "none" },
          0,
        );

        if (fadeEl) {
          timeline.fromTo(
            fadeEl,
            { opacity: 0.55 },
            { opacity: 1, ease: "none" },
            0,
          );
        }
      });

      const refresh = () => ScrollTrigger.refresh();
      requestAnimationFrame(refresh);
      window.addEventListener("load", refresh);

      return () => {
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    },
    { scope: pinTarget, dependencies: [pinVH, scrub], revertOnUpdate: true },
  );
}
