"use client";

import { useRef, type ReactNode } from "react";
import "./site-hero-typography.css";
import "./site-hero-viewport.css";
import { useHeroPinScroll } from "./use-hero-pin-scroll";

export const SITE_HERO_PIN = { pinVH: 0.62, scrub: 0.9 } as const;

type SiteHeroProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  /** Decorative layers (gradients, grid, orbs). */
  background?: ReactNode;
  /** Full-bleed photo or tint behind decorations. */
  backdrop?: ReactNode;
  /** Scroll-scrub fade on the hero content (disable for compound hero layouts). */
  pinScroll?: boolean;
  pinVH?: number;
  scrub?: number;
};

function joinClasses(...parts: (string | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function SiteHero({
  children,
  className,
  contentClassName,
  background,
  backdrop,
  pinScroll = true,
  pinVH = SITE_HERO_PIN.pinVH,
  scrub = SITE_HERO_PIN.scrub,
}: SiteHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useHeroPinScroll(sectionRef, { enabled: pinScroll, pinVH, scrub });

  const hasLayers = Boolean(backdrop || background);

  return (
    <section
      ref={sectionRef}
      className={joinClasses(
        "site-hero site-hero--pin site-hero--fullscreen",
        className,
      )}
    >
      {hasLayers ? (
        <div
          className="site-hero__bg-layer pointer-events-none absolute inset-0 overflow-hidden"
          data-hero-bg
          aria-hidden
        >
          {backdrop}
          {background}
        </div>
      ) : null}
      <div className={joinClasses("site-hero__content", contentClassName)}>
        {children}
      </div>
    </section>
  );
}
