import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Fetch reviews failed", error);
    return NextResponse.json({ error: "Unable to load reviews" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Please sign in before posting a review." }, { status: 401 });
    }

    const { name, service, rating, quote } = await request.json();
    const cleanName = String(name || "").trim();
    const cleanService = String(service || "").trim();
    const cleanQuote = String(quote || "").trim();
    const numericRating = Number(rating);

    if (!cleanName || !cleanService || !cleanQuote || !Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
      return NextResponse.json({ error: "Please provide a name, service, rating, and review." }, { status: 400 });
    }
    if (cleanName.length > 80 || cleanQuote.length > 1000) {
      return NextResponse.json({ error: "Please keep your name or review shorter." }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: { name: cleanName, service: cleanService, rating: numericRating, quote: cleanQuote },
    });
    return NextResponse.json({ review }, { status: 201 });
  } catch (error) {
    console.error("Create review failed", error);
    return NextResponse.json({ error: "Unable to publish review" }, { status: 500 });
  }
}
