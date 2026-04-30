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
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

import { Providers } from "@/components/Providers";
import { Suspense } from 'react';
import { Syne, Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import ClientOnlyWrapper from "@/components/ClientOnlyWrapper";
import PerformanceOptimizer from "@/components/PerformanceOptimizer";

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
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Manual Preload for LCP Hero Image */}
        <link 
          rel="preload" 
          as="image" 
          href="/_next/image?url=%2Fhero-bg.webp&w=640&q=15" 
          media="(max-width: 640px)"
        />
        <link 
          rel="preload" 
          as="image" 
          href="/_next/image?url=%2Fhero-bg.webp&w=1200&q=15" 
          media="(min-width: 641px)"
        />
        
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Datta Sable",
                "url": "https://dattasable.com",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://dattasable.com/blog?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              },
              {
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
              }
            ])
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
      </head>
      <body style={{ background: 'var(--bg)' }} suppressHydrationWarning>
        <Providers>
          <ThemeProvider>
            <main id="main-content">
              {children}
            </main>
            <ClientOnlyWrapper />
            
            {/* High-Performance Third-Party Script Optimization */}
            <PerformanceOptimizer 
              googleAnalyticsId="G-Q4GEY4N9WN"
              googleSignInClientId=""
              adSenseClientId="ca-pub-4242010382827250"
            />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
