import {
  BUSINESS_ANALYTICS_IMAGE,
  SOCIAL_PHONE_IMAGE,
} from "@/lib/verified-images";

/** One distinct image per service — verified Unsplash URLs only. */
export const SERVICE_IMAGE_BY_ID = {
  "web-development": {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
    alt: "Developer writing code on a laptop",
  },
  ecommerce: {
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=80",
    alt: "Customer paying online at checkout",
  },
  seo: {
    src: BUSINESS_ANALYTICS_IMAGE,
    alt: "SEO and analytics dashboard on screen",
  },
  hosting: {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80",
    alt: "Server room and cloud infrastructure",
  },
  "social-media": {
    src: SOCIAL_PHONE_IMAGE,
    alt: "Social media marketing on mobile",
  },
  "email-marketing": {
    src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1400&q=80",
    alt: "Email marketing campaign on laptop",
  },
  "graphic-design": {
    src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=80",
    alt: "Graphic designer working on brand visuals",
  },
  "data-solutions": {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    alt: "Business data charts and KPI dashboard",
  },
} as const;

export type ServiceImageId = keyof typeof SERVICE_IMAGE_BY_ID;

export function getServiceFeatureImage(
  serviceId: string,
  title: string,
): { src: string; alt: string } {
  const mapped = SERVICE_IMAGE_BY_ID[serviceId as ServiceImageId];
  if (mapped) return { src: mapped.src, alt: mapped.alt };
  return { src: SERVICE_IMAGE_BY_ID["web-development"].src, alt: title };
}
