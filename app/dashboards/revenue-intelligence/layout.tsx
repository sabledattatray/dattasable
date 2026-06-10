import { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Revenue Intelligence Dashboard | Surgical BI' },
  description: 'Analyze unified and channel-level revenue engines, customer acquisition statistics, average deal sizes, and performance funnels with high-fidelity charts.',
  openGraph: {
    title: 'Revenue Intelligence Dashboard',
    description: 'Unified channel-level revenue forecasting, regional performance, and conversion funnels.',
    type: 'website',
  }
};

export default function RevenueIntelligenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
