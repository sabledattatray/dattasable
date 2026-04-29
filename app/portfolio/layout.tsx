import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "BI Portfolio & Success Stories | Datta Sable",
  description: "A deep-dive into 20+ advanced Business Intelligence projects, ranging from Global Sales Trackers to AI-driven Churn Prediction models. Real data, real impact.",
  openGraph: {
    title: "Datta Sable | BI Project Showcase",
    description: "Detailed case studies and interactive visual experiences in Data Engineering and Analytics.",
    images: ["/images/datta.png"],
  }
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
