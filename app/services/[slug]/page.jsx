import Link from "next/link";
import { notFound } from "next/navigation";
import Faq from "@/components/Faq";
import { services, testimonials } from "@/lib/services-data";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};
  return {
    title: service.name,
    description: `${service.tagline} Pricing, FAQs and client testimonials for the ${service.name} session with Janvi.`,
  };
}

export default function ServiceDetailPage({ params }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const relatedTestimonials = testimonials.filter((t) => t.tag.toLowerCase() === service.name.toLowerCase()).slice(0, 2);
  const fallbackTestimonials = testimonials.slice(0, 2);
  const shownTestimonials = relatedTestimonials.length ? relatedTestimonials : fallbackTestimonials;
  const isTarot = service.type === "tarot";
  const isCustom = service.type === "custom";
  const isHealing = service.type === "healing";
  const isSpellwork = service.type === "spellwork";
  const relatedServices = services.filter((item) => item.slug !== service.slug && item.category === service.category).slice(0, 3);

  return (
    <section className="section-tight service-detail-page">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link> / <Link href="/services">Services</Link> / {service.category} / {service.name}
        </div>

        <div className="service-detail-grid">
          <div className="service-detail-content">
            <header className="service-hero-detail">
              <div className="eyebrow">{service.category}</div>
              <h1>{service.name}</h1>
              <p className="service-lede">{service.description || service.tagline}</p>
              <div className="service-hero-meta"><span>{service.priceLabel}</span><span>{service.duration}</span>{service.questionCount && <span>{service.questionCount}</span>}</div>
              <div className="service-hero-actions"><Link href={`/booking?service=${service.slug}`} className="btn btn-primary">Book This {isHealing ? "Healing" : "Session"}</Link><a href={`/booking?service=${service.slug}&urgent=whatsapp`} className="btn btn-outline">Ask a Question</a></div>
            </header>

            <section className="detail-section"><div className="eyebrow">The offering</div><h2>{isHealing ? "About This Healing" : isCustom ? "Create Your Own SoulMirror Journey" : "About This Service"}</h2><p>{service.tagline} {isCustom ? "Different modalities can be combined around your intention, duration and scope of work." : "The session is held with compassion, confidentiality and genuine intuitive intention."}</p></section>

            <section className="detail-section"><div className="eyebrow">The focus</div><h2>Focus Areas</h2><div className="focus-list">{service.focusAreas.map((area) => <span key={area}>{area}</span>)}</div></section>

            {isCustom ? <section className="detail-section"><div className="eyebrow">Possible pathways</div><h2>Ways We Can Shape Your Journey</h2><div className="included-grid">{["Custom Tarot Reading", "Custom Healing Journey", "Custom Spellwork", "Reading + Healing Combination", "Multi-Day Personalised Energy Work", "Love + Emotional Healing + Career", "Career + Abundance + Relocation", "Relationship + Communication + Emotional Healing"].map((item) => <div className="included-card" key={item}><strong>{item}</strong></div>)}</div><p className="custom-note">Pricing: Customised according to intention, duration and scope of work.</p></section> : <section className="detail-section"><div className="eyebrow">Your session</div><h2>{isHealing ? "What This Healing Focuses On" : isSpellwork ? "What the Spellwork Focuses On" : "What's Included"}</h2>{(isHealing || isSpellwork) && <p>{service.focusesOn}</p>}<div className="included-grid">{service.included.map((item) => <div className="included-card" key={item.title}><strong>{item.title}</strong><p>{item.body}</p></div>)}</div>{isHealing && <div className="healing-facts"><div><strong>Suitable for</strong><p>{service.suitableFor}</p></div><div><strong>Intended shift</strong><p>{service.intendedShift}</p></div></div>}{isSpellwork && <div className="healing-facts"><div><strong>Best suited for</strong><p>{service.bestSuitedFor}</p></div><div><strong>Intended movement</strong><p>{service.intendedMovement}</p></div></div>}</section>}

            {isTarot && service.questions.length > 0 && <section className="detail-section"><div className="eyebrow">Your spread</div><h2>Questions / Spread</h2><div className="questions-list">{service.questions.map((question, index) => <div className="question-card" key={question}><span>{String(index + 1).padStart(2, "0")}</span><p>{question}</p></div>)}</div></section>}

            <section className="detail-section"><div className="eyebrow">Clarity before you book</div><h2>Frequently Asked Questions</h2><Faq items={service.faqs} /></section>

            <section className="detail-section disclaimer-section"><div className="eyebrow">Please note</div><h2>Important Information</h2><p>{service.disclaimer}</p></section>

            <section className="detail-section detail-cta"><div><div className="eyebrow">Ready to begin?</div><h2>Take the next step with intention.</h2></div><div className="service-hero-actions"><Link href={`/booking?service=${service.slug}`} className="btn btn-primary">{isCustom || isSpellwork ? "Discuss Your Journey" : `Book This ${isHealing ? "Healing" : "Session"}`}</Link><a href={`/booking?service=${service.slug}&urgent=whatsapp`} className="btn btn-outline">Ask a Question</a></div></section>

            {relatedServices.length > 0 && <section className="detail-section related-section"><div className="eyebrow">Continue exploring</div><h2>Related Services</h2><div className="included-grid">{relatedServices.map((item) => <Link href={`/services/${item.slug}`} className="included-card related-card" key={item.slug}><strong>{item.name}</strong><span>{item.priceLabel}</span></Link>)}</div></section>}

            <section className="detail-section testimonial-section"><div className="eyebrow">From the mirror</div><h2>What clients say</h2><div className="grid-2">{shownTestimonials.map((t) => <div key={t.name} className="testi-card"><div className="testi-stars">★★★★★</div><p className="testi-quote">&ldquo;{t.quote}&rdquo;</p><div className="testi-person"><div className="testi-avatar">{t.name[0]}</div><div><div className="testi-name">{t.name}</div><div className="testi-tag">{t.tag}</div></div></div></div>)}</div></section>
          </div>

          <aside className="price-box">
            <div className="eyebrow">Session Details</div>
            <div className="amount">{service.priceLabel}</div>
            <div className="meta"><span>Duration</span><span>{service.duration}</span></div>
            {service.questionCount && <div className="meta"><span>Questions</span><span>{service.questionCount}</span></div>}
            <div className="meta"><span>Category</span><span>{service.category}</span></div>
            <div className="meta"><span>Format</span><span>Video / Voice call</span></div>
            <div className="meta"><span>Availability</span><span>Worldwide</span></div>
            <div className="meta"><span>Confidentiality</span><span>100% Private</span></div>
            <Link href={`/booking?service=${service.slug}`} className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 22 }}>
              Book This {isHealing ? "Healing" : "Session"}
            </Link>
            <a href={`/booking?service=${service.slug}&urgent=whatsapp`} className="btn btn-outline" style={{ width: "100%", justifyContent: "center", marginTop: 10 }}>
              Ask a Question
            </a>
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
