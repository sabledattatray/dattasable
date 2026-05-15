import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Surgical Dashboards',
    default: 'Interactive Analytics Showcases | Surgical BI Dashboards',
  },
  description: 'Explore a curated collection of high-performance, interactive BI dashboards.',
  alternates: {
    canonical: '/dashboards',
  }
};

export default function DashboardsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
