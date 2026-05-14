import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interactive Analytics Showcases | Surgical BI Dashboards',
  description: 'Explore a curated collection of high-performance, interactive BI dashboards across Fintech, Global Sales, and Operations. Engineered with Next.js, Canvas APIs, and Tableau.',
  keywords: ['BI Showcase', 'Data Visualization Portfolio', 'Fintech Analytics', 'Next.js BI', 'Surgical Dashboards', 'Sales Intelligence'],
  openGraph: {
    title: 'Interactive Analytics Showcases | Surgical BI Dashboards',
    description: 'Expert-grade data visualizations for executive decision-making.',
    images: ['/images/dashboards/global_sales_kpi.png'],
  },
  alternates: {
    canonical: '/dashboards',
  }
};

export default function DashboardsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
