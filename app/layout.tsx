import type { Metadata } from 'next';
import './globals.css'; // keep if you have one

export const metadata: Metadata = {
  title: 'United in Christ — Prophet Jay Uriel Ministry',
  description: 'Proclaiming the Word of God with power, truth, and the spirit of prophecy. Watch sermons, study teaching notes, and submit prayer requests.',
  icons: {
    icon: [
      { url: '/photos/united-in-christ-logo.png', type: 'image/png' },
    ],
    apple: '/photos/united-in-christ-logo.png',
    shortcut: '/photos/united-in-christ-logo.png',
  },
  openGraph: {
    title: 'United in Christ — Prophet Jay Uriel',
    description: 'Anointed messages, teaching notes, and community prayer.',
    images: ['/photos/united-in-christ-logo.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        {/* ── Favicon (explicit for maximum compatibility) ── */}
        <link rel="icon" type="image/png" href="/photos/united-in-christ-logo.png" />
        <link rel="apple-touch-icon" href="/photos/united-in-christ-logo.png" />
        <link rel="shortcut icon" href="/photos/united-in-christ-logo.png" />

        {/* ── Font preconnect for Google Fonts ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
