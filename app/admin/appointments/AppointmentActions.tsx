"use client";

import { useState } from "react";

type AppointmentActionsProps = {
  appointment: {
    id: string;
    status: string;
    scheduledAt: Date | null;
    customerName: string | null;
    customerPhone: string | null;
    user: { name: string | null; email: string } | null;
    serviceName: string;
  };
};

const BUSINESS_TIME_ZONE = "Asia/Kolkata";

function toDateTimeLocal(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: BUSINESS_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(date));

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}`;
}

function indiaLocalInputToDate(value: string) {
  return new Date(`${value}:00+05:30`);
}

export default function AppointmentActions({ appointment }: AppointmentActionsProps) {
  const [status, setStatus] = useState(appointment.status);
  const [scheduledAt, setScheduledAt] = useState(
    appointment.scheduledAt ? toDateTimeLocal(appointment.scheduledAt) : ""
  );
  const [message, setMessage] = useState("");
  const clientName = appointment.customerName || appointment.user?.name || "there";
  const phone = (appointment.customerPhone || "").replace(/\D/g, "");

  async function saveAppointment() {
    setMessage("Saving...");
    const response = await fetch("/api/appointments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: appointment.id,
        status,
        scheduledAt: scheduledAt ? indiaLocalInputToDate(scheduledAt).toISOString() : null,
      }),
    });
    const data = await response.json();
    setMessage(response.ok ? "Saved" : data.error || "Unable to save");
  }

  function sendWhatsApp() {
    if (!phone) {
      setMessage("No WhatsApp number saved");
      return;
    }
    const timing = scheduledAt
      ? indiaLocalInputToDate(scheduledAt).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
          timeZone: BUSINESS_TIME_ZONE,
        })
      : "to be confirmed";
    const text = `Hello ${clientName}, your ${appointment.serviceName} appointment with Janvi is ${status.toLowerCase()} for ${timing}. Please reply here if you have any questions.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="admin-appointment-actions">
      <select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Appointment status">
        <option value="PENDING">Pending</option>
        <option value="CONFIRMED">Confirmed</option>
        <option value="COMPLETED">Completed</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
      <input type="datetime-local" value={scheduledAt} onChange={(event) => setScheduledAt(event.target.value)} aria-label="Appointment date and time" />
      <button type="button" className="btn btn-primary btn-sm" onClick={saveAppointment}>Save</button>
      <button type="button" className="btn btn-outline btn-sm" onClick={sendWhatsApp}>WhatsApp</button>
      {message && <small>{message}</small>}
    </div>
  );
}