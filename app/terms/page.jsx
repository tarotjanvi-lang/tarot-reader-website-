import TermsAndConditions from "@/components/TermsAndConditions";
import { fullTerms, healingTermsIntro, privacyNote, spellworkGeneralCondition, soulMirrorNote, soulMirrorProcessNote } from "@/lib/terms-data";

export const metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for tarot readings, healing and spellwork services offered by The Soul Mirror by Janvi.",
};

export default function TermsPage() {
  return (
    <main className="page-shell legal-page">
      <div className="legal-star-field" aria-hidden="true">
        <span>✦</span><span>✧</span><span>✦</span><span>⋆</span><span>✧</span><span>✦</span><span>⋆</span>
        <span>✦</span><span>✧</span><span>✦</span><span>⋆</span><span>✧</span><span>✦</span><span>⋆</span>
      </div>
      <section className="section-tight section-hero legal-hero">
        <div className="container small-container">
          <div className="eyebrow">Legal &amp; service policy</div>
          <h1>Terms &amp; Conditions</h1>
          <p className="page-intro">
            These terms explain how bookings, readings, healing and spellwork services are conducted at The Soul Mirror by Janvi.
          </p>
        </div>
      </section>

      <section className="section terms-section">
        <div className="container small-container">
          <div className="terms-note legal-intro-note" id="privacy-policy">
            <h3>{privacyNote.title}</h3>
            {privacyNote.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          <div className="legal-terms-block" id="terms-conditions">
            <div className="eyebrow">Tarot services</div>
            <h2>Terms &amp; Conditions — Tarot Readings</h2>
            <TermsAndConditions sections={fullTerms.tarot} notes={[soulMirrorNote]} />
          </div>

          <div className="legal-terms-block">
            <div className="eyebrow">Healing and spellwork services</div>
            <h2>Terms &amp; Conditions — Healings &amp; Intentional Spellwork</h2>
            <TermsAndConditions intro={healingTermsIntro} sections={fullTerms.healing} notes={[spellworkGeneralCondition, soulMirrorProcessNote]} />
          </div>
        </div>
      </section>
    </main>
  );
}
