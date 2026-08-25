import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Please sign in before booking an appointment." }, { status: 401 });
    }

    const body = await request.json();

    const {
      serviceName,
      serviceSlug,
      servicePrice,
      serviceDuration,
      emergencyConsultation,
      emergencyFee,
      totalAmount,
      notes,
      status = "PENDING",
    } = body;
    const userId = (session.user as any).id;

    // Validate required fields
    if (!serviceName || !serviceSlug || !serviceDuration || !totalAmount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        userId,
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        customerPhone: body.customerPhone,
        serviceName,
        serviceSlug,
        servicePrice,
        serviceDuration,
        emergencyConsultation: emergencyConsultation || false,
        emergencyFee: emergencyFee || 0,
        totalAmount,
        notes,
        status,
      },
    });

    return NextResponse.json({ appointment });
  } catch (error) {
    console.error("Create appointment error:", error);
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = (session.user as any).id;
    const userRole = (session.user as any).role;

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const where: any = {};

    // Admin can see all appointments, users only their own
    if (userRole !== "ADMIN") {
      where.userId = userId;
    }

    if (status) {
      where.status = status;
    }

    const appointments = await prisma.appointment.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error("Get appointments error:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    if (session?.user?.email?.toLowerCase() !== "tarotjanvi@gmail.com") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id, status, scheduledAt } = await request.json();
    if (!id || !["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"].includes(status)) {
      return NextResponse.json({ error: "Appointment id and valid status are required" }, { status: 400 });
    }

    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        status,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      },
      include: { user: { select: { name: true, email: true } } },
    });

    return NextResponse.json({ appointment });
  } catch (error) {
    console.error("Update appointment error:", error);
    return NextResponse.json({ error: "Failed to update appointment" }, { status: 500 });
  }
}