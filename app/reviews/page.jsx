"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Reveal from "@/components/Reveal";
import { services, testimonials } from "@/lib/services-data";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(testimonials);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({ name: "", service: "", rating: "5", quote: "" });
  const { data: session } = useSession();

  useEffect(() => {
    fetch("/api/reviews")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Unable to load reviews")))
      .then((data) => setReviews([...data.reviews, ...testimonials]))
      .catch(() => setStatus("Unable to load new reviews right now."));
  }, []);

  async function handleReviewSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("");
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating: Number(form.rating) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to publish review");
      setReviews((current) => [data.review, ...current]);
      setForm({ name: "", service: "", rating: "5", quote: "" });
      setShowForm(false);
      setStatus("Thank you. Your review is now live.");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function toggleReviewForm() {
    if (!session) {
      signIn(undefined, { callbackUrl: "/reviews" });
      return;
    }
    setShowForm((current) => !current);
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="reviews-heading-art">
            <Image className="reviews-leaf reviews-leaf-left" src="/images/left_leaf.png" alt="" width={180} height={240} priority />
            <div className="reviews-heading-copy">
              <div className="eyebrow" style={{ justifyContent: "center" }}>Words from Beautiful Souls</div>
              <h1>500+ souls, 1,000+ stories</h1>
              <p>A glimpse into the journeys of the people who&apos;ve sat across the mirror.</p>
            </div>
            <Image className="reviews-leaf reviews-leaf-right" src="/images/right_leaf.png" alt="" width={180} height={240} priority />
          </div>
          <button type="button" className="btn btn-primary review-trigger" onClick={toggleReviewForm}>
            {showForm ? "Close Review Form" : "Add Your Review"}
          </button>
        </div>
      </section>

      {showForm && (
        <section className="section-tight">
          <div className="container" style={{ maxWidth: 680 }}>
            <form className="service-card review-form" onSubmit={handleReviewSubmit}>
              <div className="eyebrow">Share your experience</div>
              <h2>Add a review</h2>
              <div className="grid-2">
                <div className="form-field"><label htmlFor="review-name">Your name</label><input id="review-name" required maxLength={80} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></div>
                <div className="form-field"><label htmlFor="review-service">Session</label><select id="review-service" required value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value })}><option value="" disabled>Select the session you took</option>{services.filter((service) => service.price).map((service) => <option key={service.slug} value={service.name}>{service.name}</option>)}</select></div>
              </div>
              <div className="form-field"><label htmlFor="review-rating">Rating</label><select id="review-rating" value={form.rating} onChange={(event) => setForm({ ...form, rating: event.target.value })}><option value="5">5 stars</option><option value="4">4 stars</option><option value="3">3 stars</option><option value="2">2 stars</option><option value="1">1 star</option></select></div>
              <div className="form-field"><label htmlFor="review-quote">Your review</label><textarea id="review-quote" required maxLength={1000} rows={5} value={form.quote} onChange={(event) => setForm({ ...form, quote: event.target.value })} /></div>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? "Publishing..." : "Publish Review"}</button>
            </form>
          </div>
        </section>
      )}

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
        <div className="reviews-marquee" aria-label="Client reviews">
          <div className="reviews-marquee-track">
            {[...reviews, ...reviews].map((t, index) => (
              <div key={`${t.id || t.name}-${index}`} className="testi-card">
                <div className="testi-stars">{"★".repeat(t.rating || 5)}{"☆".repeat(5 - (t.rating || 5))}</div>
                <p className="testi-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="testi-person">
                  <div className="testi-avatar">{t.name[0]}</div>
                  <div><div className="testi-name">{t.name}</div><div className="testi-tag">{t.tag || t.service}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {status && <p className="review-status" role="status">{status}</p>}

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
