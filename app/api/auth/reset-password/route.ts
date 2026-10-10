import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function POST(request: Request) {
  try {
    const { email: rawEmail, token: rawToken, password } = await request.json();
    const email = String(rawEmail || "").trim().toLowerCase();
    const token = String(rawToken || "").trim();

    if (!email || !token || !password) {
      return NextResponse.json({ error: "Invalid or expired reset link." }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }

    const storedToken = await prisma.verificationToken.findUnique({
      where: { token: hashToken(token) },
    });

    if (!storedToken || storedToken.identifier !== email || storedToken.expires <= new Date()) {
      return NextResponse.json({ error: "Invalid or expired reset link." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid or expired reset link." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.$transaction([
      prisma.user.update({ where: { id: user.id }, data: { password: hashedPassword } }),
      prisma.verificationToken.delete({ where: { token: storedToken.token } }),
    ]);

    return NextResponse.json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "Unable to reset password. Please try again." }, { status: 500 });
  }
}
