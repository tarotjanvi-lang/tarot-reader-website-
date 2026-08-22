import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div>
          <div className="footer-logo">
            <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="22" stroke="var(--gold-soft)" strokeWidth="1" />
              <path d="M30 24a8 8 0 1 1-6-7.75A6 6 0 0 0 30 24Z" fill="var(--gold-soft)" />
            </svg>
            <div>
              <b>THE SOUL MIRROR</b><br />
              <span style={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--gold-soft)" }}>BY JANVI</span>
            </div>
          </div>
          <p>Intuitive tarot reader, energy alchemist and spiritual guide helping you reflect your truth and transform your life.</p>
          <div className="footer-social">
            <a href="/booking?urgent=whatsapp" aria-label="Urgent WhatsApp contact">
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="16" cy="16" r="15" fill="currentColor"/><path fill="var(--teal)" d="M23.7 8.3A10.8 10.8 0 0 0 6.8 21.1L5.7 25l4-1.1A10.8 10.8 0 1 0 23.7 8.3Zm-7.6 16.1a8.8 8.8 0 0 1-4.4-1.2l-.3-.2-2.4.7.7-2.3-.2-.3a8.8 8.8 0 1 1 6.6 3.3Zm4.8-6.5c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2l-.8 1c-.2.2-.4.3-.7.1-.3-.2-1.2-.4-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.7l.5-.5c.1-.2.2-.4.3-.5.1-.2 0-.4 0-.6l-.9-2.1c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.1-1.4-.1-.2-.3-.3-.6-.4Z"/></svg>
            </a>
            <a href="https://www.instagram.com/thesoulmirrorbyjanvi/" aria-label="Instagram" target="_blank" rel="noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>
            </a>
            <a href="mailto:thesoulmirrorbyjanvi@gmail.com" aria-label="Email">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/reviews">Reviews</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4>Services</h4>
          <ul>
            <li><Link href="/services/tarot-reading">Tarot Readings</Link></li>
            <li><Link href="/services/energy-healing">Energy Healing</Link></li>
            <li><Link href="/services/manifestation-coaching">Manifestation Coaching</Link></li>
            <li><Link href="/services/soul-guidance">Soul Guidance</Link></li>
          </ul>
        </div>

        <div>
          <h4>Let&apos;s Connect</h4>
          <ul>
            <li>Available Worldwide</li>
            <li><a href="mailto:thesoulmirrorbyjanvi@gmail.com">thesoulmirrorbyjanvi@gmail.com</a></li>
            <li><a href="/booking?urgent=whatsapp">Urgent WhatsApp contact (₹299 fee)</a></li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>&copy; {new Date().getFullYear()} The Soul Mirror by Janvi. All rights reserved.</span>
        <span><a href="#">Privacy Policy</a> &nbsp;&nbsp; <a href="#">Terms &amp; Conditions</a></span>
      </div>
    </footer>
  );
}
