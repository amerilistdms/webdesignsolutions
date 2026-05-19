"use client";

import Link from "next/link";

/* eslint-disable @typescript-eslint/no-unused-vars -- kept as in your source */
const stats = [
  { value: "2.5M+", label: "Targeted audiences analyzed" },
  { value: "45%+", label: "Average increase in engagement" },
];

const statsRight = [
  { value: "3.8x", label: "Stronger conversion rate", icon: "cursor" },
  { value: "99%", label: "Websites built for speed & performance", icon: "bolt" },
];
/* eslint-enable @typescript-eslint/no-unused-vars */

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
        <line
          x1="12"
          y1="3"
          x2="12"
          y2="6"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="12"
          y1="18"
          x2="12"
          y2="21"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="3"
          y1="12"
          x2="6"
          y2="12"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="18"
          y1="12"
          x2="21"
          y2="12"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Conversion-focused design",
    desc: "Layouts, CTAs, and user flows are crafted to move visitors toward action.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <rect
          x="2"
          y="4"
          width="20"
          height="16"
          rx="2"
          stroke="#38bdf8"
          strokeWidth="2"
        />
        <path d="M2 8h20" stroke="#38bdf8" strokeWidth="2" />
        <path
          d="M6 12h4M6 16h8"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Marketing integration",
    desc: "Websites connect seamlessly with email campaigns, landing pages, and outreach systems.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <polyline
          points="3,17 9,11 13,15 21,7"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <polyline
          points="17,7 21,7 21,11"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
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
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

        .hero-root {
          font-family: 'Manrope', sans-serif;
          background: #050d1a;
          color: #fff;
          position: relative;
          /* visible so filter blur / orbs are not cut at section edges (was overflow:hidden) */
          overflow: visible;
        }

        /* ── Starfield ── */
        .hero-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(1px 1px at 15% 25%, rgba(255,255,255,.55) 0%, transparent 100%),
            radial-gradient(1px 1px at 42% 60%, rgba(255,255,255,.35) 0%, transparent 100%),
            radial-gradient(1px 1px at 70% 18%, rgba(255,255,255,.45) 0%, transparent 100%),
            radial-gradient(1px 1px at 88% 72%, rgba(255,255,255,.40) 0%, transparent 100%),
            radial-gradient(1px 1px at 55% 85%, rgba(255,255,255,.30) 0%, transparent 100%),
            radial-gradient(1px 1px at 27% 90%, rgba(255,255,255,.35) 0%, transparent 100%),
            radial-gradient(1px 1px at 93% 40%, rgba(255,255,255,.50) 0%, transparent 100%),
            radial-gradient(1px 1px at 6%  55%, rgba(255,255,255,.30) 0%, transparent 100%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Glow orbs ── */
        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }
        .glow-orb-1 {
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(14,116,200,.28) 0%, transparent 70%);
          top: 12px;
          right: 18%;
        }
        .glow-orb-2 {
          width: 340px; height: 340px;
          background: radial-gradient(circle, rgba(14,116,200,.18) 0%, transparent 70%);
          bottom: 60px; right: 8%;
        }

        /* ── Hero content ── */
        .hero-body {
          position: relative;
          z-index: 5;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          padding: 72px 48px 64px;
          align-items: center;
          max-width: 1320px;
          margin: 0 auto;
        }

        /* Left column */
        .hero-left {}
        .eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: #38bdf8;
          margin-bottom: 20px;
        }
        .hero-heading {
          font-size: clamp(36px, 4.2vw, 58px);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -.025em;
          margin-bottom: 22px;
          color: #fff;
        }
        .hero-heading .accent { color: #38bdf8; }
        .hero-sub {
          font-size: 15px;
          line-height: 1.7;
          color: rgba(255,255,255,.55);
          max-width: 420px;
          margin-bottom: 44px;
        }

        /* Feature grid */
        .feature-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 36px;
        }
        .feature-card {
          background: rgba(255,255,255,.035);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 12px;
          padding: 22px 20px 20px;
          transition: border-color .25s, background .25s;
        }
        .feature-card:hover {
          border-color: rgba(56,189,248,.35);
          background: rgba(56,189,248,.04);
        }
        .feature-icon {
          width: 40px; height: 40px;
          background: rgba(56,189,248,.1);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 14px;
        }
        .feature-title {
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 8px;
        }
        .feature-desc {
          font-size: 12.5px;
          line-height: 1.6;
          color: rgba(255,255,255,.45);
        }

        .explore-link {
          display: inline-flex; align-items: center; gap: 8px;
          color: #38bdf8;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: gap .2s;
        }
        .explore-link:hover { gap: 12px; }
        .explore-link svg { transition: transform .2s; }
        .explore-link:hover svg { transform: translateX(3px); }

        /* Right column – mockup area */
        .hero-right {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 560px;
          overflow: visible;
        }

        /* Ellipse glow behind phone — short vertical reach + low center so blur stays off top clip */
        .phone-glow {
          position: absolute;
          width: 540px;
          height: 200px;
          left: 50%;
          bottom: 12px;
          transform: translate(-50%, 0);
          background: radial-gradient(
            ellipse 88% 62% at 50% 96%,
            rgba(14, 116, 200, 0.48) 0%,
            rgba(14, 116, 200, 0.14) 38%,
            transparent 70%
          );
          filter: blur(36px);
          z-index: 0;
          pointer-events: none;
        }

        /* Floating stat cards */
        .stat-card {
          position: absolute;
          background: rgba(8,20,40,.85);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 14px;
          padding: 16px 20px;
          backdrop-filter: blur(12px);
          min-width: 160px;
          z-index: 20;
          animation: float 4s ease-in-out infinite;
        }
        .stat-card:nth-child(1) { animation-delay: 0s; }
        .stat-card:nth-child(2) { animation-delay: 1s; }
        .stat-card:nth-child(3) { animation-delay: .5s; }
        .stat-card:nth-child(4) { animation-delay: 1.5s; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }

        .stat-card .stat-value {
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 4px;
          display: flex; align-items: center; gap: 8px;
        }
        .stat-card .stat-value .stat-icon {
          width: 28px; height: 28px;
          background: rgba(56,189,248,.15);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
        }
        .stat-card .stat-label {
          font-size: 11.5px;
          color: rgba(255,255,255,.45);
          line-height: 1.4;
        }

        /* Stat positions */
        .stat-top-left   { top: 55px;  left: -20px; }
        .stat-bottom-left { bottom: 80px; left: -10px; }
        .stat-top-right  { top: 80px;  right: -10px; }
        .stat-bottom-right { bottom: 100px; right: -20px; }

        /* Phone mockup placeholder */
        .phone-mockup-wrapper {
          position: relative;
          z-index: 10;
          width: 260px;
          perspective: 1000px;
        }
        .phone-mockup {
          width: 100%;
          aspect-ratio: 9/19.5;
          border-radius: 36px;
          background: #0a1628;
          border: 2px solid rgba(255,255,255,.12);
          box-shadow:
            0 0 0 1px rgba(255,255,255,.04),
            0 40px 80px rgba(0,0,0,.6),
            inset 0 -24px 56px rgba(56, 189, 248, 0.1);
          transform: perspective(900px) rotateY(-10deg) rotateX(4deg);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .phone-notch {
          position: absolute;
          top: 10px; left: 50%;
          transform: translateX(-50%);
          width: 90px; height: 26px;
          background: #050d1a;
          border-radius: 20px;
          z-index: 2;
        }
        .phone-inner {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
        }
        .phone-img-placeholder {
          width: 100%; height: 100%;
          object-fit: cover;
          border-radius: 34px;
        }
        .phone-placeholder-label {
          color: rgba(255,255,255,.18);
          font-size: 12px;
          font-weight: 500;
          text-align: center;
          letter-spacing: .06em;
          padding: 20px;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .hero-body { grid-template-columns: 1fr; padding: 40px 24px; }
          .hero-right { min-height: 420px; }
        }
      `}</style>

      <div className="hero-root">
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />

        {/* Hero body */}
        <div className="hero-body">
          {/* Left */}
          <div className="hero-left">
            <p className="eyebrow">More than web design</p>
            <h2 className="hero-heading">
              Web experiences
              <br />
              powered by <span className="accent">data.</span>
            </h2>
            <p className="hero-sub">
              We combine modern web design, audience intelligence, and marketing
              strategy to create digital experiences designed to attract, engage,
              and convert.
            </p>

            <div className="feature-grid">
              {features.map((f, i) => (
                <div className="feature-card" key={i}>
                  <div className="feature-icon">{f.icon}</div>
                  <div className="feature-title">{f.title}</div>
                  <div className="feature-desc">{f.desc}</div>
                </div>
              ))}
            </div>

            <Link href="/services" className="explore-link">
              Explore all services
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {/* Right — phone mockup + stats */}
          <div className="hero-right">
            <div className="phone-glow" />

            {/* Stat cards */}
            <div className="stat-card stat-top-left">
              <div className="stat-value">2.5M+</div>
              <div className="stat-label">
                Targeted audiences
                <br />
                analyzed
              </div>
            </div>

            <div className="stat-card stat-bottom-left">
              <div className="stat-value">45%+</div>
              <div className="stat-label">
                Average increase
                <br />
                in engagement
              </div>
            </div>

            <div className="stat-card stat-top-right">
              <div className="stat-value">
                <span className="stat-icon">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2"
                  >
                    <path d="M5 3l14 9-14 9V3z" />
                  </svg>
                </span>
                3.8x
              </div>
              <div className="stat-label">
                Stronger conversion
                <br />
                rate
              </div>
            </div>

            <div className="stat-card stat-bottom-right">
              <div className="stat-value">
                <span className="stat-icon">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                  >
                    <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </span>
                99%
              </div>
              <div className="stat-label">
                Websites built for
                <br />
                speed & performance
              </div>
            </div>

            {/* Phone mockup */}
            <div className="phone-mockup-wrapper">
              <div className="phone-mockup">
                <div className="phone-notch" />
                <div className="phone-inner">
                  {/*
                    Replace the div below with your <img> or <Image> component:
                    <Image src="/your-mockup.png" alt="App mockup" fill className="phone-img-placeholder" />
                  */}
                  <div className="phone-placeholder-label">
                    📱
                    <br />
                    <br />
                    Mockup
                    <br />
                    placeholder
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
export { HeroSection as WhyAmerilistSection };
