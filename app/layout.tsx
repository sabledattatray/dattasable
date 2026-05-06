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
  keywords: [
    "Datta Sable", 
    "Datta Sable Portfolio",
    "Business Intelligence Expert", 
    "BI Developer India",
    "Tableau Expert", 
    "Power BI Consultant", 
    "SQL Automation", 
    "Python Data Engineering", 
    "Data Analytics Dashboard", 
    "Dashboard Development",
    "Automated Reporting Solutions",
    "Data Strategy Consultant"
  ],
  authors: [{ name: "Datta Sable" }],
  openGraph: {
    title: "Datta Sable | BI & Analytics Expert",
    description: "Transforming raw data into strategic insights. Expert in Tableau, Power BI, SQL, Python & Advanced Excel.",
    type: "website",
    url: "https://dattasable.com",
    images: [
      {
        url: "/images/og-main.png",
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
    images: ["/images/og-main.png"],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  verification: {
    google: "XV8qSN_qy63Tsmx3naTd1yXZr5CbLhaT22Xsmhf5cAw",
  },
};

import { Providers } from "@/components/Providers";
import { Suspense } from 'react';
import { Syne, Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import ClientOnlyWrapper from "@/components/ClientOnlyWrapper";
import PerformanceOptimizer from "@/components/PerformanceOptimizer";
import dynamic from 'next/dynamic';

const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton'), { ssr: false });

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
    <html lang="en" suppressHydrationWarning className={`light ${syne.variable} ${inter.variable} ${jetbrains.variable}`}>
      <head>
        <meta name="color-scheme" content="light dark" />
        {/* Preconnects removed to optimize initial render. Third-party scripts are lazy-loaded by PerformanceOptimizer. */}
        
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
                  if (!theme && supportDarkMode) theme = 'light';
                  if (!theme) theme = 'light';
                  if (theme === 'dark') {
                    document.documentElement.classList.remove('light');
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning style={{ background: 'var(--bg)' }}>
        <Providers>
          <ThemeProvider>
            <main id="main-content">
              {children}
            </main>
            <ClientOnlyWrapper />
            
            {/* High-Performance Third-Party Script Optimization */}
            <PerformanceOptimizer 
              googleAnalyticsId="G-Q4GEY4N9WN"
              googleSignInClientId={process.env.GOOGLE_ID || ""}
              adSenseClientId="ca-pub-4242010382827250"
            />
            <WhatsAppButton />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
