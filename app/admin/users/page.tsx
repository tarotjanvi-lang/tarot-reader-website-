import { prisma } from "@/lib/prisma";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    where: { role: "USER" },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { appointments: true } },
      appointments: {
        take: 1,
        orderBy: { createdAt: "desc" },
        select: { createdAt: true, status: true, serviceName: true },
      },
    },
  });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return `₹${(amount / 100).toLocaleString("en-IN")}`;
  };

  return (
    <div className="admin-page">
      <div className="admin-header-title">
        <h1>Users</h1>
        <p>Manage and view all registered users</p>
      </div>

      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Appointments</th>
                <th>Last Booking</th>
                <th>Status</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="admin-client-info">
                      <span className="admin-client-name">{user.name || "—"}</span>
                      <span className="admin-client-email">{user.email}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user._count.appointments}</td>
                  <td>
                    {user.appointments[0] ? (
                      <>
                        {user.appointments[0].serviceName} •{" "}
                        <span
                          style={{
                            color: user.appointments[0].status === "COMPLETED"
                              ? "#22c55e"
                              : user.appointments[0].status === "CONFIRMED"
                              ? "#3b82f6"
                              : "var(--gold)",
                          }}
                        >
                          {user.appointments[0].status}
                        </span>
                      </>
                    ) : (
                      <span style={{ color: "var(--ink-soft)" }}>No bookings</span>
                    )}
                  </td>
                  <td>
                    <span className="admin-status-badge" style={{ background: "#22c55e20", color: "#22c55e" }}>
                      Active
                    </span>
                  </td>
                  <td>{formatDate(user.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}