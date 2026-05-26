import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioCaseStudy } from "../../../components/portfolio/portfolio-case-study";
import {
  getPortfolioBySlug,
  portfolioDetailSlugs,
} from "../../../components/portfolio/portfolio-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return portfolioDetailSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getPortfolioBySlug(slug);
  if (!item) return { title: "Portfolio" };

  return {
    title: `${item.title} — Case Study`,
    description: item.detail.description.slice(0, 160),
  };
}

export default async function PortfolioCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getPortfolioBySlug(slug);
  if (!item) notFound();

  return <PortfolioCaseStudy item={item} />;
}
