"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import CountryCodeSelect from "@/components/CountryCodeSelect";
import { getCountryCallingCode, parsePhoneNumberFromString } from "libphonenumber-js";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [country, setCountry] = useState("IN");
  const [phoneError, setPhoneError] = useState("");
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setPhoneError("");
    setStatus("");
    setIsSending(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const phoneRaw = data.get("phone") ? String(data.get("phone")).trim() : "";
    if (phoneRaw) {
      const parsed = parsePhoneNumberFromString(phoneRaw, country);
      if (!parsed || !parsed.isValid()) {
        setPhoneError("Invalid phone number for selected country.");
        setStatus("");
        setIsSending(false);
        return;
      }
    }
    try {
      const contactServiceId = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_SERVICE_ID || "service_rpo0lml";
      const contactTemplateId = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID || "template_43o3y7b";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!publicKey) {
        throw new Error("EmailJS Public Key is missing");
      }

      await emailjs.send(
        contactServiceId,
        contactTemplateId,
        {
          to_email: "tarotjanvi@gmail.com",
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone") ? `+${getCountryCallingCode(country)} ${data.get("phone")}` : "Not provided",
          title: `Contact enquiry - ${data.get("topic")}`,
          message: `CONTACT DETAILS\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone / WhatsApp: ${data.get("phone") ? `+${getCountryCallingCode(country)} ${data.get("phone")}` : "Not provided"}\nInterested in: ${data.get("topic")}\n\nMESSAGE\n\n${data.get("message") || "No message provided"}`,
          reply_to: data.get("email"),
        },
        { publicKey }
      );
      setSubmitted(true);
      setStatus("");
      form.reset();
    } catch (error) {
      console.error("Contact email failed:", error?.text || error?.message || error);
      const errorText = String(error?.text || error?.message || "Unknown EmailJS error");
      setStatus(`Message not sent: ${errorText}. Please try again or email thesoulmirrorbyjanvi@gmail.com directly.`);
    } finally {
      setIsSending(false);
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
        <div className="form-field"><label htmlFor="phone">Phone / WhatsApp</label><div className="phone-input"><CountryCodeSelect value={country} onChange={(c) => { setCountry(c); setPhoneError(""); }} /><input id="phone" name="phone" type="tel" inputMode="numeric" maxLength={15} placeholder="Phone number" onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "").slice(0, 15); setPhoneError(""); }} /></div>{phoneError && <p style={{ color: "#c0392b", fontSize: 12, marginTop: 4 }}>{phoneError}</p>}</div>
        <div className="form-field">
          <label htmlFor="topic">I&apos;m interested in</label>
          <select id="topic" name="topic">
            <option>Tarot Reading</option>
            <option>Energy Healing</option>
            <option>Intentional Spellwork</option>
            <option>Soul Guidance</option>
            <option>Consult Me</option>
          </select>
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" placeholder="Tell me a little about what you're navigating right now..." />
      </div>
      <button type="submit" disabled={isSending} className="btn btn-primary" style={{ width: "100%", justifyContent: "center", opacity: isSending ? 0.7 : 1 }}>
        {isSending ? "Sending..." : "Send Message"}
      </button>
      {status && <p role="alert" style={{ color: status.startsWith("Message not sent:") ? "#b42318" : "var(--gold)", textAlign: "center", marginTop: 14, overflowWrap: "anywhere" }}>{status}</p>}
      {submitted && (
        <p style={{ color: "var(--gold)", textAlign: "center", marginTop: 14 }}>
          Thank you — your message has been noted. I&apos;ll get back to you soon. ✦
        </p>
      )}
    </form>
  );
}
