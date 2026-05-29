export type PortfolioCategory = "all" | "website" | "logo" | "email";

export type PortfolioDetail = {
  slug: string;
  headline: string;
  tagline: string;
  description: string;
  services: string[];
  liveUrl: string;
  bannerImage: string;
  galleryImages: string[];
  navPrev?: string;
  navNext?: string;
};

export type PortfolioItem = {
  id: string;
  title: string;
  category: Exclude<PortfolioCategory, "all">;
  image: string;
  liveUrl?: string;
  detail?: PortfolioDetail;
};

const BASE = "https://amerilistwebdesign.com/";

function img(path: string) {
  return `${BASE}${path}`;
}

const drivingSchoolDetail: PortfolioDetail = {
  slug: "driving-school-experts",
  headline: "Driving School Website Design",
  tagline: "Driving school website design development.",
  description:
    "DSE (Driving School Experts) is a leading driving school in NJ; they needed to develop a website that was informative and user-friendly. Through a very collaborative effort, we helped them research and understand the way young drivers navigate the web. We designed a website that helped them streamline many of their business processes including scheduling and accepting payments. We also assisted with redesign and evolution of their logo and corporate identity materials. The project included the development and implementation of both SEO and direct mail lead generation elements that assisted in recruiting new students.",
  services: ["Web Design", "Graphic Design"],
  liveUrl: "http://www.drivingschoolexperts.com/",
  bannerImage: img("images/driving-banner.jpg"),
  galleryImages: [
    img("images/dsc-img-big.jpg"),
    img("images/dsc-3.jpg"),
    img("images/dsc-5.jpg"),
    img("images/dsc-1.jpg"),
    img("images/dsc-6.jpg"),
    img("images/dsc-7.jpg"),
  ],
  navPrev: "dinning-out-rockland",
  navNext: "balance-wellness-solution",
};

const balancedWellnessDetail: PortfolioDetail = {
  slug: "balance-wellness-solution",
  headline: "Health & Wellness Website Design",
  tagline: "Health & Wellness Website Design.",
  description:
    "The team at Balanced Wellness is an integrative family wellness practice utilizing both traditional and alternative approaches. They wanted to develop a website that works seamlessly to help them communicate their brand value and at the same time act as a conduit for new online lead development. We decided to implement a visual design that reflects the level of passion and care they have for the work they do. We created a design that was modern but yet fit into their current visual structure. It was also critical to help them craft and implement a social media component that was previously absent.",
  services: ["Design", "Branding"],
  liveUrl: "http://www.bwsknoxville.com/",
  bannerImage: img("images/bswx-banner.jpg"),
  galleryImages: [
    img("images/bswx-big-1.jpg"),
    img("images/bswx-big-2.jpg"),
    img("images/bswx-big-3.jpg"),
    img("images/bswx-big-4.jpg"),
    img("images/bswx-big-5.jpg"),
    img("images/bswx-big-6.jpg"),
  ],
  navPrev: "driving-school-experts",
  navNext: "dinning-out-rockland",
};

const dinningOutDetail: PortfolioDetail = {
  slug: "dinning-out-rockland",
  headline: "Restaurant Dining Guide",
  tagline: "Industry specific website development.",
  description:
    "Dining Out Rockland wanted to develop a unique market-specific website that was database driven. The objective was to create a user-friendly interface that allowed consumers to have access to all the local restaurants within their community. At the start of our relationship we helped them fine tune their concept and streamline their brand mission. The end result is a user-friendly platform that engages users and provides a robust stream of advertising revenues.",
  services: ["Logo Design", "Business stationery"],
  liveUrl: "http://diningoutrockland.com/",
  bannerImage: img("images/dinning-banner.jpg"),
  galleryImages: [
    img("images/dinning-a.jpg"),
    img("images/dinning-b.jpg"),
    img("images/dinning-c.jpg"),
    img("images/dinning-d.jpg"),
    img("images/dinning-e.jpg"),
    img("images/dinning-f.jpg"),
  ],
  navPrev: "balance-wellness-solution",
  navNext: "driving-school-experts",
};

/** Proyectos del portfolio actual (amerilistwebdesign.com/portfolio.php). */
export const portfolioItems: PortfolioItem[] = [
  {
    id: "driving-school",
    title: "Driving School Experts",
    category: "website",
    image: img("images/dsc-img-big.jpg"),
    detail: drivingSchoolDetail,
  },
  {
    id: "mgp-email",
    title: "MGP Painting",
    category: "email",
    image: img("images/Email_MGP_Full.jpg"),
    liveUrl: "https://www.mgppainting.com/",
  },
  { id: "marksys", title: "Marksys", category: "website", image: img("images/Web_Marksys_Full.jpg") },
  {
    id: "balanced-wellness",
    title: "Balanced Wellness Solution",
    category: "website",
    image: img("images/bswx-big.jpg"),
    detail: balancedWellnessDetail,
  },
  {
    id: "dor-website",
    title: "Dinning Out Rockland",
    category: "website",
    image: img("images/dinning-f.jpg"),
    detail: dinningOutDetail,
  },
  {
    id: "mgp-website",
    title: "MGP Painting — Website",
    category: "website",
    image: img("images/Web_MGP_full.jpg"),
    liveUrl: "https://www.mgppainting.com/",
  },
  { id: "msg", title: "MSG", category: "email", image: img("images/Email_MSG_Full.jpg") },
  { id: "apria", title: "Apria", category: "website", image: img("images/web_apria.jpg") },
  { id: "disney", title: "Disney Parks", category: "email", image: img("images/disney-big.jpg") },
  { id: "tilton", title: "Tilton Rack", category: "logo", image: img("images/tilton-large.jpg") },
  { id: "stew-hansen", title: "Stew Hansen", category: "email", image: img("images/Car-Dealer-big.jpg") },
  { id: "medicare", title: "Medicare", category: "email", image: img("images/medicare-img-big.jpg") },
  { id: "dor-email", title: "Dinning Out Rockland — Email", category: "email", image: img("images/Email_DOR_Full2.jpg") },
  { id: "capital-alliance", title: "Capital Alliance", category: "logo", image: img("images/ca-large.jpg") },
  { id: "montego-bay", title: "Montego Bay", category: "email", image: img("images/montego-bay-big2.jpg") },
  { id: "compass-income", title: "Compass Income", category: "logo", image: img("images/ci-large.jpg") },
  { id: "eagle-ophthalmic", title: "Eagle Ophthalmic", category: "logo", image: img("images/eo-large.jpg") },
  { id: "big-apple-circus", title: "Big Apple Circus", category: "email", image: img("images/Email_BAC_Full.jpg") },
  { id: "radio-city", title: "Radio City Music Hall", category: "email", image: img("images/radiocity-big.jpg") },
  { id: "rockland-pride", title: "Rockland Pride Center", category: "website", image: img("images/Web_RCPC_Full.jpg") },
  { id: "ltg", title: "LTG Electrical", category: "logo", image: img("images/ltg-large.jpg") },
  { id: "milo", title: "Milo", category: "website", image: img("images/Web_Milo_full.jpg") },
  { id: "wnc", title: "WNC Construction", category: "website", image: img("images/Web_WNC_Full.jpg") },
  { id: "rapid-web", title: "Rapid Armored Corporation", category: "website", image: img("images/Web_Rapid_Full.jpg") },
  { id: "prinz-law", title: "The Prinz Law Firm", category: "logo", image: img("images/plf-large.jpg") },
  { id: "larchmont", title: "Larchmont", category: "logo", image: img("images/lw-large.jpg") },
  { id: "ravi", title: "Ravi Continental Cuisine", category: "logo", image: img("images/rc-large.jpg") },
  { id: "rapid-logo", title: "Rapid Armored — Logo", category: "logo", image: img("images/rp-large.jpg") },
  { id: "yoga-school", title: "The Childrens School Of Yoga", category: "logo", image: img("images/cs-large.jpg") },
  { id: "wedding-linens", title: "Wedding Linens", category: "logo", image: img("images/wl-large.jpg") },
  { id: "wc-construction", title: "W&C Construction", category: "logo", image: img("images/w%26c-large.jpg") },
  { id: "ny-electric", title: "NY Electric Source", category: "website", image: img("images/ny-electric-source-portfolio.webp") },
];

export const portfolioFilters: { id: PortfolioCategory; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "website", label: "Website design" },
  { id: "logo", label: "Logo design" },
  { id: "email", label: "Email blasts" },
];

export const portfolioCounts = {
  website: portfolioItems.filter((i) => i.category === "website").length,
  logo: portfolioItems.filter((i) => i.category === "logo").length,
  email: portfolioItems.filter((i) => i.category === "email").length,
  total: portfolioItems.length,
};

export const portfolioDetailSlugs = portfolioItems
  .filter((item): item is PortfolioItem & { detail: PortfolioDetail } => Boolean(item.detail))
  .map((item) => item.detail.slug);

export function getPortfolioBySlug(slug: string): (PortfolioItem & { detail: PortfolioDetail }) | undefined {
  const item = portfolioItems.find((i) => i.detail?.slug === slug);
  if (!item?.detail) return undefined;
  return item as PortfolioItem & { detail: PortfolioDetail };
}

export function getPortfolioNav(slug: string) {
  const current = getPortfolioBySlug(slug);
  if (!current?.detail) return { prev: undefined, next: undefined };
  const prev = current.detail.navPrev ? getPortfolioBySlug(current.detail.navPrev) : undefined;
  const next = current.detail.navNext ? getPortfolioBySlug(current.detail.navNext) : undefined;
  return { prev, next };
}

export function filterPortfolioItems(category: PortfolioCategory): PortfolioItem[] {
  if (category === "all") return portfolioItems;
  return portfolioItems.filter((item) => item.category === category);
}

export function getPortfolioFilterLabel(category: PortfolioCategory): string {
  return portfolioFilters.find((entry) => entry.id === category)?.label ?? "All work";
}

export const portfolioCategoryLabels: Record<
  Exclude<PortfolioCategory, "all">,
  string
> = {
  website: "Website design",
  logo: "Logo design",
  email: "Email blast",
};

export function getPortfolioCategoryLabel(
  category: Exclude<PortfolioCategory, "all">,
): string {
  return portfolioCategoryLabels[category];
}

export function getPortfolioWatermarkLabel(category: PortfolioCategory): string {
  switch (category) {
    case "website":
      return "Web";
    case "logo":
      return "Brand";
    case "email":
      return "Email";
    default:
      return "Work";
  }
}

export function getPortfolioItemsKey(items: PortfolioItem[]): string {
  return items.map((item) => item.id).join("|");
}

export function getPortfolioLiveUrl(item: PortfolioItem): string | undefined {
  return item.liveUrl ?? item.detail?.liveUrl;
}
