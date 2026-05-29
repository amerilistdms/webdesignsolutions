"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import type { AboutStoryItem } from "./about-story-data";
import "./about-pinned-story.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type AboutPinnedStoryProps = {
  id: string;
  label: string;
  title: string;
  titleAccent: string;
  items: AboutStoryItem[];
  scrollMultiplier?: number;
  /** default: title left, cards right — mirror: cards left, title right */
  layout?: "default" | "mirror";
};

export function AboutPinnedStory({
  id,
  label,
  title,
  titleAccent,
  items,
  scrollMultiplier = 0.72,
  layout = "default",
}: AboutPinnedStoryProps) {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trackRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const total = items.length;
  const totalLabel = String(total).padStart(2, "0");
  const isMirror = layout === "mirror";

  useGSAP(
    () => {
      const root = rootRef.current;
      const pin = pinRef.current;
      if (!root || !pin) return;

      const panels = panelRefs.current.filter(
        (panel): panel is HTMLDivElement => panel !== null,
      );
      if (panels.length === 0) return;

      const setActiveIndex = (index: number) => {
        const clamped = Math.max(0, Math.min(total - 1, index));
        trackRefs.current.forEach((segment, i) => {
          if (!segment) return;
          segment.classList.toggle("is-active", i === clamped);
          segment.classList.toggle("is-done", i < clamped);
        });
      };

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(panels, { autoAlpha: 1, y: 0 });
        panels.forEach((panel, i) => {
          panel.classList.toggle("is-active", i === 0);
        });
        setActiveIndex(0);
        return;
      }

      panels.forEach((panel, i) => {
        const card = panel.querySelector<HTMLElement>(
          ".about-pinned-story__card",
        );
        const watermark = panel.querySelector<HTMLElement>(
          ".about-pinned-story__watermark",
        );
        const copy = panel.querySelector<HTMLElement>(
          ".about-pinned-story__card-copy",
        );

        gsap.set(panel, { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 48 });
        if (card) gsap.set(card, { scale: i === 0 ? 1 : 0.96 });
        if (watermark) {
          gsap.set(watermark, {
            scale: i === 0 ? 1 : 0.88,
            opacity: i === 0 ? 1 : 0,
          });
        }
        if (copy) gsap.set(copy, { y: i === 0 ? 0 : 24, autoAlpha: i === 0 ? 1 : 0 });
        panel.classList.toggle("is-active", i === 0);
      });
      setActiveIndex(0);

      const endDistance = () =>
        `+=${Math.round(window.innerHeight * scrollMultiplier * panels.length)}`;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: endDistance,
          pin: pin,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(
              total - 1,
              Math.floor(self.progress * total * 0.999),
            );
            setActiveIndex(index);
          },
        },
      });

      panels.forEach((panel, index) => {
        if (index === 0) return;

        const previous = panels[index - 1];
        const prevCard = previous.querySelector<HTMLElement>(
          ".about-pinned-story__card",
        );
        const prevWatermark = previous.querySelector<HTMLElement>(
          ".about-pinned-story__watermark",
        );
        const prevCopy = previous.querySelector<HTMLElement>(
          ".about-pinned-story__card-copy",
        );

        const card = panel.querySelector<HTMLElement>(
          ".about-pinned-story__card",
        );
        const watermark = panel.querySelector<HTMLElement>(
          ".about-pinned-story__watermark",
        );
        const copy = panel.querySelector<HTMLElement>(
          ".about-pinned-story__card-copy",
        );

        const position = index;

        if (prevCopy) {
          timeline.to(
            prevCopy,
            { y: -20, autoAlpha: 0, duration: 0.28, ease: "power2.in" },
            position,
          );
        }
        if (prevCard) {
          timeline.to(
            prevCard,
            { scale: 0.97, duration: 0.32, ease: "power2.in" },
            position,
          );
        }
        if (prevWatermark) {
          timeline.to(
            prevWatermark,
            { scale: 1.06, opacity: 0, duration: 0.35, ease: "power2.in" },
            position,
          );
        }
        timeline.to(
          previous,
          {
            autoAlpha: 0,
            y: -32,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              previous.classList.remove("is-active");
            },
          },
          position + 0.02,
        );
        timeline.fromTo(
          panel,
          { autoAlpha: 0, y: 56 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            ease: "power3.out",
            onStart: () => {
              panel.classList.add("is-active");
              setActiveIndex(index);
            },
          },
          position + 0.12,
        );
        if (watermark) {
          timeline.fromTo(
            watermark,
            { scale: 0.82, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" },
            position + 0.14,
          );
        }
        if (card) {
          timeline.fromTo(
            card,
            { scale: 0.94 },
            { scale: 1, duration: 0.55, ease: "power3.out" },
            position + 0.16,
          );
        }
        if (copy) {
          timeline.fromTo(
            copy,
            { y: 32, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.45, ease: "power3.out" },
            position + 0.2,
          );
        }
      });
    },
    {
      scope: rootRef,
      dependencies: [items.length, scrollMultiplier, total, layout],
    },
  );

  return (
    <section
      ref={rootRef}
      className={`about-pinned-story${isMirror ? " about-pinned-story--mirror" : ""}`}
      aria-labelledby={id}
    >
      <div ref={pinRef} className="about-pinned-story__pin">
        <div className="about-pinned-story__mesh" aria-hidden />
        <div className="about-pinned-story__glow about-pinned-story__glow--a" aria-hidden />
        <div className="about-pinned-story__glow about-pinned-story__glow--b" aria-hidden />

        <div className="about-pinned-story__layout">
          <header className="about-pinned-story__aside">
            <p className="about-pinned-story__label">{label}</p>
            <h2 id={id} className="about-pinned-story__title">
              {title} <span>{titleAccent}</span>
            </h2>
            <p className="about-pinned-story__aside-note">
              Scroll to walk through our approach—one principle at a time.
            </p>
          </header>

          <div className="about-pinned-story__main">
            <div className="about-pinned-story__stage" aria-live="polite">
              {items.map((item, index) => {
                const step = String(index + 1).padStart(2, "0");

                return (
                  <div
                    key={`${item.title ?? item.body}-${index}`}
                    ref={(el) => {
                      panelRefs.current[index] = el;
                    }}
                    className={`about-pinned-story__panel${index === 0 ? " is-active" : ""}`}
                  >
                    <article className="about-pinned-story__card">
                      <span className="about-pinned-story__watermark" aria-hidden>
                        {step}
                      </span>
                      <div className="about-pinned-story__card-top">
                        <div className="about-pinned-story__step-badge">
                          <span className="about-pinned-story__step-current">
                            {step}
                          </span>
                          <span className="about-pinned-story__step-sep">/</span>
                          <span>{totalLabel}</span>
                        </div>
                      </div>

                      <div className="about-pinned-story__card-copy">
                        <h3 className="about-pinned-story__panel-title">{item.title}</h3>
                        <p className="about-pinned-story__panel-body">{item.body}</p>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>

            <div
              className="about-pinned-story__track"
              aria-label={`Progress: ${total} steps`}
            >
              {items.map((item, index) => (
                <span
                  key={`track-${item.title ?? item.body}-${index}`}
                  ref={(el) => {
                    trackRefs.current[index] = el;
                  }}
                  className={`about-pinned-story__track-segment${index === 0 ? " is-active" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
