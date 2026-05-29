"use client";

import {
  getPortfolioFilterLabel,
  portfolioFilters,
  type PortfolioCategory,
} from "./portfolio-data";

type PortfolioReelFiltersProps = {
  filter: PortfolioCategory;
  onFilterChange: (category: PortfolioCategory) => void;
  resultCount: number;
};

export function PortfolioReelFilters({
  filter,
  onFilterChange,
  resultCount,
}: PortfolioReelFiltersProps) {
  return (
    <div className="portfolio-reel__filters">
      <p className="portfolio-reel__filters-count">
        {resultCount} project{resultCount === 1 ? "" : "s"}
        {filter !== "all" ? ` · ${getPortfolioFilterLabel(filter)}` : ""}
      </p>
      <div
        className="portfolio-reel__filters-list"
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
            className={`portfolio-reel__filter-btn${
              filter === id ? " portfolio-reel__filter-btn--active" : ""
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
