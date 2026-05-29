"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import { portfolioCounts } from "../portfolio/portfolio-data";
import "./home-results-parallax.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PARALLAX_IMAGE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80";

function buildPortfolioStats() {
  const creativeDeliverables = portfolioCounts.logo + portfolioCounts.email;

  return [
    {
      key: "portfolio",
      target: portfolioCounts.total,
      suffix: "+",
      label: "Portfolio Projects",
      desc: "Websites, logos, and email campaigns in our public portfolio",
    },
    {
      key: "years",
      target: 15,
      suffix: "+",
      label: "Years of Experience",
      desc: "AmeriList has served marketers and brands since 2002",
    },
    {
      key: "websites",
      target: portfolioCounts.website,
      suffix: "+",
      label: "Websites Designed",
      desc: "Custom sites built for brands across industries",
    },
    {
      key: "creative",
      target: creativeDeliverables,
      suffix: "+",
      label: "Logo & Email Work",
      desc: "Identity and campaign creative alongside web builds",
    },
  ] as const;
}

const portfolioStats = buildPortfolioStats();

function formatStat(value: number, suffix: string) {
  return `${Math.round(value)}${suffix}`;
}

export function HomeResultsParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const media = mediaRef.current;
      const content = contentRef.current;
      if (!section || !media) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(media, {
          yPercent: 22,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.85,
          },
        });

        if (content) {
          gsap.fromTo(
            content,
            { y: 48, opacity: 0.92 },
            {
              y: -24,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.85,
              },
            },
          );
        }

        portfolioStats.forEach((stat, i) => {
          const item = itemsRef.current[i];
          if (!item) return;

          const numEl = item.querySelector<HTMLElement>(".home-results-parallax__num");

          ScrollTrigger.create({
            trigger: item,
            start: "top 88%",
            once: true,
            onEnter: () => {
              gsap.from(item, {
                y: 28,
                opacity: 0,
                duration: 0.7,
                delay: i * 0.07,
                ease: "power3.out",
              });

              if (!numEl) return;

              const count = { val: 0 };
              gsap.to(count, {
                val: stat.target,
                duration: 1.25,
                delay: i * 0.07,
                ease: "power2.out",
                onUpdate: () => {
                  numEl.textContent = formatStat(count.val, stat.suffix);
                },
                onComplete: () => {
                  numEl.textContent = formatStat(stat.target, stat.suffix);
                },
              });
            },
          });
        });
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="home-results-parallax"
      aria-labelledby="home-results-title"
    >
      <div className="home-results-parallax__media" aria-hidden>
        <div ref={mediaRef} className="home-results-parallax__media-inner">
          <Image
            src={PARALLAX_IMAGE}
            alt=""
            fill
            priority={false}
            sizes="100vw"
            className="home-results-parallax__img object-cover"
          />
        </div>
        <div className="home-results-parallax__overlay" />
      </div>

      <div ref={contentRef} className="home-results-parallax__content">
        <div className="home-results-parallax__intro">
          <h2 id="home-results-title" className="home-results-parallax__title">
            Results that
            <br />
            speak loudly
          </h2>
          <p className="home-results-parallax__lead">
            Real work you can browse in our portfolio—backed by 15+ years helping
            brands grow online.
          </p>
        </div>

        <div className="home-results-parallax__grid">
          {portfolioStats.map((stat, i) => (
            <article
              key={stat.key}
              className="home-results-parallax__card"
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
            >
              <span className="home-results-parallax__num">
                {stat.target}
                {stat.suffix}
              </span>
              <h3 className="home-results-parallax__card-title">{stat.label}</h3>
              <p className="home-results-parallax__card-desc">{stat.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
