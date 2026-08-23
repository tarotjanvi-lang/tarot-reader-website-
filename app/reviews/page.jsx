import Link from "next/link";
import Reveal from "@/components/Reveal";
import { testimonials } from "@/lib/services-data";

export const metadata = {
  title: "Client Reviews",
  description: "Read what 500+ clients say about their tarot reading, energy healing and soul guidance sessions with Janvi at The Soul Mirror.",
};

export default function ReviewsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow" style={{ justifyContent: "center" }}>Words from Beautiful Souls</div>
          <h1>500+ souls, 1,000+ stories</h1>
          <p>A glimpse into the journeys of the people who&apos;ve sat across the mirror.</p>
        </div>
      </section>

      <section className="section-tight">
        <Reveal className="container">
          <div className="stats-bar">
            <div className="stat-item"><div className="stat-icon">★</div><div><div className="stat-num">4.9 / 5</div><div className="stat-label">Average Rating</div></div></div>
            <div className="stat-item"><div className="stat-icon">✦</div><div><div className="stat-num">500+</div><div className="stat-label">Souls Guided</div></div></div>
            <div className="stat-item"><div className="stat-icon">✦</div><div><div className="stat-num">1000+</div><div className="stat-label">Sessions Completed</div></div></div>
            <div className="stat-item"><div className="stat-icon">✦</div><div><div className="stat-num">100%</div><div className="stat-label">Confidential</div></div></div>
          </div>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {testimonials.map((t) => (
              <Reveal as="div" key={t.name} className="testi-card">
                <div className="testi-stars">★★★★★</div>
                <p className="testi-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="testi-person">
                  <div className="testi-avatar">{t.name[0]}</div>
                  <div><div className="testi-name">{t.name}</div><div className="testi-tag">{t.tag}</div></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <Reveal className="container">
          <div className="cta-banner">
            <div>
              <div className="eyebrow">Your story starts here</div>
              <h2 style={{ marginBottom: 6 }}>Ready to become the next reflection?</h2>
              <p>Book your session and see what the mirror shows you.</p>
            </div>
            <Link href="/booking" className="btn btn-gold">Schedule Your Session</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
