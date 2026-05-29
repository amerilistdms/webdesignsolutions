"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionGlows } from "../shared/section-glows";
import "./home-why-us-section.css";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    num: "01",
    title: "Data-Driven by Default",
    desc: "Every design decision is backed by real data — not gut feel. We research before we create.",
  },
  {
    num: "02",
    title: "Full-Service Under One Roof",
    desc: "Design, dev, SEO, ads, email — all in-house. No hand-offs, no finger-pointing, no excuses.",
  },
  {
    num: "03",
    title: "15+ Years in the Trenches",
    desc: "We've seen every trend come and go. Our strategies are built on what actually works long-term.",
  },
  {
    num: "04",
    title: "You Own Everything",
    desc: "Your code, your content, your data. We build assets you own — not subscriptions you're trapped in.",
  },
  {
    num: "05",
    title: "Results You Can Measure",
    desc: "We align on KPIs up front and optimize until the numbers move — not just until the site looks done.",
  },
  {
    num: "06",
    title: "Transparent Reporting",
    desc: "Real-time dashboards, monthly calls, zero jargon. You always know exactly where your money goes.",
  },
] as const;

const companyStats = [
  {
    key: "experience",
    target: 15,
    prefix: "",
    suffix: "+",
    display: null,
    lines: ["Years of", "Experience"],
  },
  {
    key: "clients",
    target: 2000,
    prefix: "+",
    suffix: "",
    display: "2k",
    lines: ["Satisfied", "Clients"],
  },
  {
    key: "projects",
    target: 3000,
    prefix: "+",
    suffix: "",
    display: "3k",
    lines: ["Successful", "Projects"],
  },
  {
    key: "staff",
    target: 56,
    prefix: "",
    suffix: "",
    display: null,
    lines: ["Professional", "Staff"],
  },
] as const;

function formatCompanyStat(
  value: number,
  stat: (typeof companyStats)[number],
) {
  if (stat.display) return `${stat.prefix}${stat.display}`;
  return `${stat.prefix}${Math.round(value)}${stat.suffix}`;
}

export function HomeWhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (leftRef.current) {
        gsap.from(leftRef.current.querySelectorAll(".home-why-us__reveal"), {
          y: "105%",
          duration: 1.1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: leftRef.current, start: "top 75%" },
        });
      }

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: lineRef.current, start: "top 80%" },
          },
        );
      }

      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          x: 40,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      companyStats.forEach((stat, i) => {
        const item = statsRef.current[i];
        if (!item) return;

        const numEl = item.querySelector<HTMLElement>(".home-why-us__stat-num");

        ScrollTrigger.create({
          trigger: item,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.from(item, {
              y: 28,
              opacity: 0,
              duration: 0.75,
              delay: i * 0.06,
              ease: "power3.out",
            });

            if (!numEl || stat.display) {
              if (numEl && stat.display) {
                numEl.textContent = formatCompanyStat(stat.target, stat);
              }
              return;
            }

            const count = { val: 0 };
            gsap.to(count, {
              val: stat.target,
              duration: 1.35,
              delay: i * 0.06,
              ease: "power2.out",
              onUpdate: () => {
                numEl.textContent = formatCompanyStat(count.val, stat);
              },
              onComplete: () => {
                numEl.textContent = formatCompanyStat(stat.target, stat);
              },
            });
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="home-why-us"
      aria-labelledby="home-why-us-title"
    >
      <SectionGlows density="rich" />

      <div className="home-why-us__inner">
        <div className="home-why-us__left" ref={leftRef}>
          <p className="home-why-us__label">Why Amerilist</p>

          <h2 id="home-why-us-title" className="home-why-us__title">
            <span className="home-why-us__title-wrap">
              <span className="home-why-us__reveal">Why 3,000+</span>
            </span>
            <span className="home-why-us__title-wrap">
              <span className="home-why-us__reveal">brands</span>
            </span>
            <span className="home-why-us__title-wrap">
              <span className="home-why-us__reveal home-why-us__title-stroke">
                choose us.
              </span>
            </span>
          </h2>

          <p className="home-why-us__lead">
            We don&apos;t just build websites. We build revenue-generating digital
            assets with the strategy, design, and execution to back them up.
          </p>

          <div className="home-why-us__accent-line" ref={lineRef} aria-hidden />
          <p className="home-why-us__big-num" aria-hidden>
            6×
          </p>
        </div>

        <div className="home-why-us__right">
          {reasons.map((reason, i) => (
            <div
              key={reason.num}
              className="home-why-us__reason"
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
            >
              <span className="home-why-us__reason-num">{reason.num}</span>
              <div>
                <h3 className="home-why-us__reason-title">{reason.title}</h3>
                <p className="home-why-us__reason-desc">{reason.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="home-why-us__stats" aria-label="AmeriList company highlights">
        <div className="home-why-us__stats-grid">
          {companyStats.map((stat, i) => (
            <div
              key={stat.key}
              className="home-why-us__stat-item"
              ref={(el) => {
                statsRef.current[i] = el;
              }}
            >
              <span className="home-why-us__stat-num">
                {stat.display
                  ? `${stat.prefix}${stat.display}`
                  : `${stat.prefix}${stat.target}${stat.suffix}`}
              </span>
              <div className="home-why-us__stat-label">
                {stat.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
