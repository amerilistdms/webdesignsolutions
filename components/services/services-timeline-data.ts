import { SERVICE_PRODUCTS } from "./services-products-data";
import { getServiceFeatureImage } from "./service-feature-images";

export type TimelineSection = {
  id: string;
  color: string;
  title: string;
  description: string;
  image: { src: string; alt: string };
};

const TIMELINE_BG_COLORS = [
  "#FDF6E3",
  "#E0F7FA",
  "#EDE7F6",
  "#FFF3E0",
  "#f9ffe7",
  "#edf9ff",
  "#ffecf2",
  "#ffe8db",
];

/** One pinned section per service — single hero image per scroll stop. */
export const TIMELINE_SECTIONS: TimelineSection[] = SERVICE_PRODUCTS.map(
  (product, index) => ({
    id: product.id,
    color: TIMELINE_BG_COLORS[index % TIMELINE_BG_COLORS.length],
    title: product.title,
    description: product.description,
    image: getServiceFeatureImage(product.id, product.title),
  }),
);

export const TIMELINE_INITIAL_BG = "#ffffff";
