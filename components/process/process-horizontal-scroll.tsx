"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processHorizontalSteps } from "./process-horizontal-data";
import "./process-horizontal-scroll.css";

gsap.registerPlugin(ScrollTrigger);

export function ProcessHorizontalScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let pin: ScrollTrigger | null = null;
    let headerTrigger: ScrollTrigger | null = null;

    const setup = () => {
      pin?.kill(true);
      headerTrigger?.kill(true);
      gsap.set(track, { clearProps: "x" });

      const tail = track.querySelector<HTMLElement>(".card-spacer");
      if (tail) {
        tail.style.width = `${Math.max(160, window.innerWidth * 0.28)}px`;
      }

      const totalWidth = Math.max(0, track.scrollWidth - window.innerWidth);

      pin = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${totalWidth + 240}`,
        pin: true,
        pinReparent: false,
        anticipatePin: 1,
        scrub: 2.4,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(track, { x: -self.progress * totalWidth });
        },
      });

      if (titleRef.current) {
        const headerTween = gsap.to(titleRef.current, {
          y: -48,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=600",
            scrub: 2,
          },
        });
        headerTrigger = headerTween.scrollTrigger ?? null;
      }
    };

    setup();

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setup();
        ScrollTrigger.refresh();
      });
    });

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setup();
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      pin?.kill(true);
      headerTrigger?.kill(true);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="process-horizontal-pin"
      aria-labelledby="process-horizontal-title"
    >
      <div ref={titleRef} className="ph-header">
        <div className="ph-label">How we work</div>
        <h2 id="process-horizontal-title" className="ph-title">
          Our
          <br />
          Process
        </h2>
      </div>

      <div className="scroll-hint" aria-hidden>
        Scroll to explore
        <span className="scroll-hint-arrow">→</span>
      </div>

      <div ref={trackRef} className="track">
        <div style={{ flexShrink: 0, width: "420px" }} aria-hidden />

        {processHorizontalSteps.map((step) => (
          <div key={step.num} className="card">
            <div className="card-top">
              <span className="card-num">{step.num}</span>
              <span className="card-icon">{step.icon}</span>
            </div>
            <h3 className="card-title">{step.title}</h3>
            <p className="card-desc">{step.desc}</p>
          </div>
        ))}

        <div className="card-spacer" aria-hidden />
      </div>
    </section>
  );
}
