import Link from "next/link";
import Reveal from "@/components/Reveal";
import ServiceIcon from "@/components/ServiceIcon";
import { services } from "@/lib/services-data";

export const metadata = {
  title: "Services",
  description: "Explore tarot readings, energy healing, manifestation coaching, soul guidance and custom sessions with Janvi. Book online with worldwide time-zone support.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / Services</div>
          <div className="eyebrow" style={{ justifyContent: "center" }}>My Services</div>
          <h1>Sacred services for your<br />soul&apos;s transformation</h1>
          <p>Every offering is approached with compassion, confidentiality and genuine intuitive intention — choose the path that speaks to where you are right now.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {services.map((s) => (
              <Reveal as="div" key={s.slug} className="service-card">
                <ServiceIcon type={s.icon} />
                <h3>{s.name}</h3>
                <p>{s.tagline}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                  <span style={{ fontFamily: "'Playfair Display'", color: "var(--gold)" }}>
                    {s.price ? `From ${s.priceLabel}` : s.priceLabel}
                  </span>
                  <span style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>{s.duration}</span>
                </div>
                <Link
                  href={s.price ? `/services/${s.slug}` : "/contact"}
                  className="btn btn-outline btn-sm"
                  style={{ marginTop: 16, width: "100%", justifyContent: "center" }}
                >
                  {s.price ? "View Details" : "Enquire"}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <Reveal className="container">
          <div className="cta-banner">
            <div>
              <div className="eyebrow">Not sure where to start?</div>
              <h2 style={{ marginBottom: 6 }}>Let&apos;s find the right session for you.</h2>
              <p>Need guidance urgently? Add an emergency consultation for a separate ₹299 fee after payment.</p>
            </div>
            <a href="/booking?urgent=whatsapp" className="btn btn-gold">Request WhatsApp contact · ₹299</a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
