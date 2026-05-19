/**
 * Copia de referencia — el JSX que pegaste en el chat (preview completo con header falso).
 * No está importado en la app; solo para que tengas el código tal cual lo escribiste.
 */
import React from "react";

const featureCards = [
  {
    icon: "▥",
    title: "Data-backed strategy",
    text: "Audience insights and marketing experience help guide every design decision.",
  },
  {
    icon: "◉",
    title: "Conversion-focused design",
    text: "Layouts, CTAs, and user flows are crafted to move visitors toward action.",
  },
  {
    icon: "✉",
    title: "Marketing integration",
    text: "Websites connect seamlessly with email campaigns, landing pages, and outreach systems.",
  },
  {
    icon: "↗",
    title: "Built for growth",
    text: "Fast, responsive, and scalable websites designed to support long-term business goals.",
  },
];

const statCards = [
  {
    position: "left-[3%] top-[20%]",
    icon: "●●●",
    value: "2.5M+",
    text: "Targeted audiences analyzed",
  },
  {
    position: "right-[2%] top-[28%]",
    icon: "➤",
    value: "3.8x",
    text: "Stronger conversion rate",
  },
  {
    position: "left-[-2%] bottom-[25%]",
    icon: "▧",
    value: "45%+",
    text: "Average increase in engagement",
  },
  {
    position: "right-[6%] bottom-[18%]",
    icon: "✦",
    value: "99%",
    text: "Websites built for speed & performance",
  },
];

export default function AmerilistSecondSectionPreview() {
  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <section className="relative min-h-screen overflow-hidden bg-[#020817] px-6 py-16 md:px-12 lg:px-20">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(0,174,255,0.22),transparent_30%),radial-gradient(circle_at_95%_65%,rgba(0,120,255,0.14),transparent_28%),linear-gradient(115deg,#020817_0%,#04101f_45%,#061c31_100%)]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(34,211,238,.55) 1px, transparent 1.7px)",
            backgroundSize: "32px 32px",
            backgroundPosition: "58% 10%",
            maskImage: "radial-gradient(circle at 72% 45%, black 0%, transparent 48%)",
          }}
        />
        <div className="absolute left-0 top-0 h-full w-[58%] bg-gradient-to-r from-[#020817] via-[#020817]/92 to-transparent" />
        <div className="absolute bottom-0 left-0 h-52 w-full bg-gradient-to-t from-[#020817] to-transparent" />
        <div className="absolute left-0 top-0 h-px w-full bg-white/10" />

        {/* Top spacing / fake header area to match reference */}
        <div className="relative z-20 mx-auto mb-28 flex max-w-7xl items-start justify-between text-sm text-white/85">
          <div>
            <div className="mb-7 flex gap-7 text-sm">
              <span>Blog</span>
              <span>Contact Us</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="grid grid-cols-4 gap-1">
                {Array.from({ length: 16 }).map((_, i) => (
                  <span key={i} className="h-2 w-2 rounded-full bg-white" />
                ))}
              </div>
              <div>
                <div className="text-3xl font-bold leading-none tracking-[-0.04em]">
                  AmeriList
                </div>
                <div className="text-[11px] font-bold uppercase tracking-[0.08em]">
                  Web Design Solutions
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="mb-14 flex items-center justify-end gap-4">
              {["f", "◎", "in", "𝕏"].map((item) => (
                <span
                  key={item}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 font-semibold"
                >
                  {item}
                </span>
              ))}
              <span className="ml-3 text-xl font-bold">1.800.457.2899</span>
            </div>
            <div className="flex gap-8">
              {[
                "Home",
                "About",
                "Services",
                "Portfolio",
                "Our Process",
                "Get Started",
              ].map((item, index) => (
                <span
                  key={item}
                  className="relative text-sm font-medium text-white/80"
                >
                  {item}
                  {index === 0 && (
                    <span className="absolute -bottom-3 left-0 h-[2px] w-full bg-cyan-300" />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left content */}
          <div className="max-w-[620px]">
            <p className="mb-7 text-sm font-bold uppercase tracking-[0.42em] text-cyan-300">
              More than web design
            </p>

            <h1 className="text-[clamp(3.2rem,5.9vw,5.8rem)] font-semibold leading-[1.02] tracking-[-0.065em] text-white">
              Web experiences <br />
              powered by <span className="text-cyan-300">data.</span>
            </h1>

            <p className="mt-7 max-w-[560px] text-lg leading-8 text-white/75">
              We combine modern web design, audience intelligence, and marketing
              strategy to create digital experiences designed to attract, engage,
              and convert.
            </p>

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {featureCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-[1.4rem] border border-white/10 bg-[#06101f]/55 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md"
                >
                  <div className="mb-7 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-cyan-400/15 shadow-[0_0_28px_rgba(34,211,238,0.18)]">
                    <img
                      src="https://placehold.co/32x32/38bdf8/020817?text=+"
                      alt="icon"
                      className="h-8 w-8 object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold tracking-[-0.03em] text-white">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-white/68">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="#"
              className="mt-8 inline-flex items-center gap-3 text-lg font-semibold text-cyan-300"
            >
              Explore all services <span>→</span>
            </a>
          </div>

          {/* Right visual */}
          <div className="relative hidden min-h-[720px] lg:block">
            <div className="absolute left-[10%] top-[39%] h-[210px] w-[610px] rotate-[-10deg] rounded-[50%] border border-cyan-300/35" />
            <div className="absolute left-[27%] top-[8%] h-[620px] w-[410px] rounded-full bg-cyan-400/12 blur-[90px]" />

            {statCards.map((stat) => (
              <div
                key={stat.value}
                className={`absolute z-20 w-[190px] rounded-[1.3rem] border border-white/15 bg-[#071427]/75 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.32)] backdrop-blur-xl ${stat.position}`}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-cyan-400/15">
                    <img
                      src="https://placehold.co/22x22/38bdf8/020817?text=+"
                      alt="stat icon"
                      className="h-5 w-5 object-contain"
                    />
                  </span>
                  <span className="text-2xl font-bold tracking-[-0.04em]">
                    {stat.value}
                  </span>
                </div>
                <p className="text-[15px] leading-6 text-white/72">{stat.text}</p>
              </div>
            ))}

            <div className="absolute left-[30%] top-[-1%] z-10 w-[430px] rotate-[8deg]">
              <div className="relative">
                <div className="absolute inset-10 rounded-[3rem] bg-cyan-400/20 blur-[80px]" />
                <img
                  src="https://placehold.co/430x720/07111f/38bdf8?text=PHONE+MOCKUP+PNG"
                  alt="Phone mockup"
                  className="relative z-10 block w-full object-contain drop-shadow-[0_35px_120px_rgba(0,0,0,0.75)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
