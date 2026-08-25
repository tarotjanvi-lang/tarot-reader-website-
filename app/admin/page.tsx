import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const [
    totalUsers,
    totalAppointments,
    pendingAppointments,
    confirmedAppointments,
    completedAppointments,
    totalRevenue,
    recentAppointments,
    recentUsers,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "USER" } }),
    prisma.appointment.count(),
    prisma.appointment.count({ where: { status: "PENDING" } }),
    prisma.appointment.count({ where: { status: "CONFIRMED" } }),
    prisma.appointment.count({ where: { status: "COMPLETED" } }),
    prisma.appointment.aggregate({
      _sum: { totalAmount: true },
      where: { status: { in: ["CONFIRMED", "COMPLETED"] } },
    }),
    prisma.appointment.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    }),
    prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      where: { role: "USER" },
      select: { id: true, name: true, email: true, createdAt: true, _count: { select: { appointments: true } } },
    }),
  ]);

  const formatCurrency = (amount: number | null) => {
    return `₹${((amount || 0) / 100).toLocaleString("en-IN")}`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statusColors: Record<string, string> = {
    PENDING: "var(--gold)",
    CONFIRMED: "#22c55e",
    COMPLETED: "#3b82f6",
    CANCELLED: "#ef4444",
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header-title">
        <h1>Dashboard</h1>
        <p>Overview of your Soul Mirror practice</p>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon users">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
              <circle cx="10" cy="7" r="4" />
            </svg>
          </div>
          <div className="admin-stat-content">
            <div className="admin-stat-value">{totalUsers}</div>
            <div className="admin-stat-label">Total Users</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon appointments">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div className="admin-stat-content">
            <div className="admin-stat-value">{totalAppointments}</div>
            <div className="admin-stat-label">Total Appointments</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon pending">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="admin-stat-content">
            <div className="admin-stat-value">{pendingAppointments}</div>
            <div className="admin-stat-label">Pending</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon revenue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div className="admin-stat-content">
            <div className="admin-stat-value">{formatCurrency(totalRevenue._sum.totalAmount)}</div>
            <div className="admin-stat-label">Total Revenue</div>
          </div>
        </div>
      </div>

      <div className="admin-charts-grid">
        <div className="admin-card">
          <div className="admin-card-header">
            <h2>Recent Appointments</h2>
            <Link href="/admin/appointments" className="admin-view-all">View All</Link>
          </div>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Service</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map((apt) => (
                  <tr key={apt.id}>
                    <td>
                      <div className="admin-client-info">
                        <span className="admin-client-name">{apt.user?.name || "Guest"}</span>
                        <span className="admin-client-email">{apt.user?.email || "No email"}</span>
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
                    <td>{formatDate(apt.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <h2>New Users</h2>
            <Link href="/admin/users" className="admin-view-all">View All</Link>
          </div>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Appointments</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name || "—"}</td>
                    <td>{user.email}</td>
                    <td>{user._count.appointments}</td>
                    <td>{formatDate(user.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}