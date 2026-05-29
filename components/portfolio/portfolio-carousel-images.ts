import {
  getPortfolioCategoryLabel,
  portfolioItems,
  type PortfolioItem,
} from "./portfolio-data";

const MIN_CAROUSEL_SLIDES = 9;

export type CarouselSlide = {
  id: string;
  title: string;
  categoryLabel: string;
  textureUrl: string;
  sourceImage: string;
};

/** Same-origin proxy so WebGL textures load reliably. */
export function portfolioTextureUrl(imageUrl: string): string {
  return `/api/portfolio-image?url=${encodeURIComponent(imageUrl)}`;
}

function toSlides(items: PortfolioItem[]): CarouselSlide[] {
  return items.map((item) => ({
    id: item.id,
    title: item.title,
    categoryLabel: getPortfolioCategoryLabel(item.category),
    sourceImage: item.image,
    textureUrl: portfolioTextureUrl(item.image),
  }));
}

export function buildCarouselSlides(items: PortfolioItem[]): CarouselSlide[] {
  const source = items.length > 0 ? items : portfolioItems;
  let slides = toSlides(source);

  while (slides.length < MIN_CAROUSEL_SLIDES) {
    slides = slides.concat(toSlides(source));
  }

  const list = slides.slice(0, Math.max(MIN_CAROUSEL_SLIDES, slides.length));
  list.unshift(
    { ...list[list.length - 2] },
    { ...list[list.length - 1] },
  );
  list.splice(list.length - 2, 2);

  return list;
}

export function getCarouselItemsKey(items: PortfolioItem[]): string {
  return items.map((item) => item.id).join("|");
}

export function resolveTextureUrl(path: string): string {
  if (path.startsWith("http")) return path;
  if (typeof window === "undefined") return path;
  return `${window.location.origin}${path}`;
}
