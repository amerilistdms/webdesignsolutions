"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ParallaxLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

/** Plan B FX ParallaxLink — link drifts up on scroll (scrub). */
export function ParallaxLink({ href, children, className = "" }: ParallaxLinkProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const tween = gsap.fromTo(
      el,
      { y: 40, opacity: 0.7 },
      {
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "top 30%",
          scrub: true,
        },
      },
    );

    return () => {
      tween.kill();
      tween.scrollTrigger?.kill();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="inline-block">
      <Link href={href} className={className}>
        {children}
      </Link>
    </div>
  );
}
