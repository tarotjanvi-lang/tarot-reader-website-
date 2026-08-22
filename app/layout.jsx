import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata = {
  title: {
    default: "The Soul Mirror by Janvi — Intuitive Tarot Reading & Spiritual Guidance",
    template: "%s — The Soul Mirror by Janvi",
  },
  description:
    "Intuitive tarot readings, energy healing and soul guidance with Janvi. 500+ souls guided, 1,000+ sessions completed. Book online, available worldwide.",
};

// Runs before React hydrates so the correct theme (saved in localStorage)
// is applied immediately on every route — this is what keeps the theme
// consistent when navigating between pages instead of resetting to light.
const noFlashScript = `
(function () {
  try {
    var stored = window.localStorage.getItem('soulmirror-theme');
    var theme = stored === 'dark' || stored === 'light' ? stored : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Jost:wght@300;400;500;600&display=swap"
        />
        {/* eslint-disable-next-line react/no-danger */}
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
          <WhatsAppFloat />
        </ThemeProvider>
      </body>
    </html>
  );
}
