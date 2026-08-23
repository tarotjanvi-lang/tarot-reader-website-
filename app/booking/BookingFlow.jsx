"use client";

import emailjs from "@emailjs/browser";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { services } from "@/lib/services-data";

const STEP_LABELS = ["Session", "Your Details", "Payment", "Confirmation"];
const URGENT_WHATSAPP_FEE = 299;

export default function BookingFlow() {
  const searchParams = useSearchParams();
  const preselectedSlug = searchParams.get("service");
  const initialService = services.find((s) => s.slug === preselectedSlug) || services[0];

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(initialService);
  const [urgentWhatsApp, setUrgentWhatsApp] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");
  const [details, setDetails] = useState({ name: "", email: "", countryCode: "+91", phone: "", notes: "" });

  function goTo(n) {
    setStep(Math.min(Math.max(n, 1), 4));
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 260, behavior: "smooth" });
    }
  }

  function handleDetails(e) {
    e.preventDefault();
    goTo(3);
  }

  async function handleAdvancePayment(e) {
    e.preventDefault();
    // NOTE: this is a front-end demo only. A real integration needs a
    // server-side Razorpay Order creation call + webhook signature
    // verification before accepting payment. See project README.
    setEmailStatus("Sending your booking details...");
    try {
      const total = (selectedService?.price || 0) + (urgentWhatsApp ? URGENT_WHATSAPP_FEE : 0);
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      if (!publicKey) {
        throw new Error("EmailJS Public Key is missing");
      }
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_gmddfjf",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_x4aevv4",
        {
          to_email: "tarotjanvi@gmail.com",
          email: "tarotjanvi@gmail.com",
          name: details.name,
          title: `New session appointment request - ${selectedService?.name}`,
          message: `Session: ${selectedService?.name}\nDuration: ${selectedService?.duration}\nSession fee: ${selectedService?.priceLabel}\nEmergency consultation: ${urgentWhatsApp ? `Yes - ₹${URGENT_WHATSAPP_FEE}` : "No"}\nTotal payment: ₹${total.toLocaleString("en-IN")}\nPayment status: Payment completed (demo checkout)\nCustomer phone: ${details.countryCode} ${details.phone}\nCustomer notes: ${details.notes || "No additional notes provided"}`,
          reply_to: details.email,
          customer_name: details.name,
          customer_email: details.email,
          customer_phone: `${details.countryCode} ${details.phone}`,
          session_name: selectedService?.name,
          session_duration: selectedService?.duration,
          session_fee: selectedService?.priceLabel,
          emergency_consultation: urgentWhatsApp ? `Yes - ₹${URGENT_WHATSAPP_FEE}` : "No",
          total_payment: `₹${total.toLocaleString("en-IN")}`,
          customer_notes: details.notes || "No additional notes provided",
          payment_status: "Payment completed (demo checkout)",
        },
        { publicKey }
      );
      setEmailStatus("");
      goTo(4);
    } catch (error) {
      console.error("EmailJS booking notification failed", error);
      const errorCode = error?.status || error?.text || error?.message;
      setEmailStatus(`We could not send the booking details${errorCode ? ` (${errorCode})` : ""}. Check your EmailJS service and template settings.`);
    }
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 900 }}>
        <div className="steps-track">
          {STEP_LABELS.map((label, i) => (
            <span key={label} style={{ display: "contents" }}>
              <button
                type="button"
                className={`step-pill${step === i + 1 ? " active" : ""}${i + 1 < step ? " completed" : ""}`}
                onClick={() => i + 1 < step && goTo(i + 1)}
                disabled={i + 1 >= step}
                aria-label={i + 1 < step ? `Go back to ${label}` : label}
              >
                <span className="num">{i + 1}</span>
                {label}
              </button>
              {i < STEP_LABELS.length - 1 && <div className="step-connector"></div>}
            </span>
          ))}
        </div>

        {/* STEP 1 — Session */}
        {step === 1 && (
          <div className="booking-step active">
            <h2 style={{ textAlign: "center", fontSize: 24 }}>Choose your session</h2>
            <div className="grid-2" style={{ marginTop: 26 }}>
              {services.filter((s) => s.price).map((s) => (
                <div
                  key={s.slug}
                  role="button"
                  tabIndex={0}
                  className={`service-card select-service${selectedService?.slug === s.slug ? " selected" : ""}`}
                  onClick={() => setSelectedService(s)}
                  onKeyDown={(e) => { if (e.key === "Enter") setSelectedService(s); }}
                  style={{ cursor: "pointer", borderColor: selectedService?.slug === s.slug ? "var(--gold)" : undefined }}
                >
                  <h3>{s.name}</h3>
                  <p>{s.tagline}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--ink-soft)" }}>
                    <span>{s.duration}</span>
                    <span style={{ color: "var(--gold)", fontWeight: 500 }}>{s.priceLabel}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 36 }}>
              <button className="btn btn-primary" onClick={() => goTo(2)}>
                Continue to Your Details
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 — Details */}
        {step === 2 && (
          <div className="booking-step active">
            <h2 style={{ textAlign: "center", fontSize: 24 }}>Tell Janvi a little about you</h2>
            <p style={{ textAlign: "center" }}>Share your details and Janvi will personally contact you to agree on a suitable date and time.</p>
            <form onSubmit={handleDetails} style={{ maxWidth: 680, margin: "26px auto 0" }}>
              <div className="grid-2">
                <div className="form-field"><label>Full Name</label><input type="text" required placeholder="Your name" value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })} /></div>
                <div className="form-field"><label>Phone / WhatsApp</label><div className="phone-input"><select aria-label="Country code" value={details.countryCode} onChange={(e) => setDetails({ ...details, countryCode: e.target.value })}><option value="+91">India (+91)</option><option value="+1">United States / Canada (+1)</option><option value="+44">United Kingdom (+44)</option><option value="+61">Australia (+61)</option><option value="+971">United Arab Emirates (+971)</option><option value="+65">Singapore (+65)</option><option value="+49">Germany (+49)</option><option value="+33">France (+33)</option><option value="+81">Japan (+81)</option><option value="+27">South Africa (+27)</option></select><input type="tel" required inputMode="numeric" maxLength={10} pattern="[0-9]{10}" title="Enter a 10-digit phone number" placeholder="10-digit phone number" value={details.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })} /></div></div>
              </div>
              <div className="form-field"><label>Email</label><input type="email" required placeholder="you@email.com" value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} /></div>
              <div className="form-field"><label>What would you like to be guided on?</label><textarea placeholder="Share a little context so Janvi can prepare..." value={details.notes} onChange={(e) => setDetails({ ...details, notes: e.target.value })} /></div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}><button type="button" className="btn btn-outline" onClick={() => goTo(1)}>Back</button><button type="submit" className="btn btn-primary">Next <span aria-hidden="true">&rarr;</span></button></div>
            </form>
          </div>
        )}

        {/* STEP 3 — Payment */}
        {step === 3 && (
          <div className="booking-step active">
            <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
              <div className="eyebrow" style={{ justifyContent: "center" }}>Secure your booking</div><h2>Complete your payment</h2><p>Pay the full session fee below. Janvi will contact you to confirm the date and time after your request is received.{urgentWhatsApp ? " The ₹299 emergency consultation fee has been added to your total." : ""}</p>
              <div className="summary-card" style={{ textAlign: "left" }}><div className="summary-row"><span>Session</span><span>{selectedService?.name}</span></div><div className="summary-row"><span>Duration</span><span>{selectedService?.duration}</span></div><div className="summary-row"><span>Full session fee</span><span>{selectedService?.priceLabel}</span></div>{urgentWhatsApp && <div className="summary-row"><span>Emergency consultation</span><span>₹{URGENT_WHATSAPP_FEE}</span></div>}<div className="summary-row total"><span>Total payment</span><span>₹{((selectedService?.price || 0) + (urgentWhatsApp ? URGENT_WHATSAPP_FEE : 0)).toLocaleString("en-IN")}</span></div></div>
              <button type="button" className={`urgent-contact-toggle${urgentWhatsApp ? " selected" : ""}`} onClick={() => setUrgentWhatsApp(!urgentWhatsApp)}>
                <span className="urgent-contact-check" aria-hidden="true">{urgentWhatsApp ? "✓" : "+"}</span>
                <span><strong>{urgentWhatsApp ? "Emergency consultation added" : "Need emergency guidance?"}</strong><small>{urgentWhatsApp ? `₹${URGENT_WHATSAPP_FEE} added to your payment` : `Add ₹${URGENT_WHATSAPP_FEE} for an urgent WhatsApp consultation with Janvi`}</small></span>
              </button>
              <form onSubmit={handleAdvancePayment}><button type="submit" className="btn btn-gold" disabled={Boolean(emailStatus)} style={{ marginTop: 22, width: "100%", justifyContent: "center" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>{emailStatus ? "Processing..." : "Pay Full Amount Securely"}</button></form>
              {emailStatus && <p style={{ color: "var(--gold)", fontSize: 12, marginTop: 10 }}>{emailStatus}</p>}
              <p style={{ fontSize: 12, marginTop: 10 }}>Cards, UPI, netbanking and wallets accepted. Payment is shown here as a demo until a Razorpay order is connected.</p>
            </div>
          </div>
        )}

        {/* STEP 4 — Confirmation */}
        {step === 4 && (
          <div className="booking-step active">
            <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.4" style={{ margin: "0 auto 20px" }}><circle cx="12" cy="12" r="10" /><path d="m8 12 3 3 5-6" /></svg>
              <h2>Payment received, thank you.</h2>
              <p>Your request has been sent to Janvi. She will contact you via WhatsApp or email to confirm the date, time, and session link. Your appointment will be confirmed once the schedule is finalized with Janvi.</p>
              <div className="summary-card" style={{ textAlign: "left" }}><div className="summary-row"><span>Session</span><span>{selectedService?.name}</span></div><div className="summary-row"><span>Payment</span><span>Full session fee paid</span></div>{urgentWhatsApp && <div className="summary-row"><span>Emergency consultation</span><span>₹{URGENT_WHATSAPP_FEE} paid</span></div>}<div className="summary-row total"><span>Timing</span><span>To be confirmed by Janvi</span></div></div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 760px) {
          .details-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
