import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Blinkit Sales Dashboard | Quick Commerce Analytics",
  description: "Comprehensive Blinkit sales performance and quick commerce analytics dashboard. Explore live interactive data by Datta Sable.",
  openGraph: {
    title: "Blinkit Sales Dashboard | Quick Commerce Analytics",
    description: "Interactive quick commerce analytics infrastructure. Real-time sales velocity and conversion tracking.",
    images: ["/images/dashboards/blinkit_sales_dashboard.png"],
    url: "https://dattasable.com/dashboards/blinkit-sales",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blinkit Sales Dashboard | Quick Commerce Analytics",
    description: "Interactive quick commerce analytics infrastructure.",
    images: ["/images/dashboards/blinkit_sales_dashboard.png"],
  },
  alternates: {
    canonical: "/dashboards/blinkit-sales",
  },
};

export default function BlinkitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
