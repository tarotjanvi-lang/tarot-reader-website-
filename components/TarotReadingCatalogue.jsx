"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ServiceVisual from "@/components/ServiceVisual";

const filters = [
  { key: "all", label: "All Readings" },
  { key: "love", label: "Love & Relationship" },
  { key: "career", label: "Career & Finance" },
  { key: "general", label: "General Guidance" },
  { key: "life", label: "Life Path" },
];

function getFilter(item) {
  const slug = item.slug;
  if (["love-and-relationship-reading", "will-they-come-back", "future-spouse-and-marriage-timing", "the-connection-truth", "karmic-contracts"].includes(slug)) return "love";
  if (["career-and-finance-reading", "money-block-decoder"].includes(slug)) return "career";
  if (slug === "general-guidance-reading") return "general";
  if (slug === "detailed-life-path-reading") return "life";
  return "special";
}

export default function TarotReadingCatalogue({ items }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredItems = useMemo(
    () => activeFilter === "all" ? items : items.filter((item) => getFilter(item) === activeFilter),
    [activeFilter, items]
  );

  return (
    <>
      <div className="tarot-reading-filters" role="tablist" aria-label="Tarot reading categories">
        {filters.map((filter) => (
          <button
            key={filter.key}
            type="button"
            className={`tarot-filter${activeFilter === filter.key ? " is-active" : ""}`}
            onClick={() => setActiveFilter(filter.key)}
            role="tab"
            aria-selected={activeFilter === filter.key}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="tarot-reading-grid">
        {filteredItems.map((item, index) => (
          <article key={item.slug} className="service-card tarot-reading-card">
            <span className="tarot-card-number">{String(index + 1).padStart(2, "0")}</span>
            <ServiceVisual service={item} />
            <div className="tarot-card-content">
              <h3>{item.name}</h3>
              <p>{item.tagline}</p>
              <div className="tarot-card-price">
                <span className="tarot-price-label">From</span>
                <strong>{item.priceLabel}</strong>
              </div>
              <Link href={`/services/${item.slug}`} className="btn btn-primary tarot-card-button">
                Book This Session <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
