import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { auth } from "@/lib/auth";
import { services } from "@/lib/services-data";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Please sign in before making a payment." }, { status: 401 });
    }
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: "Razorpay is not configured on the server." }, { status: 503 });
    }

    const { serviceSlug, emergencyConsultation } = await request.json();
    const service = services.find((item) => item.slug === serviceSlug && item.price);
    if (!service) return NextResponse.json({ error: "Invalid service selected." }, { status: 400 });

    const totalAmount = (service.price || 0) + (emergencyConsultation ? 299 : 0);
    const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
    const order = await razorpay.orders.create({
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `soulmirror_${Date.now()}`,
      notes: { userId: (session.user as any).id, serviceSlug },
    });

    return NextResponse.json({ order, keyId: process.env.RAZORPAY_KEY_ID, amount: totalAmount * 100, serviceName: service.name });
  } catch (error) {
    console.error("Create Razorpay order error:", error);
    return NextResponse.json({ error: "Unable to create payment order." }, { status: 500 });
  }
}