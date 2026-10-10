import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

const RESET_TOKEN_TTL_MS = 60 * 60 * 1000;

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function POST(request: Request) {
  const genericResponse = NextResponse.json({
    message: "If an account exists for that email, a password reset link has been sent.",
  });

  try {
    const { email: rawEmail } = await request.json();
    const email = String(rawEmail || "").trim().toLowerCase();
    if (!email) return genericResponse;

    const user = await prisma.user.findUnique({
      where: { email },
      select: { email: true, name: true },
    });
    if (!user) return genericResponse;

    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const serviceId = process.env.EMAILJS_RESET_SERVICE_ID;
    const templateId = process.env.EMAILJS_RESET_TEMPLATE_ID;

    if (!publicKey || !serviceId || !templateId) {
      console.error("Password reset email configuration is missing.");
      return genericResponse;
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const token = hashToken(rawToken);
    const expires = new Date(Date.now() + RESET_TOKEN_TTL_MS);

    await prisma.verificationToken.deleteMany({ where: { identifier: email } });
    await prisma.verificationToken.create({
      data: { identifier: email, token, expires },
    });

    const origin = new URL(request.url).origin;
    const resetLink = `${origin}/reset-password?token=${rawToken}&email=${encodeURIComponent(email)}`;

    const emailResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          to_email: email,
          name: user.name || "there",
          reset_link: resetLink,
          expires_in: "1 hour",
        },
      }),
    });

    if (!emailResponse.ok) {
      console.error("Password reset email failed:", await emailResponse.text());
      await prisma.verificationToken.deleteMany({ where: { identifier: email, token } });
    }
  } catch (error) {
    console.error("Forgot password error:", error);
  }

  return genericResponse;
}
