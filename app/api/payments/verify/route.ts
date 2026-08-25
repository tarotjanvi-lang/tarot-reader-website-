import { NextResponse } from "next/server";
import crypto from "node:crypto";
import Razorpay from "razorpay";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { services } from "@/lib/services-data";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Please sign in before confirming payment." }, { status: 401 });
    if (!process.env.RAZORPAY_KEY_SECRET) return NextResponse.json({ error: "Razorpay is not configured on the server." }, { status: 503 });

    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, serviceSlug, emergencyConsultation, customerName, customerEmail, customerPhone, notes } = await request.json();
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(`${razorpayOrderId}|${razorpayPaymentId}`).digest("hex");
    const receivedSignature = String(razorpaySignature || "");
    if (receivedSignature.length !== expectedSignature.length || !crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(receivedSignature))) {
      return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
    }

    const service = services.find((item) => item.slug === serviceSlug && item.price);
    if (!service) return NextResponse.json({ error: "Invalid service selected." }, { status: 400 });
    const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID || "", key_secret: process.env.RAZORPAY_KEY_SECRET });
    const order = await razorpay.orders.fetch(razorpayOrderId);
    const expectedAmount = ((service.price || 0) + (emergencyConsultation ? 299 : 0)) * 100;
    if (order.notes?.userId !== (session.user as any).id || order.notes?.serviceSlug !== serviceSlug || order.amount !== expectedAmount) {
      return NextResponse.json({ error: "Payment order details do not match the booking." }, { status: 400 });
    }
    const payment = await razorpay.payments.fetch(razorpayPaymentId);
    if (payment.order_id !== razorpayOrderId || payment.status !== "captured") {
      return NextResponse.json({ error: "Payment has not been captured." }, { status: 400 });
    }
    const existingAppointment = await prisma.appointment.findFirst({ where: { paymentId: razorpayPaymentId } });
    if (existingAppointment) return NextResponse.json({ appointment: existingAppointment });

    const emergencyFee = emergencyConsultation ? 299 * 100 : 0;
    const appointment = await prisma.appointment.create({
      data: {
        userId: (session.user as any).id,
        customerName, customerEmail, customerPhone,
        serviceName: String(service.name), serviceSlug: String(service.slug),
        servicePrice: service.price || 0, serviceDuration: String(service.duration),
        emergencyConsultation: Boolean(emergencyConsultation), emergencyFee,
        totalAmount: (service.price || 0) * 100 + emergencyFee,
        notes, paymentId: razorpayPaymentId, orderId: razorpayOrderId, status: "CONFIRMED",
      },
    });
    return NextResponse.json({ appointment }, { status: 201 });
  } catch (error) {
    console.error("Verify Razorpay payment error:", error);
    return NextResponse.json({ error: "Unable to confirm payment." }, { status: 500 });
  }
}