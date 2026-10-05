import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div>
          <div className="footer-logo">
            <Image className="footer-logo-mark" src="/images/logo.png" alt="The Soul Mirror" width={34} height={34} />
            <div>
              <b>THE SOUL MIRROR</b>
            </div>
          </div>
          <p>Intuitive tarot reader, energy alchemist and spiritual guide helping you reflect your truth and transform your life.</p>
          <div className="footer-social">
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
            <li><Link href="/services/intentional-spellwork">Intentional Spellwork</Link></li>
            <li><Link href="/services/soul-guidance">Soul Guidance</Link></li>
          </ul>
        </div>

        <div>
          <h4>Let&apos;s Connect</h4>
          <ul>
            <li>Available Worldwide</li>
            <li><a href="mailto:thesoulmirrorbyjanvi@gmail.com">Email us</a></li>
            <li><a href="/booking?urgent=whatsapp">Emergency consultation(<small className="footer-emergency-fee">₹299 extra</small>)</a></li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          <Link href="/privacy-policy">Privacy Policy</Link>
          &nbsp;&nbsp;
          <Link href="/terms">Terms &amp; Conditions</Link>
        </span>
        <span>&copy; {new Date().getFullYear()} The Soul Mirror by Janvi. All rights reserved.</span>
      </div>
    </footer>
  );
}
