import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Janvi at The Soul Mirror. Available worldwide, WhatsApp chat, email, and a contact form for questions before booking.",
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow" style={{ justifyContent: "center" }}>Let&apos;s Connect</div>
          <h1>Have a question<br /> before you book?</h1>
          <p>Reach out — I&apos;m happy to help you find the right session, wherever in the world you are.</p>
        </div>
      </section>

      <section className="section contact-page-section">
        <div className="container">
          <div className="grid-2 contact-layout">
            <div>
              <div className="service-card" style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ color: "var(--gold)", flexShrink: 0 }}>
                    <path d="M12 2 4 6v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V6l-8-4Z" />
                  </svg>
                  <div>
                    <strong style={{ fontFamily: "'Playfair Display'" }}>Available Worldwide</strong>
                    <p style={{ fontSize: 14, marginTop: 4 }}>Sessions are held over video/voice call — time slots are shown in your local time zone automatically.</p>
                  </div>
                </div>
              </div>
              <div className="service-card emergency-contact-card" style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ color: "var(--gold)", flexShrink: 0 }}>
                    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
                  </svg>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <strong style={{ fontFamily: "'Playfair Display'" }}>Email</strong>
                    <p style={{ fontSize: 14, marginTop: 4 }}>
                      <a href="mailto:thesoulmirrorbyjanvi@gmail.com" style={{ color: "var(--gold)" }}>thesoulmirrorbyjanvi@gmail.com</a>
                    </p>
                  </div>
                  <a href="mailto:thesoulmirrorbyjanvi@gmail.com" className="contact-card-arrow" aria-label="Email Janvi">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </a>
                </div>
              </div>
              <div className="service-card" style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                    <path d="M23.7 8.3A10.8 10.8 0 0 0 6.8 21.1L5.7 25l4-1.1A10.8 10.8 0 1 0 23.7 8.3Z" stroke="var(--gold)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12.1 11.5c.3-.3.6-.4.9-.4h.6c.3 0 .5.2.6.5l.9 2.1c.1.3.1.5-.1.7l-.6.7c-.2.2-.2.4-.1.6.5.9 1.3 1.7 2.2 2.2.2.1.4.1.6-.1l.8-.8c.2-.2.4-.2.7-.1l2 .9c.3.1.4.3.4.6v.6c0 .3-.1.6-.4.9-.4.4-1 .7-1.6.7-1.1 0-2.8-.8-4.3-2.1-1.3-1.1-2.4-2.4-3.1-3.7-.5-.9-.8-1.8-.8-2.5 0-.8.4-1.5 1.2-2.2Z" fill="var(--gold)"/>
                  </svg>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <strong style={{ fontFamily: "'Playfair Display'" }}>Emergency consultation</strong>
                    <p style={{ fontSize: 14, marginTop: 4 }}>₹299 emergency consultation fee is applicable after payment.</p>
                  </div>
                  <a href="/booking?urgent=whatsapp" className="contact-card-arrow" aria-label="Book an emergency consultation">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </a>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
