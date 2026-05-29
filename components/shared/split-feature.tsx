"use client";

import Link from "next/link";
import { TEAM_COLLAB_IMAGE } from "@/lib/verified-images";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./split-feature.css";

gsap.registerPlugin(ScrollTrigger);

export type SplitFeatureProps = {
  reverse?: boolean;
  image?: string;
  imageAlt?: string;
  label?: string;
  title?: string;
  titleAccent?: string;
  desc?: string;
  items?: string[];
  ctaText?: string;
  ctaHref?: string;
  stat?: { value: string; label: string };
  /** Scroll reveal: image slides in + fades from this side */
  imageReveal?: "left" | "right";
};

export function SplitFeature({
  reverse = false,
  image = TEAM_COLLAB_IMAGE,
  imageAlt = "Amerilist team at work",
  label = "Our Approach",
  title = "Strategy before",
  titleAccent = "a single pixel.",
  desc = "Every project starts with a deep dive into your business, your customers, and your competition. We don't open design tools until we know exactly what success looks like for you.",
  items = [
    "Brand & competitor audit",
    "Customer persona research",
    "Conversion goal mapping",
    "Data-driven design decisions",
  ],
  ctaText = "Learn Our Process",
  ctaHref = "/our-process",
  stat,
  imageReveal,
}: SplitFeatureProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgInnerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (imgWrapRef.current && imageReveal && !prefersReducedMotion) {
        const fromLeft = imageReveal === "left";
        gsap.fromTo(
          imgWrapRef.current,
          {
            x: fromLeft ? -64 : 64,
            opacity: 0,
            clipPath: fromLeft ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
          },
          {
            x: 0,
            opacity: 1,
            clipPath: "inset(0 0% 0 0%)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imgWrapRef.current,
              start: "top 82%",
              once: true,
            },
          },
        );
      }

      if (imgInnerRef.current && !prefersReducedMotion) {
        gsap.fromTo(
          imgInnerRef.current,
          { y: "-12%" },
          {
            y: "12%",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }

      if (contentRef.current) {
        gsap.from(contentRef.current.querySelectorAll(".split-feature__anim"), {
          y: 32,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: contentRef.current, start: "top 75%" },
        });
      }

      if (statRef.current && stat) {
        const numEl = statRef.current.querySelector(".split-feature__stat-num");
        const raw = parseFloat(stat.value);
        if (numEl && !Number.isNaN(raw)) {
          const suffix = stat.value.replace(/[\d.]/g, "");
          const count = { val: 0 };
          gsap.to(count, {
            val: raw,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              numEl.textContent = Math.round(count.val) + suffix;
            },
            scrollTrigger: { trigger: statRef.current, start: "top 85%", once: true },
          });
        }
        gsap.from(statRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: statRef.current, start: "top 85%" },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [stat, imageReveal]);

  return (
    <section ref={sectionRef} className="split-feature" aria-labelledby="split-feature-title">
      <div className={`split-feature__inner ${reverse ? "split-feature__inner--rev" : ""}`}>
        <div className="split-feature__img-wrap" ref={imgWrapRef}>
          <div className="split-feature__img-inner" ref={imgInnerRef}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={imageAlt} className="split-feature__img" loading="lazy" decoding="async" />
          </div>
          {stat ? (
            <div className="split-feature__badge" ref={statRef}>
              <span className="split-feature__stat-num">{stat.value}</span>
              <span className="split-feature__stat-label">{stat.label}</span>
            </div>
          ) : null}
          <div className="split-feature__stripe" aria-hidden />
        </div>

        <div ref={contentRef}>
          <p className="split-feature__label split-feature__anim">{label}</p>
          <h2 id="split-feature-title" className="split-feature__title split-feature__anim">
            {title} <span>{titleAccent}</span>
          </h2>
          <p className="split-feature__desc split-feature__anim">{desc}</p>
          <ul className="split-feature__items">
            {items.map((item) => (
              <li key={item} className="split-feature__item split-feature__anim">
                <span className="split-feature__item-dot" aria-hidden>
                  <span className="split-feature__item-check">✓</span>
                </span>
                {item}
              </li>
            ))}
          </ul>
          <Link href={ctaHref} className="split-feature__cta split-feature__anim">
            {ctaText} →
          </Link>
        </div>
      </div>
    </section>
  );
}
