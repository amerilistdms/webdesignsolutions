"use client";

import {
  aboutHowWeDoBusiness,
  aboutWhyChoose,
} from "./about-story-data";
import { AboutPinnedStory } from "./about-pinned-story";

export function AboutStorySections() {
  return (
    <>
      <AboutPinnedStory
        id="about-how-business-title"
        label="How we do business"
        title="How We Do"
        titleAccent="Business?"
        items={aboutHowWeDoBusiness}
        scrollMultiplier={0.72}
        layout="default"
      />
      <AboutPinnedStory
        id="about-why-choose-title"
        label="Why choose us"
        title="Why"
        titleAccent="Choose Us"
        items={aboutWhyChoose}
        scrollMultiplier={0.68}
        layout="mirror"
      />
    </>
  );
}
