import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import ServiceIcon from "@/components/ServiceIcon";

export const metadata = {
  title: "About Janvi — My Journey",
  description: "Meet Janvi, founder of The Soul Mirror — intuitive tarot reader, generational healer and spiritual guide. 6+ years, 500+ souls, 1,000+ sessions.",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* ================= ABOUT HERO ================= */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-grid">
            <Reveal className="about-hero-copy">
              <h1>Meet the<br />woman<br /><span>behind the<br />mirror.</span></h1>
              <div className="about-lede about-lede-feature"><span className="about-lede-rule" aria-hidden="true"></span><p>A grounded guide for the moments when life asks you to look a little deeper.</p></div>
              <div className="about-hero-signature">
                <span>THE SOUL MIRROR</span>
                <small>A space for honest reflection</small>
              </div>
              <div className="about-desktop-copy-actions">
                <Link href="/contact" className="btn btn-primary">Sit with Janvi <span aria-hidden="true">→</span></Link>
                <Link href="/services" className="btn btn-outline">Explore the work</Link>
              </div>
            </Reveal>

            <Reveal className="about-hero-visual">
              <div className="about-orbit orbit-one" aria-hidden="true" />
              <div className="about-orbit orbit-two" aria-hidden="true" />
              <div className="about-portrait-frame">
                <Image className="about-portrait about-portrait-light" src="/images/janvi_photo.png" alt="Janvi, tarot reader, healer and guide" width={1000} height={926} sizes="(max-width: 860px) 100vw, 600px" quality={100} priority />
                <Image className="about-portrait about-portrait-dark" src="/images/janvi_photo_dark_view.png" alt="Janvi, tarot reader, healer and guide" width={1000} height={926} sizes="(max-width: 860px) 100vw, 600px" quality={100} priority />
                <div className="about-portrait-note">
                  <span>Janvi</span>
                  <small>Tarot reader · healer · guide</small>
                </div>
              </div>
              <div className="about-sun" aria-hidden="true">✦</div>
              <div className="about-photo-actions">
                <Link href="/contact" className="btn btn-primary">Sit with Janvi <span aria-hidden="true">→</span></Link>
                <Link href="/services" className="btn btn-outline">Explore the work</Link>
              </div>
            </Reveal>
          </div>

          <div className="about-trust-rail">
            <div><strong>6+</strong><span>Years on this path</span></div>
            <div><strong>500+</strong><span>Souls guided</span></div>
            <div><strong>2000+</strong><span>Sessions held</span></div>
            <div><strong>100%</strong><span>Confidential space</span></div>
          </div>
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section className="section about-story-section about-story-new">
        <div className="container">
          <div className="about-section-heading">
            <div className="eyebrow">The story behind SoulMirror</div>
            <span className="about-desktop-section-label">01 / MY JOURNEY</span>
          </div>

          <Reveal className="about-story-feature">
            <div className="about-story-image">
              <Image className="about-journey-image about-journey-image-light" src="/images/journey_light_theme.png" alt="The Soul Mirror journey — intuition, lineage and reflection" width={1374} height={1145} loading="lazy" sizes="(max-width: 860px) 100vw, 560px" />
              <Image className="about-journey-image about-journey-image-dark" src="/images/journey_dark_theme.png" alt="The Soul Mirror journey — intuition, lineage and reflection" width={1374} height={1145} loading="lazy" sizes="(max-width: 860px) 100vw, 560px" />
              <div className="about-image-caption">Intuition · lineage · reflection</div>
            </div>
            <div className="about-story-copy">
              <h2>I never went looking for this path. <span>It found me.</span></h2>
              <p>I&apos;m Janvi, an intuitive tarot reader, generational healer and spiritual guide. My grandmother was an astrologer, my mother practised face reading, and I grew up surrounded by a quiet respect for the unseen.</p>
              <p>That lineage became my own language of intuition. Today, I bring it together with a practical, grounded life in the medical and business world.</p>
              <p className="italic-quote about-pullquote">By day, I work in the practical world. By night, I hold space for the soul.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= THE WAY WE WORK ================= */}
      <section className="section about-journey-section">
        <div className="container">
          <div className="about-section-heading">
            <div className="eyebrow">The way we work</div>
            <span className="about-desktop-section-label">02 / THE JOURNEY</span>
          </div>
          <div className="about-journey-new">
            <Reveal className="about-journey-card"><span className="journey-number">01</span><ServiceIcon type="lotus" /><h3>Listen</h3><p>We slow down enough to hear what your intuition has been saying.</p></Reveal>
            <Reveal className="about-journey-card"><span className="journey-number">02</span><ServiceIcon type="tarot" /><h3>Reflect</h3><p>We look at patterns, feelings and choices without judgement or fear.</p></Reveal>
            <Reveal className="about-journey-card"><span className="journey-number">03</span><ServiceIcon type="crystal" /><h3>Realign</h3><p>You leave with clarity you can carry into your next chapter.</p></Reveal>
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="section about-values-section about-values-new">
        <div className="container">
          <div className="about-values-head">
            <div>
              <div className="eyebrow">What you can expect</div>
              <h2>A softer way to find your way forward.</h2>
            </div>
            <p>Insight that feels like a conversation, not a performance.</p>
          </div>
          <div className="about-values-grid">
            <Reveal className="about-value"><ServiceIcon type="moon" /><span className="about-value-index">01</span><h3>Intuitive</h3><p>Every session unfolds around your energy, not a rigid formula.</p></Reveal>
            <Reveal className="about-value"><ServiceIcon type="lotus" /><span className="about-value-index">02</span><h3>Grounded</h3><p>Spiritual insight meets practical reflection and honest conversation.</p></Reveal>
            <Reveal className="about-value"><ServiceIcon type="crystal" /><span className="about-value-index">03</span><h3>Confidential</h3><p>A private, compassionate space to say what you really mean.</p></Reveal>
          </div>
        </div>
      </section>

      {/* ================= APPROACH ================= */}
      <section className="about-practice about-practice-new">
        <div className="container">
          <div className="about-practice-intro">
            <div>
              <div className="eyebrow">The Soul Mirror approach</div>
              <span className="about-practice-mark">03 / THE PRACTICE</span>
            </div>
            <h2>Insight that feels like a conversation, not a performance.</h2>
          </div>
          <div className="about-practice-list">
            <div><span>01</span><strong>Arrive as you are</strong><p>No polished story required. We begin with what is real for you today.</p></div>
            <div><span>02</span><strong>Find the thread</strong><p>We make space for patterns, feelings and the quiet truth beneath the question.</p></div>
            <div><span>03</span><strong>Leave with clarity</strong><p>Every session closes with something grounded you can carry into ordinary life.</p></div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="section-tight about-final-cta">
        <Reveal className="container">
          <div className="cta-banner cta-banner-image">
            <div>
              <div className="eyebrow">Your journey awaits</div>
              <h2 style={{ marginBottom: 6 }}>Ready to walk this path together?</h2>
              <p>Book a session and let&apos;s hold up the mirror to what you already carry within.</p>
            </div>
            <Link href="/booking" className="btn btn-gold">Schedule Your Session</Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
