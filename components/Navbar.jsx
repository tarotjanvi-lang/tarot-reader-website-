"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          <svg className="logo-mark" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="var(--gold)" strokeWidth="1" />
            <path d="M30 24a8 8 0 1 1-6-7.75A6 6 0 0 0 30 24Z" fill="var(--gold)" />
          </svg>
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
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle"
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
          />
          <Link href="/booking" className="btn btn-primary btn-sm desktop-only">
            Book a Session
          </Link>
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
