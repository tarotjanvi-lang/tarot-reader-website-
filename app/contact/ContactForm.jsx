"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Sending...");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await emailjs.send(
        "service_rpo0iml",
        "template_43o3y7b",
        {
          to_email: "tarotjanvi@gmail.com",
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone") || "Not provided",
          title: `Contact enquiry - ${data.get("topic")}`,
          message: data.get("message") || "No message provided",
          reply_to: data.get("email"),
        },
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY }
      );
      setSubmitted(true);
      setStatus("");
      form.reset();
    } catch (error) {
      console.error("Contact email failed", error);
      setStatus("We could not send your message. Please try again.");
    }
  }

  return (
    <form className="service-card" onSubmit={handleSubmit}>
      <div className="tz-note contact-form-tz-note">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
        All session times are automatically converted to your device&apos;s local time zone at checkout.
      </div>
      <div className="grid-2">
        <div className="form-field"><label htmlFor="name">Full Name</label><input id="name" name="name" type="text" required placeholder="Your name" /></div>
        <div className="form-field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required placeholder="you@email.com" /></div>
      </div>
      <div className="grid-2">
        <div className="form-field"><label htmlFor="phone">Phone / WhatsApp</label><input id="phone" name="phone" type="tel" inputMode="numeric" maxLength={10} pattern="[0-9]{10}" title="Enter a 10-digit phone number" placeholder="10-digit phone number" onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "").slice(0, 10); }} /></div>
        <div className="form-field">
          <label htmlFor="topic">I&apos;m interested in</label>
          <select id="topic" name="topic">
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
        <textarea id="message" name="message" placeholder="Tell me a little about what you're navigating right now..." />
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
        Send Message
      </button>
      {status && <p style={{ color: "var(--gold)", textAlign: "center", marginTop: 14 }}>{status}</p>}
      {submitted && (
        <p style={{ color: "var(--gold)", textAlign: "center", marginTop: 14 }}>
          Thank you — your message has been noted. I&apos;ll get back to you soon. ✦
        </p>
      )}
    </form>
  );
}
