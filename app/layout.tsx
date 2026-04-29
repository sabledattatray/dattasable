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
import NotificationManager from "@/components/NotificationManager";
import GoogleOneTap from "@/components/GoogleOneTap";
import { Syne, Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap'
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${syne.variable} ${inter.variable} ${jetbrains.variable}`}>
      <head>
        {/* FontAwesome is still needed for some icons, but we should consider replacing it with SVG icons later */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
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
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (!theme && supportDarkMode) theme = 'dark';
                  if (!theme) theme = 'light';
                  if (theme === 'light') document.documentElement.classList.add('light');
                  else document.documentElement.classList.remove('light');
                } catch (e) {}
              })();
            `,
          }}
        />
        <Script 
          src="https://accounts.google.com/gsi/client" 
          strategy="beforeInteractive"
        />
      </head>
      <body style={{ background: 'var(--bg)' }} suppressHydrationWarning>
        <Providers>
          <ThemeProvider>
            <main id="main-content">
              {children}
            </main>
            <GoogleOneTap />
            <NotificationManager />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
