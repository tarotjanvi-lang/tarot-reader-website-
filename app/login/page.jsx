"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError("");

    try {
      const email = formData.email.trim().toLowerCase();

      if (email !== "tarotjanvi@gmail.com") {
        const checkResponse = await fetch(`/api/auth/check-user?email=${encodeURIComponent(email)}`);
        const checkData = await checkResponse.json();
        if (!checkResponse.ok) throw new Error(checkData.error || "Unable to check account");
        if (!checkData.exists) {
          router.push(`/register?email=${encodeURIComponent(email)}`);
          return;
        }
      }

      const result = await signIn("credentials", {
        email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setFormError("Invalid email or password");
      } else {
        const callbackUrl = new URLSearchParams(window.location.search).get("callbackUrl") || "/";
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 480 }}>
        <div className="service-card" style={{ textAlign: "center" }}>
          <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 24 }}>
            Welcome Back
          </div>
          <h1 style={{ marginBottom: 8 }}>Sign in to your account</h1>
          <p style={{ color: "var(--ink-soft)", marginBottom: 32 }}>
            Access your bookings, manage appointments, and continue your journey.
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

            <div className="form-field" style={{ marginBottom: 28 }}>
              <label htmlFor="password" style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 500 }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                required
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

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center", padding: "16px" }}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p style={{ marginTop: 24, color: "var(--ink-soft)", fontSize: 14 }}>
            Don&apos;t have an account?{" "}
            <Link href="/register" style={{ color: "var(--gold)", fontWeight: 500 }}>
              Create one
            </Link>
          </p>

          <Link
            href="/"
            className="btn btn-outline"
            style={{ width: "100%", justifyContent: "center", marginTop: 16 }}
          >
            Continue as Guest
          </Link>
        </div>
      </div>
    </section>
  );
}