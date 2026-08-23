import Link from "next/link";
import { Suspense } from "react";
import BookingFlow from "./BookingFlow";

export const metadata = {
  title: "Book a Session",
  description: "Request a tarot reading, energy healing or soul guidance session with Janvi. Janvi personally confirms the date and time with every client.",
};

export default function BookingPage() {
  return (
    <>
      <section className="page-hero" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="eyebrow" style={{ justifyContent: "center" }}>Your Journey Begins Here</div>
          <h1>Book your session</h1>
          <p>Choose your session and share your details. Janvi will personally contact you to confirm the date and time.</p>
        </div>
      </section>

      <Suspense fallback={null}>
        <BookingFlow />
      </Suspense>
    </>
  );
}
