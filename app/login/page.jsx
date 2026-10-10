"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [callbackUrl, setCallbackUrl] = useState("/");

  useEffect(() => {
    setCallbackUrl(new URLSearchParams(window.location.search).get("callbackUrl") || "/");
  }, []);

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
          router.push(`/register?email=${encodeURIComponent(email)}&callbackUrl=${encodeURIComponent(callbackUrl)}`);
          return;
        }
      }

      const result = await signIn("credentials", {
        email,
        password: formData.password,
        callbackUrl,
        redirect: false,
      });

      if (!result) {
        setFormError("Unable to contact the authentication server. Please try again.");
        return;
      }

      if (result.error) {
        const authError = String(result.error);

        if (authError === "CredentialsSignin") {
          setFormError("Invalid email or password. If you just created your account, make sure you are using the same email and password.");
        } else if (authError === "Configuration") {
          setFormError("The authentication service is not configured correctly. Please contact the site administrator.");
        } else {
          console.error("Authentication failed:", authError);
          setFormError("Unable to sign in right now. Please try again.");
        }
        return;
      }

      router.push(result.url || callbackUrl);
      router.refresh();
    } catch (error) {
      console.error("Login request failed:", error);
      setFormError("Unable to connect to the authentication service. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section">
      <div className="container auth-page-container" style={{ maxWidth: 480 }}>
        <div className="service-card auth-card" style={{ textAlign: "center" }}>
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
              <div style={{ position: "relative" }}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    paddingRight: 40,
                    boxSizing: "border-box",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    fontSize: 16,
                    background: "var(--card)",
                    color: "var(--ink)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 13,
                    color: "var(--gold)",
                    fontWeight: 500,
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
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

          <div style={{ textAlign: "right", marginTop: -12, marginBottom: 24 }}>
            <Link href="/forgot-password" style={{ color: "var(--gold)", fontWeight: 500, fontSize: 14 }}>
              Forgot password?
            </Link>
          </div>

          <p style={{ marginTop: 24, color: "var(--ink-soft)", fontSize: 14 }}>
            Don&apos;t have an account?{" "}
            <Link href={`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`} style={{ color: "var(--gold)", fontWeight: 500 }}>
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