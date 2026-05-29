"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type CountUpValueProps = {
  value: number;
  className?: string;
  delay?: number;
  duration?: number;
  /** Zero-pad displayed integer (e.g. 2 → "01") */
  pad?: number;
};

function formatValue(num: number, pad?: number) {
  const rounded = String(Math.round(num));
  return pad ? rounded.padStart(pad, "0") : rounded;
}

export function CountUpValue({
  value,
  className,
  delay = 0,
  duration = 1.35,
  pad,
}: CountUpValueProps) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      el.textContent = formatValue(value, pad);
      return;
    }

    const count = { val: 0 };
    el.textContent = formatValue(0, pad);

    const tween = gsap.to(count, {
      val: value,
      duration,
      delay,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = formatValue(count.val, pad);
      },
      onComplete: () => {
        el.textContent = formatValue(value, pad);
      },
    });

    return () => {
      tween.kill();
    };
  }, [value, delay, duration, pad]);

  return (
    <span ref={spanRef} className={className}>
      0
    </span>
  );
}
