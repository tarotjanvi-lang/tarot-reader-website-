"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const email = new URLSearchParams(window.location.search).get("email");
    if (email) setFormData((current) => ({ ...current, email }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError("");

    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setFormError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      router.push("/login?registered=true");
    } catch (error) {
      setFormError(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 480 }}>
        <div className="service-card" style={{ textAlign: "center" }}>
          <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 24 }}>
            Create Account
          </div>
          <h1 style={{ marginBottom: 8 }}>Join The Soul Mirror</h1>
          <p style={{ color: "var(--ink-soft)", marginBottom: 32 }}>
            Book sessions, track your journey, and access your spiritual guidance history.
          </p>

          {formError && (
            <div
              style={{
                background: "rgba(173, 28, 28, 0.1)",
                border: "1px solid rgba(173, 28, 28, 0.3)",
                color: "#ad1c1c",
                padding: "12px 16px",
                borderRadius: 8,
                marginBottom: 20,
                fontSize: 14,
              }}
            >
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
            <div className="form-field" style={{ marginBottom: 20 }}>
              <label htmlFor="name" style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 500 }}>
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  fontSize: 16,
                  background: "var(--card)",
                  color: "var(--ink)",
                }}
              />
            </div>

            <div className="form-field" style={{ marginBottom: 20 }}>
              <label htmlFor="email" style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 500 }}>
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  fontSize: 16,
                  background: "var(--card)",
                  color: "var(--ink)",
                }}
              />
            </div>

            <div className="form-field" style={{ marginBottom: 20 }}>
              <label htmlFor="password" style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 500 }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={8}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  fontSize: 16,
                  background: "var(--card)",
                  color: "var(--ink)",
                }}
              />
            </div>

            <div className="form-field" style={{ marginBottom: 28 }}>
              <label htmlFor="confirmPassword" style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 500 }}>
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  fontSize: 16,
                  background: "var(--card)",
                  color: "var(--ink)",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center", padding: "16px" }}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p style={{ marginTop: 24, color: "var(--ink-soft)", fontSize: 14 }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "var(--gold)", fontWeight: 500 }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}