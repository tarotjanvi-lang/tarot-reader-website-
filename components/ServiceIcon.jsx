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
    default:
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="16" />
          <path d="M24 8v32M8 24h32" opacity="0.4" />
        </svg>
      );
  }
}
