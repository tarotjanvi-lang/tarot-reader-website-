"use client";

import { useState } from "react";

export default function Faq({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <div key={item.q} className={`faq-item${openIndex === i ? " open" : ""}`}>
          <button type="button" className="faq-q" aria-expanded={openIndex === i} onClick={() => setOpenIndex(openIndex === i ? -1 : i)}>
            {item.q}
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
          <div className="faq-a">
            <p>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
