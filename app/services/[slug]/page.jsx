import Link from "next/link";
import { notFound } from "next/navigation";
import ServiceVisual from "@/components/ServiceVisual";
import ServiceCategoryCatalogue from "@/components/ServiceCategoryCatalogue";
import { serviceCategories, services } from "@/lib/services-data";

export function generateStaticParams() {
  return [
    ...services.map((s) => ({ slug: s.slug })),
    ...serviceCategories.map((category) => ({ slug: category.slug })),
  ];
}

export function generateMetadata({ params }) {
  const service = services.find((s) => s.slug === params.slug);
  if (service) {
    return {
      title: service.name,
      description: `${service.tagline} Pricing and client testimonials for the ${service.name} session with Janvi.`,
    };
  }

  const category = serviceCategories.find((item) => item.slug === params.slug);
  if (category) {
    return {
      title: category.name,
      description: category.description,
    };
  }

  return {};
}

function getServiceFormat(service) {
  if (service.type === "healing" || service.type === "spellwork") {
    return "Distance based healing";
  }
  return "Text based / audio note";
}

export default function ServiceDetailPage({ params }) {
  const service = services.find((s) => s.slug === params.slug);
  const category = serviceCategories.find((item) => item.slug === params.slug);

  if (!service && !category) notFound();

  if (category) {
    return (
      <>
        <section className={`page-hero service-category-hero service-category-${category.slug}`}>
          <div className="container">
            <h1>{category.name}</h1>
            <p>{category.description}</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <ServiceCategoryCatalogue services={category.services} categorySlug={category.slug} />
          </div>
        </section>
      </>
    );
  }

  const isTarot = service.type === "tarot";
  const isCustom = service.type === "custom";
  const isHealing = service.type === "healing";
  const isSpellwork = service.type === "spellwork";
  const isGuidance = service.type === "guidance";
  const isSpreadTarot = isTarot && service.questions && service.questions.length > 0 && service.slug !== "one-question-tarot-reading" && service.slug !== "three-question-tarot-reading";

  return (
    <section className="section-tight service-detail-page">
      <div className="container">
        <div className="service-detail-grid">
          <div className="service-detail-content">
            <header className="service-hero-detail">
              <div className="eyebrow">{service.category}</div>
              <h1>{service.name}</h1>
              <p className="service-lede">{service.description || service.tagline}</p>
              <div className="service-hero-meta">
                <span>{service.priceLabel}</span>
                {service.duration && !service.duration.toLowerCase().includes("min") && <span>{service.duration}</span>}
                {service.questionCount && <span>{service.questionCount}</span>}
              </div>
              <div className="service-hero-actions">
                <Link href={`/booking?service=${service.slug}`} className="btn btn-primary">
                  Book This {isHealing ? "Healing" : "Session"}
                </Link>
              </div>
            </header>

            {/* Focus Areas */}
            {service.focusAreas && service.focusAreas.length > 0 && (
              <section className="detail-section">
                <div className="eyebrow">The focus</div>
                <h2>Focus Areas</h2>
                <div className="focus-list">
                  {service.focusAreas.map((area) => (
                    <span key={area}>{area}</span>
                  ))}
                </div>
                <p className="focus-description">{service.description}</p>
              </section>
            )}

            {/* Content matching the Word Catalogue for each service type */}
            {isHealing && (
              <section className="detail-section">
                <div className="eyebrow">The journey</div>
                <h2>What This Healing Focuses On</h2>
                <p style={{ fontSize: "15px", lineHeight: "1.75", color: "var(--ink-soft)" }}>{service.focusesOn}</p>
                <div className="service-facts-grid">
                  <div className="service-fact-card">
                    <h3>Suitable For</h3>
                    <p>{service.suitableFor}</p>
                  </div>
                  <div className="service-fact-card">
                    <h3>Intended Shift</h3>
                    <p>{service.intendedShift}</p>
                  </div>
                </div>
              </section>
            )}

            {isSpellwork && (
              <section className="detail-section">
                <div className="eyebrow">The working</div>
                <h2>What the Spellwork Focuses On</h2>
                <p style={{ fontSize: "15px", lineHeight: "1.75", color: "var(--ink-soft)" }}>{service.focusesOn}</p>
                <div className="service-facts-grid">
                  <div className="service-fact-card">
                    <div className="eyebrow">Best suited for</div>
                    <h3>Best Suited For</h3>
                    <p>{service.bestSuitedFor}</p>
                  </div>
                  <div className="service-fact-card">
                    <div className="eyebrow">Intended movement</div>
                    <h3>Intended Movement</h3>
                    <p>{service.intendedMovement}</p>
                  </div>
                </div>
              </section>
            )}

            {isTarot && !isSpreadTarot && (
              <section className="detail-section">
                <div className="eyebrow">Your session</div>
                <h2>What&apos;s Included</h2>
                <p style={{ fontSize: "15px", lineHeight: "1.75", color: "var(--ink-soft)" }}>
                  {service.includesText || (service.included && service.included.map((item) => `${item.title}: ${item.body}`).join(" • ")) || service.description}
                </p>
                {service.bestFor && (
                  <div className="service-facts-grid" style={{ gridTemplateColumns: "1fr" }}>
                    <div className="service-fact-card">
                      <div className="eyebrow">Best for</div>
                      <h3>Best For</h3>
                      <p>{service.bestFor}</p>
                    </div>
                  </div>
                )}
              </section>
            )}

            {isSpreadTarot && (
              <section className="detail-section">
                <div className="eyebrow">Your spread</div>
                <h2>Questions / Spread Covers</h2>
                <div className="questions-list">
                  {service.questions.map((question, index) => (
                    <div className="question-card" key={question}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{question}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {isGuidance && (
              <section className="detail-section">
                <div className="eyebrow">Your session</div>
                <h2>What This Session Focuses On</h2>
                <p style={{ fontSize: "15px", lineHeight: "1.75", color: "var(--ink-soft)" }}>
                  {service.focusesOn || service.description}
                </p>
                {service.bestSuitedFor && (
                  <div className="service-facts-grid" style={{ gridTemplateColumns: "1fr" }}>
                    <div className="service-fact-card">
                      <div className="eyebrow">Best suited for</div>
                      <h3>Best Suited For</h3>
                      <p>{service.bestSuitedFor}</p>
                    </div>
                  </div>
                )}
              </section>
            )}

            {isCustom && (
              <section className="detail-section">
                <div className="eyebrow">Possible pathways</div>
                <h2>Ways We Can Shape Your Journey</h2>
                <div className="included-grid">
                  {[
                    "Custom Tarot Reading",
                    "Custom Healing Journey",
                    "Custom Spellwork",
                    "Reading + Healing Combination",
                    "Multi-Day Personalised Energy Work",
                    "Love + Emotional Healing + Career",
                    "Career + Abundance + Relocation",
                    "Relationship + Communication + Emotional Healing",
                  ].map((item) => (
                    <div className="included-card" key={item}>
                      <strong>{item}</strong>
                    </div>
                  ))}
                </div>
                <p className="custom-note">Pricing: Customised according to intention, duration and scope of work.</p>
              </section>
            )}

            <section className="detail-section service-terms-section">
              <div className="eyebrow">Clarity before you book</div>
              <h2>Terms &amp; Conditions</h2>
              <p>Review the complete booking, reading, healing and spellwork terms before you book.</p>
              <Link href="/terms#terms-conditions" className="btn btn-outline btn-sm">
                Read Terms &amp; Conditions
              </Link>
            </section>
          </div>

          <aside className="price-box">
            <div className="eyebrow">Session Details</div>
            <div className="amount">{service.priceLabel}</div>
            {service.duration && !service.duration.toLowerCase().includes("min") && (
              <div className="meta">
                <span>Duration</span>
                <span>{service.duration}</span>
              </div>
            )}
            {service.questionCount && (
              <div className="meta">
                <span>Questions</span>
                <span>{service.questionCount}</span>
              </div>
            )}
            <div className="meta">
              <span>Category</span>
              <span>{service.category}</span>
            </div>
            <div className="meta">
              <span>Format</span>
              <span>{getServiceFormat(service)}</span>
            </div>
            <div className="meta">
              <span>Availability</span>
              <span>Worldwide</span>
            </div>
            <div className="meta">
              <span>Confidentiality</span>
              <span>100% Private</span>
            </div>
            <Link
              href={`/booking?service=${service.slug}`}
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center", marginTop: 22 }}
            >
              Book This {isHealing ? "Healing" : "Session"}
            </Link>
          </aside>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .service-detail-grid { grid-template-columns: 1fr !important; }
          .price-box { position: static; }
        }
      `}</style>
    </section>
  );
}
