import type { Metadata } from "next";
import { AboutHero } from "../../components/about/about-hero";
import { AboutSections } from "../../components/about/about-sections";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Amerilist Web Design—15+ years of data-driven web design, development, and marketing solutions that grow your business.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutSections />
    </>
  );
}
