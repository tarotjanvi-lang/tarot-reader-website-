"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // NOTE: no backend wired up yet — see project README for how to connect
    // this form to an email service or API route.
    setSubmitted(true);
    e.target.reset();
  }

  return (
    <form className="service-card" onSubmit={handleSubmit}>
      <div className="grid-2">
        <div className="form-field"><label htmlFor="name">Full Name</label><input id="name" type="text" required placeholder="Your name" /></div>
        <div className="form-field"><label htmlFor="email">Email</label><input id="email" type="email" required placeholder="you@email.com" /></div>
      </div>
      <div className="grid-2">
        <div className="form-field"><label htmlFor="phone">Phone / WhatsApp</label><input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" /></div>
        <div className="form-field">
          <label htmlFor="topic">I&apos;m interested in</label>
          <select id="topic">
            <option>Tarot Reading</option>
            <option>Energy Healing</option>
            <option>Manifestation Coaching</option>
            <option>Soul Guidance</option>
            <option>Not sure yet — help me choose</option>
          </select>
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="message">Message</label>
        <textarea id="message" placeholder="Tell me a little about what you're navigating right now..." />
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
        Send Message
      </button>
      {submitted && (
        <p style={{ color: "var(--gold)", textAlign: "center", marginTop: 14 }}>
          Thank you — your message has been noted. I&apos;ll get back to you soon. ✦
        </p>
      )}
    </form>
  );
}
