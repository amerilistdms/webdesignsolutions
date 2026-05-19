import { Hero } from "../components/home/hero";
import { HomeSections } from "../components/home/home-sections";
import { WhyAmerilistSection } from "../components/home/why-amerilist-section";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyAmerilistSection />
      <HomeSections />
    </>
  );
}
