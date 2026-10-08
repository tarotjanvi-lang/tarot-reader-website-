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
            <div><strong>1000+</strong><span>Sessions held</span></div>
            <div><strong>100%</strong><span>Confidential space</span></div>
          </div>
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section className="section about-story-section about-story-new">
        <div className="container">
          <div className="about-section-heading">
            <div className="eyebrow">About Me</div>
            <span className="about-desktop-section-label">01 / MY JOURNEY</span>
          </div>

          <Reveal className="about-story-feature">
            <div className="about-story-image">
              <Image className="about-journey-image about-journey-image-light" src="/images/journey_light_theme.png" alt="The Soul Mirror journey — intuition, lineage and reflection" width={1374} height={1145} loading="lazy" sizes="(max-width: 860px) 100vw, 560px" />
              <Image className="about-journey-image about-journey-image-dark" src="/images/journey_dark_theme.png" alt="The Soul Mirror journey — intuition, lineage and reflection" width={1374} height={1145} loading="lazy" sizes="(max-width: 860px) 100vw, 560px" />
              <div className="about-image-caption">Intuition · lineage · reflection</div>
            </div>
            <div className="about-story-copy">
              <div className="about-story-intro">
                <h2>A Calling, Not Just a Profession</h2>
                <p className="about-story-lead">I&apos;m Janvi, the founder of The Soul Mirror, an intuitive tarot reader, generational healer and spiritual guide.</p>
                <p>My journey into this world was never something I consciously planned or formally pursued. I didn&apos;t learn spirituality as a profession it came to me as a calling.</p>
                <p>Spirituality was part of my family long before it became part of my work. My grandmother was an astrologer, and my mother practised face reading. I grew up around intuition, energy and a quiet respect for the unseen.</p>
                <p>That early exposure gave me a language for the feelings I could not always explain. But my own path unfolded in its own time, in its own way.</p>
              </div>
            </div>
          </Reveal>

          <div className="about-story-followup">
            <div className="about-story-block">
              <p className="italic-quote about-pullquote">I never went looking for these abilities. They found me.</p>
              <p>With time, my intuition, clair abilities and connection with energy became clearer and more natural. What began as a private inner calling slowly became a way to support other people through their own questions, changes and turning points.</p>
              <p>For more than six years, I have had the privilege of guiding 500+ souls through 2,000+ sessions — across relationships, emotional healing, career decisions, personal growth and life transitions.</p>
            </div>

            <div className="about-story-block">
              <h3>Two Worlds. One Purpose.</h3>
              <p>By profession, I work in the medical field, in the world of business and international professional life.</p>
              <p>And when the day ends, I step into a completely different world the world of intuition, healing and spiritual guidance.</p>
              <p className="italic-quote about-pullquote">By day, I work in the practical world. By night, I am a healer.</p>
              <p>These two sides of my life may seem completely different, but to me, they beautifully coexist. One keeps me grounded in the practical world, while the other keeps me connected to intuition, energy and the human soul.</p>
            </div>

            <div className="about-story-block">
              <h3>My Intuitive Connection</h3>
              <p>My work comes through intuition, clair abilities, energetic perception and ancestral wisdom. I don&apos;t follow a rigid formula because I believe every person, every situation and every energy is different.</p>
              <p>I allow the guidance to unfold intuitively through tarot, energy work and healing practices.</p>
              <p>My role is not to tell you exactly what you must do or create fear around what may happen. My role is to help you see what may be hidden, understand what you are feeling, recognise the patterns around you and reconnect with your own inner knowing.</p>
            </div>

            <div className="about-story-block">
              <h3>The SoulMirror Philosophy</h3>
              <p>I created SoulMirror because I believe that sometimes, we don&apos;t need someone to give us all the answers.</p>
              <p className="about-story-emphasis">We need someone to hold up a mirror.</p>
              <p>A mirror to our emotions.<br />A mirror to our patterns.<br />A mirror to our choices.<br />A mirror to the energy we carry.</p>
              <p>That is what SoulMirror represents.</p>
              <p>A space where you can pause, reflect, receive guidance and reconnect with yourself.</p>
              <p>Every session is approached with compassion, confidentiality, intuition and genuine intention.</p>
              <p>Whether you&apos;re seeking clarity in love, navigating an emotional chapter, standing at a career crossroads, experiencing a major life transition or simply feeling called towards deeper self-understanding—SoulMirror is here to walk alongside you.</p>
            </div>

            <div className="about-story-block about-story-closing">
              <h3>My Belief</h3>
              <p>I don&apos;t believe spirituality is about predicting every detail of your future.<br />I believe it is about understanding your present so consciously that you can move towards your future with greater clarity.</p>
              <p>I didn&apos;t choose this path.</p>
              <p>This path found me.</p>
              <p>And today, after 6+ years, 500+ souls and 1,000+ sessions, I continue to honour that calling one soul, one story and one session at a time.</p>
              <p className="about-story-emphasis">Welcome to SoulMirror by Janvi.<br />Where intuition becomes insight, and insight becomes alignment.</p>
            </div>
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
