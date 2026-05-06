import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Interactive Dashboards | Datta Sable Portfolio",
  description: "Explore 25+ professional-grade dashboards built with Tableau, Power BI, Looker, and Python. Specialized in sales, finance, operations, and HR analytics.",
  openGraph: {
    title: "Interactive BI Dashboard Showcase",
    description: "Expertly crafted analytics platforms for enterprise decision-making.",
    images: ["/images/dashboards/global_sales_kpi.png"],
  },
  alternates: {
    canonical: '/dashboards',
  }
};

export default function DashboardsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
