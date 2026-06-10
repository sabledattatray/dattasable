import { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Global Sales Intelligence | Surgical BI' },
  description: 'Interactive global sales dashboard featuring connectivity mesh mapping, revenue forecasting, and market distribution intelligence.',
  keywords: ['Global Sales Dashboard', 'Revenue Intelligence', 'Market Distribution', 'Sales Analytics', 'Real-time BI', 'Data Visualization'],
  openGraph: {
    title: 'Global Sales Intelligence | Real-time Revenue Engine',
    description: 'Monitor global revenue streams with high-performance surgical design.',
    type: 'website',
  }
};

export default function GlobalSalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
