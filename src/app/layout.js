import { Geist, Geist_Mono, Space_Grotesk, Press_Start_2P } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const displayFont = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
});

const pixelFont = Press_Start_2P({
  variable: '--font-pixel',
  weight: '400',
  subsets: ['latin'],
});

export const metadata = {
  metadataBase: new URL('https://reuben.roy'),
  title: {
    default: 'Reuben Roy | Interactive Portfolio',
    template: '%s | Reuben Roy',
  },
  description: 'Generalist software engineer building interactive products, visualizations, and mobile tools.',
  applicationName: 'reuben.roy',
  openGraph: {
    title: 'Reuben Roy | Interactive Portfolio',
    description: 'Run through projects, work history, and experiments in a retro-inspired portfolio world.',
    siteName: 'reuben.roy',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Reuben Roy | Interactive Portfolio',
    description: 'Generalist software engineer building interactive products, visualizations, and mobile tools.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${displayFont.variable} ${pixelFont.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
