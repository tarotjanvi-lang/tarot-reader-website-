"use client";

import emailjs from "@emailjs/browser";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { services } from "@/lib/services-data";
import ServiceVisual from "@/components/ServiceVisual";
import CountryCodeSelect from "@/components/CountryCodeSelect";
import { getCountryCallingCode } from "libphonenumber-js";

const STEP_LABELS = ["Session", "Your Details", "Payment", "Confirmation"];
const URGENT_WHATSAPP_FEE = 299;

export default function BookingFlow() {
  const searchParams = useSearchParams();
  const { data: session, status: sessionStatus } = useSession();
  const preselectedSlug = searchParams.get("service");
  const initialService = services.find((s) => s.slug === preselectedSlug) || services[0];

  const [step, setStep] = useState(preselectedSlug && services.some((s) => s.slug === preselectedSlug) ? 2 : 1);
  const [selectedService, setSelectedService] = useState(initialService);
  const [urgentWhatsApp, setUrgentWhatsApp] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    country: "IN",
    phone: "",
    notes: "",
  });
  const [phoneError, setPhoneError] = useState("");
  const [emergencyContact, setEmergencyContact] = useState(null);

  // Pre-fill user details if logged in
  useEffect(() => {
    if (session?.user) {
      setDetails((prev) => ({
        ...prev,
        name: session.user?.name || "",
        email: session.user?.email || "",
      }));
    }
  }, [session]);

  function goTo(n) {
    setStep(Math.min(Math.max(n, 1), 4));
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 260, behavior: "smooth" });
    }
  }

  function handleDetails(e) {
    e.preventDefault();

    // Indian mobile numbers must contain exactly 10 digits and begin with 6–9.
    // Do not allow the booking flow to advance until the number is valid.
    if (details.country === "IN") {
      if (!/^\d{10}$/.test(details.phone)) {
        setPhoneError("Please enter a valid 10-digit Indian mobile number.");
        return;
      }
      if (!/^[6-9]\d{9}$/.test(details.phone)) {
        setPhoneError("Indian mobile numbers must start with 6, 7, 8, or 9.");
        return;
      }
    }

    setPhoneError("");
    goTo(3);
  }

  if (sessionStatus === "loading") {
    return <section className="section"><div className="container"><p style={{ textAlign: "center" }}>Checking your account...</p></div></section>;
  }

  if (!session) {
    const callbackUrl = typeof window === "undefined" ? "/booking" : `${window.location.pathname}${window.location.search}`;
    return (
      <section className="section">
        <div className="container" style={{ maxWidth: 560, textAlign: "center" }}>
          <div className="service-card account-required-card">
            <div className="eyebrow" style={{ justifyContent: "center" }}>Account Required</div>
            <h1>Sign in to book your appointment</h1>
            <p>Create an account or sign in first so your appointment and consultation history stay connected to you.</p>
            <button type="button" className="btn btn-primary" onClick={() => signIn(undefined, { callbackUrl })}>Sign In or Create Account</button>
          </div>
        </div>
      </section>
    );
  }

  async function handleAdvancePayment(e) {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setEmailStatus("Opening secure payment...");
    let verifiedPayment = null;

    try {
      const total = (selectedService?.price || 0) + (urgentWhatsApp ? URGENT_WHATSAPP_FEE : 0);

      const orderResponse = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceSlug: selectedService?.slug,
          emergencyConsultation: urgentWhatsApp,
        }),
      });
      const orderData = await orderResponse.json();
      if (!orderResponse.ok) throw new Error(orderData.error || "Unable to create payment order");

      if (!window.Razorpay) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = resolve;
          script.onerror = () => reject(new Error("Unable to load Razorpay checkout"));
          document.body.appendChild(script);
        });
      }

      verifiedPayment = await new Promise((resolve, reject) => {
        const checkout = new window.Razorpay({
          key: orderData.keyId,
          amount: orderData.amount,
          currency: "INR",
          name: "The Soul Mirror",
          description: `${orderData.serviceName} with Janvi`,
          order_id: orderData.order.id,
          prefill: { name: details.name, email: details.email, contact: `+${getCountryCallingCode(details.country)}${details.phone}` },
          theme: { color: "#b18a27" },
          handler: async (payment) => {
            try {
              const verifyResponse = await fetch("/api/payments/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpayOrderId: payment.razorpay_order_id,
                  razorpayPaymentId: payment.razorpay_payment_id,
                  razorpaySignature: payment.razorpay_signature,
                  serviceSlug: selectedService?.slug,
                  emergencyConsultation: urgentWhatsApp,
                  customerName: details.name,
                  customerEmail: details.email,
                  customerPhone: `+${getCountryCallingCode(details.country)} ${details.phone}`,
                  notes: details.notes,
                }),
              });
              const verifyData = await verifyResponse.json();
              if (!verifyResponse.ok) throw new Error(verifyData.error || "Payment verification failed");
              resolve(verifyData);
            } catch (error) {
              reject(error);
            }
          },
          modal: {
            ondismiss: () => {
              const cancelErr = new Error("Payment was cancelled");
              cancelErr.cancelled = true;
              reject(cancelErr);
            }
          },
        });
        checkout.on("payment.failed", (failure) => reject(new Error(failure.error?.description || "Payment failed")));
        checkout.open();
      });
      setEmergencyContact(verifiedPayment.emergencyContact || null);

      // Send email notification
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      if (!publicKey) {
        throw new Error("EmailJS Public Key is missing");
      }
      const bookingServiceId =
        process.env.NEXT_PUBLIC_EMAILJS_BOOKING_SERVICE_ID ||
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
        "service_gmddfjf";
      const bookingTemplateId =
        process.env.NEXT_PUBLIC_EMAILJS_BOOKING_TEMPLATE_ID ||
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
        "template_7446857";

      await emailjs.send(
        bookingServiceId,
        bookingTemplateId,
        {
          to_email: "tarotjanvi@gmail.com",
          email: "tarotjanvi@gmail.com",
          name: details.name,
          title: `New session appointment request - ${selectedService?.name}`,
          message: `Session: ${selectedService?.name}\nDuration: ${selectedService?.duration}\nSession fee: ${selectedService?.priceLabel}\nEmergency consultation: ${urgentWhatsApp ? `Yes - ₹${URGENT_WHATSAPP_FEE}` : "No"}\nTotal payment: ₹${total.toLocaleString("en-IN")}\nPayment status: Paid and verified by Razorpay\nCustomer phone: +${getCountryCallingCode(details.country)} ${details.phone}\nCustomer notes: ${details.notes || "No additional notes provided"}`,
          reply_to: details.email,
          customer_name: details.name,
          customer_email: details.email,
          customer_phone: `+${getCountryCallingCode(details.country)} ${details.phone}`,
          session_name: selectedService?.name,
          session_duration: selectedService?.duration,
          session_fee: selectedService?.priceLabel,
          emergency_consultation: urgentWhatsApp ? `Yes - ₹${URGENT_WHATSAPP_FEE}` : "No",
          total_payment: `₹${total.toLocaleString("en-IN")}`,
          customer_notes: details.notes || "No additional notes provided",
          payment_status: "Paid and verified by Razorpay",
        },
        { publicKey }
      );

      setEmailStatus("");
      goTo(4);
    } catch (error) {
      if (error?.cancelled) {
        // User dismissed the Razorpay modal — reset quietly, no error shown
        setEmailStatus("");
      } else if (verifiedPayment) {
        console.error("Booking email failed after payment verification:", error);
        setEmergencyContact(verifiedPayment.emergencyContact || null);
        setEmailStatus("");
        goTo(4);
      } else {
        console.error("Booking failed:", error);
        const errorCode = error?.status || error?.text || error?.message;
        setEmailStatus(`Booking failed${errorCode ? ` (${errorCode})` : ""}. Please try again.`);
      }
    } finally {
      setIsSubmitting(false);
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
                  <ServiceVisual service={s} />
                  <h3>{s.name}</h3>
                  <p>{s.tagline}</p>
                  <div className="booking-service-meta">
                    {s.duration && !s.duration.toLowerCase().includes("min") && <span>{s.duration}</span>}
                    <span className="booking-service-price">{s.priceLabel}</span>
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
            <div className="selected-session-summary">
              <strong>{selectedService?.name}</strong>
              <span>{selectedService?.duration}</span>
              <span>{selectedService?.priceLabel}</span>
            </div>
            <form onSubmit={handleDetails} style={{ maxWidth: 680, margin: "26px auto 0" }}>
              <div className="grid-2">
                <div className="form-field"><label>Full Name</label><input type="text" required placeholder="Your name" value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })} /></div>
                <div className="form-field">
                  <label htmlFor="booking-phone">Phone / WhatsApp</label>
                  <div className="phone-input">
                    <CountryCodeSelect
                      value={details.country}
                      onChange={(country) => {
                        setDetails({ ...details, country });
                        setPhoneError("");
                      }}
                    />
                    <input
                      id="booking-phone"
                      type="tel"
                      required
                      inputMode="numeric"
                      maxLength={details.country === "IN" ? 10 : 15}
                      pattern={details.country === "IN" ? "[6-9][0-9]{9}" : "[0-9]{7,15}"}
                      title={details.country === "IN" ? "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9." : "Enter a valid phone number."}
                      placeholder="Phone number"
                      value={details.phone}
                      aria-invalid={Boolean(phoneError)}
                      aria-describedby={phoneError ? "booking-phone-error" : undefined}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, details.country === "IN" ? 10 : 15);
                        setDetails({ ...details, phone: value });
                        if (phoneError) setPhoneError("");
                      }}
                    />
                  </div>
                  {phoneError && (
                    <p id="booking-phone-error" role="alert" style={{ color: "#b24a3b", fontSize: 12, marginTop: 7 }}>
                      {phoneError}
                    </p>
                  )}
                </div>
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
              <form onSubmit={handleAdvancePayment}><button type="submit" className="btn btn-gold" disabled={isSubmitting} style={{ marginTop: 22, width: "100%", justifyContent: "center" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>{isSubmitting ? "Processing..." : "Pay Full Amount Securely"}</button></form>
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
              {emergencyContact && (
                <div className="summary-card emergency-contact-confirmation" style={{ textAlign: "left" }}>
                  <div className="eyebrow">Emergency WhatsApp contact</div>
                  <p>Your emergency consultation is paid. Contact Janvi directly on WhatsApp:</p>
                  <p><strong>{emergencyContact.phone}</strong></p>
                  <a href={emergencyContact.whatsappUrl} className="btn btn-gold" target="_blank" rel="noreferrer">
                    Message Janvi on WhatsApp
                  </a>
                </div>
              )}
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
