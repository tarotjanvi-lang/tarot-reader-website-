import Link from "next/link";
import Reveal from "@/components/Reveal";
import ServiceIcon from "@/components/ServiceIcon";

export const metadata = {
  title: "About Janvi — My Journey",
  description: "Meet Janvi, founder of The Soul Mirror — intuitive tarot reader, generational healer and spiritual guide. 6+ years, 500+ souls, 1,000+ sessions.",
};

export default function AboutPage() {
  return (
    <>
      <section className="about-intro">
        <div className="container">
          <div className="about-intro-grid">
            <Reveal className="about-intro-copy">
              <div className="eyebrow">A calling, not just a profession</div>
              <h1>Meet the woman behind the mirror.</h1>
              <p className="about-lede">A grounded guide for the moments when life asks you to look a little deeper.</p>
              <Link href="/booking" className="btn btn-primary">Sit with Janvi <span aria-hidden="true">&rarr;</span></Link>
            </Reveal>
            <Reveal className="about-portrait-wrap">
              <img className="about-portrait" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=85" alt="Portrait of a woman in warm natural light" />
              <div className="about-portrait-note"><span>Janvi</span><small>Tarot reader · healer · guide</small></div>
              <div className="about-sun" aria-hidden="true">✦</div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <Reveal className="container">
          <div className="stats-bar">
            <div className="stat-item"><div className="stat-icon"><ServiceIcon type="moon" className="about-stat-icon" /></div><div><div className="stat-num">6+</div><div className="stat-label">Years on this path</div></div></div>
            <div className="stat-item"><div className="stat-icon"><ServiceIcon type="lotus" className="about-stat-icon" /></div><div><div className="stat-num">500+</div><div className="stat-label">Souls guided</div></div></div>
            <div className="stat-item"><div className="stat-icon"><ServiceIcon type="tarot" className="about-stat-icon" /></div><div><div className="stat-num">1000+</div><div className="stat-label">Sessions held</div></div></div>
            <div className="stat-item"><div className="stat-icon"><ServiceIcon type="crystal" className="about-stat-icon" /></div><div><div className="stat-num">100%</div><div className="stat-label">Confidential space</div></div></div>
          </div>
        </Reveal>
      </section>

      <section className="section about-story-section">
        <div className="container">
          <Reveal className="about-story-grid">
            <div className="about-story-image"><img src="https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1000&q=85" alt="Hands holding a small crystal in sunlight" /></div>
            <div className="about-story-copy">
              <div className="eyebrow">The story behind SoulMirror</div>
              <h2>I never went looking for this path. It found me.</h2>
              <p>I&apos;m Janvi, an intuitive tarot reader, generational healer and spiritual guide. My grandmother was an astrologer, my mother practised face reading, and I grew up surrounded by a quiet respect for the unseen.</p>
              <p>That lineage became my own language of intuition. Today, I bring it together with a practical, grounded life in the medical and business world.</p>
              <p className="italic-quote about-pullquote">By day, I work in the practical world. By night, I hold space for the soul.</p>
            </div>
          </Reveal>

          <div className="about-journey">
            <Reveal className="about-journey-card"><span className="journey-number">01</span><ServiceIcon type="lotus" /><h3>Listen</h3><p>We slow down enough to hear what your intuition has been saying.</p></Reveal>
            <Reveal className="about-journey-card"><span className="journey-number">02</span><ServiceIcon type="tarot" /><h3>Reflect</h3><p>We look at patterns, feelings and choices without judgement or fear.</p></Reveal>
            <Reveal className="about-journey-card"><span className="journey-number">03</span><ServiceIcon type="crystal" /><h3>Realign</h3><p>You leave with clarity you can carry into your next chapter.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="section about-values-section">
        <div className="container">
          <Reveal className="about-values-head"><div className="eyebrow">What you can expect</div><h2>A softer way to find your way forward.</h2></Reveal>
          <div className="about-values-grid">
            <Reveal className="about-value"><ServiceIcon type="moon" /><h3>Intuitive</h3><p>Every session unfolds around your energy, not a rigid formula.</p></Reveal>
            <Reveal className="about-value"><ServiceIcon type="lotus" /><h3>Grounded</h3><p>Spiritual insight meets practical reflection and honest conversation.</p></Reveal>
            <Reveal className="about-value"><ServiceIcon type="crystal" /><h3>Confidential</h3><p>A private, compassionate space to say what you really mean.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <Reveal className="container">
          <div className="cta-banner">
            <div>
              <div className="eyebrow">Your journey awaits</div>
              <h2 style={{ marginBottom: 6 }}>Ready to walk this path together?</h2>
              <p>Book a session and let&apos;s hold up the mirror to what you already carry within.</p>
            </div>
            <Link href="/booking" className="btn btn-gold">Schedule Your Session</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
