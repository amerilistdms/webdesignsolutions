"use client";

import { useEffect, useState, type RefObject } from "react";

export type SectionParallaxLift = { bg: number; fg: number };

/**
 * Banner-style parallax: same viewport anchor (section top), two rates.
 * Foreground moves more than background → background feels almost still while logos/copy drift up on scroll.
 */
export function useSectionParallaxLift(
  ref: RefObject<HTMLElement | null>,
  bgFactor: number,
  fgFactor: number,
): SectionParallaxLift {
  const [lift, setLift] = useState<SectionParallaxLift>({ bg: 0, fg: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;

    const tick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (mq.matches) {
          setLift({ bg: 0, fg: 0 });
          return;
        }
        const t = el.getBoundingClientRect().top;
        setLift({
          bg: t * bgFactor,
          fg: t * fgFactor,
        });
      });
    };

    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    mq.addEventListener("change", tick);
    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
      mq.removeEventListener("change", tick);
      cancelAnimationFrame(raf);
    };
  }, [ref, bgFactor, fgFactor]);

  return lift;
}
