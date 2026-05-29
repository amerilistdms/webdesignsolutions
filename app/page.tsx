import { Hero } from "../components/home/hero";
import { HomeManifestoSection } from "../components/home/home-manifesto-section";
import { HomeFaqSection } from "../components/home/home-faq-section";
import { TestimonialsSection } from "../components/home/testimonials-section";
import { HomeWhyUsSection } from "../components/home/home-why-us-section";
import { TrustMarqueeSection } from "../components/home/trust-marquee-section";
import { ParallaxBanner } from "../components/shared/parallax-banner";

const HOME_PARALLAX_IMAGE =
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1800&q=85";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeWhyUsSection />
      <ParallaxBanner image={HOME_PARALLAX_IMAGE} label="" />
      <HomeManifestoSection />
      <TrustMarqueeSection />
      <TestimonialsSection />
      <HomeFaqSection />
    </>
  );
}
