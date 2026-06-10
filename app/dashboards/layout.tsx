import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Surgical Dashboards',
    default: 'Interactive Analytics Showcases | Surgical BI Dashboards',
  },
  description: 'Explore a curated collection of high-performance, interactive BI dashboards featuring real-time revenue analytics, EMI collections intelligence, and sales pipeline velocity showcases.',
};

export default function DashboardsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
