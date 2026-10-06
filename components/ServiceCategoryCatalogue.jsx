"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ServiceVisual from "@/components/ServiceVisual";

const FILTERS = [
  ["all", "All"],
  ["love", "Love & Relationship"],
  ["career", "Career & Finance"],
  ["general", "General Guidance"],
  ["life", "Life Path"],
  ["special", "Special Readings"],
];

function getServiceGroup(service) {
  const slug = service.slug || "";
  const text = `${service.name || ""} ${service.tagline || ""} ${(service.focusAreas || []).join(" ")}`.toLowerCase();

  if (
    /love|relationship|spouse|marriage|come-back|connection|karmic|cord|rose|venus|unspoken|heartbreak/.test(
      `${slug} ${text}`
    )
  ) return "love";

  if (/career|finance|money|abundance|prosperity|job|professional/.test(`${slug} ${text}`)) {
    return "career";
  }

  if (/general|guidance|intuitive/.test(`${slug} ${text}`)) return "general";

  if (/life-path|life purpose|purpose|spiritual growth|detailed-life/.test(`${slug} ${text}`)) {
    return "life";
  }

  return "special";
}

export default function ServiceCategoryCatalogue({ services }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const availableFilters = useMemo(() => {
    const groups = new Set(services.map(getServiceGroup));
    return FILTERS.filter(([key]) => key === "all" || groups.has(key));
  }, [services]);

  const visibleServices = useMemo(
    () => activeFilter === "all"
      ? services
      : services.filter((service) => getServiceGroup(service) === activeFilter),
    [activeFilter, services]
  );

  return (
    <>
      <div className="service-category-filters" role="tablist" aria-label="Service categories">
        {availableFilters.map(([key, label]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={activeFilter === key}
            className={`service-category-filter${activeFilter === key ? " is-active" : ""}`}
            onClick={() => setActiveFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="service-category-grid">
        {visibleServices.map((item, index) => (
          <article className="service-category-card" key={item.slug}>
            <span className="service-category-card-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="service-card-glitter" aria-hidden="true" />
            <div className="service-category-card-art">
              <ServiceVisual service={item} />
            </div>
            <div className="service-category-card-content">
              <h3>{item.name}</h3>
              <p>{item.tagline}</p>

              <div className="service-category-card-footer">
                <div className="service-category-price">
                  <span>{item.price ? "From" : "Price"}</span>
                  <strong>{item.priceLabel}</strong>
                </div>

                <Link
                  href={item.price ? `/services/${item.slug}` : "/contact"}
                  className="service-category-book"
                >
                  {item.price ? "Book This Session" : "Enquire"} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
