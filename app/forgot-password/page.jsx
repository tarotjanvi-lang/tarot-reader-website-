"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to process request.");
      setMessage(data.message);
    } catch (err) {
      setError(err.message || "Unable to process request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section">
      <div className="container auth-page-container" style={{ maxWidth: 480 }}>
        <div className="service-card auth-card" style={{ textAlign: "center" }}>
          <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 24 }}>Password Recovery</div>
          <h1 style={{ marginBottom: 8 }}>Forgot your password?</h1>
          <p style={{ color: "var(--ink-soft)", marginBottom: 32 }}>
            Enter your email and we&apos;ll send you a secure password reset link.
          </p>
          {message && <div style={{ background: "rgba(34, 197, 94, 0.1)", border: "1px solid rgba(34, 197, 94, 0.3)", color: "#166534", padding: "12px 16px", borderRadius: 8, marginBottom: 20, fontSize: 14 }}>{message}</div>}
          {error && <div style={{ background: "rgba(173, 28, 28, 0.1)", border: "1px solid rgba(173, 28, 28, 0.3)", color: "#ad1c1c", padding: "12px 16px", borderRadius: 8, marginBottom: 20, fontSize: 14 }}>{error}</div>}
          <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
            <div className="form-field" style={{ marginBottom: 28 }}>
              <label htmlFor="email" style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 500 }}>Email</label>
              <input id="email" type="email" required autoComplete="email" placeholder="you@email.com" value={email} onChange={(event) => setEmail(event.target.value)} style={{ width: "100%", padding: "14px 16px", border: "1px solid var(--border)", borderRadius: 10, fontSize: 16, background: "var(--card)", color: "var(--ink)" }} />
            </div>
            <button type="submit" disabled={isLoading} className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: 16 }}>{isLoading ? "Sending..." : "Send Reset Link"}</button>
          </form>
          <Link href="/login" className="btn btn-outline" style={{ width: "100%", justifyContent: "center", marginTop: 16 }}>Back to Sign In</Link>
        </div>
      </div>
    </section>
  );
}
