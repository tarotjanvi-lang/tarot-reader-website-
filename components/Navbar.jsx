"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "./ThemeProvider";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  const isAdmin = session?.user?.email?.toLowerCase() === "tarotjanvi@gmail.com";

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          <Image className="logo-mark" src="/images/logo.png" alt="" width={48} height={48} priority />
          <span className="logo-text">
            <b>THE SOUL MIRROR</b>
          </span>
        </Link>

        <nav className={`nav-links${open ? " open" : ""}`}>
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={isActive ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          {session && !isAdmin && (
            <Link
              href="/dashboard"
              className={pathname.startsWith("/dashboard") ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              My Dashboard
            </Link>
          )}
          {isAdmin && (
            <Link
              href="/admin"
              className={pathname.startsWith("/admin") ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              Admin Panel
            </Link>
          )}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle"
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
          />
          {status === "loading" ? (
            <div className="nav-loading" style={{ width: 100, height: 40, borderRadius: 999, background: "var(--border)" }} />
          ) : session ? (
            <div className="nav-user-menu">
              <button
                className="nav-user-avatar"
                onClick={() => setOpen((v) => !v)}
                aria-label="User menu"
              >
                {(session.user?.name?.[0] || session.user?.email?.[0] || "U").toUpperCase()}
              </button>
              <div className={`nav-user-dropdown${open ? " open" : ""}`}>
                <div className="nav-user-info">
                  <span className="nav-user-name">{session.user?.name || "User"}</span>
                  <span className="nav-user-email">{session.user?.email}</span>
                </div>
                {!isAdmin && <Link href="/dashboard" className="nav-dropdown-item" onClick={() => setOpen(false)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                  My Dashboard
                </Link>}
                {isAdmin && (
                  <Link href="/admin" className="nav-dropdown-item" onClick={() => setOpen(false)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    Admin Panel
                  </Link>
                )}
                <button
                  className="nav-dropdown-item"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-outline btn-sm desktop-only">
                Sign In
              </Link>
            </>
          )}
          <button
            type="button"
            className="nav-burger"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
