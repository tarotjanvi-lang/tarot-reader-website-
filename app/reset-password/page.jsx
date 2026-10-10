"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);
  const email = useMemo(() => searchParams.get("email") || "", [searchParams]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!token || !email) {
      setError("This reset link is invalid or incomplete.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to reset password.");
      setMessage("Your password has been reset successfully. You can now sign in.");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => router.push("/login"), 1200);
    } catch (err) {
      setError(err.message || "Unable to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section">
      <div className="container auth-page-container" style={{ maxWidth: 480 }}>
        <div className="service-card auth-card" style={{ textAlign: "center" }}>
          <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 24 }}>Password Recovery</div>
          <h1 style={{ marginBottom: 8 }}>Set a new password</h1>
          <p style={{ color: "var(--ink-soft)", marginBottom: 32 }}>Choose a new password with at least 8 characters.</p>
          {message && <div style={{ background: "rgba(34, 197, 94, 0.1)", border: "1px solid rgba(34, 197, 94, 0.3)", color: "#166534", padding: "12px 16px", borderRadius: 8, marginBottom: 20, fontSize: 14 }}>{message}</div>}
          {error && <div style={{ background: "rgba(173, 28, 28, 0.1)", border: "1px solid rgba(173, 28, 28, 0.3)", color: "#ad1c1c", padding: "12px 16px", borderRadius: 8, marginBottom: 20, fontSize: 14 }}>{error}</div>}
          <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
            <div className="form-field" style={{ marginBottom: 20 }}>
              <label htmlFor="password" style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 500 }}>New Password</label>
              <div style={{ position: "relative" }}>
                <input id="password" type={showPassword ? "text" : "password"} required minLength={8} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} style={{ width: "100%", padding: "14px 16px", paddingRight: 70, boxSizing: "border-box", border: "1px solid var(--border)", borderRadius: 10, fontSize: 16, background: "var(--card)", color: "var(--ink)" }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--gold)", fontWeight: 500 }}>{showPassword ? "Hide" : "Show"}</button>
              </div>
            </div>
            <div className="form-field" style={{ marginBottom: 28 }}>
              <label htmlFor="confirmPassword" style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 500 }}>Confirm New Password</label>
              <input id="confirmPassword" type={showPassword ? "text" : "password"} required minLength={8} autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} style={{ width: "100%", padding: "14px 16px", border: "1px solid var(--border)", borderRadius: 10, fontSize: 16, background: "var(--card)", color: "var(--ink)" }} />
            </div>
            <button type="submit" disabled={isLoading} className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: 16 }}>{isLoading ? "Updating..." : "Reset Password"}</button>
          </form>
          <Link href="/login" className="btn btn-outline" style={{ width: "100%", justifyContent: "center", marginTop: 16 }}>Back to Sign In</Link>
        </div>
      </div>
    </section>
  );
}
