"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import {
  TIMELINE_INITIAL_BG,
  TIMELINE_SECTIONS,
} from "./services-timeline-data";
import "./services-timeline.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function IntroText({ text }: { text: string }) {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <p className="services-timeline__intro-text">
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="services-timeline__intro-word">
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

export function ServicesTimeline() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const sections = gsap.utils.toArray<HTMLElement>(
        ".services-timeline__section",
        root,
      );

      sections.forEach((section, index) => {
        const bgColor = section.dataset.color ?? TIMELINE_INITIAL_BG;
        const introWords = section.querySelectorAll<HTMLElement>(
          ".services-timeline__intro-word",
        );
        const feature = section.querySelector<HTMLElement>(
          ".services-timeline__media-feature",
        );

        gsap.set(introWords, { opacity: 0.1 });

        if (feature) {
          gsap.set(feature, { opacity: 0, scale: 0.94, y: 24 });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=100%",
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            onEnter: () => {
              gsap.to(root, {
                backgroundColor: bgColor,
                duration: 0.6,
                ease: "power2.out",
              });
            },
            onLeaveBack: () => {
              const prevColor =
                index === 0
                  ? TIMELINE_INITIAL_BG
                  : (sections[index - 1]?.dataset.color ?? TIMELINE_INITIAL_BG);

              gsap.to(root, {
                backgroundColor: prevColor,
                duration: 0.6,
                ease: "power2.out",
              });
            },
          },
        });

        tl.to(introWords, {
          opacity: 1,
          stagger: 0.05,
          duration: 0.6,
          ease: "power2.out",
        });

        if (feature) {
          tl.to(
            feature,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.55,
              ease: "power3.out",
            },
            0.15,
          );
        }
      });

      const refresh = () => ScrollTrigger.refresh();
      refresh();

      const onLoad = () => refresh();
      const onResize = () => refresh();

      window.addEventListener("load", onLoad);
      window.addEventListener("resize", onResize);

      const refreshTimeout = window.setTimeout(refresh, 300);

      return () => {
        window.removeEventListener("load", onLoad);
        window.removeEventListener("resize", onResize);
        window.clearTimeout(refreshTimeout);
      };
    },
    { scope: rootRef, dependencies: [TIMELINE_SECTIONS.length] },
  );

  return (
    <div ref={rootRef} className="services-timeline">
      <div className="services-timeline__intro">
        <h2 className="services-timeline__intro-headline">OUR SERVICES.</h2>
      </div>

      <div className="services-timeline__timeline">
        {TIMELINE_SECTIONS.map((section) => (
          <section
            key={section.id}
            id={`service-timeline-${section.id}`}
            className="services-timeline__section"
            data-color={section.color}
          >
            <div className="services-timeline__grid">
              <div className="services-timeline__copy">
                <h3 className="services-timeline__title">{section.title}</h3>
                <IntroText text={section.description} />
              </div>

              <div className="services-timeline__media-panel">
                <div className="services-timeline__media-frame">
                  <Image
                    className="services-timeline__media-feature"
                    src={section.image.src}
                    alt={section.image.alt}
                    width={900}
                    height={1125}
                    sizes="(max-width: 768px) 90vw, 42vw"
                  />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
