import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "United in Christ | Prophet Jay Uriel",
  description: "Ministry of the Word — Prophet Jay Uriel",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* ── FAVICON: placed directly in <head> so Next.js doesn't override ── */}
        <link rel="icon" href="/photos/united-in-christ-logo.png" type="image/png" />
        <link rel="shortcut icon" href="/photos/united-in-christ-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/photos/united-in-christ-logo.png" />

        {/* ── FONTS ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Cormorant+Garamond:wght@300;400;600&family=Cinzel:wght@400;600;700&family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
