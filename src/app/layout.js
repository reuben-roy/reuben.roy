import { Inter, Space_Grotesk, Space_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MAIN_SITE, SITE_URL } from '@/data/site';
import './globals.css';

const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const display = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
});

const mono = Space_Mono({
  variable: '--font-mono',
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Reuben Roy — Generalist software engineer',
    template: '%s — Reuben Roy',
  },
  description:
    'Reuben Roy is a generalist software engineer building agentic systems, data products, and native apps.',
  applicationName: 'Reuben Roy',
  authors: [{ name: 'Reuben Roy', url: MAIN_SITE }],
  creator: 'Reuben Roy',
  openGraph: {
    title: 'Reuben Roy — Generalist software engineer',
    description:
      'Agentic systems, data products, and native apps. The interactive portfolio of Reuben Roy.',
    siteName: 'Reuben Roy',
    type: 'website',
    url: '/',
  },
  twitter: {
    card: 'summary',
    title: 'Reuben Roy — Generalist software engineer',
    description:
      'Agentic systems, data products, and native apps. The interactive portfolio of Reuben Roy.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body id="top" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
        <a href="#main" className="skipLink">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
