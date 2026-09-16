import Link from "next/link";
import Reveal from "@/components/Reveal";
import ServiceVisual from "@/components/ServiceVisual";
import { serviceCategories } from "@/lib/services-data";

export const metadata = {
  title: "Services",
  description: "Explore tarot readings, energy healing, manifestation coaching, soul guidance and custom sessions with Janvi. Book online with worldwide time-zone support.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero services-page-hero">
        <div className="container">
          <div className="eyebrow" style={{ justifyContent: "center" }}>My Services</div>
          <h1>Sacred services for your<br /> soul&apos;s transformation</h1>
          <p>Every offering is approached with compassion, confidentiality and genuine intuitive intention — choose the path that speaks to where you are right now.</p>
          <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
            <Link href="/contact" className="btn btn-primary">
              Consult Me
            </Link>
          </div>
        </div>
      </section>

      <section className="section services-catalogue-section">
        <div className="container">
          <div className="grid-3 services-catalogue-grid">
            {serviceCategories.map((category) => (
              <Reveal as="div" key={category.slug} className="service-card">
                <ServiceVisual service={category.services[0]} />
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <div className="service-card-meta">
                  <span className="service-price" style={{ fontFamily: "'Playfair Display'", color: "var(--gold)" }}>
                    {category.services.length} offerings
                  </span>
                </div>
                <Link
                  href={`/services/${category.slug}`}
                  className="btn btn-outline btn-sm"
                  style={{ marginTop: 16, width: "100%", justifyContent: "center" }}
                >
                  View All
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <Reveal className="container">
          <div className="cta-banner cta-banner-image services-cta-banner">
            <div>
              <div className="eyebrow">Not sure where to start?</div>
              <h2 style={{ marginBottom: 6 }}>Let&apos;s find the right session for you.</h2>
              <p>Need guidance urgently? Add an emergency consultation for a separate ₹299 fee after payment.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a href="/booking?urgent=whatsapp" className="btn btn-gold emergency-cta"><span>Emergency Contact</span><span>Pay ₹299 Extra</span></a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
