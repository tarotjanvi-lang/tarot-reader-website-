"use client";

import { useId, useState } from "react";

export default function TermsAndConditions({ intro, sections, notes = [] }) {
  const [openIndex, setOpenIndex] = useState(0);
  const id = useId();

  return (
    <div className="terms-component">
      {intro && <p className="terms-intro">{intro}</p>}
      <div className="terms-accordion" aria-label="Terms & Conditions">
        {sections.map((section, index) => {
          const isOpen = openIndex === index;
          const panelId = `${id}-panel-${index}`;
          const buttonId = `${id}-button-${index}`;
          const blocks = section.blocks || [
            ...section.paragraphs.map((paragraph) => ({ type: "paragraph", value: paragraph })),
            ...(section.lists || []).map((items) => ({ type: "list", value: items })),
          ];

          return (
            <div className={`terms-item${isOpen ? " open" : ""}`} key={section.title}>
              <button
                type="button"
                className="terms-trigger"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span>{section.title}</span>
                <span className="terms-toggle" aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>
              <div className="terms-content" id={panelId} role="region" aria-labelledby={buttonId}>
                <div className="terms-content-inner">
                  {blocks.map((block, blockIndex) => block.type === "list" ? (
                    <ul className="terms-list" key={`${section.title}-list-${blockIndex}`}>
                      {block.value.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  ) : <p key={`${section.title}-paragraph-${blockIndex}`}>{block.value}</p>)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {notes.map((note) => (
        <aside className="terms-note terms-note-highlight" key={note.title}>
          <h3>{note.title}</h3>
          {note.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </aside>
      ))}
    </div>
  );
}
