"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TEAM_WHITEBOARD_IMAGE } from "@/lib/verified-images";
import { TrustMarqueeLogos } from "./trust-marquee-logos";
import "./home-manifesto-section.css";
import "./trust-marquee-section.css";

gsap.registerPlugin(ScrollTrigger);

export function HomeManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const lines = section.querySelectorAll(".home-manifesto__line");
    if (!lines.length) return;

    const ctx = gsap.context(() => {
      gsap.from(lines, {
        y: "105%",
        duration: 1.1,
        stagger: 0.09,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
        },
      });

      const visual = section.querySelector(".home-manifesto__visual");
      if (visual) {
        gsap.from(visual, {
          opacity: 0,
          scale: 0.96,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="home-manifesto"
      aria-labelledby="home-manifesto-heading"
    >
      <div className="home-manifesto__inner">
        <div className="home-manifesto__copy">
          <p id="home-manifesto-heading" className="home-manifesto__label">
            Our Philosophy
          </p>

          <p className="home-manifesto__text">
            <span className="home-manifesto__wrap">
              <span className="home-manifesto__line">We believe great design</span>
            </span>
            <span className="home-manifesto__wrap">
              <span className="home-manifesto__line home-manifesto__line--accent">
                must be backed by data.
              </span>
            </span>
            <span className="home-manifesto__wrap">
              <span className="home-manifesto__line">Aesthetics attract —</span>
            </span>
            <span className="home-manifesto__wrap">
              <span className="home-manifesto__line home-manifesto__line--muted">
                results retain.
              </span>
            </span>
          </p>
        </div>

        <div className="home-manifesto__visual">
          <Image
            src={TEAM_WHITEBOARD_IMAGE}
            alt="Design and strategy team collaborating"
            fill
            sizes="(max-width: 900px) 100vw, 40vw"
            className="home-manifesto__image"
            priority={false}
          />
          <div className="home-manifesto__visual-overlay" aria-hidden />
        </div>

        <div className="home-manifesto__logos">
          <p className="home-manifesto__logos-eyebrow">
            Trusted by teams who expect more than pretty pages
          </p>
          <TrustMarqueeLogos className="home-manifesto__logos-marquee" />
        </div>
      </div>
    </section>
  );
}
