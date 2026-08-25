import { prisma } from "@/lib/prisma";

export default async function AdminAnalyticsPage() {
  const [
    totalUsers,
    totalAppointments,
    totalRevenue,
    appointmentsByStatus,
    appointmentsByService,
    revenueAppointments,
    newUsers,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "USER" } }),
    prisma.appointment.count(),
    prisma.appointment.aggregate({
      _sum: { totalAmount: true },
      where: { status: { in: ["CONFIRMED", "COMPLETED"] } },
    }),
    prisma.appointment.groupBy({
      by: ["status"],
      _count: { status: true },
    }),
    prisma.appointment.groupBy({
      by: ["serviceName"],
      _count: { serviceName: true },
      _sum: { totalAmount: true },
      orderBy: { _count: { serviceName: "desc" } },
    }),
    prisma.appointment.findMany({
      where: { status: { in: ["CONFIRMED", "COMPLETED"] } },
      select: { createdAt: true, totalAmount: true },
    }),
    prisma.user.findMany({
      where: { role: "USER" },
      select: { createdAt: true },
    }),
  ]);

  const monthStart = (date: Date) =>
    new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));

  const monthlyRevenue = Array.from(
    revenueAppointments.reduce((months, appointment) => {
      const month = monthStart(appointment.createdAt);
      const key = month.toISOString();
      months.set(key, (months.get(key) || 0) + appointment.totalAmount);
      return months;
    }, new Map<string, number>())
  )
    .map(([month, revenue]) => ({ month, revenue }))
    .sort((a, b) => b.month.localeCompare(a.month))
    .slice(0, 12);

  const monthlyUsers = Array.from(
    newUsers.reduce((months, user) => {
      const month = monthStart(user.createdAt);
      const key = month.toISOString();
      months.set(key, (months.get(key) || 0) + 1);
      return months;
    }, new Map<string, number>())
  )
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => b.month.localeCompare(a.month))
    .slice(0, 12);

  const confirmedCount = appointmentsByStatus.find((item) => item.status === "CONFIRMED")?._count.status || 0;
  const completedCount = appointmentsByStatus.find((item) => item.status === "COMPLETED")?._count.status || 0;
  const pendingCount = appointmentsByStatus.find((item) => item.status === "PENDING")?._count.status || 0;
  const averageBookingValue = totalAppointments > 0
    ? Math.round((totalRevenue._sum.totalAmount || 0) / Math.max(confirmedCount + completedCount, 1))
    : 0;
  const maxServiceBookings = Math.max(...appointmentsByService.map((item) => item._count.serviceName), 1);
  const maxMonthlyRevenue = Math.max(...monthlyRevenue.map((item) => item.revenue), 1);
  const maxMonthlyUsers = Math.max(...monthlyUsers.map((item) => item.count), 1);

  const formatCurrency = (amount: number | null) => {
    return `₹${((amount || 0) / 100).toLocaleString("en-IN")}`;
  };

  const formatMonth = (date: any) => {
    return new Date(date).toLocaleDateString("en-IN", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="admin-page admin-analytics-page">
      <div className="admin-header-title">
        <div className="admin-eyebrow">Practice pulse</div>
        <h1>Analytics</h1>
        <p>A clear view of demand, revenue, and client growth.</p>
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

        <div className="admin-stat-card">
          <div className="admin-stat-icon conversion">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
          </div>
          <div className="admin-stat-content">
            <div className="admin-stat-value">
              {totalUsers > 0 ? Math.round((totalAppointments / totalUsers) * 100) : 0}%
            </div>
            <div className="admin-stat-label">Booking Rate</div>
          </div>
        </div>
      </div>

      <div className="admin-insight-strip">
        <div><span>Pending attention</span><strong>{pendingCount} appointments</strong></div>
        <div><span>Confirmation rate</span><strong>{totalAppointments > 0 ? Math.round(((confirmedCount + completedCount) / totalAppointments) * 100) : 0}%</strong></div>
        <div><span>Average paid booking</span><strong>{formatCurrency(averageBookingValue)}</strong></div>
        <div><span>Completed sessions</span><strong>{completedCount}</strong></div>
      </div>

      <div className="admin-charts-grid">
        <div className="admin-card">
          <div className="admin-card-header">
            <h2>Appointments by Status</h2>
          </div>
          <div className="admin-chart-bars">
            {appointmentsByStatus.map((item) => (
              <div key={item.status} className="admin-chart-bar">
                <div className="admin-chart-bar-label">{item.status}</div>
                <div className="admin-chart-bar-container">
                  <div
                    className="admin-chart-bar-fill"
                    style={{
                      width: `${totalAppointments > 0 ? (item._count.status / totalAppointments) * 100 : 0}%`,
                    }}
                  />
                </div>
                <div className="admin-chart-bar-value">{item._count.status}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <h2>Popular Services</h2>
          </div>
          <div className="admin-chart-bars">
            {appointmentsByService.slice(0, 5).map((item) => (
              <div key={item.serviceName} className="admin-chart-bar">
                <div className="admin-chart-bar-label">{item.serviceName}</div>
                <div className="admin-chart-bar-container">
                  <div
                    className="admin-chart-bar-fill"
                    style={{
                      width: `${(item._count.serviceName / maxServiceBookings) * 100}%`,
                    }}
                  />
                </div>
                <div className="admin-chart-bar-value">
                  {item._count.serviceName} bookings
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-charts-grid">
        <div className="admin-card full-width">
          <div className="admin-card-header">
            <h2>Monthly Revenue</h2>
          </div>
          <div className="admin-chart-bars">
            {monthlyRevenue.slice().reverse().map((item) => (
              <div key={item.month} className="admin-chart-bar">
                <div className="admin-chart-bar-label">{formatMonth(item.month)}</div>
                <div className="admin-chart-bar-container">
                  <div className="admin-chart-bar-fill revenue-fill" style={{ width: `${(Number(item.revenue) / maxMonthlyRevenue) * 100}%` }} />
                </div>
                <div className="admin-chart-bar-value">{formatCurrency(Number(item.revenue))}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-charts-grid">
        <div className="admin-card full-width">
          <div className="admin-card-header">
            <h2>Monthly New Users</h2>
          </div>
          <div className="admin-chart-bars">
            {monthlyUsers.slice().reverse().map((item) => (
              <div key={item.month} className="admin-chart-bar">
                <div className="admin-chart-bar-label">{formatMonth(item.month)}</div>
                <div className="admin-chart-bar-container">
                  <div className="admin-chart-bar-fill users-fill" style={{ width: `${(Number(item.count) / maxMonthlyUsers) * 100}%` }} />
                </div>
                <div className="admin-chart-bar-value">{Number(item.count)} users</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}