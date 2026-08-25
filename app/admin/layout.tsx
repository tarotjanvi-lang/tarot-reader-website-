import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user?.email?.toLowerCase() !== "tarotjanvi@gmail.com") {
    redirect("/login?callbackUrl=/admin");
  }

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="admin-header-inner">
          <Link href="/admin" className="admin-logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span>Admin Panel</span>
          </Link>
          <nav className="admin-nav">
            <Link href="/admin" className="admin-nav-link">Dashboard</Link>
            <Link href="/admin/users" className="admin-nav-link">Users</Link>
            <Link href="/admin/appointments" className="admin-nav-link">Appointments</Link>
            <Link href="/admin/analytics" className="admin-nav-link">Analytics</Link>
          </nav>
          <div className="admin-user">
            <span>Admin</span>
            <a href="/api/auth/signout" className="btn btn-outline btn-sm">Sign Out</a>
          </div>
        </div>
      </header>
      <main className="admin-main">{children}</main>
    </div>
  );
}