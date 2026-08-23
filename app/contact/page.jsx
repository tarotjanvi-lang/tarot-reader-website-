import Link from "next/link";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Janvi at The Soul Mirror. Available worldwide, WhatsApp chat, email, and a contact form for questions before booking.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / Contact</div>
          <div className="eyebrow" style={{ justifyContent: "center" }}>Let&apos;s Connect</div>
          <h1>Have a question<br />before you book?</h1>
          <p>Reach out — I&apos;m happy to help you find the right session, wherever in the world you are.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gridTemplateColumns: "1fr 1.2fr", gap: 50, alignItems: "start" }}>
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
              <div className="service-card" style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ color: "var(--gold)", flexShrink: 0 }}>
                    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
                  </svg>
                  <div>
                    <strong style={{ fontFamily: "'Playfair Display'" }}>Email</strong>
                    <p style={{ fontSize: 14, marginTop: 4 }}>
                      <a href="mailto:thesoulmirrorbyjanvi@gmail.com" style={{ color: "var(--gold)" }}>thesoulmirrorbyjanvi@gmail.com</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="service-card" style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                    <circle cx="16" cy="16" r="15" fill="#1F8A57" />
                    <path fill="white" d="M23.7 8.3A10.8 10.8 0 0 0 6.8 21.1L5.7 25l4-1.1A10.8 10.8 0 1 0 23.7 8.3Zm-7.6 16.1a8.8 8.8 0 0 1-4.4-1.2l-.3-.2-2.4.7.7-2.3-.2-.3a8.8 8.8 0 1 1 6.6 3.3Zm4.8-6.5c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2l-.8 1c-.2.2-.4.3-.7.1-.3-.2-1.2-.4-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.7l.5-.5c.1-.2.2-.4.3-.5.1-.2 0-.4 0-.6l-.9-2.1c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.1-1.4-.1-.2-.3-.3-.6-.4Z" />
                  </svg>
                  <div>
                    <strong style={{ fontFamily: "'Playfair Display'" }}>Emergency consultation</strong>
                    <p style={{ fontSize: 14, marginTop: 4 }}>₹299 emergency consultation fee applies after payment.</p>
                    <a href="/booking?urgent=whatsapp" className="btn-link">
                      Request WhatsApp contact
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="tz-note">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
                All session times are automatically converted to your device&apos;s local time zone at checkout.
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
