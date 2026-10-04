import Link from "next/link";
import { Suspense } from "react";
import BookingFlow from "./BookingFlow";

export const metadata = {
  title: "Book a Session",
  description: "Request a tarot reading, energy healing or soul guidance session with Janvi. Janvi personally confirms the date and time with every client.",
};

export default function BookingPage() {
  return (
    <div className="booking-page">
      <Suspense fallback={null}>
        <BookingFlow />
      </Suspense>
    </div>
  );
}
