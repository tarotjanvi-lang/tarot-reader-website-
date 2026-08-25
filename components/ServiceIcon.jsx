export default function ServiceIcon({ type, className = "service-icon" }) {
  const common = { className, viewBox: "0 0 48 48", fill: "none", stroke: "currentColor", strokeWidth: "1.3" };
  switch (type) {
    case "tarot":
      return (
        <svg {...common}>
          <rect x="10" y="8" width="18" height="28" rx="3" transform="rotate(-8 19 22)" />
          <rect x="20" y="8" width="18" height="28" rx="3" transform="rotate(8 29 22)" />
          <circle cx="24" cy="20" r="4" />
        </svg>
      );
    case "crystal":
      return (
        <svg {...common}>
          <polygon points="24,6 32,22 24,42 16,22" />
          <polygon points="12,26 24,20 24,42 12,34" />
          <polygon points="36,26 24,20 24,42 36,34" />
        </svg>
      );
    case "moon":
      return (
        <svg {...common}>
          <path d="M30 8a16 16 0 1 0 10 28A20 20 0 0 1 30 8Z" />
          <circle cx="38" cy="10" r="1.3" fill="currentColor" stroke="none" />
          <circle cx="42" cy="16" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "lotus":
      return (
        <svg {...common}>
          <path d="M24 40c-16-6-14-24-14-24 8 0 14 4 14 12 0-8 6-12 14-12 0 0 2 18-14 24Z" />
        </svg>
      );
    case "heart":
      return <svg {...common}><path d="M24 39S8 29 8 18a8 8 0 0 1 16-3 8 8 0 0 1 16 3c0 11-16 21-16 21Z" /><path d="M24 15v12M18 21h12" opacity=".45" /></svg>;
    case "briefcase":
      return <svg {...common}><rect x="7" y="13" width="34" height="23" rx="3" /><path d="M17 13V9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4M7 22h34M24 22v6" /></svg>;
    case "star":
      return <svg {...common}><path d="m24 6 5.5 11.2L42 19l-9 8.7L35.1 40 24 34.2 12.9 40 15 27.7 6 19l12.5-1.8Z" /><circle cx="24" cy="24" r="3" /></svg>;
    case "flame":
      return <svg {...common}><path d="M25 42c-8 0-14-5-14-13 0-7 5-11 9-16 1 5 5 7 6 11 3-3 4-7 3-12 6 5 9 10 9 17 0 8-5 13-13 13Z" /><path d="M24 42c-4-2-6-5-5-9 1-3 4-5 5-8 3 3 5 5 5 9 0 4-2 7-5 8Z" /></svg>;
    case "eye":
      return <svg {...common}><path d="M5 24s7-11 19-11 19 11 19 11-7 11-19 11S5 24 5 24Z" /><circle cx="24" cy="24" r="5" /></svg>;
    case "sun":
      return <svg {...common}><circle cx="24" cy="24" r="7" /><path d="M24 4v7M24 37v7M4 24h7M37 24h7M10 10l5 5M33 33l5 5M38 10l-5 5M15 33l-5 5" /></svg>;
    case "key":
      return <svg {...common}><circle cx="17" cy="18" r="8" /><path d="m23 24 14 14M31 32l4-4M35 36l4-4" /></svg>;
    case "sparkles":
      return <svg {...common}><path d="m24 5 2.8 10.2L37 18l-10.2 2.8L24 31l-2.8-10.2L11 18l10.2-2.8Z" /><path d="m38 29 1.3 4.7L44 35l-4.7 1.3L38 41l-1.3-4.7L32 35l4.7-1.3Z" /></svg>;
    default:
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="16" />
          <path d="M24 8v32M8 24h32" opacity="0.4" />
        </svg>
      );
  }
}
