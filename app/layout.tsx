import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import type { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://dattasable.com'),
  title: "Datta Sable | BI & Analytics Expert",
  description: "Datta Sable — Business Intelligence Expert specializing in Tableau, Power BI, SQL, Python & Advanced Excel. Building data-driven insights that empower decisions.",
  keywords: ["Business Intelligence", "Tableau", "Power BI", "SQL", "Python", "Data Analytics", "Dashboard Development"],
  authors: [{ name: "Datta Sable" }],
  openGraph: {
    title: "Datta Sable | BI & Analytics Expert",
    description: "Transforming raw data into strategic insights. Expert in Tableau, Power BI, SQL, Python & Advanced Excel.",
    type: "website",
    url: "https://dattasable.com",
    images: [
      {
        url: "/images/datta.png",
        width: 1200,
        height: 630,
        alt: "Datta Sable | BI & Analytics Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Datta Sable | BI & Analytics Expert",
    description: "Transforming raw data into strategic insights.",
    images: ["/images/datta.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

import { Providers } from "@/components/Providers";
import GoogleOneTap from "@/components/GoogleOneTap";
import { Syne, Kanit, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-kanit',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${syne.variable} ${kanit.variable} ${jetbrains.variable}`}>
      <head>
        {/* FontAwesome is still needed for some icons, but we should consider replacing it with SVG icons later */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
      </head>
      <body style={{ background: 'var(--bg)' }} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Datta Sable",
              "url": "https://dattasable.com",
              "jobTitle": "Business Intelligence Expert",
              "description": "Expert in Tableau, Power BI, SQL, Python & Advanced Excel.",
              "sameAs": [
                "https://linkedin.com/in/dattasable",
                "https://github.com/dattasable"
              ]
            })
          }}
        />
        <Providers>
          <ThemeProvider>
            <main id="main-content">
              {children}
            </main>
            <GoogleOneTap />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
