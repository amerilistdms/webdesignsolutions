"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShowcaseWatermarkTitle } from "../shared/showcase-watermark-title";
import { processIntro } from "./process-data";
import { ProcessStepHover } from "./process-step-hover";
import { processTimelineSteps } from "./process-timeline-data";
import { ProcessCta } from "./process-sections";
import "./process-timeline.css";

gsap.registerPlugin(ScrollTrigger);

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "bottom 60%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      stepsRef.current.forEach((step) => {
        if (!step) return;
        gsap.from(step, {
          y: 36,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 82%",
            invalidateOnRefresh: true,
          },
        });
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(() => requestAnimationFrame(refresh));
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="process-timeline" aria-labelledby="process-timeline-title">
      <div className="process-timeline__inner">
        <header className="process-timeline__header">
          <ShowcaseWatermarkTitle label="Process" />
          <h2 id="process-timeline-title" className="sr-only">
            Our process
          </h2>
        </header>

        <div className="process-timeline__intro">
          <h2 className="process-timeline__intro-title">{processIntro.headline}</h2>
          <p className="process-timeline__intro-body">{processIntro.body}</p>
        </div>

        <div className="process-timeline__body">
          <div className="process-timeline__center-line" aria-hidden>
            <div ref={lineRef} className="process-timeline__center-line-fill" />
          </div>

          {processTimelineSteps.map((step, i) => {
            const isEven = i % 2 !== 0;

            return (
              <div
                key={step.num}
                className="process-timeline__step"
                ref={(el) => {
                  stepsRef.current[i] = el;
                }}
              >
                <div
                  className={`process-timeline__step-content process-timeline__step-content--left${
                    isEven ? " process-timeline__step-empty" : ""
                  }`}
                >
                  {!isEven && (
                    <ProcessStepHover
                      className="process-timeline__step-copy"
                      align="left"
                    >
                      <h3 className="process-timeline__step-title">{step.title}</h3>
                      <p className="process-timeline__step-desc">{step.desc}</p>
                      <div className="process-timeline__step-tags">
                        {step.details.map((detail) => (
                          <span key={detail} className="process-timeline__step-tag">
                            {detail}
                          </span>
                        ))}
                      </div>
                    </ProcessStepHover>
                  )}
                </div>

                <div className="process-timeline__step-node">
                  <div className="process-timeline__node-dot">{i + 1}</div>
                </div>

                <div
                  className={`process-timeline__step-content process-timeline__step-content--right${
                    !isEven ? " process-timeline__step-empty" : ""
                  }`}
                >
                  {isEven && (
                    <ProcessStepHover
                      className="process-timeline__step-copy"
                      align="right"
                    >
                      <h3 className="process-timeline__step-title">{step.title}</h3>
                      <p className="process-timeline__step-desc">{step.desc}</p>
                      <div className="process-timeline__step-tags">
                        {step.details.map((detail) => (
                          <span key={detail} className="process-timeline__step-tag">
                            {detail}
                          </span>
                        ))}
                      </div>
                    </ProcessStepHover>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <ProcessCta />
      </div>
    </section>
  );
}
