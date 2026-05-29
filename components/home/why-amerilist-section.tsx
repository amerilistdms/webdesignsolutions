"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  RevealUp,
  revealContainer,
  revealItem,
  revealViewport,
} from "./reveal-up";

const PHONE_MOCKUP_SRC =
  "https://www.amerilist.com/files/websolutionswebsite/phonemockup.png";

const features = [
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <rect x="3" y="12" width="4" height="9" rx="1" fill="#38bdf8" />
        <rect x="10" y="7" width="4" height="14" rx="1" fill="#38bdf8" />
        <rect x="17" y="3" width="4" height="18" rx="1" fill="#38bdf8" />
      </svg>
    ),
    title: "Data-backed strategy",
    desc: "Audience insights and marketing experience help guide every design decision.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" stroke="#38bdf8" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="#38bdf8" strokeWidth="2" />
        <line x1="12" y1="3" x2="12" y2="6" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="18" x2="12" y2="21" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
        <line x1="3" y1="12" x2="6" y2="12" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
        <line x1="18" y1="12" x2="21" y2="12" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Conversion-focused design",
    desc: "Layouts, CTAs, and user flows are crafted to move visitors toward action.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="#38bdf8" strokeWidth="2" />
        <path d="M2 8h20" stroke="#38bdf8" strokeWidth="2" />
        <path d="M6 12h4M6 16h8" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Marketing integration",
    desc: "Websites connect seamlessly with email campaigns, landing pages, and outreach systems.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <polyline points="3,17 9,11 13,15 21,7" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <polyline points="17,7 21,7 21,11" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
    title: "Built for growth",
    desc: "Fast, responsive, and scalable websites designed to support long-term business goals.",
  },
];

function HeroSection() {
  return (
    <>
      <style>{`
        .parallax-hero {
          position: relative;
          overflow: hidden;
          background: #f8fafc;
          color: var(--foreground);
        }

        .parallax-bg {
          position: absolute;
          inset: -120px 0;
          z-index: 0;
          background:
            radial-gradient(circle at 72% 18%, rgba(56, 189, 248, 0.24), transparent 44%),
            radial-gradient(circle at 18% 72%, rgba(14, 116, 200, 0.16), transparent 40%),
            radial-gradient(circle at 92% 68%, rgba(56, 189, 248, 0.12), transparent 34%),
            linear-gradient(180deg, #ffffff 0%, #f1f5f9 45%, #ffffff 100%);
        }

        .parallax-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(14, 116, 200, 0.28) 1px, transparent 1px);
          background-size: 26px 26px;
          mask-image: radial-gradient(ellipse 90% 80% at 50% 45%, black 35%, transparent 82%);
          opacity: 0.9;
        }

        .parallax-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .parallax-orb-a {
          width: 420px;
          height: 420px;
          top: -80px;
          right: 8%;
          background: radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, transparent 68%);
          border: 1px solid rgba(56, 189, 248, 0.18);
        }

        .parallax-orb-b {
          width: 280px;
          height: 280px;
          bottom: 10%;
          left: -40px;
          background: radial-gradient(circle, rgba(14, 116, 200, 0.18) 0%, transparent 70%);
        }

        .parallax-ring {
          position: absolute;
          width: 520px;
          height: 520px;
          top: 12%;
          right: -120px;
          border-radius: 50%;
          border: 1px solid rgba(56, 189, 248, 0.22);
          opacity: 0.92;
        }

        .parallax-ring::after {
          content: "";
          position: absolute;
          inset: 48px;
          border-radius: 50%;
          border: 1px dashed rgba(14, 116, 200, 0.18);
        }

        .parallax-body {
          position: relative;
          z-index: 2;
          max-width: 1320px;
          margin: 0 auto;
          padding: 92px 48px 84px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: center;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 34px;
        }

        /* Realistic glass — shared by feature + stat cards */
        .feature-card,
        .stat-card {
          overflow: hidden;
          border: none;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(42px) saturate(185%) contrast(1.04);
          -webkit-backdrop-filter: blur(42px) saturate(185%) contrast(1.04);
          box-shadow:
            0 10px 40px rgba(14, 116, 200, 0.07),
            0 2px 8px rgba(15, 23, 42, 0.04),
            inset 0 1px 1px rgba(255, 255, 255, 0.72),
            inset 0 -1px 1px rgba(255, 255, 255, 0.12);
          transition: box-shadow 0.3s, transform 0.3s;
        }

        .feature-card::before,
        .stat-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(255, 255, 255, 0.25) 28%,
            rgba(255, 255, 255, 0.04) 52%,
            rgba(186, 230, 253, 0.45) 100%
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
          z-index: 1;
        }

        .feature-card::after,
        .stat-card::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            165deg,
            rgba(255, 255, 255, 0.55) 0%,
            rgba(255, 255, 255, 0.12) 28%,
            transparent 52%
          );
          pointer-events: none;
          z-index: 0;
        }

        .feature-card > *,
        .stat-card > * {
          position: relative;
          z-index: 2;
        }

        .feature-card {
          position: relative;
          padding: 20px;
        }

        .feature-card:hover {
          background: rgba(255, 255, 255, 0.1);
          box-shadow:
            0 18px 48px rgba(14, 116, 200, 0.12),
            0 4px 12px rgba(15, 23, 42, 0.05),
            inset 0 1px 1px rgba(255, 255, 255, 0.85),
            inset 0 -1px 1px rgba(255, 255, 255, 0.18);
          transform: translateY(-3px);
        }

        .feature-icon {
          width: 40px;
          height: 40px;
          border-radius: 11px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(12px) saturate(160%);
          -webkit-backdrop-filter: blur(12px) saturate(160%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-visual {
          position: relative;
          min-height: 560px;
          display: grid;
          place-items: center;
        }

        .phone-glow {
          position: absolute;
          width: 560px;
          height: 240px;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          background: radial-gradient(ellipse, rgba(56, 189, 248, 0.22), transparent 68%);
          filter: blur(42px);
          z-index: 0;
          pointer-events: none;
        }

        .phone-wrap {
          position: relative;
          z-index: 2;
          width: min(360px, 48vw);
          perspective: 1000px;
        }

        .phone-mockup-img {
          width: 100%;
          height: auto;
          display: block;
          transform: perspective(900px) rotateY(-10deg) rotateX(4deg);
          filter: brightness(0.86) contrast(1.04)
            drop-shadow(0 32px 56px rgba(15, 23, 42, 0.28));
        }

        .stat-card {
          position: absolute;
          z-index: 4;
          min-width: 165px;
          padding: 16px 18px;
          animation: float 4s ease-in-out infinite;
        }

        .stat-card strong {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .stat-card .stat-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.38);
          backdrop-filter: blur(10px) saturate(160%);
          -webkit-backdrop-filter: blur(10px) saturate(160%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-card span {
          display: block;
        }

        .stat-1 { top: 54px; left: 0; }
        .stat-2 { bottom: 86px; left: 18px; animation-delay: .8s; }
        .stat-3 { top: 86px; right: 0; animation-delay: .4s; }
        .stat-4 { bottom: 110px; right: -10px; animation-delay: 1.1s; }

        @keyframes float {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -8px; }
        }

        @media (max-width: 980px) {
          .parallax-body {
            grid-template-columns: 1fr;
            padding: 64px 24px 72px;
          }

          .hero-visual {
            min-height: 500px;
          }

          .stat-1 { left: 4px; }
          .stat-2 { left: 10px; }
          .stat-3 { right: 4px; }
          .stat-4 { right: 10px; }
        }

        @media (max-width: 640px) {
          .feature-grid {
            grid-template-columns: 1fr;
          }

          .hero-visual {
            min-height: 440px;
          }

          .phone-wrap {
            width: 260px;
          }

          .stat-card {
            min-width: 135px;
            padding: 13px 14px;
          }

        }

      `}</style>

      <section className="section-light parallax-hero relative z-10">
        <div className="parallax-bg">
          <div className="parallax-dots" aria-hidden />
          <div className="parallax-orb parallax-orb-a" aria-hidden />
          <div className="parallax-orb parallax-orb-b" aria-hidden />
          <div className="parallax-ring" aria-hidden />
        </div>

        <motion.div className="parallax-body">
          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
          >
            <motion.p
              variants={revealItem}
              className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)] sm:text-sm"
            >
              More than web design
            </motion.p>

            <motion.h2
              variants={revealItem}
              className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl"
            >
              Web experiences
              <br />
              powered by <span className="text-[var(--color-accent)]">data.</span>
            </motion.h2>

            <motion.p
              variants={revealItem}
              className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--foreground-muted)]"
            >
              We combine modern web design, audience intelligence, and marketing
              strategy to create digital experiences designed to attract, engage,
              and convert.
            </motion.p>

            <motion.div className="feature-grid mt-10" variants={revealContainer}>
              {features.map((feature) => (
                <motion.div className="feature-card" variants={revealItem} key={feature.title}>
                  <motion.div className="feature-icon">{feature.icon}</motion.div>
                  <h3 className="text-base font-semibold text-[var(--foreground)]">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--foreground-muted)]">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={revealItem}>
              <Link
                href="/services"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] transition hover:gap-3"
              >
                Explore all services
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual"
            variants={revealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
          >
            <div className="phone-glow" />

            <RevealUp className="stat-card stat-1">
              <strong className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                2.5M+
              </strong>
              <span className="text-sm leading-snug text-[var(--foreground-muted)]">
                Targeted audiences
                <br />
                analyzed
              </span>
            </RevealUp>

            <RevealUp className="stat-card stat-2">
              <strong className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                45%+
              </strong>
              <span className="text-sm leading-snug text-[var(--foreground-muted)]">
                Average increase
                <br />
                in engagement
              </span>
            </RevealUp>

            <RevealUp className="stat-card stat-3">
              <strong className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                <span className="stat-icon" aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 3l14 9-14 9V3z" stroke="#38bdf8" strokeWidth="2" />
                  </svg>
                </span>
                3.8x
              </strong>
              <span className="text-sm leading-snug text-[var(--foreground-muted)]">
                Stronger conversion
                <br />
                rate
              </span>
            </RevealUp>

            <RevealUp className="stat-card stat-4">
              <strong className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                <span className="stat-icon" aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="#38bdf8" strokeWidth="2.5" />
                  </svg>
                </span>
                99%
              </strong>
              <span className="text-sm leading-snug text-[var(--foreground-muted)]">
                Websites built for
                <br />
                speed &amp; performance
              </span>
            </RevealUp>

            <RevealUp className="phone-wrap">
              <Image
                src={PHONE_MOCKUP_SRC}
                alt="AmeriList mobile website mockup"
                width={540}
                height={1100}
                className="phone-mockup-img"
                sizes="(max-width: 640px) 260px, 360px"
                priority
              />
            </RevealUp>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}

export default HeroSection;
export { HeroSection as WhyAmerilistSection };
