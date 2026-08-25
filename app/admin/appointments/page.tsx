import { prisma } from "@/lib/prisma";
import AppointmentActions from "./AppointmentActions";

export default async function AdminAppointmentsPage() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, name: true, email: true } },
    },
  });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return `₹${(amount / 100).toLocaleString("en-IN")}`;
  };

  const statusColors: Record<string, string> = {
    PENDING: "var(--gold)",
    CONFIRMED: "#22c55e",
    COMPLETED: "#3b82f6",
    CANCELLED: "#ef4444",
  };

  return (
    <div className="admin-page">
      <div className="admin-header-title">
        <h1>Appointments</h1>
        <p>View and manage all session bookings</p>
      </div>

      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Service</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Emergency</th>
                <th>Scheduled</th>
                <th>Booked</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt) => (
                <tr key={apt.id}>
                  <td>
                    <div className="admin-client-info">
                      <span className="admin-client-name">{apt.customerName || apt.user?.name || "Client"}</span>
                      <span className="admin-client-email">{apt.customerEmail || apt.user?.email || "No email"}</span>
                    </div>
                  </td>
                  <td>{apt.serviceName}</td>
                  <td>{formatCurrency(apt.totalAmount)}</td>
                  <td>
                    <span
                      className="admin-status-badge"
                      style={{ background: `${statusColors[apt.status]}20`, color: statusColors[apt.status] }}
                    >
                      {apt.status}
                    </span>
                  </td>
                  <td>
                    {apt.emergencyConsultation ? (
                      <span style={{ color: "var(--gold)", fontWeight: 500 }}>
                        Yes (+₹{(apt.emergencyFee / 100).toLocaleString("en-IN")})
                      </span>
                    ) : (
                      <span style={{ color: "var(--ink-soft)" }}>No</span>
                    )}
                  </td>
                  <td>{apt.scheduledAt ? formatDate(apt.scheduledAt) : "—"}</td>
                  <td>{formatDate(apt.createdAt)}</td>
                  <td><AppointmentActions appointment={apt} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}