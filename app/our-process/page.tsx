import type { Metadata } from "next";
import { ProcessHero } from "../../components/process/process-hero";
import { ProcessTimelineClient } from "../../components/process/process-timeline-client";
import { ProcessSections } from "../../components/process/process-sections";
import "./process-page.css";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "AmeriList's eight-step web design and development process—from initial evaluation and technical analysis through simulation, design, implementation, testing, and launch.",
};

export default function OurProcessPage() {
  return (
    <>
      <ProcessHero />
      <ProcessTimelineClient />
      <ProcessSections />
    </>
  );
}
