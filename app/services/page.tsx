import type { Metadata } from "next";
import { ServicesHero } from "../../components/services/services-hero";
import { ServicesSections } from "../../components/services/services-sections";
import "./services-page.css";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, e-commerce, SEO, hosting, social media, email marketing, graphic design, and data solutions—designed to captivate and convert.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesSections />
    </>
  );
}
