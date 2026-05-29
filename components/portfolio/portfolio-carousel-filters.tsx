"use client";

import {
  getPortfolioFilterLabel,
  portfolioFilters,
  type PortfolioCategory,
} from "./portfolio-data";

type PortfolioCarouselFiltersProps = {
  filter: PortfolioCategory;
  onFilterChange: (category: PortfolioCategory) => void;
  resultCount: number;
};

export function PortfolioCarouselFilters({
  filter,
  onFilterChange,
  resultCount,
}: PortfolioCarouselFiltersProps) {
  return (
    <div className="portfolio-carousel__filters">
      <p className="portfolio-carousel__filters-count">
        {resultCount} project{resultCount === 1 ? "" : "s"}
        {filter !== "all" ? ` · ${getPortfolioFilterLabel(filter)}` : ""}
      </p>
      <div
        className="portfolio-carousel__filters-list"
        role="tablist"
        aria-label="Portfolio categories"
      >
        {portfolioFilters.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={filter === id}
            onClick={() => onFilterChange(id)}
            className={`portfolio-carousel__filter-btn${
              filter === id ? " portfolio-carousel__filter-btn--active" : ""
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
