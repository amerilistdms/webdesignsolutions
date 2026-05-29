import { getServiceFeatureImage } from "./service-feature-images";

export type ServiceShowcaseImage = {
  src: string;
  alt: string;
};

export type ServiceProduct = {
  id: string;
  title: string;
  description: string;
  accentColor: string;
};

export const SERVICE_PRODUCTS: ServiceProduct[] = [
  {
    id: "web-development",
    title: "Web development",
    description:
      "Our expert development team works on the cutting edge of technology and best practices. We integrate online components and build websites engineered for performance.",
    accentColor: "#38bdf8",
  },
  {
    id: "ecommerce",
    title: "E-commerce solutions",
    description:
      "Launching an online store doesn't have to be rocket science. With the right tools and our specialists, you can sell online—and be successful at it.",
    accentColor: "#81e92f",
  },
  {
    id: "seo",
    title: "Search engine optimization",
    description:
      "Our team of online and search marketing experts will optimize your website for better conversion and visibility where it matters.",
    accentColor: "#0070ab",
  },
  {
    id: "hosting",
    title: "Hosting & registration",
    description:
      "Comprehensive web hosting and domain registration for any size company—we can manage all of your domain and host account needs.",
    accentColor: "#5eead4",
  },
  {
    id: "social-media",
    title: "Social media",
    description:
      "Over 90% of brand managers say social delivers their best customer engagement. We help you show up where your audience already lives.",
    accentColor: "#38bdf8",
  },
  {
    id: "email-marketing",
    title: "Email marketing",
    description:
      "When you need to increase traffic and conversions, nothing beats permission-based email marketing—targeted, measurable, and on-brand.",
    accentColor: "#e31937",
  },
  {
    id: "graphic-design",
    title: "Graphic design",
    description:
      "First impressions matter. We craft identity and marketing assets that make your brand memorable before a word is read.",
    accentColor: "#81e92f",
  },
  {
    id: "data-solutions",
    title: "Data solutions",
    description:
      "Database marketing is our foundation. Since 2002, AmeriList has led the way for marketers who need responsive customer acquisition tools.",
    accentColor: "#0070ab",
  },
];

const SECTION_BG_CYCLE = [
  "#0f1b33",
  "#1a2744",
  "#152238",
  "#1e2033",
  "#0a1730",
  "#121c2e",
  "#0f1b33",
  "#1a2744",
];

export function getServiceImage(index: number): ServiceShowcaseImage {
  const product = SERVICE_PRODUCTS[index];
  if (!product) {
    return getServiceFeatureImage("web-development", "AmeriList Web Design service");
  }
  return getServiceFeatureImage(product.id, product.title);
}

export function getSectionBgColors(count: number): string[] {
  return Array.from({ length: Math.max(0, count - 1) }, (_, index) =>
    SECTION_BG_CYCLE[index % SECTION_BG_CYCLE.length],
  );
}
