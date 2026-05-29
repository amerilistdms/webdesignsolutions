"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./parallax-banner.css";

gsap.registerPlugin(ScrollTrigger);

type ParallaxBannerProps = {
  image?: string;
  label?: string | null;
  heading?: ReactNode;
  sub?: string;
  ctaText?: string;
  ctaHref?: string;
  height?: string;
};

export function ParallaxBanner({
  image = "/hero-agency-tech.jpg",
  label,
  heading = (
    <>
      We build what <em>others</em> only promise.
    </>
  ),
  sub = "Strategy, design, and execution — under one roof.",
  ctaText = "Start Your Project",
  ctaHref = "/get-started",
  height = "70vh",
}: ParallaxBannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    if (!section || !img) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { y: "-18%" },
        {
          y: "18%",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      if (contentRef.current) {
        gsap.from(contentRef.current.querySelectorAll(".parallax-banner__anim"), {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="parallax-banner"
      style={{ minHeight: height }}
      aria-label="Amerilist promise"
    >
      <div ref={imgRef} className="parallax-banner__img-wrap">
        <Image
          src={image}
          alt=""
          fill
          className="parallax-banner__bg-img"
          sizes="100vw"
          priority={false}
        />
      </div>
      <div className="parallax-banner__overlay" aria-hidden />
      <div className="parallax-banner__grain" aria-hidden />

      <div className="parallax-banner__content" ref={contentRef}>
        {label ? (
          <p className="parallax-banner__label parallax-banner__anim">
            <span className="parallax-banner__label-line" aria-hidden />
            {label}
            <span className="parallax-banner__label-line" aria-hidden />
          </p>
        ) : null}

        <h2 className="parallax-banner__heading parallax-banner__anim">{heading}</h2>

        <p className="parallax-banner__sub parallax-banner__anim">{sub}</p>

        <Link href={ctaHref} className="parallax-banner__cta parallax-banner__anim">
          {ctaText} <span aria-hidden>↗</span>
        </Link>
      </div>
    </section>
  );
}
