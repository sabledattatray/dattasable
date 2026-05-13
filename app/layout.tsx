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
  title: "Surgical AI Workspace | Creator Intelligence Infrastructure",
  description: "Datta Sable — Architect of the Surgical AI Workspace. High-performance infrastructure for technical founders, AI prompt engineering, and automated creator workflows.",
  keywords: [
    "Surgical AI Workspace",
    "Creator Intelligence Ecosystem",
    "Surgical Prompt Architecture",
    "Operator Intent Mapping",
    "AI Workflow Engineering",
    "Technical Authority Systems",
    "Datta Sable", 
    "Data Strategy Consultant",
    "Automated Creator Workflows",
    "Context Compression Framework"
  ],
  authors: [{ name: "Datta Sable" }],
  openGraph: {
    title: "Surgical AI Workspace | Creator Intelligence Ecosystem",
    description: "Expert-grade infrastructure for technical founders and AI-native builders. Master your technical authority.",
    type: "website",
    url: "https://dattasable.com",
    images: [
      {
        url: "/images/og-main.png",
        width: 1200,
        height: 630,
        alt: "Surgical AI Workspace | Creator Intelligence Ecosystem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Surgical AI Workspace | Creator Intelligence Ecosystem",
    description: "Expert-grade infrastructure for technical founders and AI-native builders.",
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
        
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Surgical AI Workspace",
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
                "jobTitle": "AI Workflow Architect & Data Strategist",
                "description": "Architect of the Surgical AI Workspace. Expert in prompt engineering, technical content infrastructure, and data strategy.",
                "sameAs": [
                  "https://linkedin.com/in/dattasable",
                  "https://github.com/sabledattatray"
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
        <link rel="dns-prefetch" href="https://ep1.adtrafficquality.google" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
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
            />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
