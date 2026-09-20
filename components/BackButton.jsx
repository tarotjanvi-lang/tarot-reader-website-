"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  function goBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  }

  return (
    <button type="button" className="back-button" onClick={goBack}>
      <span aria-hidden="true">←</span> Back
    </button>
  );
}
