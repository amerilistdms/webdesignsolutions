import type { Metadata } from "next";
import { AboutHero } from "../../components/about/about-hero";
import { AboutSections } from "../../components/about/about-sections";
import { TEAM_COLLAB_IMAGE } from "@/lib/verified-images";
import { SplitFeature } from "../../components/shared/split-feature";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Amerilist Web Design—15+ years of data-driven web design, development, and marketing solutions that grow your business.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <SplitFeature
        image={TEAM_COLLAB_IMAGE}
        imageAlt="Web design team reviewing a project together"
        imageReveal="left"
        label="Our Approach"
        title="Strategy before"
        titleAccent="a single pixel."
        desc="Every project starts with a deep dive into your business, your customers, and your competition. We don't ship pixels until we know what success looks like for you."
        items={[
          "Brand & competitor audit",
          "Customer persona research",
          "Conversion goal mapping",
          "Data-driven design decisions",
        ]}
        ctaText="Learn Our Process"
        ctaHref="/our-process"
      />
      <AboutSections />
    </>
  );
}
