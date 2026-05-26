import type { Metadata } from "next";
import { GetStartedHero } from "../../components/get-started/get-started-hero";
import { GetStartedWizard } from "../../components/get-started/get-started-wizard";
import "./get-started-page.css";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Start a creative revolution with Amerilist Web Design—tell us about your project, timeline, and budget. We respond within one business day.",
};

export default function GetStartedPage() {
  return (
    <>
      <GetStartedHero />
      <section className="relative overflow-hidden bg-[#060d1a] pb-20 pt-4 text-white lg:pb-28 lg:pt-8">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(56,189,248,0.12),transparent_60%),linear-gradient(180deg,#040c1c_0%,#060d1a_40%,#0a1220_100%)]" />
          <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(56,189,248,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.07)_1px,transparent_1px)] [background-size:48px_48px]" />
          <div className="absolute left-1/2 top-0 h-[420px] w-[min(100%,900px)] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="absolute -left-40 bottom-1/4 h-80 w-80 rounded-full bg-blue-600/15 blur-[100px]" />
          <div className="absolute -right-32 top-1/3 h-72 w-72 rounded-full bg-[var(--color-accent)]/10 blur-[90px]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <GetStartedWizard />
          <p className="mt-8 text-center text-xs text-white/40">
            By submitting, you agree we may contact you about your project. We never
            sell your information.
          </p>
        </div>
      </section>
    </>
  );
}
