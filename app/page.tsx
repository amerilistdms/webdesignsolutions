import { Hero } from "../components/home/hero";
import { HomeSections } from "../components/home/home-sections";
import { TrustMarqueeSection } from "../components/home/trust-marquee-section";
import { WhyAmerilistSection } from "../components/home/why-amerilist-section";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyAmerilistSection />
      <TrustMarqueeSection />
      <HomeSections />
    </>
  );
}
