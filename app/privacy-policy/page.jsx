export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for The Soul Mirror by Janvi.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="page-shell legal-page">
      <section className="section-tight section-hero legal-hero">
        <div className="container small-container">
          <div className="eyebrow">Your information matters</div>
          <h1>Privacy Policy</h1>
          <p className="page-intro">
            This Privacy Policy explains how The Soul Mirror by Janvi collects, uses and protects personal information shared with us.
          </p>
        </div>
      </section>

      <section className="section terms-section">
        <div className="container small-container">
          <div className="terms-note">
            <h3>Information we may collect</h3>
            <p>
              We may collect personal details such as your name, date of birth, contact details, booking information,
              the intention behind your reading or healing service and any relevant situation details necessary to provide the service.
            </p>
          </div>

          <div className="terms-note">
            <h3>How we use your information</h3>
            <p>
              We use your information to process bookings, prepare your service, communicate with you, provide sessions and maintain a smooth client experience.
              Your information is used only for the purpose of the selected service and related communication.
            </p>
          </div>

          <div className="terms-note">
            <h3>Confidentiality</h3>
            <p>
              Your personal information and private readings are treated with reasonable confidentiality. We do not intentionally share your personal information publicly without permission,
              except where required by law or necessary for service delivery.
            </p>
          </div>

          <div className="terms-note">
            <h3>Data protection</h3>
            <p>
              We take reasonable steps to protect personal information from unauthorised access, misuse or disclosure. However, no online service can guarantee absolute security.
            </p>
          </div>

          <div className="terms-note">
            <h3>Third parties</h3>
            <p>
              We may use trusted service providers to support booking, communication or payment processing when necessary. Any sharing is limited to what is required for the relevant service.
            </p>
          </div>

          <div className="terms-note">
            <h3>Contact</h3>
            <p>
              If you have questions about this privacy policy or your information, please contact us at thesoulmirrorbyjanvi@gmail.com.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
