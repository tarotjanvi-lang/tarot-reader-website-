import Link from "next/link";
import Reveal from "@/components/Reveal";
import ServiceIcon from "@/components/ServiceIcon";
import { services } from "@/lib/services-data";

export default function HomePage() {
  const featured = services.slice(0, 4);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">Tarot Reader &middot; Energy Alchemist &middot; Spiritual Guide</div>
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 2 4 7v5c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V7l-8-5Z" /></svg>
                Guided by Shiva
              </div>
              <div className="hero-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 2v6M12 16v6M4.9 4.9l4.2 4.2M14.9 14.9l4.2 4.2M2 12h6M16 12h6M4.9 19.1l4.2-4.2M14.9 9.1l4.2-4.2" /></svg>
                Energy Alchemy
              </div>
              <div className="hero-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 0 0 18 5 5 0 0 1 0-18Z" /></svg>
                Soul Transformation
              </div>
              <div className="hero-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18M3 12h18" /></svg>
                Divine Guidance
              </div>
            </div>
            <blockquote className="hero-quote italic-quote">
              &ldquo;The answers you seek are already within you. I&apos;m here to help you see them.&rdquo;
              <cite>— Janvi</cite>
            </blockquote>
          </div>

          <div className="hero-art">
            <div className="gate-wrap">
              <div className="gate-glow"></div>
              <svg viewBox="0 0 480 520" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--teal-soft)" />
                    <stop offset="100%" stopColor="var(--teal)" />
                  </linearGradient>
                </defs>
                <path d="M60 480 V220 A180 180 0 0 1 420 220 V480" fill="none" stroke="var(--gold)" strokeWidth="3" />
                <path d="M80 480 V225 A160 160 0 0 1 400 225 V480" fill="url(#skyGrad)" stroke="var(--gold)" strokeWidth="1" />
                <g fill="var(--gold-soft)" opacity="0.85">
                  <circle cx="140" cy="260" r="1.6" /><circle cx="330" cy="250" r="1.6" />
                  <circle cx="240" cy="230" r="1.4" /><circle cx="190" cy="300" r="1.2" />
                  <circle cx="300" cy="320" r="1.6" /><circle cx="160" cy="340" r="1.3" />
                  <circle cx="340" cy="360" r="1.3" />
                </g>
                <circle cx="240" cy="270" r="34" fill="var(--gold-soft)" opacity="0.95" />
                <circle cx="252" cy="260" r="30" fill="url(#skyGrad)" />
                <g stroke="var(--gold)" strokeWidth="1" fill="none" opacity="0.8">
                  <circle cx="240" cy="400" r="46" /><circle cx="240" cy="366" r="46" /><circle cx="240" cy="434" r="46" />
                  <circle cx="210" cy="383" r="46" /><circle cx="270" cy="383" r="46" />
                  <circle cx="210" cy="417" r="46" /><circle cx="270" cy="417" r="46" />
                </g>
                <circle cx="240" cy="400" r="8" fill="var(--gold-soft)" />
                <g>
                  <rect x="150" y="410" width="70" height="100" rx="6" fill="var(--card)" stroke="var(--gold)" strokeWidth="1.4" transform="rotate(-14 185 460)" />
                  <rect x="185" y="405" width="70" height="100" rx="6" fill="var(--card)" stroke="var(--gold)" strokeWidth="1.4" transform="rotate(-5 220 455)" />
                  <rect x="220" y="400" width="70" height="100" rx="6" fill="var(--card)" stroke="var(--gold)" strokeWidth="1.4" transform="rotate(5 255 450)" />
                  <rect x="255" y="405" width="70" height="100" rx="6" fill="var(--card)" stroke="var(--gold)" strokeWidth="1.4" transform="rotate(14 290 455)" />
                  <g stroke="var(--gold)" strokeWidth="1" fill="none" opacity="0.9">
                    <circle cx="220" cy="450" r="9" transform="rotate(-5 220 455)" />
                    <path d="M250 445 l6 -12 6 12Z" transform="rotate(5 255 450)" />
                  </g>
                </g>
                <g fill="var(--card)" stroke="var(--gold)" strokeWidth="1.3">
                  <polygon points="90,510 105,440 120,510 112,520 98,520" />
                  <polygon points="360,510 378,430 396,510 386,522 370,522" />
                  <polygon points="330,512 342,460 354,512 348,522 336,522" />
                </g>
                <g fill="var(--card)" stroke="var(--gold)" strokeWidth="1.2">
                  <path d="M240 480 C210 470 195 500 240 512 C285 500 270 470 240 480Z" />
                  <path d="M240 480 C220 460 200 478 218 500 C226 508 236 500 240 480Z" />
                  <path d="M240 480 C260 460 280 478 262 500 C254 508 244 500 240 480Z" />
                </g>
              </svg>
            </div>
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
                <ServiceIcon type={s.icon} />
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
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                <circle cx="60" cy="60" r="30" fill="var(--gold-soft)" opacity="0.9" />
                <g stroke="var(--gold)" strokeWidth="1" opacity="0.7">
                  <circle cx="140" cy="140" r="8" /><circle cx="150" cy="150" r="12" /><circle cx="130" cy="155" r="6" />
                </g>
                <path d="M60 150c-20 5-25 25 10 32 35-7 30-27 10-32-8 6-12 6-20 0Z" fill="var(--gold-soft)" opacity="0.85" />
              </svg>
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
        <Reveal className="container">
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
