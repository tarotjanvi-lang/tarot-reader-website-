import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function UserDashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const userId = (session.user as any).id;

  const [appointments, user] = await Promise.all([
    prisma.appointment.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true, createdAt: true },
    }),
  ]);

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

  const upcomingAppointments = appointments.filter(
    (a) => a.status === "PENDING" || a.status === "CONFIRMED"
  );
  const pastAppointments = appointments.filter(
    (a) => a.status === "COMPLETED" || a.status === "CANCELLED"
  );

  return (
    <section className="section dashboard-page-section">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>Welcome back, {user?.name || "User"}</h1>
            <p style={{ color: "var(--ink-soft)" }}>Manage your spiritual journey and appointments</p>
          </div>
          <Link href="/booking" className="btn btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Book New Session
          </Link>
        </div>

        <div className="dashboard-stats">
          <div className="dashboard-stat">
            <div className="dashboard-stat-value">{appointments.length}</div>
            <div className="dashboard-stat-label">Total Sessions</div>
          </div>
          <div className="dashboard-stat">
            <div className="dashboard-stat-value">{upcomingAppointments.length}</div>
            <div className="dashboard-stat-label">Upcoming</div>
          </div>
          <div className="dashboard-stat">
            <div className="dashboard-stat-value">{pastAppointments.length}</div>
            <div className="dashboard-stat-label">Completed</div>
          </div>
          <div className="dashboard-stat">
            <div className="dashboard-stat-value">
              {formatCurrency(
                appointments
                  .filter((a) => a.status === "COMPLETED")
                  .reduce((sum, a) => sum + a.totalAmount, 0)
              )}
            </div>
            <div className="dashboard-stat-label">Total Invested</div>
          </div>
        </div>

        {upcomingAppointments.length > 0 && (
          <div className="dashboard-section">
            <div className="dashboard-section-header">
              <h2>Upcoming Sessions</h2>
            </div>
            <div className="dashboard-appointments">
              {upcomingAppointments.map((apt) => (
                <div key={apt.id} className="dashboard-appointment-card">
                  <div className="dashboard-appointment-info">
                    <div className="dashboard-appointment-service">{apt.serviceName}</div>
                    <div className="dashboard-appointment-details">
                      <span>{apt.serviceDuration}</span>
                      <span>{formatCurrency(apt.totalAmount)}</span>
                      {apt.emergencyConsultation && (
                        <span className="emergency-badge">Emergency Consultation</span>
                      )}
                    </div>
                    {apt.scheduledAt && (
                      <div className="dashboard-appointment-scheduled">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        Scheduled: {formatDate(apt.scheduledAt)}
                      </div>
                    )}
                    {apt.notes && (
                      <div className="dashboard-appointment-notes">
                        <strong>Your notes:</strong> {apt.notes}
                      </div>
                    )}
                  </div>
                  <div className="dashboard-appointment-status">
                    <span
                      className="dashboard-status-badge"
                      style={{ background: `${statusColors[apt.status]}20`, color: statusColors[apt.status] }}
                    >
                      {apt.status}
                    </span>
                    {apt.status === "PENDING" && (
                      <p style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 4 }}>
                        Awaiting confirmation
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {pastAppointments.length > 0 && (
          <div className="dashboard-section">
            <div className="dashboard-section-header">
              <h2>Past Sessions</h2>
            </div>
            <div className="dashboard-appointments">
              {pastAppointments.map((apt) => (
                <div key={apt.id} className="dashboard-appointment-card past">
                  <div className="dashboard-appointment-info">
                    <div className="dashboard-appointment-service">{apt.serviceName}</div>
                    <div className="dashboard-appointment-details">
                      <span>{apt.serviceDuration}</span>
                      <span>{formatCurrency(apt.totalAmount)}</span>
                    </div>
                    <div className="dashboard-appointment-date">
                      Completed on {formatDate(apt.updatedAt)}
                    </div>
                  </div>
                  <div className="dashboard-appointment-status">
                    <span
                      className="dashboard-status-badge"
                      style={{ background: `${statusColors[apt.status]}20`, color: statusColors[apt.status] }}
                    >
                      {apt.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {appointments.length === 0 && (
          <div className="dashboard-empty">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--ink-soft)" strokeWidth="1" style={{ marginBottom: 16, opacity: 0.5 }}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <h2>No sessions yet</h2>
            <p style={{ color: "var(--ink-soft)", marginBottom: 24 }}>
              Start your spiritual journey by booking your first session with Janvi.
            </p>
            <Link href="/booking" className="btn btn-primary">
              Book Your First Session
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}