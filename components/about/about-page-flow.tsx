import { AboutCaptureSection } from "./about-capture-section";
import { AboutInlineCta } from "./about-inline-cta";
import { AboutStorySections } from "./about-story-sections";
import "./about-page-flow.css";

export function AboutPageFlow() {
  return (
    <div className="about-page-flow">
      <AboutCaptureSection />
      <div className="about-stories-block">
        <AboutStorySections />
        <AboutInlineCta />
      </div>
    </div>
  );
}
