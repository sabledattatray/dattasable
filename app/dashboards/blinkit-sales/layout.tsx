import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Blinkit Sales Intelligence (Simulated Case Study) | Datta Sable",
  description: "A high-fidelity technical showcase of quick commerce analytics using simulated Blinkit data. Interactive performance modeling by Datta Sable.",
  openGraph: {
    title: "Blinkit Sales Intelligence (Simulated Case Study)",
    description: "Technical showcase: Interactive quick commerce analytics infrastructure with simulated data modeling.",
    images: ["/images/dashboards/blinkit_sales_dashboard.png"],
    url: "https://dattasable.com/dashboards/blinkit-sales",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blinkit Sales Intelligence (Simulated Case Study)",
    description: "Technical showcase of quick commerce analytics modeling.",
    images: ["/images/dashboards/blinkit_sales_dashboard.png"],
  },
  alternates: {
    canonical: "/dashboards/blinkit-sales",
  },
};

export default function BlinkitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
