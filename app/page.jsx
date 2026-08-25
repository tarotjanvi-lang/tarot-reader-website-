import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import ServiceVisual from "@/components/ServiceVisual";
import { services } from "@/lib/services-data";

export default function HomePage() {
  const featured = services.slice(0, 4);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow">Tarot Reader &middot; Energy Alchemist &middot; Spiritual Guide</div>
            <h1 className="hero-title">
              See your truth.<br />
              <span className="accent">Heal deeply.</span><br />
              Transform forever.
            </h1>
            <p className="hero-lede">
              Intuitive tarot readings, energy healing and soul guidance to help you break barriers, restore
              balance and manifest the life you truly deserve.
            </p>
            <div className="hero-ctas">
              <Link href="/booking" className="btn btn-primary">
                Book Your Session
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
              <Link href="/services" className="btn btn-outline">View Services</Link>
            </div>
            <div className="hero-badges">
              <div className="hero-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 21c-4.8-1.8-6.6-5.1-6.6-8.4 2.8.2 5.1 1.5 6.6 4.3 1.5-2.8 3.8-4.1 6.6-4.3 0 3.3-1.8 6.6-6.6 8.4Z" /><path d="M12 16.9c-.2-4.7-1.9-7.4-4.7-9.7M12 16.9c.2-4.7 1.9-7.4 4.7-9.7M12 3v18" /></svg>
                Guided by Shiva
              </div>
              <div className="hero-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M19.1 4.9l-2.8 2.8M7.7 16.3l-2.8 2.8" /></svg>
                Energy Alchemy
              </div>
              <div className="hero-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="3" /></svg>
                Soul Transformation
              </div>
              <div className="hero-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 3v18M12 5 8 9M12 5l4 4M7 12h10M9 12l-2 5M15 12l2 5M7 17h4M13 17h4" /></svg>
                Divine Guidance
              </div>
            </div>
          </div>

          <div className="hero-art">
            <div className="hero-image-wrap">
              <Image
                className="hero-image"
                src="/images/home_page_shiva.png"
                alt="Lord Shiva meditating among Himalayan mountains"
                width={1536}
                height={1024}
                priority
                sizes="(max-width: 980px) 100vw, 58vw"
              />
            </div>
            <blockquote className="hero-quote italic-quote">
              &ldquo;The answers you seek are already within you. I&apos;m here to help you see them.&rdquo;
              <cite>— Janvi</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="section-tight">
        <Reveal className="container">
          <div className="stats-bar">
            <div className="stat-item">
              <div className="stat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg></div>
              <div><div className="stat-num">500+</div><div className="stat-label">Souls Guided</div></div>
            </div>
            <div className="stat-item">
              <div className="stat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></svg></div>
              <div><div className="stat-num">1000+</div><div className="stat-label">Sessions Completed</div></div>
            </div>
            <div className="stat-item">
              <div className="stat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9" /></svg></div>
              <div><div className="stat-num">4.9 <span style={{ fontSize: 15 }}>★</span></div><div className="stat-label">Client Rating</div></div>
            </div>
            <div className="stat-item">
              <div className="stat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2 4 6v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V6l-8-4Z" /></svg></div>
              <div><div className="stat-num">100%</div><div className="stat-label">Confidential &amp; Safe</div></div>
            </div>
            <div className="stat-item">
              <div className="stat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.4 2.5 3.6 5.5 3.6 9S14.4 18.5 12 21M12 3c-2.4 2.5-3.6 5.5-3.6 9S9.6 18.5 12 21" /></svg></div>
              <div><div className="stat-num">Worldwide</div><div className="stat-label">Online Guidance</div></div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="section">
        <div className="container">
          <Reveal className="services-head">
            <div>
              <div className="eyebrow">My Services</div>
              <h2>Sacred services for your soul&apos;s transformation</h2>
            </div>
            <div>
              <p>Every reading, every healing, every conversation is designed to bring you clarity, peace and alignment.</p>
              <Link href="/services" className="btn-link">
                View All Services
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </div>
          </Reveal>

          <div className="services-grid">
            {featured.map((s) => (
              <Reveal as="div" key={s.slug} className="service-card">
                <ServiceVisual service={s} className="service-card-image homepage-service-image" />
                <h3>{s.name}</h3>
                <p>{s.tagline}</p>
                <Link href={`/services/${s.slug}`} className="btn-link">
                  Book Now
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STORY PANEL ================= */}
      <section className="section-tight">
        <Reveal className="container">
          <div className="story-panel">
            <div className="art-side">
              <Image
                className="shiva-image"
                src="/images/home-shiva-transparent.png"
                alt="A warm spiritual still life with tarot cards, candle, flowers and crystals"
                width={1536}
                height={1024}
                priority
                sizes="(max-width: 860px) 100vw, 50vw"
              />
            </div>
            <div className="text-side">
              <div className="eyebrow">Words from beautiful souls</div>
              <h2>Guided by Shiva. Here for your soul.</h2>
              <p>
                My journey is deeply rooted in spirituality, intuition and the divine energy of Lord Shiva.
                Through tarot, energy work and soulful guidance, I help you uncover your true path and align
                with your highest self.
              </p>
              <div>
                <Link href="/about" className="btn btn-primary btn-sm">
                  My Story
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= CTA BANNER ================= */}
      <section className="section-tight">
        <Reveal className="container cta-reveal">
          <div className="cta-banner">
            <div>
              <div className="eyebrow">Your journey awaits</div>
              <h2 style={{ marginBottom: 6 }}>Ready to transform your life?</h2>
              <p>Take the first step toward the life you deserve. Book your consultation today and start your journey of growth.</p>
            </div>
            <Link href="/booking" className="btn btn-gold">
              Schedule Your Session
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
