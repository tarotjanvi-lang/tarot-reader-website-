export default function WhatsAppFloat() {
  return (
    <a
      className="wa-float"
      href="/booking?urgent=whatsapp"
      target="_blank"
      rel="noreferrer"
      aria-label="Request urgent WhatsApp contact"
    >
      <svg className="wa-icon" width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="15" fill="white" />
        <path fill="#1F8A57" d="M23.7 8.3A10.8 10.8 0 0 0 6.8 21.1L5.7 25l4-1.1A10.8 10.8 0 1 0 23.7 8.3Zm-7.6 16.1a8.8 8.8 0 0 1-4.4-1.2l-.3-.2-2.4.7.7-2.3-.2-.3a8.8 8.8 0 1 1 6.6 3.3Zm4.8-6.5c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2l-.8 1c-.2.2-.4.3-.7.1-.3-.2-1.2-.4-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.7l.5-.5c.1-.2.2-.4.3-.5.1-.2 0-.4 0-.6l-.9-2.1c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.1-1.4-.1-.2-.3-.3-.6-.4Z" />
      </svg>
    </a>
  );
}
